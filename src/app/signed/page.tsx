import { Desktop } from '@/components/desktop'
import { NavBar } from '@/components/nav-bar'

export default function Signed() {
  return (
    <main className="flex h-full w-full flex-col justify-end overflow-y-hidden">
      <Desktop />
      <NavBar />
    </main>
  )
}
