'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Bug,
  CheckCircle2,
  CircleDot,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  Network,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import {
  architectureEdgeId,
  getArchitectureEdgeInsight,
  getArchitectureKnowledge,
} from '@/content/architecture'
import type { getPortfolioContent } from '@/content/portfolio'
import { createArchitectureLayout } from '@/lib/architecture-layout'
import {
  createArchitectureVisualSignal,
  formatSandboxOutcome,
} from '@/lib/architecture-sandbox'
import type {
  AppId,
  ArchitectureSandboxState,
  Locale,
  ProjectSlug,
  SandboxCommand,
  SandboxOutcome,
  SceneIntent,
} from '@/types/portfolio'

import { GitHubPulse } from './github-pulse'
import { SoundscapeApp } from './soundscape-app'
import { TerminalApp } from './terminal-app'

type Content = ReturnType<typeof getPortfolioContent>

interface AppContentProps {
  appId: AppId
  content: Content
  locale: Locale
  activeProject: ProjectSlug
  sandbox: ArchitectureSandboxState
  onOpenProject: (slug: ProjectSlug) => void
  onSandboxCommand: (command: SandboxCommand) => SandboxOutcome
  onSceneIntent: (intent: SceneIntent) => string[]
}

function ProfileApp({ content }: Pick<AppContentProps, 'content'>) {
  return (
    <div className="app-scroll profile-app">
      <header className="app-hero">
        <span className="section-kicker">
          <BriefcaseBusiness aria-hidden="true" />
          {content.copy.profileTitle}
        </span>
        <h2>{content.copy.profileLead}</h2>
      </header>
      <ol className="career-timeline">
        {content.experiences.map((experience) => (
          <li key={`${experience.company}-${experience.period}`}>
            <span className="timeline-marker" aria-hidden="true" />
            <div className="timeline-heading">
              <div>
                <strong>{experience.role}</strong>
                <span>{experience.company}</span>
              </div>
              <time>{experience.period}</time>
            </div>
            <p>{experience.summary}</p>
            {experience.highlights.length > 0 && (
              <ul>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      <div className="education-card">
        <span>{content.copy.education}</span>
        <strong>{content.copy.educationValue}</strong>
      </div>
      <a className="secondary-action" href="/files/resume.pdf" target="_blank">
        <Download aria-hidden="true" />
        {content.copy.resume}
      </a>
    </div>
  )
}

function ProjectsApp({
  content,
  locale,
  activeProject,
  onOpenProject,
}: Pick<
  AppContentProps,
  'content' | 'locale' | 'activeProject' | 'onOpenProject'
>) {
  return (
    <div className="app-scroll projects-app">
      <header className="app-hero">
        <span className="section-kicker">CASE_FILES / 04</span>
        <h2>{content.copy.projectsTitle}</h2>
        <p>{content.copy.projectsLead}</p>
      </header>
      <div className="project-grid">
        {content.projects.map((project, index) => (
          <article
            className={`project-card ${
              activeProject === project.slug ? 'is-active' : ''
            }`}
            key={project.slug}
            style={
              { '--project-accent': project.accent } as React.CSSProperties
            }
          >
            <div className="project-card__number">0{index + 1}</div>
            <span>{project.eyebrow}</span>
            <h3>{project.title}</h3>
            <p>{project.tagline}</p>
            <div className="project-card__stack">
              {project.stack.slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="project-card__actions">
              <button type="button" onClick={() => onOpenProject(project.slug)}>
                <Network aria-hidden="true" />
                {content.copy.architectureLab}
              </button>
              <Link href={`/${locale}/projects/${project.slug}`}>
                {content.copy.openProject}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <GitHubPulse />
    </div>
  )
}

function ArchitectureApp({
  content,
  locale,
  activeProject,
  sandbox,
  onOpenProject,
  onSandboxCommand,
}: Pick<
  AppContentProps,
  | 'content'
  | 'locale'
  | 'activeProject'
  | 'sandbox'
  | 'onOpenProject'
  | 'onSandboxCommand'
>) {
  const project =
    content.projects.find((item) => item.slug === activeProject) ??
    content.projects[0]
  const topology = project.architecture
  const knowledge = getArchitectureKnowledge(locale, project.slug)
  const layout = useMemo(() => createArchitectureLayout(topology), [topology])
  const visualSignal = useMemo(
    () => createArchitectureVisualSignal(sandbox, project.accent, topology),
    [project.accent, sandbox, topology],
  )
  const [feedback, setFeedback] = useState('')
  const [inspector, setInspector] = useState<
    { type: 'node'; id: string } | { type: 'edge'; index: number }
  >({ type: 'node', id: topology.nodes[0].id })

  useEffect(() => {
    setInspector({ type: 'node', id: topology.nodes[0].id })
    setFeedback('')
  }, [project.slug, topology.nodes])

  const copy =
    locale === 'pt'
      ? {
          idle: 'Escolha qualquer nó para iniciar o pacote.',
          running: 'Pacote em trânsito',
          completed: 'Percurso concluído',
          failed: 'Falha ativa',
          inspector: 'Inspetor',
          responsibility: 'Responsabilidade',
          contract: 'Contrato',
          failureImpact: 'Impacto da falha',
          mitigation: 'Mitigação',
          history: 'Histórico do pacote',
          connections: 'Conexões',
          noHistory: 'Nenhum hop executado.',
          startHere: 'Iniciar aqui',
          back: 'Voltar',
          injectFailure: 'Injetar falha',
          recover: 'Recuperar',
          reset: 'Reiniciar',
          start: 'início',
          node: 'Nó',
          edge: 'Conexão',
        }
      : {
          idle: 'Choose any node to start the packet.',
          running: 'Packet in transit',
          completed: 'Route completed',
          failed: 'Active failure',
          inspector: 'Inspector',
          responsibility: 'Responsibility',
          contract: 'Contract',
          failureImpact: 'Failure impact',
          mitigation: 'Mitigation',
          history: 'Packet history',
          connections: 'Connections',
          noHistory: 'No hops executed.',
          startHere: 'Start here',
          back: 'Back',
          injectFailure: 'Inject failure',
          recover: 'Recover',
          reset: 'Reset',
          start: 'start',
          node: 'Node',
          edge: 'Connection',
        }

  const statusText = {
    idle: copy.idle,
    running: copy.running,
    completed: copy.completed,
    failed: copy.failed,
  }[sandbox.status]

  const run = (command: SandboxCommand) => {
    const result = onSandboxCommand(command)
    setFeedback(formatSandboxOutcome(result, locale, topology))
    return result
  }

  const inspectNode = (nodeId: string) => {
    setInspector({ type: 'node', id: nodeId })
    if (sandbox.status === 'idle') {
      run({ type: 'start', nodeId })
    } else if (sandbox.currentNodeId !== nodeId) {
      run({ type: 'hop', nodeId })
    }
  }

  const inspectedNode =
    inspector.type === 'node'
      ? topology.nodes.find((node) => node.id === inspector.id)
      : undefined
  const inspectedEdgeIndex =
    inspector.type === 'edge' ? inspector.index : undefined
  const inspectedEdge =
    inspectedEdgeIndex === undefined
      ? undefined
      : topology.edges[inspectedEdgeIndex]
  const inspectedInsight = inspectedNode
    ? knowledge.nodes[inspectedNode.id]
    : inspectedEdge
      ? getArchitectureEdgeInsight(
          locale,
          project.slug,
          inspectedEdge,
          inspectedEdgeIndex ?? 0,
        )
      : knowledge.nodes[topology.nodes[0].id]
  const inspectorTitle =
    inspectedNode?.label ??
    (inspectedEdge
      ? `${inspectedEdge.from} → ${inspectedEdge.to}`
      : topology.nodes[0].label)

  return (
    <div className="app-scroll architecture-app">
      <header className="app-hero architecture-header">
        <div>
          <span className="section-kicker">
            <Network aria-hidden="true" />
            {content.copy.architectureTitle}
          </span>
          <h2>{project.title}</h2>
          <p>{content.copy.architectureLead}</p>
        </div>
        <label>
          <span className="sr-only">Project</span>
          <select
            value={project.slug}
            onChange={(event) => {
              onOpenProject(event.target.value as ProjectSlug)
            }}
          >
            {content.projects.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      </header>
      <section className="architecture-sandbox" data-status={sandbox.status}>
        <div className="architecture-sandbox__status">
          <span>
            <i aria-hidden="true" />
            {statusText}
          </span>
          <code>
            {sandbox.currentNodeId
              ? `packet@${sandbox.currentNodeId}`
              : 'packet@idle'}
          </code>
        </div>
        <div className="architecture-board">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id={`arrow-${project.slug}`}
                markerHeight="4"
                markerWidth="4"
                orient="auto"
                refX="4"
                refY="2"
              >
                <path d="M0,0 L4,2 L0,4 Z" />
              </marker>
            </defs>
            {visualSignal.edges.map((edge) => {
              const from = layout.positions[edge.from]
              const to = layout.positions[edge.to]
              return (
                <line
                  className={`architecture-edge is-${edge.state}`}
                  data-edge-id={edge.id}
                  key={edge.id}
                  markerEnd={`url(#arrow-${project.slug})`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                />
              )
            })}
          </svg>
          {visualSignal.nodes.map((node) => (
            <button
              aria-label={`${copy.node}: ${node.label}, ${node.state}${
                node.start ? `, ${copy.start}` : ''
              }`}
              aria-pressed={sandbox.currentNodeId === node.id}
              className={`architecture-node architecture-node--${node.kind} is-${node.state} ${
                node.start ? 'is-start' : ''
              }`}
              key={node.id}
              onClick={() => inspectNode(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              type="button"
            >
              <CircleDot aria-hidden="true" />
              <span>{node.label}</span>
              <small>{node.kind}</small>
            </button>
          ))}
        </div>
        <div className="architecture-sandbox__controls">
          <button
            disabled={!inspectedNode || sandbox.status === 'failed'}
            onClick={() =>
              inspectedNode && run({ type: 'start', nodeId: inspectedNode.id })
            }
            type="button"
          >
            <Play aria-hidden="true" />
            {copy.startHere}
          </button>
          <button
            disabled={sandbox.path.length <= 1 || sandbox.status === 'failed'}
            onClick={() => run({ type: 'back' })}
            type="button"
          >
            <ArrowLeft aria-hidden="true" />
            {copy.back}
          </button>
          <button
            disabled={!sandbox.currentNodeId || sandbox.status === 'failed'}
            onClick={() => run({ type: 'fail' })}
            type="button"
          >
            <Bug aria-hidden="true" />
            {copy.injectFailure}
          </button>
          <button
            disabled={sandbox.status !== 'failed'}
            onClick={() => run({ type: 'recover' })}
            type="button"
          >
            <ShieldCheck aria-hidden="true" />
            {copy.recover}
          </button>
          <button onClick={() => run({ type: 'reset' })} type="button">
            <RotateCcw aria-hidden="true" />
            {copy.reset}
          </button>
        </div>
        <p className="architecture-feedback" aria-live="polite">
          {feedback || statusText}
        </p>
      </section>
      <div className="architecture-workbench">
        <aside className="architecture-inspector">
          <span className="section-kicker">{copy.inspector}</span>
          <div className="architecture-inspector__title">
            <span>{inspectedNode ? copy.node : copy.edge}</span>
            <h3>{inspectorTitle}</h3>
          </div>
          <dl>
            <div>
              <dt>{copy.responsibility}</dt>
              <dd>{inspectedInsight.responsibility}</dd>
            </div>
            <div>
              <dt>{copy.contract}</dt>
              <dd>{inspectedInsight.contract}</dd>
            </div>
            <div>
              <dt>{copy.failureImpact}</dt>
              <dd>{inspectedInsight.failureImpact}</dd>
            </div>
            <div>
              <dt>{copy.mitigation}</dt>
              <dd>{inspectedInsight.mitigation}</dd>
            </div>
          </dl>
        </aside>
        <div className="architecture-trace">
          <section>
            <span className="section-kicker">{copy.history}</span>
            {sandbox.path.length > 0 ? (
              <ol>
                {sandbox.path.map((nodeId, index) => {
                  const node = topology.nodes.find((item) => item.id === nodeId)
                  return (
                    <li key={`${nodeId}-${index}`}>
                      <button
                        onClick={() =>
                          setInspector({ type: 'node', id: nodeId })
                        }
                        type="button"
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {node?.label ?? nodeId}
                      </button>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p>{copy.noHistory}</p>
            )}
          </section>
          <section>
            <span className="section-kicker">{copy.connections}</span>
            <div className="architecture-connections">
              {topology.edges.map((edge, index) => {
                const id = architectureEdgeId(edge, index)
                const state =
                  visualSignal.edges.find((item) => item.id === id)?.state ??
                  'idle'
                return (
                  <button
                    className={`is-${state}`}
                    key={id}
                    onClick={() => setInspector({ type: 'edge', index })}
                    type="button"
                  >
                    {edge.from} → {edge.to}
                    {edge.label ? <small>{edge.label}</small> : null}
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </div>
      <section className="case-overview">
        <div>
          <span>{project.eyebrow}</span>
          <strong>{project.role}</strong>
        </div>
        <p>{project.outcome}</p>
      </section>
      <div className="case-detail-grid">
        <article>
          <span className="case-detail__index">01</span>
          <h3>{content.copy.problem}</h3>
          <p>{project.problem}</p>
        </article>
        <article>
          <span className="case-detail__index">02</span>
          <h3>{content.copy.decisions}</h3>
          <ul>
            {project.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </article>
        <article>
          <span className="case-detail__index">03</span>
          <h3>{content.copy.quality}</h3>
          <ul>
            {project.quality.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span className="case-detail__index">04</span>
          <h3>{content.copy.limits}</h3>
          <ul>
            {project.limits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
      <div className="case-actions">
        <a href={project.repository} target="_blank" rel="noreferrer">
          <Code2 aria-hidden="true" />
          {content.copy.repository}
          <ExternalLink aria-hidden="true" />
        </a>
        <Link href={`/${locale}/projects/${project.slug}`}>
          <ArrowUpRight aria-hidden="true" />
          {content.copy.openProject}
        </Link>
      </div>
    </div>
  )
}

function SkillsApp({ content }: Pick<AppContentProps, 'content'>) {
  return (
    <div className="app-scroll skills-app">
      <header className="app-hero">
        <span className="section-kicker">CAPABILITY_MAP</span>
        <h2>{content.copy.skillsTitle}</h2>
        <p>{content.copy.skillsLead}</p>
      </header>
      <div className="skill-groups">
        {content.skillGroups.map((group, index) => (
          <section key={group.label}>
            <div className="skill-group__index">0{index + 1}</div>
            <div>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
              <div className="chip-list">
                {group.items.map((item) => (
                  <span key={item}>
                    <CheckCircle2 aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function ContactApp({
  content,
  locale,
}: Pick<AppContentProps, 'content' | 'locale'>) {
  const [copied, setCopied] = useState(false)
  const email = 'leonardoschunckrainha@gmail.com'

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="contact-app">
      <span className="section-kicker">OPEN_CHANNEL</span>
      <h2>{content.copy.contactTitle}</h2>
      <p>{content.copy.contactLead}</p>
      <div className="contact-links">
        <a href={`mailto:${email}`}>
          <Mail aria-hidden="true" />
          <span>Email</span>
          <ExternalLink aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/leonardoschunck"
          target="_blank"
          rel="noreferrer"
        >
          <Building2 aria-hidden="true" />
          <span>LinkedIn</span>
          <ExternalLink aria-hidden="true" />
        </a>
        <a
          href="https://github.com/SchunckLeonardo"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 aria-hidden="true" />
          <span>GitHub</span>
          <ExternalLink aria-hidden="true" />
        </a>
        <a
          href="https://medium.com/@leonardoschunck"
          target="_blank"
          rel="noreferrer"
        >
          <span className="medium-mark">M</span>
          <span>Medium</span>
          <ExternalLink aria-hidden="true" />
        </a>
      </div>
      <button className="secondary-action" type="button" onClick={copyEmail}>
        <Copy aria-hidden="true" />
        {copied ? content.copy.emailCopied : content.copy.copyEmail}
      </button>
      <small>
        {locale === 'pt'
          ? 'Sem formulário e sem intermediários.'
          : 'No form and no middle layer.'}
      </small>
    </div>
  )
}

export function AppContent(props: AppContentProps) {
  switch (props.appId) {
    case 'profile':
      return <ProfileApp content={props.content} />
    case 'projects':
      return <ProjectsApp {...props} />
    case 'architecture':
      return <ArchitectureApp {...props} />
    case 'terminal':
      return <TerminalApp {...props} />
    case 'skills':
      return <SkillsApp content={props.content} />
    case 'soundscape':
      return <SoundscapeApp locale={props.locale} />
    case 'contact':
      return <ContactApp content={props.content} locale={props.locale} />
  }
}
