import { describe, expect, it } from 'vitest'

import { executeTerminalCommand } from './terminal'

describe('executeTerminalCommand', () => {
  it('lists localized commands', () => {
    expect(executeTerminalCommand('help', 'pt').lines[0]).toBe('COMANDOS')
    expect(executeTerminalCommand('help', 'en').lines[0]).toBe('COMMANDS')
  })

  it('normalizes aliases into a project scene intent', () => {
    expect(executeTerminalCommand('visualize hermes', 'pt').intent).toEqual({
      type: 'open-project',
      projectSlug: 'hermes-news',
    })
  })

  it('opens known apps and rejects unknown apps', () => {
    expect(executeTerminalCommand('open architecture', 'en').intent).toEqual({
      type: 'open-app',
      appId: 'architecture',
    })
    expect(
      executeTerminalCommand('open calculator', 'en').intent,
    ).toBeUndefined()
  })

  it('keeps the easter egg deterministic', () => {
    expect(
      executeTerminalCommand('sudo hire leonardo', 'pt').lines[0],
    ).toContain('Permissão concedida')
  })
})
