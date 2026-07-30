import { NextResponse } from 'next/server'

const selectedRepositories = new Set([
  'Yomora',
  'hermes-news',
  'solar-beat-lab',
  'orbitafire-vision',
])

const fallback = [
  {
    name: 'Yomora',
    url: 'https://github.com/SchunckLeonardo/Yomora',
    description: 'Reading ecosystem with a SwiftUI client and Spring API.',
    language: 'Swift',
    stars: 0,
    forks: 0,
  },
  {
    name: 'hermes-news',
    url: 'https://github.com/SchunckLeonardo/hermes-news',
    description: 'Personal technology briefing delivered on WhatsApp.',
    language: 'Java',
    stars: 0,
    forks: 0,
  },
  {
    name: 'solar-beat-lab',
    url: 'https://github.com/SchunckLeonardo/solar-beat-lab',
    description: 'A spatial music sequencer built with Web Audio and Three.js.',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
]

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/users/SchunckLeonardo/repos?per_page=100&sort=updated',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      },
    )

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)

    const repositories = (await response.json()) as Array<{
      name: string
      html_url: string
      description: string | null
      language: string | null
      stargazers_count: number
      forks_count: number
      fork: boolean
    }>

    const normalized = repositories
      .filter(
        (repository) =>
          !repository.fork && selectedRepositories.has(repository.name),
      )
      .map((repository) => ({
        name: repository.name,
        url: repository.html_url,
        description: repository.description,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
      }))

    return NextResponse.json({
      repositories: normalized.length > 0 ? normalized : fallback,
      source: normalized.length > 0 ? 'live' : 'fallback',
    })
  } catch {
    return NextResponse.json({
      repositories: fallback,
      source: 'fallback',
    })
  }
}
