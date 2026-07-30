'use client'

import type { ProjectSlug, VisualSceneState } from '@/types/portfolio'

interface StaticSceneAdapterProps {
  state: VisualSceneState
  onProjectSelect: (slug: ProjectSlug) => void
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
}: StaticSceneAdapterProps) {
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
