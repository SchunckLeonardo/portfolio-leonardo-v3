'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2 } from 'lucide-react'

import type { Locale } from '@/types/portfolio'

export function SoundscapeApp({ locale }: { locale: Locale }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<{
    context: AudioContext
    oscillators: OscillatorNode[]
    gain: GainNode
  } | null>(null)

  const stop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audio.context.currentTime + 0.22,
    )
    window.setTimeout(() => {
      audio.oscillators.forEach((oscillator) => oscillator.stop())
      audio.context.close().catch(() => undefined)
    }, 260)
    audioRef.current = null
    setPlaying(false)
  }

  const start = () => {
    if (playing) return stop()
    const AudioContextCtor = window.AudioContext
    const context = new AudioContextCtor()
    const gain = context.createGain()
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 1.4)
    gain.connect(context.destination)

    const oscillators = [110, 164.81, 220].map((frequency, index) => {
      const oscillator = context.createOscillator()
      const localGain = context.createGain()
      oscillator.type = index === 1 ? 'triangle' : 'sine'
      oscillator.frequency.value = frequency
      localGain.gain.value = index === 0 ? 0.65 : 0.18
      oscillator.connect(localGain)
      localGain.connect(gain)
      oscillator.start()
      return oscillator
    })

    audioRef.current = { context, oscillators, gain }
    setPlaying(true)
  }

  useEffect(() => stop, [])

  return (
    <div className="soundscape-app">
      <div className={`sound-orb ${playing ? 'is-playing' : ''}`}>
        <Volume2 aria-hidden="true" />
        <span />
        <span />
      </div>
      <p>
        {locale === 'pt'
          ? 'Um drone generativo mínimo, sintetizado no navegador. Nenhum arquivo de áudio, nenhum autoplay.'
          : 'A minimal generative drone synthesized in your browser. No audio file, no autoplay.'}
      </p>
      <button className="primary-action" onClick={start} type="button">
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        {playing
          ? locale === 'pt'
            ? 'Silenciar'
            : 'Mute'
          : locale === 'pt'
            ? 'Ativar paisagem sonora'
            : 'Enable soundscape'}
      </button>
    </div>
  )
}
