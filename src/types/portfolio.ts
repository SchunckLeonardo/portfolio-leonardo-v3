export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

export const projectSlugs = [
  'yomora',
  'hermes-news',
  'solar-beat-lab',
  'orbitafire-vision',
] as const
export type ProjectSlug = (typeof projectSlugs)[number]

export const appIds = [
  'profile',
  'projects',
  'architecture',
  'terminal',
  'skills',
  'soundscape',
  'contact',
] as const
export type AppId = (typeof appIds)[number]

export type SceneMode = 'ambient' | 'architecture'
export type VisualQuality = 'auto' | 'low' | 'high'

export interface SceneIntent {
  type: 'open-app' | 'open-project' | 'set-scene-mode'
  appId?: AppId
  projectSlug?: ProjectSlug
  mode?: SceneMode
}

export interface VisualSceneState {
  activeApp?: AppId
  activeProject?: ProjectSlug
  mode: SceneMode
  quality: VisualQuality
  reducedMotion: boolean
}

export interface ProjectArchitectureNode {
  id: string
  label: string
  kind: 'client' | 'module' | 'database' | 'external' | 'queue' | 'cloud'
}

export interface ProjectArchitectureEdge {
  from: string
  to: string
  label?: string
}

export interface PortfolioProject {
  slug: ProjectSlug
  title: string
  tagline: string
  eyebrow: string
  role: string
  outcome: string
  problem: string
  decisions: string[]
  quality: string[]
  limits: string[]
  stack: string[]
  repository: string
  accent: string
  architecture: {
    nodes: ProjectArchitectureNode[]
    edges: ProjectArchitectureEdge[]
  }
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  summary: string
  highlights: string[]
  current?: boolean
}

export interface SkillGroup {
  label: string
  description: string
  items: string[]
}

export interface WindowRect {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowState {
  appId: AppId
  open: boolean
  minimized: boolean
  maximized: boolean
  zIndex: number
  rect: WindowRect
  previousRect?: WindowRect
}

export interface AppDefinition {
  id: AppId
  label: string
  description: string
  shortcut: string
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.includes(value as ProjectSlug)
}
