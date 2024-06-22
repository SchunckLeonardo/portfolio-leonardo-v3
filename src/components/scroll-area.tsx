import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ScrollProps extends ScrollArea.ScrollAreaProps {
  children: ReactNode
}

export function Scroll({ children, className, ...props }: ScrollProps) {
  return (
    <ScrollArea.Root
      type="always"
      className={twMerge([
        'h-full w-full overflow-hidden rounded-lg',
        className,
      ])}
      {...props}
    >
      <ScrollArea.Viewport className="h-full w-full">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="bg-blackA3 hover:bg-blackA5 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="bg-mauve10 relative flex-1 rounded-[10px] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
