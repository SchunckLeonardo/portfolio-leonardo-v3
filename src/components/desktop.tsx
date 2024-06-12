import { Button } from './button'
import { Brain } from './svg/brain'
import { Programmer } from './svg/programmer'
import { Repositories } from './svg/repositories'

export function Desktop() {
  return (
    <div className="grid h-full w-full grid-cols-2 px-8 py-10">
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
          <span>Repositories</span>
        </Button>
      </section>
      <section></section>
    </div>
  )
}
