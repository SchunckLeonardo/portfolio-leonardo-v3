import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactElement, ReactNode } from 'react'

interface DesktopDialogProps {
  children: ReactNode
  trigger: ReactElement
}

export function DesktopDialog({ children, trigger }: DesktopDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 top-0 h-full w-full bg-zinc-900/15" />
        <Dialog.Content className="h-popup w-popup animate-content fixed left-2/4 top-2/4 z-10 -translate-x-2/4 -translate-y-2/4 rounded-lg bg-slate-900 p-16 text-white">
          {children}

          <Dialog.Close asChild>
            <button className="absolute right-5 top-5 flex items-center justify-center rounded-lg bg-red-800 px-4 py-px shadow-lg hover:brightness-105">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
