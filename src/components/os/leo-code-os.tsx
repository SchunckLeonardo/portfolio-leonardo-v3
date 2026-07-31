'use client'

import {
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  Command,
  Contact,
  Download,
  ExternalLink,
  Languages,
  Menu,
  Monitor,
  Network,
  Search,
  TerminalSquare,
  Volume2,
  X,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { architectureCatalog } from '@/content/architecture'
import { getPortfolioContent } from '@/content/portfolio'
import {
  createArchitectureVisualSignal,
  formatSandboxOutcome,
} from '@/lib/architecture-sandbox'
import { useWindowStore } from '@/lib/window-store'
import type {
  AppId,
  Locale,
  ProjectSlug,
  SceneIntent,
  VisualQuality,
} from '@/types/portfolio'

import { VisualExperience } from '../visual/visual-experience'
import { WindowManager } from './window-manager'

interface LeoCodeOSProps {
  locale: Locale
  initialApp?: AppId
  initialProject?: ProjectSlug
}

const iconByApp: Record<AppId, LucideIcon> = {
  profile: CircleUserRound,
  projects: Boxes,
  architecture: Network,
  terminal: TerminalSquare,
  skills: Monitor,
  soundscape: Volume2,
  contact: Contact,
}

export function LeoCodeOS({
  locale,
  initialApp,
  initialProject,
}: LeoCodeOSProps) {
  const content = useMemo(() => getPortfolioContent(locale), [locale])
  const pathname = usePathname()
  const windows = useWindowStore((state) => state.windows)
  const activeProject = useWindowStore((state) => state.activeProject)
  const sceneMode = useWindowStore((state) => state.sceneMode)
  const sandbox = useWindowStore((state) => state.sandbox)
  const openApp = useWindowStore((state) => state.openApp)
  const focusApp = useWindowStore((state) => state.focusApp)
  const selectProject = useWindowStore((state) => state.selectProject)
  const dispatchSandbox = useWindowStore((state) => state.dispatchSandbox)
  const setSceneMode = useWindowStore((state) => state.setSceneMode)
  const [launcherOpen, setLauncherOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [booting, setBooting] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [quality, setQuality] = useState<VisualQuality>('auto')
  const [time, setTime] = useState('')

  const openProject = useCallback(
    (slug: ProjectSlug) => {
      selectProject(slug)
      openApp('architecture')
    },
    [openApp, selectProject],
  )

  const handleSceneIntent = useCallback(
    (intent: SceneIntent) => {
      if (intent.type === 'open-app') {
        openApp(intent.appId)
        return []
      }
      if (intent.type === 'open-project') {
        openProject(intent.projectSlug)
        return []
      }
      if (intent.type === 'set-scene-mode') {
        setSceneMode(intent.mode)
        return []
      }

      const result = dispatchSandbox(intent.command)
      return [
        formatSandboxOutcome(
          result,
          locale,
          architectureCatalog[result.state.projectSlug],
        ),
      ]
    },
    [dispatchSandbox, locale, openApp, openProject, setSceneMode],
  )

  useEffect(() => {
    const hydrateFrame = window.requestAnimationFrame(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)')
      const storedMotion = window.localStorage.getItem('leocode-motion')
      const storedQuality = window.localStorage.getItem(
        'leocode-quality',
      ) as VisualQuality | null
      setReducedMotion(
        storedMotion ? storedMotion === 'reduced' : media.matches,
      )
      if (storedQuality && ['auto', 'low', 'high'].includes(storedQuality)) {
        setQuality(storedQuality)
      }
      const seenBoot = window.sessionStorage.getItem('leocode-booted')
      if (seenBoot || initialApp || initialProject) setBooting(false)
    })
    const timer = window.setTimeout(() => {
      setBooting(false)
      window.sessionStorage.setItem('leocode-booted', 'true')
    }, 1750)
    return () => {
      window.cancelAnimationFrame(hydrateFrame)
      window.clearTimeout(timer)
    }
  }, [initialApp, initialProject])

  useEffect(() => {
    if (initialProject) {
      selectProject(initialProject)
      openApp(initialApp ?? 'projects')
    } else if (initialApp) {
      openApp(initialApp)
    }
  }, [initialApp, initialProject, openApp, selectProject])

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
  }, [locale])

  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
      )
    updateTime()
    const timer = window.setInterval(updateTime, 30_000)
    return () => window.clearInterval(timer)
  }, [locale])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const shortcut = event.key.toLowerCase()
      if ((event.metaKey || event.ctrlKey) && shortcut === 'k') {
        event.preventDefault()
        setLauncherOpen((open) => !open)
      }
      if (event.key === 'Escape') setLauncherOpen(false)
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        const app = content.apps.find(
          (definition) => definition.shortcut.toLowerCase() === shortcut,
        )
        if (
          app &&
          !(event.target instanceof HTMLInputElement) &&
          !(event.target instanceof HTMLTextAreaElement)
        ) {
          openApp(app.id)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [content.apps, openApp])

  const toggleMotion = () => {
    const next = !reducedMotion
    setReducedMotion(next)
    window.localStorage.setItem('leocode-motion', next ? 'reduced' : 'full')
  }

  const cycleQuality = () => {
    const next: VisualQuality =
      quality === 'auto' ? 'high' : quality === 'high' ? 'low' : 'auto'
    setQuality(next)
    window.localStorage.setItem('leocode-quality', next)
  }

  const alternateLocale: Locale = locale === 'pt' ? 'en' : 'pt'
  const alternatePath = pathname.replace(/^\/(pt|en)/, `/${alternateLocale}`)
  const filteredApps = content.apps.filter((app) =>
    `${app.label} ${app.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  const filteredProjects = content.projects.filter((project) =>
    `${project.title} ${project.tagline} ${project.stack.join(' ')}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  const activeProjectContent =
    content.projects.find((project) => project.slug === activeProject) ??
    content.projects[0]
  const architectureSignal = useMemo(
    () =>
      createArchitectureVisualSignal(
        sandbox,
        activeProjectContent.accent,
        activeProjectContent.architecture,
      ),
    [activeProjectContent, sandbox],
  )

  return (
    <main className="leocode-os">
      <a className="skip-link" href="#desktop-content">
        {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
      </a>

      <div className="visual-layer">
        <VisualExperience
          state={{
            activeProject,
            mode: sceneMode,
            quality,
            reducedMotion,
            architecture: architectureSignal,
          }}
          onProjectSelect={openProject}
          onSandboxCommand={dispatchSandbox}
        />
      </div>
      <div className="visual-vignette" aria-hidden="true" />

      <header className="system-bar">
        <Link className="system-brand" href={`/${locale}`}>
          <span className="brand-glyph" aria-hidden="true">
            L/
          </span>
          <strong>LEOCODE OS</strong>
          <small>PORTFOLIO_SYSTEM v1.0</small>
        </Link>
        <div className="system-bar__status">
          <span className="system-online">
            <i />
            {content.copy.available}
          </span>
          <button type="button" onClick={toggleMotion}>
            {reducedMotion
              ? content.copy.reducedMotion
              : content.copy.fullMotion}
          </button>
          <button type="button" onClick={cycleQuality}>
            GPU · {quality.toUpperCase()}
          </button>
          <Link href={alternatePath} hrefLang={alternateLocale}>
            <Languages aria-hidden="true" />
            {content.copy.alternateLocale}
          </Link>
          <time>{time}</time>
        </div>
      </header>

      <section className="desktop-shell" id="desktop-content">
        <aside className="desktop-shortcuts" aria-label="Apps">
          {content.apps.map((app) => {
            const Icon = iconByApp[app.id]
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                type="button"
              >
                <span>
                  <Icon aria-hidden="true" />
                </span>
                {app.label}
              </button>
            )
          })}
        </aside>

        <section className="desktop-hero" aria-label="Introduction">
          <div className="hero-eyebrow">
            <span>LEONARDO.SCHUNCK</span>
            <i />
            <span>BACKEND_ENGINEER</span>
          </div>
          <h1>
            {locale === 'pt' ? (
              <>
                Sistemas robustos.
                <br />
                <span>Experiências memoráveis.</span>
              </>
            ) : (
              <>
                Robust systems.
                <br />
                <span>Memorable experiences.</span>
              </>
            )}
          </h1>
          <p>{content.copy.intro}</p>
          <div className="hero-actions">
            <button
              className="primary-action"
              onClick={() => openApp('projects')}
              type="button"
            >
              <BriefcaseBusiness aria-hidden="true" />
              {content.copy.allProjects}
              <ChevronRight aria-hidden="true" />
            </button>
            <a
              className="secondary-action"
              href="/files/resume.pdf"
              target="_blank"
            >
              <Download aria-hidden="true" />
              {content.copy.resume}
            </a>
          </div>
          <div className="hero-techline">
            <span>{content.copy.status}</span>
            <i />
            <span>{content.copy.stackLine}</span>
          </div>
        </section>

        <aside className="featured-projects">
          <div className="section-kicker">{content.copy.featuredNodes}</div>
          {content.projects.map((project, index) => (
            <button
              key={project.slug}
              onClick={() => openProject(project.slug)}
              type="button"
            >
              <span className="featured-project__index">0{index + 1}</span>
              <span>
                <strong>{project.title}</strong>
                <small>{project.eyebrow}</small>
              </span>
              <ExternalLink aria-hidden="true" />
            </button>
          ))}
        </aside>

        <WindowManager
          content={content}
          locale={locale}
          onOpenProject={openProject}
          onSceneIntent={handleSceneIntent}
        />
      </section>

      <nav className="taskbar" aria-label="LeoCode OS taskbar">
        <button
          className={`taskbar-launcher ${launcherOpen ? 'is-active' : ''}`}
          onClick={() => setLauncherOpen((open) => !open)}
          type="button"
          aria-label={locale === 'pt' ? 'Abrir launcher' : 'Open launcher'}
          aria-expanded={launcherOpen}
        >
          <Menu aria-hidden="true" />
        </button>
        <button
          className="taskbar-search"
          onClick={() => setLauncherOpen(true)}
          type="button"
        >
          <Search aria-hidden="true" />
          <span>{content.copy.search}</span>
          <kbd>⌘ K</kbd>
        </button>
        <div className="taskbar-apps">
          {content.apps.slice(0, 6).map((app) => {
            const Icon = iconByApp[app.id]
            return (
              <button
                className={windows[app.id].open ? 'is-open' : ''}
                key={app.id}
                onClick={() =>
                  windows[app.id].open ? focusApp(app.id) : openApp(app.id)
                }
                type="button"
                aria-label={app.label}
              >
                <Icon aria-hidden="true" />
              </button>
            )
          })}
        </div>
        <div className="taskbar-meta">
          <span>BR</span>
          <time>{time}</time>
        </div>
      </nav>

      {launcherOpen && (
        <section className="launcher-panel" aria-label="App launcher">
          <header>
            <div>
              <Command aria-hidden="true" />
              <strong>Command Center</strong>
            </div>
            <button
              aria-label={content.copy.close}
              onClick={() => setLauncherOpen(false)}
              type="button"
            >
              <X aria-hidden="true" />
            </button>
          </header>
          <label className="launcher-search">
            <Search aria-hidden="true" />
            <span className="sr-only">{content.copy.search}</span>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={content.copy.search}
            />
          </label>
          <div className="launcher-grid">
            {filteredApps.map((app) => {
              const Icon = iconByApp[app.id]
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    openApp(app.id)
                    setLauncherOpen(false)
                  }}
                  type="button"
                >
                  <Icon aria-hidden="true" />
                  <span>
                    <strong>{app.label}</strong>
                    <small>{app.description}</small>
                  </span>
                  <kbd>{app.shortcut}</kbd>
                </button>
              )
            })}
            {filteredProjects.map((project) => (
              <button
                key={project.slug}
                onClick={() => {
                  openProject(project.slug)
                  setLauncherOpen(false)
                }}
                type="button"
              >
                <Network aria-hidden="true" />
                <span>
                  <strong>{project.title}</strong>
                  <small>{project.eyebrow}</small>
                </span>
                <kbd>CASE</kbd>
              </button>
            ))}
            {filteredApps.length === 0 && filteredProjects.length === 0 && (
              <p>{content.copy.noResults}</p>
            )}
          </div>
        </section>
      )}

      {booting && (
        <div className="boot-screen" role="status">
          <div className="boot-mark">L/</div>
          <strong>LEOCODE OS</strong>
          <div className="boot-progress">
            <span />
          </div>
          <p>LOADING_PORTFOLIO_SYSTEM…</p>
          <button
            onClick={() => {
              setBooting(false)
              window.sessionStorage.setItem('leocode-booted', 'true')
            }}
            type="button"
          >
            {content.copy.skip}
          </button>
        </div>
      )}
    </main>
  )
}
