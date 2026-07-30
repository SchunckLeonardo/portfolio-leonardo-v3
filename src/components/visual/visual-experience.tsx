'use client'

import dynamic from 'next/dynamic'
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useState,
} from 'react'

import type { ProjectSlug, VisualSceneState } from '@/types/portfolio'

import { StaticSceneAdapter } from './static-scene-adapter'

const ThreeScene = dynamic(() => import('./three-scene'), {
  ssr: false,
  loading: () => <div className="visual-loading" aria-hidden="true" />,
})

interface VisualExperienceProps {
  state: VisualSceneState
  onProjectSelect: (slug: ProjectSlug) => void
}

interface BoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface BoundaryState {
  failed: boolean
}

class VisualBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Three.js scene disabled; using static adapter.', error, info)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
  } catch {
    return false
  }
}

export function VisualExperience({
  state,
  onProjectSelect,
}: VisualExperienceProps) {
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const supportFrame = window.requestAnimationFrame(() =>
      setSupportsWebGL(canUseWebGL()),
    )
    const updateVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      window.cancelAnimationFrame(supportFrame)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  const fallback = (
    <StaticSceneAdapter state={state} onProjectSelect={onProjectSelect} />
  )

  if (supportsWebGL !== true) return fallback

  return (
    <VisualBoundary fallback={fallback}>
      <ThreeScene
        state={state}
        paused={paused}
        onProjectSelect={onProjectSelect}
      />
    </VisualBoundary>
  )
}
