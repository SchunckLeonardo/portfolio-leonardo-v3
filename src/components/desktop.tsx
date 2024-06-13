import { Pause, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'
import { ProgressBar } from './progress-bar'
import { DesktopApps } from './desktop-apps'

export function Desktop() {
  return (
    <div className="grid h-full w-full grid-cols-desktop px-8 py-10">
      <section className="flex animate-fadeIn flex-col items-start gap-12 text-white">
        <DesktopApps />
      </section>
      <section>
        <div className="flex w-full flex-col gap-7 rounded-popup bg-popup px-6 py-4">
          <header className="flex h-full w-full gap-3">
            <Image
              src="/images/album-imagine-dragons.jpg"
              className="rounded-lg shadow-album"
              width={56}
              height={56}
              alt="Bad Liar album image"
            />
            <div className="flex flex-col items-start justify-center gap-0.5 text-white">
              <span className="font-bold">Bad Liar</span>
              <span className="font-light">Imagine Dragons</span>
            </div>
          </header>

          <ProgressBar progress={60} />

          <footer className="flex items-center justify-center gap-7 text-white">
            <button className="p-1">
              <SkipBack />
            </button>
            <button className="rounded-full bg-white p-2">
              <Pause className="text-zinc-800" />
            </button>
            <button className="p-1">
              <SkipForward />
            </button>
          </footer>
        </div>
      </section>
    </div>
  )
}
