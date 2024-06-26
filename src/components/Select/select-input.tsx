'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronUp } from 'lucide-react'
import { ReactNode } from 'react'

interface SelectInputProps extends Select.SelectProps {
  placeholder: string
  children: ReactNode
}

export function SelectInput({
  placeholder,
  children,
  ...props
}: SelectInputProps) {
  return (
    <Select.Root {...props}>
      <Select.Trigger className="flex w-select items-center justify-between rounded-lg bg-glass px-4 py-2.5 text-white outline-none">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronUp className="h-5 w-5" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          side="top"
          sideOffset={8}
          className="z-10 w-[--radix-select-trigger-width] rounded-lg border border-zinc-200 bg-glass shadow-sm"
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
