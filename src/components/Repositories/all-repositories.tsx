/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { RepositorieItem } from './repositorie-item'
import useSWR from 'swr'

interface Repositorie {
  id: number
  full_name: string
  html_url: string
  description: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AllRepositories() {
  const { data, isLoading, error } = useSWR<Repositorie[]>(
    'https://api.github.com/users/SchunckLeonardo/repos?sort=created',
    fetcher,
  )

  if (error) return <p>Erro ao carregar repositórios</p>

  if (isLoading)
    return Array.from({ length: 25 }).map((_, i) => (
      <div
        className="flex h-32 w-full flex-col gap-3 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-800/30 p-5 shadow-lg transition-all hover:scale-105 hover:brightness-150"
        key={i}
      >
        <span className="h-4 w-3/4 animate-pulse rounded-full bg-slate-700" />
        <div className="flex h-full w-full flex-col gap-1">
          <span className="h-2 w-full animate-pulse rounded-full bg-slate-700" />
          <span className="h-2 w-full animate-pulse rounded-full bg-slate-700" />
        </div>
      </div>
    ))

  return data!.map((repositories) => (
    <RepositorieItem
      key={repositories.id}
      link={repositories.html_url}
      title={repositories.full_name}
      description={repositories.description}
    />
  ))
}
