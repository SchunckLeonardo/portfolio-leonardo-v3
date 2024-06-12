import { Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from './button'
import { Brain } from './svg/brain'
import { Programmer } from './svg/programmer'
import { Repositories } from './svg/repositories'
import Image from 'next/image'
import { ProgressBar } from './progress-bar'

export function Desktop() {
  return (
    <div className="grid-cols-desktop grid h-full w-full px-8 py-10">
      <section className="animate-fadeIn flex flex-col items-start gap-12 text-white">
        <Button
          variant="icon"
          className="flex w-28 flex-col items-center justify-center gap-2"
        >
          <Repositories />
          <span>Repositories</span>
        </Button>
        <Button
          variant="icon"
          className="flex w-28 flex-col items-center justify-center gap-2"
        >
          <Programmer />
          <span>About me</span>
        </Button>
        <Button
          variant="icon"
          className="flex w-28 flex-col items-center justify-center gap-2"
        >
          <Brain />
          <span>Skills</span>
        </Button>
      </section>
      <section>
        <div className="bg-popup rounded-popup flex w-full flex-col gap-7 px-6 py-4">
          <header className="flex h-full w-full gap-3">
            <Image
              src="/images/album-imagine-dragons.jpg"
              className="shadow-album rounded-lg"
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
