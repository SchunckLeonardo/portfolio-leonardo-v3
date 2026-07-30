'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDot,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  Network,
} from 'lucide-react'
import { useState } from 'react'

import type { getPortfolioContent } from '@/content/portfolio'
import type { AppId, Locale, ProjectSlug } from '@/types/portfolio'

import { GitHubPulse } from './github-pulse'
import { SoundscapeApp } from './soundscape-app'
import { TerminalApp } from './terminal-app'

type Content = ReturnType<typeof getPortfolioContent>

interface AppContentProps {
  appId: AppId
  content: Content
  locale: Locale
  activeProject: ProjectSlug
  onOpenApp: (appId: AppId) => void
  onOpenProject: (slug: ProjectSlug) => void
  onSceneMode: (mode: 'ambient' | 'architecture') => void
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

const graphPositions = [
  { x: 7, y: 12 },
  { x: 39, y: 8 },
  { x: 68, y: 13 },
  { x: 16, y: 52 },
  { x: 48, y: 48 },
  { x: 76, y: 57 },
  { x: 35, y: 79 },
  { x: 68, y: 82 },
]

function ArchitectureApp({
  content,
  locale,
  activeProject,
  onOpenProject,
  onSceneMode,
}: Pick<
  AppContentProps,
  'content' | 'locale' | 'activeProject' | 'onOpenProject' | 'onSceneMode'
>) {
  const project =
    content.projects.find((item) => item.slug === activeProject) ??
    content.projects[0]

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
              onSceneMode('architecture')
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
      <div className="architecture-board">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {project.architecture.edges.map((edge, index) => {
            const fromIndex = project.architecture.nodes.findIndex(
              (node) => node.id === edge.from,
            )
            const toIndex = project.architecture.nodes.findIndex(
              (node) => node.id === edge.to,
            )
            const from = graphPositions[fromIndex] ?? graphPositions[0]
            const to = graphPositions[toIndex] ?? graphPositions[1]
            return (
              <line
                key={`${edge.from}-${edge.to}-${index}`}
                x1={from.x + 8}
                y1={from.y + 6}
                x2={to.x + 8}
                y2={to.y + 6}
              />
            )
          })}
        </svg>
        {project.architecture.nodes.map((node, index) => {
          const position = graphPositions[index]
          return (
            <div
              className={`architecture-node architecture-node--${node.kind}`}
              key={node.id}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
            >
              <CircleDot aria-hidden="true" />
              <span>{node.label}</span>
              <small>{node.kind}</small>
            </div>
          )
        })}
      </div>
      <div className="architecture-legend" aria-label="Architecture flows">
        {project.architecture.edges.map((edge, index) => (
          <span key={`${edge.from}-${edge.to}-${index}`}>
            {edge.from} → {edge.to}
            {edge.label ? ` · ${edge.label}` : ''}
          </span>
        ))}
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
