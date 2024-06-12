import { getCurrentDate } from '@/utils/get-current-date'
import { FaWifi } from 'react-icons/fa'
import { SiGithub, SiLinkedin, SiMedium, SiWindows } from 'react-icons/si'
import { TimeNow } from './time-now'
import { Button } from './button'

export function NavBar() {
  const { P: currentDate } = getCurrentDate()

  return (
    <nav className="flex h-nav animate-navbar items-end justify-between bg-glass px-5 py-2.5 shadow-navShadow">
      <div className="flex h-full items-center justify-center gap-2.5">
        <Button variant="icon">
          <SiWindows size={30} className="text-white" />
        </Button>
        <a
          href="https://github.com/SchunckLeonardo"
          target="__blank"
          className="rounded-lg bg-transparent p-2 leading-none transition-all hover:bg-zinc-100/15"
        >
          <SiGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/leonardo-schunck-rainha-a08468202/"
          target="__blank"
          className="rounded-lg bg-transparent p-2 leading-none transition-all hover:bg-zinc-100/15"
        >
          <SiLinkedin size={30} className="text-linkedin" />
        </a>
        <a
          href="https://medium.com/@schunckrainhaleonardo"
          target="__blank"
          className="rounded-lg bg-transparent p-2 leading-none transition-all hover:bg-zinc-100/15"
        >
          <SiMedium size={30} className="text-white" />
        </a>
      </div>
      <div className="flex h-full items-center justify-center gap-5 text-white">
        <span>PT-BR</span>
        <FaWifi size={23} />
        <div className="flex flex-col items-end text-xs">
          <TimeNow />
          <span>{currentDate}</span>
        </div>
      </div>
    </nav>
  )
}
