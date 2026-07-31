import { describe, expect, it } from 'vitest'

import {
  architectureCatalog,
  getArchitectureEdgeInsight,
  getArchitectureKnowledge,
} from '@/content/architecture'
import { projectSlugs } from '@/types/portfolio'
import type { ProjectArchitecture } from '@/types/portfolio'

import { createArchitectureLayout } from './architecture-layout'
import {
  createArchitectureSandboxState,
  dispatchSandbox,
} from './architecture-sandbox'

describe('architecture sandbox', () => {
  it('starts at any node across all four cases', () => {
    for (const slug of projectSlugs) {
      const topology = architectureCatalog[slug]
      for (const node of topology.nodes) {
        const result = dispatchSandbox(
          { type: 'start', nodeId: node.id },
          createArchitectureSandboxState(slug),
          topology,
        )
        expect(result.state.currentNodeId).toBe(node.id)
        expect(result.state.path).toEqual([node.id])
      }
    }
  })

  it('moves only through directed edges and reports valid destinations', () => {
    const topology = architectureCatalog.yomora
    const started = dispatchSandbox(
      { type: 'start', nodeId: 'ios' },
      createArchitectureSandboxState('yomora'),
      topology,
    )
    const hopped = dispatchSandbox(
      { type: 'hop', nodeId: 'contract' },
      started.state,
      topology,
    )
    expect(hopped.state.path).toEqual(['ios', 'contract'])
    expect(hopped.state.validNextNodeIds).toEqual([
      'identity',
      'reading',
      'social',
    ])

    const reverse = dispatchSandbox(
      { type: 'hop', nodeId: 'ios' },
      hopped.state,
      topology,
    )
    expect(reverse.feedback.code).toBe('invalid-hop')
    expect(reverse.state).toBe(hopped.state)
    expect(reverse.feedback.validNextNodeIds).toEqual([
      'identity',
      'reading',
      'social',
    ])
  })

  it('tracks history, goes back and completes at a terminal node', () => {
    const topology = architectureCatalog['solar-beat-lab']
    const started = dispatchSandbox(
      { type: 'start', nodeId: 'ui' },
      createArchitectureSandboxState('solar-beat-lab'),
      topology,
    )
    const stored = dispatchSandbox(
      { type: 'hop', nodeId: 'store' },
      started.state,
      topology,
    )
    const exported = dispatchSandbox(
      { type: 'hop', nodeId: 'export' },
      stored.state,
      topology,
    )
    expect(exported.state.status).toBe('completed')
    expect(exported.state.edgePath).toHaveLength(2)

    const back = dispatchSandbox({ type: 'back' }, exported.state, topology)
    expect(back.state.currentNodeId).toBe('store')
    expect(back.state.status).toBe('running')
    expect(back.state.edgePath).toHaveLength(1)
  })

  it('blocks transitions during failure, then recovers or resets', () => {
    const topology = architectureCatalog['hermes-news']
    const started = dispatchSandbox(
      { type: 'start', nodeId: 'feeds' },
      createArchitectureSandboxState('hermes-news'),
      topology,
    )
    const failed = dispatchSandbox({ type: 'fail' }, started.state, topology)
    expect(failed.state.status).toBe('failed')

    const blocked = dispatchSandbox(
      { type: 'hop', nodeId: 'news' },
      failed.state,
      topology,
    )
    expect(blocked.feedback.code).toBe('blocked-by-failure')
    expect(blocked.state.path).toEqual(['feeds'])

    const recovered = dispatchSandbox(
      { type: 'recover' },
      failed.state,
      topology,
    )
    expect(recovered.state.status).toBe('running')
    expect(recovered.state.validNextNodeIds).toEqual(['news'])

    const reset = dispatchSandbox({ type: 'reset' }, recovered.state, topology)
    expect(reset.state.status).toBe('idle')
    expect(reset.state.path).toEqual([])
    expect(reset.state.validNextNodeIds).toHaveLength(topology.nodes.length)
  })
})

describe('architecture catalog', () => {
  it('keeps every edge reference valid and every node documented in PT and EN', () => {
    for (const slug of projectSlugs) {
      const topology = architectureCatalog[slug]
      const nodeIds = new Set(topology.nodes.map((node) => node.id))

      for (const edge of topology.edges) {
        expect(nodeIds.has(edge.from)).toBe(true)
        expect(nodeIds.has(edge.to)).toBe(true)
      }

      for (const locale of ['pt', 'en'] as const) {
        const content = getArchitectureKnowledge(locale, slug)
        for (const node of topology.nodes) {
          expect(content.nodes[node.id]).toMatchObject({
            responsibility: expect.any(String),
            contract: expect.any(String),
            failureImpact: expect.any(String),
            mitigation: expect.any(String),
            source: expect.any(String),
          })
        }
        topology.edges.forEach((edge, index) => {
          expect(getArchitectureEdgeInsight(locale, slug, edge, index)).toEqual(
            expect.objectContaining({
              responsibility: expect.any(String),
              contract: expect.any(String),
              failureImpact: expect.any(String),
              mitigation: expect.any(String),
            }),
          )
        })
      }
    }
  })
})

describe('architecture layout', () => {
  it('is deterministic for directed acyclic topologies', () => {
    const topology = architectureCatalog.yomora
    expect(createArchitectureLayout(topology)).toEqual(
      createArchitectureLayout(topology),
    )
    expect(createArchitectureLayout(topology).mode).toBe('layered')
  })

  it('falls back to a stable radial layout for cycles', () => {
    const cyclic: ProjectArchitecture = {
      nodes: [
        { id: 'a', label: 'A', kind: 'module' },
        { id: 'b', label: 'B', kind: 'module' },
        { id: 'c', label: 'C', kind: 'module' },
      ],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c' },
        { from: 'c', to: 'a' },
      ],
    }
    const first = createArchitectureLayout(cyclic)
    expect(first.mode).toBe('radial')
    expect(first).toEqual(createArchitectureLayout(cyclic))
  })
})
