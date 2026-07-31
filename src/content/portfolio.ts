import type {
  AppDefinition,
  ExperienceEntry,
  Locale,
  PortfolioProject,
  SkillGroup,
} from '@/types/portfolio'

import { architectureCatalog } from './architecture'

const repositories = {
  yomora: 'https://github.com/SchunckLeonardo/Yomora',
  hermes: 'https://github.com/SchunckLeonardo/hermes-news',
  solar: 'https://github.com/SchunckLeonardo/solar-beat-lab',
  orbita: 'https://github.com/SchunckLeonardo/orbitafire-vision',
}

const commonProjectData = {
  yomora: {
    slug: 'yomora' as const,
    title: 'Yomora',
    stack: [
      'SwiftUI',
      'Java 21',
      'Spring Boot',
      'PostgreSQL',
      'OpenAPI',
      'AWS S3',
    ],
    repository: repositories.yomora,
    accent: '#8b5cf6',
    architecture: architectureCatalog.yomora,
  },
  hermes: {
    slug: 'hermes-news' as const,
    title: 'Hermes News',
    stack: [
      'Java 21',
      'Spring Boot',
      'Spring AI',
      'PostgreSQL',
      'Redis',
      'Ollama',
    ],
    repository: repositories.hermes,
    accent: '#22d3ee',
    architecture: architectureCatalog['hermes-news'],
  },
  solar: {
    slug: 'solar-beat-lab' as const,
    title: 'Solar Beat Lab',
    stack: ['Next.js', 'React', 'TypeScript', 'Three.js', 'Tone.js', 'Zustand'],
    repository: repositories.solar,
    accent: '#f472b6',
    architecture: architectureCatalog['solar-beat-lab'],
  },
  orbita: {
    slug: 'orbitafire-vision' as const,
    title: 'OrbitaFire Vision',
    stack: [
      'Python',
      'TensorFlow',
      'Keras',
      'Streamlit',
      'Computer Vision',
      'CNN',
    ],
    repository: repositories.orbita,
    accent: '#fb923c',
    architecture: architectureCatalog['orbitafire-vision'],
  },
}

const projects: Record<Locale, PortfolioProject[]> = {
  pt: [
    {
      ...commonProjectData.yomora,
      tagline: 'Transformar livros começados em livros terminados.',
      eyebrow: 'Leitura · Comunidade · iOS',
      role: 'Produto autoral e engenharia full-stack',
      outcome:
        'Um ecossistema iOS + API com domínio modular, contrato versionado e uma suíte de qualidade que protege evolução e segurança.',
      problem:
        'Aplicativos de leitura registram livros, mas raramente ajudam a criar constância. O Yomora conecta biblioteca, metas, sessões, comunidade e feedback sem deixar o domínio se perder entre integrações.',
      decisions: [
        'Monólito modular para manter identidade, catálogo, leitura, social, review, moderação e notificações próximos sem acoplá-los.',
        'Contrato OpenAPI versionado como ponto de integração entre SwiftUI e Spring Boot.',
        'Sessão de leitura única por usuário, restaurada pelo app e refletida em Live Activity.',
      ],
      quality: [
        'Testes unitários, integração real com PostgreSQL, ArchUnit, XCTest e XCUITest.',
        'JWT, Keychain e URLs temporárias para um bucket S3 privado.',
        'CI separada para backend, contrato, iOS e verificações de segurança.',
      ],
      limits: [
        'Sign in with Apple depende das credenciais do time Apple.',
        'Push remoto, universal links e adapter de e-mail ficam fora do MVP.',
      ],
    },
    {
      ...commonProjectData.hermes,
      tagline: 'Seu briefing de tecnologia, explicado e entregue no WhatsApp.',
      eyebrow: 'Agentes · Backend · Mensageria',
      role: 'Arquitetura e implementação end-to-end',
      outcome:
        'Um monólito modular que coleta, ranqueia, resume e entrega notícias com feedback persistido, histórico, watchlist e retries confiáveis.',
      problem:
        'Acompanhar fontes técnicas exige tempo e produz muito ruído. O Hermes precisa selecionar eventos relevantes, explicar por que entraram e continuar funcionando quando IA ou mensageria falham.',
      decisions: [
        'Ranking explicável antes da IA para preservar previsibilidade e custo.',
        'Outbox durável com retries para separar a geração do digest da entrega no WhatsApp.',
        'Comandos determinísticos para ações essenciais e IA local apenas onde agrega valor.',
      ],
      quality: [
        'PostgreSQL com Flyway, Redis e métricas Micrometer.',
        'Fallback local quando Ollama excede o timeout.',
        'CodeQL, dependency review e build Gradle na CI.',
      ],
      limits: [
        'Ollama e Evolution API precisam de infraestrutura local configurada.',
        'A personalização é individual e não inclui colaboração multiusuário.',
      ],
    },
    {
      ...commonProjectData.solar,
      tagline: 'Um sequenciador musical 3D em que planetas viram instrumentos.',
      eyebrow: 'Creative coding · Áudio · 3D',
      role: 'Engenharia de produto e experiência interativa',
      outcome:
        'Uma aplicação musical completa com transporte preciso, automações, persistência, compartilhamento e exportação MIDI/WAV.',
      problem:
        'Áudio precisa seguir um relógio musical, enquanto a cena 3D precisa parecer viva sem transformar o frame rate no relógio da composição.',
      decisions: [
        'Tone.Transport agenda o áudio; a cena lê o progresso sem comandar o tempo.',
        'Estado serializável separado de objetos Three.js e Tone.js.',
        'Instancing, qualidade adaptativa e pausa da renderização fora da aba.',
      ],
      quality: [
        'Vitest, Testing Library, Playwright e validação de Web Audio real.',
        'Importação defensiva com migração entre versões de schema.',
        'Foco restaurado, atalhos de teclado e preferência de movimento reduzido.',
      ],
      limits: [
        'Web Audio e WebGL dependem do navegador e do dispositivo.',
        'Projetos ficam locais; links compartilham snapshots sem colaboração ao vivo.',
      ],
    },
    {
      ...commonProjectData.orbita,
      tagline:
        'Classificação de imagens satelitais para monitoramento ambiental.',
      eyebrow: 'Visão computacional · Espaço · Clima',
      role: 'Treinamento, avaliação e demonstração',
      outcome:
        'A CNN mais simples alcançou 89,39% de acurácia no teste e superou a arquitetura profunda, demonstrando melhor generalização.',
      problem:
        'Separar solo exposto, áreas queimadas e vegetação saudável em um conjunto desbalanceado de imagens satelitais.',
      decisions: [
        'Comparar duas CNNs criadas do zero sob o mesmo protocolo.',
        'Selecionar o modelo pela generalização, não pela complexidade.',
        'Expor a inferência em uma demonstração Streamlit recuperável.',
      ],
      quality: [
        'Splits explícitos de treino, validação e teste.',
        'Matriz de confusão e métricas por classe.',
        'Análise documentada de instabilidade e overfitting.',
      ],
      limits: [
        'Dataset desbalanceado e com confusão entre solo exposto e área queimada.',
        'O modelo é uma prova de conceito, não um sistema operacional de alerta.',
      ],
    },
  ],
  en: [
    {
      ...commonProjectData.yomora,
      tagline: 'Turn started books into finished books.',
      eyebrow: 'Reading · Community · iOS',
      role: 'Independent product and full-stack engineering',
      outcome:
        'An iOS + API ecosystem with a modular domain, versioned contract and a quality suite that protects evolution and security.',
      problem:
        'Reading apps track books but rarely build consistency. Yomora connects library, goals, sessions, community and feedback without losing the domain inside integrations.',
      decisions: [
        'A modular monolith keeps identity, catalog, reading, social, review, moderation and notifications close without coupling them.',
        'A versioned OpenAPI contract connects SwiftUI and Spring Boot.',
        'One active reading session per user, restored by the app and reflected in a Live Activity.',
      ],
      quality: [
        'Unit tests, real PostgreSQL integration, ArchUnit, XCTest and XCUITest.',
        'JWT, Keychain and temporary URLs for a private S3 bucket.',
        'Separate CI paths for backend, contract, iOS and security checks.',
      ],
      limits: [
        'Sign in with Apple requires Apple team credentials.',
        'Remote push, universal links and a production email adapter are outside the MVP.',
      ],
    },
    {
      ...commonProjectData.hermes,
      tagline: 'Your technology briefing, explained and delivered on WhatsApp.',
      eyebrow: 'Agents · Backend · Messaging',
      role: 'End-to-end architecture and implementation',
      outcome:
        'A modular monolith that collects, ranks, summarizes and delivers news with persisted feedback, history, watchlists and reliable retries.',
      problem:
        'Following technical sources takes time and creates noise. Hermes must select relevant events, explain its choices and keep working when AI or messaging is unavailable.',
      decisions: [
        'Explainable ranking runs before AI to preserve predictability and cost.',
        'A durable outbox separates digest generation from WhatsApp delivery.',
        'Core actions stay deterministic; local AI is used only where it adds value.',
      ],
      quality: [
        'PostgreSQL with Flyway, Redis and Micrometer metrics.',
        'Local formatter fallback when Ollama exceeds its timeout.',
        'CodeQL, dependency review and Gradle build in CI.',
      ],
      limits: [
        'Ollama and Evolution API require configured local infrastructure.',
        'Personalization is single-user and does not include collaboration.',
      ],
    },
    {
      ...commonProjectData.solar,
      tagline: 'A 3D music sequencer where planets become instruments.',
      eyebrow: 'Creative coding · Audio · 3D',
      role: 'Product engineering and interactive experience',
      outcome:
        'A complete music application with precise transport, automation, persistence, sharing and MIDI/WAV export.',
      problem:
        'Audio must follow a musical clock while the 3D scene feels alive without turning frame rate into composition time.',
      decisions: [
        'Tone.Transport schedules audio; the scene reads progress without owning time.',
        'Serializable state stays separate from Three.js and Tone.js objects.',
        'Instancing, adaptive quality and rendering pause outside the active tab.',
      ],
      quality: [
        'Vitest, Testing Library, Playwright and a real Web Audio validation.',
        'Defensive import with migrations across schema versions.',
        'Focus restoration, keyboard shortcuts and reduced-motion preference.',
      ],
      limits: [
        'Web Audio and WebGL depend on the browser and device.',
        'Projects are local; links share snapshots without live collaboration.',
      ],
    },
    {
      ...commonProjectData.orbita,
      tagline: 'Satellite image classification for environmental monitoring.',
      eyebrow: 'Computer vision · Space · Climate',
      role: 'Training, evaluation and demonstration',
      outcome:
        'The simpler CNN reached 89.39% test accuracy and outperformed the deeper architecture through better generalization.',
      problem:
        'Separate barren land, burned areas and healthy vegetation in an imbalanced satellite image dataset.',
      decisions: [
        'Compare two from-scratch CNNs under the same protocol.',
        'Select the model by generalization rather than complexity.',
        'Expose inference through a recoverable Streamlit demo.',
      ],
      quality: [
        'Explicit train, validation and test splits.',
        'Confusion matrix and per-class metrics.',
        'Documented analysis of instability and overfitting.',
      ],
      limits: [
        'The dataset is imbalanced and barren land can resemble burned areas.',
        'The model is a proof of concept, not an operational alerting system.',
      ],
    },
  ],
}

const experiences: Record<Locale, ExperienceEntry[]> = {
  pt: [
    {
      company: 'Pismo',
      role: 'SW Engineer',
      period: 'jun 2026 — presente',
      location: 'São Paulo, Brasil',
      summary:
        'Atuação atual em engenharia de software. O portfólio mantém esta experiência objetiva enquanto o trabalho está em andamento.',
      highlights: [],
      current: true,
    },
    {
      company: 'BTG Pactual',
      role: 'Backend Developer',
      period: 'abr 2025 — jun 2026',
      location: 'São Paulo, Brasil',
      summary:
        'Backend para ferramentas operacionais e experiências de crédito, conectando decisões técnicas a times multidisciplinares.',
      highlights: [
        'Kotlin e Spring Boot com soluções de IA generativa via LangChain4j.',
        'AWS, Cognito, PostgreSQL, Terraform e observabilidade com Grafana e Datadog.',
        'Ciclo completo entre métricas, bugs de produção, arquitetura e CI/CD com Jenkins e ArgoCD.',
      ],
    },
    {
      company: 'Carvalho Aleixo Inc',
      role: 'Fullstack Developer',
      period: 'jun 2024 — jan 2025',
      location: 'Delaware, Estados Unidos',
      summary:
        'Sistemas de coleta e consulta de dados de marketplace com foco em latência, cache e volume.',
      highlights: [
        'Migração do scraping via WebSocket de JavaScript para Go: de 1 minuto para 20–30 segundos, ganho superior a 66%.',
        'APIs para ASINs e rankings de produtos por palavra-chave.',
        'Aerospike para armazenamento indexado e Redis para reduzir carga e latência.',
      ],
    },
    {
      company: 'Baraúna Soluções Biológicas',
      role: 'Web Development',
      period: 'fev 2024 — mai 2024',
      location: 'São Paulo, Brasil',
      summary:
        'Modernização de uma aplicação de negócio e evolução das integrações de backend.',
      highlights: [
        'Migração do front-end Bubble para React.',
        'Deploy e infraestrutura no Google Cloud Platform.',
        'Desenvolvimento e manutenção de APIs em C#.',
      ],
    },
  ],
  en: [
    {
      company: 'Pismo',
      role: 'SW Engineer',
      period: 'Jun 2026 — present',
      location: 'São Paulo, Brazil',
      summary:
        'Current software engineering role. The portfolio intentionally keeps this entry concise while the work is ongoing.',
      highlights: [],
      current: true,
    },
    {
      company: 'BTG Pactual',
      role: 'Backend Developer',
      period: 'Apr 2025 — Jun 2026',
      location: 'São Paulo, Brazil',
      summary:
        'Backend engineering for operational tools and credit experiences, connecting technical decisions with cross-functional teams.',
      highlights: [
        'Kotlin and Spring Boot with generative AI through LangChain4j.',
        'AWS, Cognito, PostgreSQL, Terraform and observability with Grafana and Datadog.',
        'Full cycle across metrics, production bugs, architecture and CI/CD with Jenkins and ArgoCD.',
      ],
    },
    {
      company: 'Carvalho Aleixo Inc',
      role: 'Fullstack Developer',
      period: 'Jun 2024 — Jan 2025',
      location: 'Delaware, United States',
      summary:
        'Marketplace data collection and query systems focused on latency, caching and volume.',
      highlights: [
        'Migrated WebSocket scraping from JavaScript to Go: from 1 minute to 20–30 seconds, over 66% faster.',
        'Built APIs for ASIN ingestion and product ranking by keyword.',
        'Used Aerospike for indexed storage and Redis to reduce load and latency.',
      ],
    },
    {
      company: 'Baraúna Soluções Biológicas',
      role: 'Web Development',
      period: 'Feb 2024 — May 2024',
      location: 'São Paulo, Brazil',
      summary:
        'Modernized a business application and evolved its backend integrations.',
      highlights: [
        'Migrated the front end from Bubble to React.',
        'Deployed infrastructure on Google Cloud Platform.',
        'Developed and maintained C# APIs.',
      ],
    },
  ],
}

const skillGroups: Record<Locale, SkillGroup[]> = {
  pt: [
    {
      label: 'Backend',
      description:
        'Serviços, APIs e domínios que precisam evoluir com clareza.',
      items: [
        'Go',
        'Kotlin',
        'Java',
        'Spring Boot',
        'Node.js',
        'C#',
        '.NET',
        'gRPC',
      ],
    },
    {
      label: 'Dados & eventos',
      description: 'Persistência, cache e fluxos assíncronos.',
      items: ['PostgreSQL', 'Redis', 'Aerospike', 'Kafka', 'Flyway', 'Outbox'],
    },
    {
      label: 'Cloud & entrega',
      description: 'Infraestrutura observável e ciclos seguros de deploy.',
      items: ['AWS', 'GCP', 'Docker', 'Terraform', 'Jenkins', 'ArgoCD'],
    },
    {
      label: 'Observabilidade & IA',
      description: 'Sistemas mensuráveis e IA aplicada com limites explícitos.',
      items: [
        'Datadog',
        'Grafana',
        'Micrometer',
        'LangChain4j',
        'Spring AI',
        'Ollama',
      ],
    },
    {
      label: 'Arquitetura',
      description:
        'Modelagem que mantém regras, adapters e integrações navegáveis.',
      items: [
        'DDD',
        'Hexagonal',
        'Modular Monolith',
        'OAuth2',
        'OpenAPI',
        'Event Storming',
      ],
    },
  ],
  en: [
    {
      label: 'Backend',
      description: 'Services, APIs and domains designed to evolve clearly.',
      items: [
        'Go',
        'Kotlin',
        'Java',
        'Spring Boot',
        'Node.js',
        'C#',
        '.NET',
        'gRPC',
      ],
    },
    {
      label: 'Data & events',
      description: 'Persistence, caching and asynchronous flows.',
      items: ['PostgreSQL', 'Redis', 'Aerospike', 'Kafka', 'Flyway', 'Outbox'],
    },
    {
      label: 'Cloud & delivery',
      description: 'Observable infrastructure and safe deployment cycles.',
      items: ['AWS', 'GCP', 'Docker', 'Terraform', 'Jenkins', 'ArgoCD'],
    },
    {
      label: 'Observability & AI',
      description: 'Measurable systems and applied AI with explicit limits.',
      items: [
        'Datadog',
        'Grafana',
        'Micrometer',
        'LangChain4j',
        'Spring AI',
        'Ollama',
      ],
    },
    {
      label: 'Architecture',
      description:
        'Models that keep rules, adapters and integrations navigable.',
      items: [
        'DDD',
        'Hexagonal',
        'Modular Monolith',
        'OAuth2',
        'OpenAPI',
        'Event Storming',
      ],
    },
  ],
}

const copy = {
  pt: {
    localeName: 'PT',
    alternateLocale: 'EN',
    name: 'Leonardo Schunck Rainha',
    role: 'Backend & Software Engineer',
    status: 'SW Engineer @ Pismo',
    stackLine: 'Go · Kotlin · Spring · Java',
    intro:
      'Construo sistemas robustos, APIs de alta performance e experiências técnicas que tornam arquitetura complexa mais clara.',
    enter: 'Iniciar sistema',
    skip: 'Pular introdução',
    available: 'Sistema online',
    featuredNodes: 'Nós em destaque',
    openProject: 'Abrir estudo de caso',
    allProjects: 'Projetos selecionados',
    repository: 'Ver repositório',
    resume: 'Currículo — EN',
    architectureLab: 'Abrir no Architecture Lab',
    profileTitle: 'Trajetória',
    profileLead:
      'Engenheiro de software com foco em backend, performance, cloud e evolução segura de sistemas.',
    education: 'Formação',
    educationValue: 'Engenharia de Software · FIAP · 2023–2026',
    projectsTitle: 'Engenharia em contexto',
    projectsLead:
      'Quatro produtos que conectam domínio, arquitetura, confiabilidade e experiência.',
    architectureTitle: 'Architecture Lab',
    architectureLead:
      'Inicie um pacote em qualquer nó, percorra conexões válidas e injete falhas. A mesma sessão é refletida na cena 3D.',
    terminalTitle: 'Terminal',
    terminalHint: 'Digite help para listar comandos.',
    skillsTitle: 'System Monitor',
    skillsLead:
      'Competências agrupadas pelo problema que ajudam a resolver — sem barras arbitrárias.',
    contactTitle: 'Vamos construir algo difícil?',
    contactLead:
      'Para oportunidades, projetos ou conversas técnicas, escolha o canal mais direto.',
    copyEmail: 'Copiar e-mail',
    emailCopied: 'E-mail copiado',
    soundscapeTitle: 'Soundscape',
    soundscapeLead: 'Uma camada procedural opcional. Nada toca sem sua ação.',
    soundOn: 'Ativar áudio',
    soundOff: 'Desativar áudio',
    reducedMotion: 'Movimento reduzido',
    fullMotion: 'Movimento completo',
    close: 'Fechar',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    restore: 'Restaurar',
    search: 'Buscar apps e projetos',
    noResults: 'Nenhum resultado',
    problem: 'Problema',
    decisions: 'Decisões de engenharia',
    quality: 'Qualidade & segurança',
    limits: 'Limites',
    systemStatus: 'STATUS',
    localTime: 'HORA LOCAL',
  },
  en: {
    localeName: 'EN',
    alternateLocale: 'PT',
    name: 'Leonardo Schunck Rainha',
    role: 'Backend & Software Engineer',
    status: 'SW Engineer @ Pismo',
    stackLine: 'Go · Kotlin · Spring · Java',
    intro:
      'I build robust systems, high-performance APIs and technical experiences that make complex architecture clearer.',
    enter: 'Start system',
    skip: 'Skip intro',
    available: 'System online',
    featuredNodes: 'Featured nodes',
    openProject: 'Open case study',
    allProjects: 'Selected projects',
    repository: 'View repository',
    resume: 'Resume — EN',
    architectureLab: 'Open in Architecture Lab',
    profileTitle: 'Career',
    profileLead:
      'Software engineer focused on backend, performance, cloud and safe system evolution.',
    education: 'Education',
    educationValue: 'Software Engineering · FIAP · 2023–2026',
    projectsTitle: 'Engineering in context',
    projectsLead:
      'Four products connecting domain, architecture, reliability and experience.',
    architectureTitle: 'Architecture Lab',
    architectureLead:
      'Start a packet at any node, follow valid connections and inject failures. The same session is reflected in the 3D scene.',
    terminalTitle: 'Terminal',
    terminalHint: 'Type help to list commands.',
    skillsTitle: 'System Monitor',
    skillsLead:
      'Skills grouped by the problems they solve — no arbitrary progress bars.',
    contactTitle: 'Want to build something difficult?',
    contactLead:
      'For opportunities, projects or technical conversations, choose the most direct channel.',
    copyEmail: 'Copy email',
    emailCopied: 'Email copied',
    soundscapeTitle: 'Soundscape',
    soundscapeLead:
      'An optional procedural layer. Nothing plays without your action.',
    soundOn: 'Enable audio',
    soundOff: 'Disable audio',
    reducedMotion: 'Reduced motion',
    fullMotion: 'Full motion',
    close: 'Close',
    minimize: 'Minimize',
    maximize: 'Maximize',
    restore: 'Restore',
    search: 'Search apps and projects',
    noResults: 'No results',
    problem: 'Problem',
    decisions: 'Engineering decisions',
    quality: 'Quality & security',
    limits: 'Limits',
    systemStatus: 'STATUS',
    localTime: 'LOCAL TIME',
  },
} as const

const appDefinitions: Record<Locale, AppDefinition[]> = {
  pt: [
    {
      id: 'profile',
      label: 'Perfil',
      description: 'Trajetória e impacto',
      shortcut: 'P',
    },
    {
      id: 'projects',
      label: 'Projetos',
      description: 'Cases de engenharia',
      shortcut: 'J',
    },
    {
      id: 'architecture',
      label: 'Arquitetura',
      description: 'Mapas interativos',
      shortcut: 'A',
    },
    {
      id: 'terminal',
      label: 'Terminal',
      description: 'Explore por comandos',
      shortcut: 'T',
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Stack por domínio',
      shortcut: 'S',
    },
    {
      id: 'soundscape',
      label: 'Soundscape',
      description: 'Áudio procedural',
      shortcut: 'M',
    },
    {
      id: 'contact',
      label: 'Contato',
      description: 'Abra um canal',
      shortcut: 'C',
    },
  ],
  en: [
    {
      id: 'profile',
      label: 'Profile',
      description: 'Career and impact',
      shortcut: 'P',
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Engineering cases',
      shortcut: 'J',
    },
    {
      id: 'architecture',
      label: 'Architecture',
      description: 'Interactive maps',
      shortcut: 'A',
    },
    {
      id: 'terminal',
      label: 'Terminal',
      description: 'Explore by commands',
      shortcut: 'T',
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Stack by domain',
      shortcut: 'S',
    },
    {
      id: 'soundscape',
      label: 'Soundscape',
      description: 'Procedural audio',
      shortcut: 'M',
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Open a channel',
      shortcut: 'C',
    },
  ],
}

export function getPortfolioContent(locale: Locale) {
  return {
    copy: copy[locale],
    apps: appDefinitions[locale],
    projects: projects[locale],
    experiences: experiences[locale],
    skillGroups: skillGroups[locale],
  }
}

export function getProject(locale: Locale, slug: string) {
  return projects[locale].find((project) => project.slug === slug)
}
