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

export type SandboxCommand =
  | { type: 'start'; nodeId: string }
  | { type: 'hop'; nodeId: string }
  | { type: 'back' }
  | { type: 'fail' }
  | { type: 'recover' }
  | { type: 'trace' }
  | { type: 'reset' }

export type SandboxStatus = 'idle' | 'running' | 'completed' | 'failed'

export type SandboxFeedbackCode =
  | 'reset'
  | 'started'
  | 'hopped'
  | 'back'
  | 'failed'
  | 'recovered'
  | 'trace'
  | 'completed'
  | 'invalid-node'
  | 'invalid-hop'
  | 'not-started'
  | 'no-history'
  | 'blocked-by-failure'
  | 'nothing-to-recover'

export interface ArchitectureSandboxState {
  projectSlug: ProjectSlug
  status: SandboxStatus
  path: string[]
  edgePath: string[]
  currentNodeId?: string
  failedNodeId?: string
  validNextNodeIds: string[]
  revision: number
}

export interface SandboxFeedback {
  code: SandboxFeedbackCode
  nodeId?: string
  fromNodeId?: string
  toNodeId?: string
  path: string[]
  validNextNodeIds: string[]
}

export interface SandboxOutcome {
  state: ArchitectureSandboxState
  feedback: SandboxFeedback
}

export type SceneIntent =
  | { type: 'open-app'; appId: AppId }
  | { type: 'open-project'; projectSlug: ProjectSlug }
  | { type: 'set-scene-mode'; mode: SceneMode }
  | { type: 'sandbox-command'; command: SandboxCommand }

export type ArchitectureNodeVisualState =
  | 'idle'
  | 'visited'
  | 'current'
  | 'available'
  | 'failed'

export type ArchitectureEdgeVisualState =
  | 'idle'
  | 'visited'
  | 'current'
  | 'available'
  | 'failed'

export interface ArchitectureVisualNode {
  id: string
  label: string
  kind: ProjectArchitectureNode['kind']
  x: number
  y: number
  state: ArchitectureNodeVisualState
  start: boolean
}

export interface ArchitectureVisualEdge {
  id: string
  from: string
  to: string
  label?: string
  state: ArchitectureEdgeVisualState
}

export interface ArchitectureVisualSignal {
  projectSlug: ProjectSlug
  accent: string
  status: SandboxStatus
  layout: 'layered' | 'radial'
  nodes: ArchitectureVisualNode[]
  edges: ArchitectureVisualEdge[]
}

export interface VisualSceneState {
  activeApp?: AppId
  activeProject?: ProjectSlug
  mode: SceneMode
  quality: VisualQuality
  reducedMotion: boolean
  architecture?: ArchitectureVisualSignal
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

export interface ProjectArchitecture {
  nodes: ProjectArchitectureNode[]
  edges: ProjectArchitectureEdge[]
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
  architecture: ProjectArchitecture
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
