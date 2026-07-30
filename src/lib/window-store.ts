'use client'

import { create } from 'zustand'

import type {
  AppId,
  ProjectSlug,
  SceneMode,
  WindowRect,
  WindowState,
} from '@/types/portfolio'

const defaultRects: Record<AppId, WindowRect> = {
  profile: { x: 104, y: 76, width: 720, height: 600 },
  projects: { x: 180, y: 90, width: 900, height: 640 },
  architecture: { x: 236, y: 112, width: 940, height: 650 },
  terminal: { x: 116, y: 132, width: 720, height: 480 },
  skills: { x: 266, y: 78, width: 760, height: 590 },
  soundscape: { x: 326, y: 154, width: 560, height: 420 },
  contact: { x: 350, y: 116, width: 580, height: 470 },
}

function makeWindows(): Record<AppId, WindowState> {
  return Object.fromEntries(
    Object.entries(defaultRects).map(([appId, rect]) => [
      appId,
      {
        appId,
        open: false,
        minimized: false,
        maximized: false,
        zIndex: 1,
        rect: { ...rect },
      },
    ]),
  ) as Record<AppId, WindowState>
}

interface WindowStore {
  windows: Record<AppId, WindowState>
  topZ: number
  activeProject: ProjectSlug
  sceneMode: SceneMode
  openApp: (appId: AppId) => void
  closeApp: (appId: AppId) => void
  minimizeApp: (appId: AppId) => void
  focusApp: (appId: AppId) => void
  toggleMaximize: (appId: AppId) => void
  updateRect: (appId: AppId, rect: WindowRect) => void
  selectProject: (slug: ProjectSlug) => void
  setSceneMode: (mode: SceneMode) => void
  resetDesktop: () => void
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: makeWindows(),
  topZ: 1,
  activeProject: 'yomora',
  sceneMode: 'ambient',

  openApp: (appId) =>
    set((state) => {
      const topZ = state.topZ + 1
      return {
        topZ,
        windows: {
          ...state.windows,
          [appId]: {
            ...state.windows[appId],
            open: true,
            minimized: false,
            zIndex: topZ,
          },
        },
      }
    }),

  closeApp: (appId) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: {
          ...state.windows[appId],
          open: false,
          minimized: false,
          maximized: false,
        },
      },
    })),

  minimizeApp: (appId) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: { ...state.windows[appId], minimized: true },
      },
    })),

  focusApp: (appId) =>
    set((state) => {
      const topZ = state.topZ + 1
      return {
        topZ,
        windows: {
          ...state.windows,
          [appId]: {
            ...state.windows[appId],
            minimized: false,
            zIndex: topZ,
          },
        },
      }
    }),

  toggleMaximize: (appId) =>
    set((state) => {
      const window = state.windows[appId]
      const topZ = state.topZ + 1
      return {
        topZ,
        windows: {
          ...state.windows,
          [appId]: {
            ...window,
            maximized: !window.maximized,
            previousRect: window.maximized ? undefined : window.rect,
            zIndex: topZ,
          },
        },
      }
    }),

  updateRect: (appId, rect) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: { ...state.windows[appId], rect },
      },
    })),

  selectProject: (activeProject) =>
    set({ activeProject, sceneMode: 'architecture' }),
  setSceneMode: (sceneMode) => set({ sceneMode }),
  resetDesktop: () =>
    set({
      windows: makeWindows(),
      topZ: 1,
      activeProject: 'yomora',
      sceneMode: 'ambient',
    }),
}))

export { defaultRects }
