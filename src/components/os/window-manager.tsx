'use client'

import { Minus, Square, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'

import type { getPortfolioContent } from '@/content/portfolio'
import { useWindowStore } from '@/lib/window-store'
import type { AppId, Locale, ProjectSlug, SceneIntent } from '@/types/portfolio'

import { AppContent } from '../apps/app-content'

type Content = ReturnType<typeof getPortfolioContent>

interface WindowManagerProps {
  content: Content
  locale: Locale
  onOpenProject: (slug: ProjectSlug) => void
  onSceneIntent: (intent: SceneIntent) => string[]
}

function useMobileWindow() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 899px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return mobile
}

export function WindowManager({
  content,
  locale,
  onOpenProject,
  onSceneIntent,
}: WindowManagerProps) {
  const windows = useWindowStore((state) => state.windows)
  const activeProject = useWindowStore((state) => state.activeProject)
  const sandbox = useWindowStore((state) => state.sandbox)
  const dispatchSandbox = useWindowStore((state) => state.dispatchSandbox)
  const closeApp = useWindowStore((state) => state.closeApp)
  const minimizeApp = useWindowStore((state) => state.minimizeApp)
  const focusApp = useWindowStore((state) => state.focusApp)
  const toggleMaximize = useWindowStore((state) => state.toggleMaximize)
  const updateRect = useWindowStore((state) => state.updateRect)
  const mobile = useMobileWindow()

  return (
    <div className="window-layer" aria-live="polite">
      {(Object.keys(windows) as AppId[]).map((appId) => {
        const windowState = windows[appId]
        if (!windowState.open || windowState.minimized) return null
        const definition = content.apps.find((app) => app.id === appId)

        return (
          <Rnd
            bounds="parent"
            className={`os-window ${
              windowState.maximized ? 'os-window--maximized' : ''
            }`}
            disableDragging={mobile || windowState.maximized}
            enableResizing={!mobile && !windowState.maximized}
            key={appId}
            minWidth={mobile ? 0 : 420}
            minHeight={320}
            onDragStart={() => focusApp(appId)}
            onDragStop={(_, data) =>
              updateRect(appId, {
                ...windowState.rect,
                x: data.x,
                y: data.y,
              })
            }
            onResizeStart={() => focusApp(appId)}
            onResizeStop={(_, __, ref, ___, position) =>
              updateRect(appId, {
                x: position.x,
                y: position.y,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
              })
            }
            onMouseDown={() => focusApp(appId)}
            position={
              mobile || windowState.maximized
                ? { x: 0, y: 0 }
                : { x: windowState.rect.x, y: windowState.rect.y }
            }
            size={
              mobile || windowState.maximized
                ? { width: '100%', height: '100%' }
                : {
                    width: windowState.rect.width,
                    height: windowState.rect.height,
                  }
            }
            style={{ zIndex: windowState.zIndex }}
          >
            <section
              className="os-window__surface"
              aria-label={definition?.label ?? appId}
            >
              <header
                className="os-window__titlebar"
                onDoubleClick={() => toggleMaximize(appId)}
              >
                <div>
                  <span className="window-signal" aria-hidden="true" />
                  <strong>{definition?.label ?? appId}</strong>
                  <small>{definition?.description}</small>
                </div>
                <div className="window-actions">
                  <button
                    aria-label={content.copy.minimize}
                    onClick={() => minimizeApp(appId)}
                    type="button"
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <button
                    aria-label={
                      windowState.maximized
                        ? content.copy.restore
                        : content.copy.maximize
                    }
                    onClick={() => toggleMaximize(appId)}
                    type="button"
                  >
                    <Square aria-hidden="true" />
                  </button>
                  <button
                    aria-label={content.copy.close}
                    onClick={() => closeApp(appId)}
                    type="button"
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
              </header>
              <div className="os-window__content">
                <AppContent
                  appId={appId}
                  content={content}
                  locale={locale}
                  activeProject={activeProject}
                  sandbox={sandbox}
                  onOpenProject={onOpenProject}
                  onSandboxCommand={dispatchSandbox}
                  onSceneIntent={onSceneIntent}
                />
              </div>
            </section>
          </Rnd>
        )
      })}
    </div>
  )
}
