'use client'

import { Code2, GitFork, Star } from 'lucide-react'
import useSWR from 'swr'

interface GitHubRepository {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  forks: number
}

interface GitHubResponse {
  repositories: GitHubRepository[]
  source: 'live' | 'fallback'
}

const fetcher = (url: string) =>
  fetch(url).then((response) => {
    if (!response.ok) throw new Error('GitHub request failed')
    return response.json() as Promise<GitHubResponse>
  })

export function GitHubPulse() {
  const { data } = useSWR<GitHubResponse>('/api/github', fetcher, {
    revalidateOnFocus: false,
  })

  if (!data)
    return <div className="github-pulse__skeleton" aria-hidden="true" />

  return (
    <section className="github-pulse" aria-label="GitHub pulse">
      <div className="section-kicker">
        <Code2 aria-hidden="true" />
        GitHub pulse
        <span className="live-dot" />
      </div>
      <div className="github-pulse__grid">
        {data.repositories.slice(0, 3).map((repository) => (
          <a
            href={repository.url}
            key={repository.name}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{repository.name}</strong>
            <span>{repository.language ?? 'Code'}</span>
            <span className="repo-stats">
              <Star aria-hidden="true" /> {repository.stars}
              <GitFork aria-hidden="true" /> {repository.forks}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
