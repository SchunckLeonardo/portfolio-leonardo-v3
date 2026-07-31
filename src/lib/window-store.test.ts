import { beforeEach, describe, expect, it } from 'vitest'

import { useWindowStore } from './window-store'

describe('window store', () => {
  beforeEach(() => useWindowStore.getState().resetDesktop())

  it('opens, focuses and minimizes windows with monotonic stacking', () => {
    const initialZ = useWindowStore.getState().topZ
    useWindowStore.getState().openApp('projects')
    const projectsZ = useWindowStore.getState().windows.projects.zIndex
    useWindowStore.getState().openApp('terminal')
    const terminalZ = useWindowStore.getState().windows.terminal.zIndex

    expect(projectsZ).toBeGreaterThan(initialZ)
    expect(terminalZ).toBeGreaterThan(projectsZ)

    useWindowStore.getState().minimizeApp('terminal')
    expect(useWindowStore.getState().windows.terminal.minimized).toBe(true)
    useWindowStore.getState().focusApp('terminal')
    expect(useWindowStore.getState().windows.terminal.minimized).toBe(false)
  })

  it('keeps project selection serializable and switches the scene mode', () => {
    useWindowStore.getState().selectProject('solar-beat-lab')
    const state = useWindowStore.getState()

    expect(state.activeProject).toBe('solar-beat-lab')
    expect(state.sceneMode).toBe('architecture')
    expect(state.sandbox.projectSlug).toBe('solar-beat-lab')
    expect(state.sandbox.status).toBe('idle')
    expect(() =>
      JSON.stringify({
        windows: state.windows,
        project: state.activeProject,
        sandbox: state.sandbox,
      }),
    ).not.toThrow()
  })

  it('dispatches sandbox commands through the shared store state', () => {
    useWindowStore.getState().selectProject('yomora')
    useWindowStore.getState().dispatchSandbox({ type: 'start', nodeId: 'ios' })
    useWindowStore
      .getState()
      .dispatchSandbox({ type: 'hop', nodeId: 'contract' })

    expect(useWindowStore.getState().sandbox.path).toEqual(['ios', 'contract'])

    useWindowStore.getState().selectProject('hermes-news')
    expect(useWindowStore.getState().sandbox).toMatchObject({
      projectSlug: 'hermes-news',
      status: 'idle',
      path: [],
    })
  })
})
