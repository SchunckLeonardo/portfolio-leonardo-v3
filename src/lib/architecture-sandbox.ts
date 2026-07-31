import { architectureCatalog, architectureEdgeId } from '@/content/architecture'
import type {
  ArchitectureEdgeVisualState,
  ArchitectureNodeVisualState,
  ArchitectureSandboxState,
  ArchitectureVisualSignal,
  Locale,
  ProjectArchitecture,
  ProjectSlug,
  SandboxCommand,
  SandboxFeedback,
  SandboxFeedbackCode,
  SandboxOutcome,
} from '@/types/portfolio'

import { createArchitectureLayout } from './architecture-layout'

function outgoingNodeIds(topology: ProjectArchitecture, nodeId?: string) {
  if (!nodeId) return []
  return topology.edges
    .filter((edge) => edge.from === nodeId)
    .map((edge) => edge.to)
}

function makeFeedback(
  state: ArchitectureSandboxState,
  code: SandboxFeedbackCode,
  details: Partial<SandboxFeedback> = {},
): SandboxFeedback {
  return {
    code,
    path: state.path,
    validNextNodeIds: state.validNextNodeIds,
    ...details,
  }
}

function outcome(
  state: ArchitectureSandboxState,
  code: SandboxFeedbackCode,
  details?: Partial<SandboxFeedback>,
): SandboxOutcome {
  return { state, feedback: makeFeedback(state, code, details) }
}

function statusAt(topology: ProjectArchitecture, nodeId: string) {
  return outgoingNodeIds(topology, nodeId).length === 0
    ? ('completed' as const)
    : ('running' as const)
}

export function createArchitectureSandboxState(
  projectSlug: ProjectSlug,
): ArchitectureSandboxState {
  return {
    projectSlug,
    status: 'idle',
    path: [],
    edgePath: [],
    validNextNodeIds: architectureCatalog[projectSlug].nodes.map(
      (node) => node.id,
    ),
    revision: 0,
  }
}

export function dispatchSandbox(
  command: SandboxCommand,
  current: ArchitectureSandboxState,
  topology: ProjectArchitecture = architectureCatalog[current.projectSlug],
): SandboxOutcome {
  if (command.type === 'reset') {
    const state = {
      ...createArchitectureSandboxState(current.projectSlug),
      revision: current.revision + 1,
    }
    return outcome(state, 'reset')
  }

  if (command.type === 'trace') return outcome(current, 'trace')

  if (current.status === 'failed' && command.type !== 'recover') {
    return outcome(current, 'blocked-by-failure', {
      nodeId: current.failedNodeId,
    })
  }

  if (command.type === 'start') {
    if (!topology.nodes.some((node) => node.id === command.nodeId)) {
      return outcome(current, 'invalid-node', { nodeId: command.nodeId })
    }

    const next = outgoingNodeIds(topology, command.nodeId)
    const state: ArchitectureSandboxState = {
      projectSlug: current.projectSlug,
      status: next.length === 0 ? 'completed' : 'running',
      path: [command.nodeId],
      edgePath: [],
      currentNodeId: command.nodeId,
      validNextNodeIds: next,
      revision: current.revision + 1,
    }
    return outcome(
      state,
      state.status === 'completed' ? 'completed' : 'started',
      { nodeId: command.nodeId },
    )
  }

  if (command.type === 'recover') {
    if (!current.failedNodeId || !current.currentNodeId) {
      return outcome(current, 'nothing-to-recover')
    }

    const next = outgoingNodeIds(topology, current.currentNodeId)
    const state: ArchitectureSandboxState = {
      ...current,
      status: next.length === 0 ? 'completed' : 'running',
      failedNodeId: undefined,
      validNextNodeIds: next,
      revision: current.revision + 1,
    }
    return outcome(state, 'recovered', { nodeId: current.currentNodeId })
  }

  if (!current.currentNodeId) return outcome(current, 'not-started')

  if (command.type === 'fail') {
    const state: ArchitectureSandboxState = {
      ...current,
      status: 'failed',
      failedNodeId: current.currentNodeId,
      validNextNodeIds: [],
      revision: current.revision + 1,
    }
    return outcome(state, 'failed', { nodeId: current.currentNodeId })
  }

  if (command.type === 'back') {
    if (current.path.length <= 1) return outcome(current, 'no-history')

    const path = current.path.slice(0, -1)
    const edgePath = current.edgePath.slice(0, -1)
    const currentNodeId = path.at(-1)
    const state: ArchitectureSandboxState = {
      ...current,
      status: 'running',
      path,
      edgePath,
      currentNodeId,
      validNextNodeIds: outgoingNodeIds(topology, currentNodeId),
      revision: current.revision + 1,
    }
    return outcome(state, 'back', { nodeId: currentNodeId })
  }

  const edgeIndex = topology.edges.findIndex(
    (edge) => edge.from === current.currentNodeId && edge.to === command.nodeId,
  )
  if (edgeIndex < 0) {
    return outcome(current, 'invalid-hop', {
      fromNodeId: current.currentNodeId,
      toNodeId: command.nodeId,
    })
  }

  const edge = topology.edges[edgeIndex]
  const next = outgoingNodeIds(topology, command.nodeId)
  const state: ArchitectureSandboxState = {
    ...current,
    status: next.length === 0 ? 'completed' : 'running',
    path: [...current.path, command.nodeId],
    edgePath: [...current.edgePath, architectureEdgeId(edge, edgeIndex)],
    currentNodeId: command.nodeId,
    validNextNodeIds: next,
    revision: current.revision + 1,
  }

  return outcome(state, state.status === 'completed' ? 'completed' : 'hopped', {
    nodeId: command.nodeId,
    fromNodeId: current.currentNodeId,
    toNodeId: command.nodeId,
  })
}

export function createArchitectureVisualSignal(
  state: ArchitectureSandboxState,
  accent: string,
  topology: ProjectArchitecture = architectureCatalog[state.projectSlug],
): ArchitectureVisualSignal {
  const layout = createArchitectureLayout(topology)
  const lastEdgeId = state.edgePath.at(-1)
  const visited = new Set(state.path)
  const traversedEdges = new Set(state.edgePath)
  const available = new Set(state.validNextNodeIds)

  return {
    projectSlug: state.projectSlug,
    accent,
    status: state.status,
    layout: layout.mode,
    nodes: topology.nodes.map((node) => {
      let nodeState: ArchitectureNodeVisualState = 'idle'
      if (visited.has(node.id)) nodeState = 'visited'
      if (available.has(node.id)) nodeState = 'available'
      if (state.currentNodeId === node.id) nodeState = 'current'
      if (state.failedNodeId === node.id) nodeState = 'failed'

      return {
        ...node,
        ...layout.positions[node.id],
        state: nodeState,
        start: state.path[0] === node.id,
      }
    }),
    edges: topology.edges.map((edge, index) => {
      const id = architectureEdgeId(edge, index)
      let edgeState: ArchitectureEdgeVisualState = 'idle'
      if (
        state.currentNodeId === edge.from &&
        state.validNextNodeIds.includes(edge.to)
      ) {
        edgeState = 'available'
      }
      if (traversedEdges.has(id)) edgeState = 'visited'
      if (lastEdgeId === id) edgeState = 'current'
      if (
        state.failedNodeId &&
        (edge.from === state.failedNodeId || edge.to === state.failedNodeId)
      ) {
        edgeState = 'failed'
      }
      return { ...edge, id, state: edgeState }
    }),
  }
}

function nodeLabel(topology: ProjectArchitecture, nodeId?: string) {
  if (!nodeId) return '—'
  return topology.nodes.find((node) => node.id === nodeId)?.label ?? nodeId
}

export function formatSandboxOutcome(
  result: SandboxOutcome,
  locale: Locale,
  topology: ProjectArchitecture = architectureCatalog[result.state.projectSlug],
) {
  const { feedback } = result
  const node = nodeLabel(topology, feedback.nodeId)
  const from = nodeLabel(topology, feedback.fromNodeId)
  const to = nodeLabel(topology, feedback.toNodeId)
  const next = feedback.validNextNodeIds
    .map((nodeId) => nodeLabel(topology, nodeId))
    .join(', ')
  const path = feedback.path
    .map((nodeId) => nodeLabel(topology, nodeId))
    .join(' → ')

  const pt: Record<SandboxFeedbackCode, string> = {
    reset: 'LAB resetado. Inicie em qualquer nó.',
    started: `Pacote iniciado em ${node}. Próximos: ${next || 'nenhum'}.`,
    hopped: `Hop confirmado: ${from} → ${to}. Próximos: ${next || 'nenhum'}.`,
    back: `Pacote voltou para ${node}. Próximos: ${next || 'nenhum'}.`,
    failed: `Falha injetada em ${node}. Use recover ou reset.`,
    recovered: `Nó ${node} recuperado. Próximos: ${next || 'nenhum'}.`,
    trace: `Trace: ${path || 'vazio'}. Próximos: ${next || 'inicie em qualquer nó'}.`,
    completed: `Percurso concluído em ${node}. Trace: ${path}.`,
    'invalid-node': `Nó "${node}" não existe neste case.`,
    'invalid-hop': `Hop inválido: ${from} → ${to}. Válidos: ${next || 'nenhum'}.`,
    'not-started': 'O pacote ainda não foi iniciado. Use start <node>.',
    'no-history': 'Não há um passo anterior neste percurso.',
    'blocked-by-failure': `Transição bloqueada pela falha em ${node}. Use recover ou reset.`,
    'nothing-to-recover': 'Não há uma falha ativa para recuperar.',
  }

  const en: Record<SandboxFeedbackCode, string> = {
    reset: 'LAB reset. Start at any node.',
    started: `Packet started at ${node}. Next: ${next || 'none'}.`,
    hopped: `Hop confirmed: ${from} → ${to}. Next: ${next || 'none'}.`,
    back: `Packet moved back to ${node}. Next: ${next || 'none'}.`,
    failed: `Failure injected at ${node}. Use recover or reset.`,
    recovered: `Node ${node} recovered. Next: ${next || 'none'}.`,
    trace: `Trace: ${path || 'empty'}. Next: ${next || 'start at any node'}.`,
    completed: `Route completed at ${node}. Trace: ${path}.`,
    'invalid-node': `Node "${node}" does not exist in this case.`,
    'invalid-hop': `Invalid hop: ${from} → ${to}. Valid: ${next || 'none'}.`,
    'not-started': 'The packet has not started. Use start <node>.',
    'no-history': 'There is no previous step in this route.',
    'blocked-by-failure': `Transition blocked by failure at ${node}. Use recover or reset.`,
    'nothing-to-recover': 'There is no active failure to recover.',
  }

  return (locale === 'pt' ? pt : en)[feedback.code]
}
