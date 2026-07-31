import type { ProjectArchitecture } from '@/types/portfolio'

export interface ArchitectureLayoutPosition {
  x: number
  y: number
  level: number
}

export interface ArchitectureLayout {
  mode: 'layered' | 'radial'
  positions: Record<string, ArchitectureLayoutPosition>
}

function radialLayout(topology: ProjectArchitecture): ArchitectureLayout {
  const positions = Object.fromEntries(
    topology.nodes.map((node, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / topology.nodes.length
      return [
        node.id,
        {
          x: Number((50 + Math.cos(angle) * 34).toFixed(4)),
          y: Number((50 + Math.sin(angle) * 34).toFixed(4)),
          level: 0,
        },
      ]
    }),
  )

  return { mode: 'radial', positions }
}

export function createArchitectureLayout(
  topology: ProjectArchitecture,
): ArchitectureLayout {
  if (topology.nodes.length === 0) {
    return { mode: 'layered', positions: {} }
  }

  const nodeIds = new Set(topology.nodes.map((node) => node.id))
  const indegree = Object.fromEntries(
    topology.nodes.map((node) => [node.id, 0]),
  ) as Record<string, number>
  const outgoing = Object.fromEntries(
    topology.nodes.map((node) => [node.id, [] as string[]]),
  )

  for (const edge of topology.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) continue
    indegree[edge.to] += 1
    outgoing[edge.from].push(edge.to)
  }

  const queue = topology.nodes
    .map((node) => node.id)
    .filter((nodeId) => indegree[nodeId] === 0)
  const order: string[] = []
  const level = Object.fromEntries(
    topology.nodes.map((node) => [node.id, 0]),
  ) as Record<string, number>

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) break
    order.push(current)

    for (const next of outgoing[current]) {
      level[next] = Math.max(level[next], level[current] + 1)
      indegree[next] -= 1
      if (indegree[next] === 0) queue.push(next)
    }
  }

  if (order.length !== topology.nodes.length) return radialLayout(topology)

  const maxLevel = Math.max(...Object.values(level))
  const groups = new Map<number, string[]>()
  for (const node of topology.nodes) {
    const group = groups.get(level[node.id]) ?? []
    group.push(node.id)
    groups.set(level[node.id], group)
  }

  const positions: Record<string, ArchitectureLayoutPosition> = {}
  for (const [nodeLevel, nodeIdsAtLevel] of groups) {
    nodeIdsAtLevel.forEach((nodeId, index) => {
      positions[nodeId] = {
        x:
          nodeIdsAtLevel.length === 1
            ? 50
            : 17 + (66 * index) / (nodeIdsAtLevel.length - 1),
        y: maxLevel === 0 ? 50 : 10 + (80 * nodeLevel) / maxLevel,
        level: nodeLevel,
      }
    })
  }

  return { mode: 'layered', positions }
}
