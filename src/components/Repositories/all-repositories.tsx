'use client'

import { useEffect, useState } from 'react'
import { RepositorieItem } from './repositorie-item'

interface Repositorie {
  id: number
  full_name: string
  html_url: string
  description: string
}

export function AllRepositories() {
  const [repositories, setRepositories] = useState<Repositorie[]>()

  useEffect(() => {
    fetch('https://api.github.com/users/SchunckLeonardo/repos?sort=created')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setRepositories(data)
      })
      .catch((error) => {
        console.error('Fetch error:', error) // Log any errors for debugging
      })
  }, [])

  return repositories?.map((repositorie) => (
    <RepositorieItem
      key={repositorie.id}
      link={repositorie.html_url}
      title={repositorie.full_name}
      description={repositorie.description}
    />
  ))
}
