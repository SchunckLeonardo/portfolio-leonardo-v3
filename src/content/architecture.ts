import type {
  Locale,
  ProjectArchitecture,
  ProjectArchitectureEdge,
  ProjectSlug,
} from '@/types/portfolio'

export type ArchitectureFactSource =
  | 'topology'
  | 'case-decision'
  | 'case-quality'
  | 'case-limit'

export interface ArchitectureInsight {
  responsibility: string
  contract: string
  failureImpact: string
  mitigation: string
  source: ArchitectureFactSource
}

export interface ArchitectureKnowledge {
  nodes: Record<string, ArchitectureInsight>
}

export const architectureCatalog: Record<ProjectSlug, ProjectArchitecture> = {
  yomora: {
    nodes: [
      { id: 'ios', label: 'iOS · SwiftUI', kind: 'client' },
      { id: 'contract', label: 'OpenAPI /api/v1', kind: 'module' },
      { id: 'identity', label: 'Identity', kind: 'module' },
      { id: 'reading', label: 'Reading', kind: 'module' },
      { id: 'social', label: 'Social', kind: 'module' },
      { id: 'postgres', label: 'PostgreSQL', kind: 'database' },
      { id: 's3', label: 'Private S3', kind: 'cloud' },
    ],
    edges: [
      { from: 'ios', to: 'contract', label: 'HTTPS' },
      { from: 'contract', to: 'identity' },
      { from: 'contract', to: 'reading' },
      { from: 'contract', to: 'social' },
      { from: 'identity', to: 'postgres' },
      { from: 'reading', to: 'postgres' },
      { from: 'social', to: 'postgres' },
      { from: 'identity', to: 's3', label: 'signed URLs' },
    ],
  },
  'hermes-news': {
    nodes: [
      { id: 'feeds', label: 'RSS + Hacker News', kind: 'external' },
      { id: 'news', label: 'Collection', kind: 'module' },
      { id: 'ranking', label: 'Ranking + Feedback', kind: 'module' },
      { id: 'ai', label: 'Spring AI + Ollama', kind: 'external' },
      { id: 'outbox', label: 'Durable Outbox', kind: 'queue' },
      { id: 'whatsapp', label: 'WhatsApp', kind: 'external' },
      { id: 'postgres', label: 'PostgreSQL', kind: 'database' },
      { id: 'redis', label: 'Redis', kind: 'database' },
    ],
    edges: [
      { from: 'feeds', to: 'news' },
      { from: 'news', to: 'ranking' },
      { from: 'ranking', to: 'ai' },
      { from: 'ai', to: 'outbox' },
      { from: 'outbox', to: 'whatsapp' },
      { from: 'ranking', to: 'postgres' },
      { from: 'outbox', to: 'postgres' },
      { from: 'news', to: 'redis' },
    ],
  },
  'solar-beat-lab': {
    nodes: [
      { id: 'ui', label: 'React UI', kind: 'client' },
      { id: 'store', label: 'Serializable Store', kind: 'module' },
      { id: 'audio', label: 'Tone Transport', kind: 'module' },
      { id: 'scene', label: 'R3F Scene', kind: 'module' },
      { id: 'persistence', label: 'Project Repository', kind: 'database' },
      { id: 'export', label: 'MIDI + WAV', kind: 'external' },
    ],
    edges: [
      { from: 'ui', to: 'store' },
      { from: 'store', to: 'audio' },
      { from: 'audio', to: 'scene', label: 'scheduled time' },
      { from: 'store', to: 'persistence' },
      { from: 'store', to: 'export' },
    ],
  },
  'orbitafire-vision': {
    nodes: [
      { id: 'dataset', label: 'Satellite Dataset', kind: 'database' },
      { id: 'pipeline', label: 'Training Pipeline', kind: 'module' },
      { id: 'simple', label: 'Simple CNN', kind: 'module' },
      { id: 'deep', label: 'Deep CNN', kind: 'module' },
      { id: 'model', label: 'Selected Model', kind: 'module' },
      { id: 'app', label: 'Streamlit Demo', kind: 'client' },
    ],
    edges: [
      { from: 'dataset', to: 'pipeline' },
      { from: 'pipeline', to: 'simple' },
      { from: 'pipeline', to: 'deep' },
      { from: 'simple', to: 'model', label: '89.39%' },
      { from: 'model', to: 'app' },
    ],
  },
}

const pt: Record<ProjectSlug, ArchitectureKnowledge> = {
  yomora: {
    nodes: {
      ios: {
        responsibility: 'Apresentar os fluxos de leitura e comunidade no app.',
        contract: 'Consome o contrato versionado em /api/v1 por HTTPS.',
        failureImpact: 'Os fluxos do produto deixam de chegar ao usuário.',
        mitigation:
          'XCTest, XCUITest e integração protegida pelo contrato OpenAPI.',
        source: 'case-quality',
      },
      contract: {
        responsibility: 'Manter SwiftUI e Spring Boot no mesmo contrato.',
        contract: 'OpenAPI versionado em /api/v1.',
        failureImpact: 'Cliente e backend podem divergir na integração.',
        mitigation: 'CI separada para backend, contrato e iOS.',
        source: 'case-decision',
      },
      identity: {
        responsibility: 'Concentrar identidade e acesso do domínio.',
        contract: 'Módulo interno exposto pelo contrato OpenAPI.',
        failureImpact:
          'Acesso autenticado e mídia privada ficam indisponíveis.',
        mitigation: 'JWT, Keychain e URLs temporárias para o S3 privado.',
        source: 'case-quality',
      },
      reading: {
        responsibility: 'Gerenciar metas, sessões e progresso de leitura.',
        contract: 'Módulo interno exposto pelo contrato OpenAPI.',
        failureImpact: 'Sessões e progresso deixam de evoluir.',
        mitigation:
          'Sessão única por usuário, restaurada pelo app e coberta por testes.',
        source: 'case-decision',
      },
      social: {
        responsibility: 'Sustentar os fluxos sociais e de comunidade.',
        contract: 'Módulo interno exposto pelo contrato OpenAPI.',
        failureImpact: 'Interações da comunidade ficam indisponíveis.',
        mitigation:
          'Domínio modular e suíte de testes protegem a evolução do módulo.',
        source: 'case-decision',
      },
      postgres: {
        responsibility: 'Persistir o estado dos módulos de backend.',
        contract:
          'Persistência PostgreSQL compartilhada pelo monólito modular.',
        failureImpact: 'Identidade, leitura e social perdem acesso ao estado.',
        mitigation: 'Testes de integração reais com PostgreSQL.',
        source: 'case-quality',
      },
      s3: {
        responsibility: 'Armazenar mídia privada.',
        contract: 'Acesso por URLs temporárias assinadas.',
        failureImpact: 'A mídia privada não pode ser entregue.',
        mitigation: 'Bucket privado e URLs temporárias limitam a exposição.',
        source: 'case-quality',
      },
    },
  },
  'hermes-news': {
    nodes: {
      feeds: {
        responsibility: 'Fornecer notícias de RSS e Hacker News.',
        contract: 'Fontes externas consumidas pelo módulo de coleta.',
        failureImpact: 'A coleta deixa de receber novas entradas.',
        mitigation: 'A falha fica isolada na entrada antes do ranking.',
        source: 'topology',
      },
      news: {
        responsibility: 'Coletar e preparar notícias para o ranking.',
        contract: 'Entrega entradas coletadas ao ranking e usa Redis.',
        failureImpact: 'O fluxo deixa de produzir itens classificáveis.',
        mitigation: 'Redis reduz carga e o núcleo permanece determinístico.',
        source: 'case-quality',
      },
      ranking: {
        responsibility: 'Ordenar notícias com sinais explicáveis e feedback.',
        contract: 'Executa antes da IA e persiste o estado em PostgreSQL.',
        failureImpact: 'A seleção perde previsibilidade e personalização.',
        mitigation: 'Ranking explicável roda antes da IA.',
        source: 'case-decision',
      },
      ai: {
        responsibility: 'Formatar o conteúdo com Spring AI e Ollama.',
        contract: 'Recebe o ranking e entrega o digest ao outbox.',
        failureImpact: 'A etapa de formatação pode não concluir.',
        mitigation: 'Formatter local assume quando o Ollama excede o timeout.',
        source: 'case-quality',
      },
      outbox: {
        responsibility: 'Separar geração do digest e entrega no WhatsApp.',
        contract: 'Outbox durável persistido antes da entrega.',
        failureImpact: 'Mensagens ficam pendentes sem perder a separação.',
        mitigation: 'Persistência durável desacopla geração e envio.',
        source: 'case-decision',
      },
      whatsapp: {
        responsibility: 'Entregar o briefing ao canal do usuário.',
        contract: 'Integração externa via infraestrutura Evolution API.',
        failureImpact: 'O briefing não chega ao WhatsApp.',
        mitigation: 'O outbox preserva a entrega pendente.',
        source: 'case-limit',
      },
      postgres: {
        responsibility: 'Persistir ranking, feedback e outbox.',
        contract: 'PostgreSQL versionado com Flyway.',
        failureImpact:
          'Estado durável e entregas pendentes ficam indisponíveis.',
        mitigation: 'Flyway e build Gradle fazem parte da verificação.',
        source: 'case-quality',
      },
      redis: {
        responsibility: 'Reduzir carga e latência na coleta.',
        contract: 'Cache consumido pelo módulo de Collection.',
        failureImpact: 'A coleta perde sua camada de cache.',
        mitigation: 'O núcleo determinístico não depende de IA para operar.',
        source: 'case-decision',
      },
    },
  },
  'solar-beat-lab': {
    nodes: {
      ui: {
        responsibility: 'Expor composição, transporte e automação ao usuário.',
        contract: 'Interage apenas com estado serializável.',
        failureImpact: 'O usuário perde o controle da sessão musical.',
        mitigation: 'Atalhos, restauração de foco e preferência de movimento.',
        source: 'case-quality',
      },
      store: {
        responsibility: 'Ser a fonte serializável do projeto musical.',
        contract: 'Separa estado de objetos Three.js e Tone.js.',
        failureImpact: 'Áudio, cena, persistência e exportação divergem.',
        mitigation: 'Importação defensiva com migrações de schema.',
        source: 'case-quality',
      },
      audio: {
        responsibility: 'Agendar o áudio no relógio musical.',
        contract: 'Tone.Transport publica o tempo agendado para a cena.',
        failureImpact: 'A reprodução perde precisão temporal.',
        mitigation: 'O transporte de áudio é o único dono do tempo.',
        source: 'case-decision',
      },
      scene: {
        responsibility: 'Representar visualmente a execução musical em 3D.',
        contract: 'Lê o progresso sem controlar o relógio.',
        failureImpact: 'A visualização deixa de refletir a música.',
        mitigation: 'Qualidade adaptativa e pausa de render fora da aba ativa.',
        source: 'case-decision',
      },
      persistence: {
        responsibility: 'Salvar e restaurar projetos locais.',
        contract: 'Recebe snapshots serializáveis do store.',
        failureImpact: 'Projetos deixam de ser restaurados.',
        mitigation: 'Migrações entre versões protegem a importação.',
        source: 'case-quality',
      },
      export: {
        responsibility: 'Gerar saídas MIDI e WAV.',
        contract: 'Consome o estado serializável do projeto.',
        failureImpact: 'O projeto toca, mas não pode ser exportado.',
        mitigation: 'A exportação fica separada do transporte e da cena.',
        source: 'topology',
      },
    },
  },
  'orbitafire-vision': {
    nodes: {
      dataset: {
        responsibility: 'Fornecer imagens das três classes ambientais.',
        contract: 'Dados separados em treino, validação e teste.',
        failureImpact: 'O experimento perde base comparável.',
        mitigation: 'Splits explícitos e análise do desbalanceamento.',
        source: 'case-quality',
      },
      pipeline: {
        responsibility: 'Treinar e avaliar as duas CNNs no mesmo protocolo.',
        contract: 'Recebe o dataset e alimenta as arquiteturas comparadas.',
        failureImpact: 'Os modelos deixam de ser comparáveis.',
        mitigation:
          'Mesmo protocolo, matriz de confusão e métricas por classe.',
        source: 'case-decision',
      },
      simple: {
        responsibility: 'Classificar imagens com a CNN de menor complexidade.',
        contract: 'É avaliada pelo mesmo protocolo da CNN profunda.',
        failureImpact: 'O modelo com melhor generalização não é produzido.',
        mitigation: 'Seleção considera generalização, não complexidade.',
        source: 'case-decision',
      },
      deep: {
        responsibility: 'Servir como arquitetura profunda de comparação.',
        contract: 'É avaliada no mesmo conjunto e protocolo.',
        failureImpact:
          'A comparação entre complexidade e generalização se perde.',
        mitigation: 'Instabilidade e overfitting permanecem documentados.',
        source: 'case-quality',
      },
      model: {
        responsibility: 'Representar o modelo escolhido para inferência.',
        contract: 'Recebe a Simple CNN selecionada com 89,39% no teste.',
        failureImpact: 'A demonstração fica sem classificador.',
        mitigation: 'O modelo é escolhido pela generalização observada.',
        source: 'case-decision',
      },
      app: {
        responsibility: 'Demonstrar a inferência em Streamlit.',
        contract: 'Consome o modelo selecionado.',
        failureImpact:
          'A inferência deixa de estar disponível na demonstração.',
        mitigation: 'A demo é recuperável e explicitamente tratada como PoC.',
        source: 'case-limit',
      },
    },
  },
}

const en: Record<ProjectSlug, ArchitectureKnowledge> = {
  yomora: {
    nodes: {
      ios: {
        responsibility: 'Present reading and community flows in the app.',
        contract: 'Consumes the versioned /api/v1 contract over HTTPS.',
        failureImpact: 'Product flows no longer reach the user.',
        mitigation:
          'XCTest, XCUITest and integration protected by the OpenAPI contract.',
        source: 'case-quality',
      },
      contract: {
        responsibility: 'Keep SwiftUI and Spring Boot on the same contract.',
        contract: 'Versioned OpenAPI contract at /api/v1.',
        failureImpact: 'Client and backend can drift apart.',
        mitigation: 'Separate CI for backend, contract and iOS.',
        source: 'case-decision',
      },
      identity: {
        responsibility: 'Concentrate identity and domain access.',
        contract: 'Internal module exposed through the OpenAPI contract.',
        failureImpact:
          'Authenticated access and private media become unavailable.',
        mitigation: 'JWT, Keychain and temporary URLs for private S3.',
        source: 'case-quality',
      },
      reading: {
        responsibility: 'Manage goals, sessions and reading progress.',
        contract: 'Internal module exposed through the OpenAPI contract.',
        failureImpact: 'Sessions and progress stop evolving.',
        mitigation:
          'One session per user, restored by the app and covered by tests.',
        source: 'case-decision',
      },
      social: {
        responsibility: 'Support social and community flows.',
        contract: 'Internal module exposed through the OpenAPI contract.',
        failureImpact: 'Community interactions become unavailable.',
        mitigation:
          'The modular domain and test suite protect module evolution.',
        source: 'case-decision',
      },
      postgres: {
        responsibility: 'Persist backend module state.',
        contract: 'PostgreSQL persistence shared by the modular monolith.',
        failureImpact: 'Identity, reading and social lose access to state.',
        mitigation: 'Integration tests run against real PostgreSQL.',
        source: 'case-quality',
      },
      s3: {
        responsibility: 'Store private media.',
        contract: 'Access through temporary signed URLs.',
        failureImpact: 'Private media cannot be delivered.',
        mitigation: 'A private bucket and temporary URLs limit exposure.',
        source: 'case-quality',
      },
    },
  },
  'hermes-news': {
    nodes: {
      feeds: {
        responsibility: 'Provide stories from RSS and Hacker News.',
        contract: 'External sources consumed by the collection module.',
        failureImpact: 'Collection stops receiving new entries.',
        mitigation: 'The failure stays isolated at input, before ranking.',
        source: 'topology',
      },
      news: {
        responsibility: 'Collect and prepare stories for ranking.',
        contract: 'Hands collected entries to ranking and uses Redis.',
        failureImpact: 'The flow stops producing rankable items.',
        mitigation: 'Redis reduces load while the core remains deterministic.',
        source: 'case-quality',
      },
      ranking: {
        responsibility: 'Order stories with explainable signals and feedback.',
        contract: 'Runs before AI and persists state in PostgreSQL.',
        failureImpact: 'Selection loses predictability and personalization.',
        mitigation: 'Explainable ranking runs before AI.',
        source: 'case-decision',
      },
      ai: {
        responsibility: 'Format content with Spring AI and Ollama.',
        contract: 'Receives ranking and hands the digest to the outbox.',
        failureImpact: 'The formatting step may not complete.',
        mitigation: 'A local formatter takes over when Ollama times out.',
        source: 'case-quality',
      },
      outbox: {
        responsibility: 'Separate digest generation from WhatsApp delivery.',
        contract: 'Durable outbox persisted before delivery.',
        failureImpact: 'Messages remain pending without losing separation.',
        mitigation: 'Durable persistence decouples generation and delivery.',
        source: 'case-decision',
      },
      whatsapp: {
        responsibility: 'Deliver the briefing to the user channel.',
        contract: 'External integration through Evolution API infrastructure.',
        failureImpact: 'The briefing does not reach WhatsApp.',
        mitigation: 'The outbox preserves pending delivery.',
        source: 'case-limit',
      },
      postgres: {
        responsibility: 'Persist ranking, feedback and outbox state.',
        contract: 'PostgreSQL versioned with Flyway.',
        failureImpact:
          'Durable state and pending deliveries become unavailable.',
        mitigation: 'Flyway and the Gradle build are part of verification.',
        source: 'case-quality',
      },
      redis: {
        responsibility: 'Reduce collection load and latency.',
        contract: 'Cache consumed by the Collection module.',
        failureImpact: 'Collection loses its cache layer.',
        mitigation: 'The deterministic core does not depend on AI to operate.',
        source: 'case-decision',
      },
    },
  },
  'solar-beat-lab': {
    nodes: {
      ui: {
        responsibility: 'Expose composition, transport and automation.',
        contract: 'Interacts only with serializable state.',
        failureImpact: 'The user loses control of the music session.',
        mitigation: 'Shortcuts, focus restoration and motion preference.',
        source: 'case-quality',
      },
      store: {
        responsibility: 'Act as the serializable source for the music project.',
        contract: 'Separates state from Three.js and Tone.js objects.',
        failureImpact: 'Audio, scene, persistence and export drift apart.',
        mitigation: 'Defensive imports with schema migrations.',
        source: 'case-quality',
      },
      audio: {
        responsibility: 'Schedule audio on the musical clock.',
        contract: 'Tone.Transport publishes scheduled time to the scene.',
        failureImpact: 'Playback loses timing precision.',
        mitigation: 'The audio transport is the single owner of time.',
        source: 'case-decision',
      },
      scene: {
        responsibility: 'Represent musical execution in 3D.',
        contract: 'Reads progress without controlling the clock.',
        failureImpact: 'The visual no longer reflects the music.',
        mitigation:
          'Adaptive quality and rendering pause outside the active tab.',
        source: 'case-decision',
      },
      persistence: {
        responsibility: 'Save and restore local projects.',
        contract: 'Receives serializable snapshots from the store.',
        failureImpact: 'Projects can no longer be restored.',
        mitigation: 'Version migrations protect imports.',
        source: 'case-quality',
      },
      export: {
        responsibility: 'Generate MIDI and WAV outputs.',
        contract: 'Consumes serializable project state.',
        failureImpact: 'The project plays but cannot be exported.',
        mitigation: 'Export remains separate from transport and scene.',
        source: 'topology',
      },
    },
  },
  'orbitafire-vision': {
    nodes: {
      dataset: {
        responsibility: 'Provide images for the three environmental classes.',
        contract: 'Data split into train, validation and test sets.',
        failureImpact: 'The experiment loses its comparable basis.',
        mitigation: 'Explicit splits and imbalance analysis.',
        source: 'case-quality',
      },
      pipeline: {
        responsibility: 'Train and evaluate both CNNs under one protocol.',
        contract: 'Receives the dataset and feeds both compared architectures.',
        failureImpact: 'The models stop being comparable.',
        mitigation: 'Same protocol, confusion matrix and per-class metrics.',
        source: 'case-decision',
      },
      simple: {
        responsibility: 'Classify images with the lower-complexity CNN.',
        contract: 'Evaluated under the same protocol as the deep CNN.',
        failureImpact: 'The better-generalizing model is not produced.',
        mitigation: 'Selection favors generalization over complexity.',
        source: 'case-decision',
      },
      deep: {
        responsibility: 'Serve as the deeper comparison architecture.',
        contract: 'Evaluated on the same dataset and protocol.',
        failureImpact:
          'The complexity versus generalization comparison is lost.',
        mitigation: 'Instability and overfitting remain documented.',
        source: 'case-quality',
      },
      model: {
        responsibility: 'Represent the model selected for inference.',
        contract: 'Receives the selected Simple CNN with 89.39% test accuracy.',
        failureImpact: 'The demo has no classifier.',
        mitigation: 'The model is selected by observed generalization.',
        source: 'case-decision',
      },
      app: {
        responsibility: 'Demonstrate inference through Streamlit.',
        contract: 'Consumes the selected model.',
        failureImpact: 'Inference is no longer available in the demo.',
        mitigation: 'The demo is recoverable and explicitly treated as a PoC.',
        source: 'case-limit',
      },
    },
  },
}

const knowledge: Record<Locale, Record<ProjectSlug, ArchitectureKnowledge>> = {
  pt,
  en,
}

export function getArchitectureKnowledge(
  locale: Locale,
  slug: ProjectSlug,
): ArchitectureKnowledge {
  return knowledge[locale][slug]
}

export function architectureEdgeId(
  edge: ProjectArchitectureEdge,
  index: number,
) {
  return `${edge.from}__${edge.to}__${index}`
}

export function getArchitectureEdgeInsight(
  locale: Locale,
  slug: ProjectSlug,
  edge: ProjectArchitectureEdge,
  index: number,
): ArchitectureInsight {
  const topology = architectureCatalog[slug]
  const from = topology.nodes.find((node) => node.id === edge.from)?.label
  const to = topology.nodes.find((node) => node.id === edge.to)?.label
  const contract =
    edge.label ??
    (locale === 'pt'
      ? 'Dependência direcionada documentada no mapa do case.'
      : 'Directed dependency documented in the case map.')

  if (locale === 'pt') {
    return {
      responsibility: `Conduzir o fluxo de ${from} para ${to}.`,
      contract,
      failureImpact: `${to} deixa de receber a entrada esperada de ${from}.`,
      mitigation:
        'Inspecionar os dois nós e retomar a partir do último passo saudável.',
      source: 'topology',
    }
  }

  return {
    responsibility: `Carry the flow from ${from} to ${to}.`,
    contract,
    failureImpact: `${to} stops receiving its expected input from ${from}.`,
    mitigation: 'Inspect both nodes and resume from the last healthy step.',
    source: 'topology',
  }
}
