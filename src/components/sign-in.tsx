'use client'

import { getCurrentDate } from '@/utils/get-current-date'
import { Button } from './button'
import { SelectInput } from './Select/select-input'
import { SelectInputItem } from './Select/select-item'
import { TimeNow } from './time-now'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SignIn() {
  const [signedIn, setSignedIn] = useState(false)
  const currentDate = getCurrentDate()
  const { push } = useRouter()

  async function handleSigned() {
    setSignedIn(true)
    await new Promise((resolve) => setInterval(resolve, 1000))
    push('/signed')
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center transition-slideUp ${signedIn ? '-translate-y-full' : ''}`}
    >
      <TimeNow />
      <h2 className="mt-2 text-4xl font-extralight text-white">
        {currentDate}
      </h2>
      <figure className="relative my-16 h-logo w-logo overflow-hidden rounded-full shadow-logoShadow transition-all hover:scale-110 hover:shadow-hoverShadow">
        <Image
          className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 object-cover"
          alt="Leocodelab logo"
          src="/images/leocodelab.png"
          width={204}
          height={204}
        />
      </figure>
      <Button
        onClick={handleSigned}
        type="button"
        variant="glass"
        textSize="2xl"
      >
        Sign in
      </Button>
      <div className="flex h-1/6 w-4/5 items-end justify-end">
        <SelectInput defaultValue="pt-br" placeholder="Select a language...">
          <SelectInputItem value="pt-br" text="PT-BR" />
          <SelectInputItem value="en-us" text="EN-US" />
        </SelectInput>
      </div>
    </div>
  )
}
