'use client'

import type {
  ProjectSlug,
  SandboxCommand,
  SandboxOutcome,
  VisualSceneState,
} from '@/types/portfolio'

interface StaticSceneAdapterProps {
  state: VisualSceneState
  onProjectSelect: (slug: ProjectSlug) => void
  onSandboxCommand: (command: SandboxCommand) => SandboxOutcome
}

const nodes: Array<{
  slug: ProjectSlug
  label: string
  className: string
}> = [
  { slug: 'yomora', label: 'Yomora', className: 'node-yomora' },
  { slug: 'hermes-news', label: 'Hermes', className: 'node-hermes' },
  { slug: 'solar-beat-lab', label: 'Solar Beat', className: 'node-solar' },
  {
    slug: 'orbitafire-vision',
    label: 'OrbitaFire',
    className: 'node-orbita',
  },
]

export function StaticSceneAdapter({
  state,
  onProjectSelect,
  onSandboxCommand,
}: StaticSceneAdapterProps) {
  if (state.mode === 'architecture' && state.architecture) {
    const signal = state.architecture
    const positions = Object.fromEntries(
      signal.nodes.map((node) => [node.id, node]),
    )

    return (
      <div
        className="static-scene static-scene--architecture"
        data-testid="static-scene"
      >
        <div className="static-scene__grid" aria-hidden="true" />
        <svg
          className="static-architecture__edges"
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {signal.edges.map((edge) => (
            <line
              className={`is-${edge.state}`}
              key={edge.id}
              x1={positions[edge.from].x}
              y1={positions[edge.from].y}
              x2={positions[edge.to].x}
              y2={positions[edge.to].y}
            />
          ))}
        </svg>
        <div className="static-architecture__nodes">
          {signal.nodes.map((node) => (
            <button
              className={`static-architecture-node is-${node.state} ${
                node.start ? 'is-start' : ''
              }`}
              key={node.id}
              onClick={() => {
                if (signal.status === 'idle') {
                  onSandboxCommand({ type: 'start', nodeId: node.id })
                } else if (node.state !== 'current') {
                  onSandboxCommand({ type: 'hop', nodeId: node.id })
                }
              }}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              type="button"
            >
              <span className="static-node__signal" />
              {node.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`static-scene static-scene--${state.mode}`}
      data-testid="static-scene"
    >
      <div className="static-scene__grid" aria-hidden="true" />
      <div className="static-scene__core" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="static-scene__nodes">
        {nodes.map((node) => (
          <button
            key={node.slug}
            className={`static-node ${node.className} ${
              state.activeProject === node.slug ? 'is-active' : ''
            }`}
            onClick={() => onProjectSelect(node.slug)}
            type="button"
          >
            <span className="static-node__signal" />
            {node.label}
          </button>
        ))}
      </div>
    </div>
  )
}
