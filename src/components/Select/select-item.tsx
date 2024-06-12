'use client'

import * as Select from '@radix-ui/react-select'
import { Check } from 'lucide-react'

interface SelectInputItemProps extends Select.SelectItemProps {
  text: string
}

export function SelectInputItem({ text, ...props }: SelectInputItemProps) {
  return (
    <Select.Item
      className="flex items-center justify-between px-3 py-2.5 text-white outline-none data-[highlighted]:bg-glass/20"
      {...props}
    >
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator>
        <Check className="h-4 w-4 text-white" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
