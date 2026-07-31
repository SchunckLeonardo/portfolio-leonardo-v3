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

  it('opens and resets a project lab through aliases', () => {
    expect(executeTerminalCommand('lab orbita', 'pt').intent).toEqual({
      type: 'open-project',
      projectSlug: 'orbitafire-vision',
    })
  })

  it('parses sandbox commands into discriminated intents', () => {
    expect(executeTerminalCommand('start ios', 'en').intent).toEqual({
      type: 'sandbox-command',
      command: { type: 'start', nodeId: 'ios' },
    })
    expect(executeTerminalCommand('hop contract', 'en').intent).toEqual({
      type: 'sandbox-command',
      command: { type: 'hop', nodeId: 'contract' },
    })
    for (const command of ['back', 'fail', 'recover', 'trace', 'reset']) {
      expect(executeTerminalCommand(command, 'en').intent).toEqual({
        type: 'sandbox-command',
        command: { type: command },
      })
    }
  })

  it('requires a node for start and hop', () => {
    expect(executeTerminalCommand('start', 'pt').intent).toBeUndefined()
    expect(executeTerminalCommand('hop', 'en').lines[0]).toContain('node')
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
