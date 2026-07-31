import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, it, vi } from 'vitest'

import { architectureCatalog } from '@/content/architecture'
import {
  createArchitectureSandboxState,
  createArchitectureVisualSignal,
  dispatchSandbox,
} from '@/lib/architecture-sandbox'

import { StaticSceneAdapter } from './static-scene-adapter'

describe('StaticSceneAdapter', () => {
  it('keeps the architecture sandbox usable without WebGL', () => {
    const state = createArchitectureSandboxState('yomora')
    const signal = createArchitectureVisualSignal(
      state,
      '#8b5cf6',
      architectureCatalog.yomora,
    )
    const onSandboxCommand = vi.fn((command) =>
      dispatchSandbox(command, state, architectureCatalog.yomora),
    )

    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    act(() =>
      root.render(
        <StaticSceneAdapter
          state={{
            activeProject: 'yomora',
            mode: 'architecture',
            quality: 'low',
            reducedMotion: true,
            architecture: signal,
          }}
          onProjectSelect={vi.fn()}
          onSandboxCommand={onSandboxCommand}
        />,
      ),
    )

    const button = Array.from(container.querySelectorAll('button')).find(
      (candidate) => candidate.textContent?.includes('iOS · SwiftUI'),
    )
    expect(button).toBeDefined()
    act(() => button?.click())
    expect(onSandboxCommand).toHaveBeenCalledWith({
      type: 'start',
      nodeId: 'ios',
    })
    act(() => root.unmount())
    container.remove()
  })
})
