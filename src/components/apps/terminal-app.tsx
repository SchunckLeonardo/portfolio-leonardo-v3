'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

import { executeTerminalCommand } from '@/lib/terminal'
import type { AppId, Locale, ProjectSlug, SceneIntent } from '@/types/portfolio'

interface TerminalAppProps {
  locale: Locale
  onOpenApp: (appId: AppId) => void
  onOpenProject: (slug: ProjectSlug) => void
}

interface TerminalLine {
  type: 'input' | 'output'
  value: string
}

export function TerminalApp({
  locale,
  onOpenApp,
  onOpenProject,
}: TerminalAppProps) {
  const [command, setCommand] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      value:
        locale === 'pt'
          ? 'LeoCode Shell v1.0 — digite help para começar.'
          : 'LeoCode Shell v1.0 — type help to begin.',
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const dispatchIntent = (intent?: SceneIntent) => {
    if (intent?.type === 'open-app' && intent.appId) onOpenApp(intent.appId)
    if (intent?.type === 'open-project' && intent.projectSlug) {
      onOpenProject(intent.projectSlug)
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const result = executeTerminalCommand(command, locale)
    const nextLines: TerminalLine[] = [
      { type: 'input', value: command },
      ...result.lines.map((value): TerminalLine => ({ type: 'output', value })),
    ]
    setLines(result.clear ? [] : (current) => [...current, ...nextLines])
    dispatchIntent(result.intent)
    setCommand('')
  }

  return (
    <div className="terminal-app">
      <div className="terminal-app__output" role="log" aria-live="polite">
        {lines.map((line, index) => (
          <div
            className={`terminal-line terminal-line--${line.type}`}
            key={`${line.type}-${index}`}
          >
            {line.type === 'input' && (
              <span aria-hidden="true">leo@os:~$ </span>
            )}
            {line.value}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="terminal-app__form" onSubmit={submit}>
        <label className="sr-only" htmlFor="terminal-command">
          {locale === 'pt' ? 'Comando' : 'Command'}
        </label>
        <span aria-hidden="true">leo@os:~$</span>
        <input
          id="terminal-command"
          autoComplete="off"
          spellCheck={false}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
        />
      </form>
    </div>
  )
}
