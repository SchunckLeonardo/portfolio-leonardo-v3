import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'cursor-pointer rounded-lg font-light transition-all',
  variants: {
    variant: {
      glass:
        'bg-glass border border-white hover:brightness-90 text-white px-16 py-3',
      icon: 'p-2 leading-none hover:bg-zinc-100/15',
    },
    textSize: {
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({
  variant,
  textSize,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge([button({ variant, textSize }), className])}
    />
  )
}
