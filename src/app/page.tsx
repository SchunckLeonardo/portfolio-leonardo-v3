import Image from 'next/image'
import { SelectInput } from '@/components/Select/select-input'
import { SelectInputItem } from '@/components/Select/select-item'
import { Button } from '@/components/button'
import { TimeNow } from '@/components/time-now'

export default function Home() {
  return (
    <>
      <TimeNow />
      <h2 className="mt-2 text-4xl font-extralight text-white">
        05 de junho, 2024
      </h2>
      <figure className="h-logo w-logo shadow-logoShadow relative my-16 overflow-hidden rounded-full">
        <Image
          className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 object-cover"
          alt="Leocodelab logo"
          src="/images/leocodelab.png"
          width={204}
          height={204}
        />
      </figure>
      <Button type="button" variant="glass" textSize="2xl">
        Sign in
      </Button>
      <div className="flex h-1/6 w-4/5 items-end justify-end">
        <SelectInput defaultValue="pt-br" placeholder="Select a language...">
          <SelectInputItem value="pt-br" text="PT-BR" />
          <SelectInputItem value="en-us" text="EN-US" />
        </SelectInput>
      </div>
    </>
  )
}
