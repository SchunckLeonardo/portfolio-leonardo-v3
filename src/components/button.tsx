import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'cursor-pointer rounded-lg font-light transition-all px-16 py-3',
  variants: {
    variant: {
      glass: 'bg-glass border border-white hover:brightness-90 text-white',
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
    <button {...props} className={button({ variant, textSize, className })} />
  )
}
