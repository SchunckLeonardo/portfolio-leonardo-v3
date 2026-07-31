import type { AppId, Locale, ProjectSlug, SceneIntent } from '@/types/portfolio'
import { appIds, projectSlugs } from '@/types/portfolio'

export interface TerminalResult {
  lines: string[]
  clear?: boolean
  intent?: SceneIntent
}

const aliases: Record<string, ProjectSlug> = {
  yomora: 'yomora',
  hermes: 'hermes-news',
  'hermes-news': 'hermes-news',
  solar: 'solar-beat-lab',
  'solar-beat-lab': 'solar-beat-lab',
  orbita: 'orbitafire-vision',
  orbitafire: 'orbitafire-vision',
  'orbitafire-vision': 'orbitafire-vision',
}

const messages = {
  pt: {
    help: [
      'COMANDOS',
      'about · experience · projects · skills · contact · cv',
      'open <app> · lab <projeto> · visualize <projeto>',
      'start <nó> · hop <nó> · back · fail · recover · trace · reset',
      'theme · sound · clear',
      'Dica: tente “sudo hire leonardo”.',
    ],
    about:
      'Leonardo Schunck Rainha — Backend & Software Engineer. Go, Kotlin, Java, Spring e sistemas distribuídos.',
    experience:
      'Pismo ← BTG Pactual ← Carvalho Aleixo ← Baraúna. Abra Perfil para a linha do tempo completa.',
    projects: 'yomora · hermes-news · solar-beat-lab · orbitafire-vision',
    skills:
      'Backend, dados, cloud, observabilidade, IA aplicada e arquitetura.',
    contact:
      'Email: leonardoschunckrainha@gmail.com · GitHub: @SchunckLeonardo',
    cv: 'Currículo disponível em /files/resume.pdf',
    notFound: 'Comando não encontrado. Digite help.',
    projectNotFound:
      'Projeto não encontrado. Use: yomora, hermes, solar ou orbita.',
    appNotFound:
      'App não encontrado. Use: profile, projects, architecture, terminal, skills, soundscape ou contact.',
    nodeRequired: 'Informe um nó. Exemplo: start ios ou hop contract.',
    hired:
      'Permissão concedida. Próximo passo: leonardoschunckrainha@gmail.com',
    theme:
      'Tema: LeoCode OS / neon glass. O sistema já escolheu o lado escuro.',
    sound: 'Abra Soundscape para ativar o áudio procedural.',
  },
  en: {
    help: [
      'COMMANDS',
      'about · experience · projects · skills · contact · cv',
      'open <app> · lab <project> · visualize <project>',
      'start <node> · hop <node> · back · fail · recover · trace · reset',
      'theme · sound · clear',
      'Tip: try “sudo hire leonardo”.',
    ],
    about:
      'Leonardo Schunck Rainha — Backend & Software Engineer. Go, Kotlin, Java, Spring and distributed systems.',
    experience:
      'Pismo ← BTG Pactual ← Carvalho Aleixo ← Baraúna. Open Profile for the full timeline.',
    projects: 'yomora · hermes-news · solar-beat-lab · orbitafire-vision',
    skills: 'Backend, data, cloud, observability, applied AI and architecture.',
    contact:
      'Email: leonardoschunckrainha@gmail.com · GitHub: @SchunckLeonardo',
    cv: 'Resume available at /files/resume.pdf',
    notFound: 'Command not found. Type help.',
    projectNotFound: 'Project not found. Use: yomora, hermes, solar or orbita.',
    appNotFound:
      'App not found. Use: profile, projects, architecture, terminal, skills, soundscape or contact.',
    nodeRequired: 'Provide a node. Example: start ios or hop contract.',
    hired: 'Permission granted. Next step: leonardoschunckrainha@gmail.com',
    theme:
      'Theme: LeoCode OS / neon glass. The system already chose dark mode.',
    sound: 'Open Soundscape to enable procedural audio.',
  },
} as const

export function executeTerminalCommand(
  rawCommand: string,
  locale: Locale,
): TerminalResult {
  const input = rawCommand.trim().toLowerCase()
  const [command, argument] = input.split(/\s+/)
  const copy = messages[locale]

  if (!input) return { lines: [] }
  if (input === 'sudo hire leonardo') return { lines: [copy.hired] }
  if (command === 'clear') return { lines: [], clear: true }
  if (command === 'help') return { lines: [...copy.help] }
  if (command === 'about') return { lines: [copy.about] }
  if (command === 'experience') {
    return {
      lines: [copy.experience],
      intent: { type: 'open-app', appId: 'profile' },
    }
  }
  if (command === 'projects') {
    return {
      lines: [copy.projects],
      intent: { type: 'open-app', appId: 'projects' },
    }
  }
  if (command === 'skills') {
    return {
      lines: [copy.skills],
      intent: { type: 'open-app', appId: 'skills' },
    }
  }
  if (command === 'contact') {
    return {
      lines: [copy.contact],
      intent: { type: 'open-app', appId: 'contact' },
    }
  }
  if (command === 'cv') return { lines: [copy.cv] }
  if (command === 'theme') return { lines: [copy.theme] }
  if (command === 'sound') {
    return {
      lines: [copy.sound],
      intent: { type: 'open-app', appId: 'soundscape' },
    }
  }
  if (command === 'open') {
    if (appIds.includes(argument as AppId)) {
      return {
        lines: [`open: ${argument}`],
        intent: { type: 'open-app', appId: argument as AppId },
      }
    }
    return { lines: [copy.appNotFound] }
  }
  if (command === 'visualize' || command === 'lab') {
    const slug = aliases[argument]
    if (slug && projectSlugs.includes(slug)) {
      return {
        lines: [`${command}: ${slug}`],
        intent: { type: 'open-project', projectSlug: slug },
      }
    }
    return { lines: [copy.projectNotFound] }
  }
  if (command === 'start' || command === 'hop') {
    if (!argument) return { lines: [copy.nodeRequired] }
    return {
      lines: [],
      intent: {
        type: 'sandbox-command',
        command: { type: command, nodeId: argument },
      },
    }
  }
  if (
    command === 'back' ||
    command === 'fail' ||
    command === 'recover' ||
    command === 'trace' ||
    command === 'reset'
  ) {
    return {
      lines: [],
      intent: {
        type: 'sandbox-command',
        command: { type: command },
      },
    }
  }
  return { lines: [copy.notFound] }
}
