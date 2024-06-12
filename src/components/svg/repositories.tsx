import { ComponentProps } from 'react'

interface RepositoriesProps extends ComponentProps<'svg'> {}

export function Repositories({ ...props }: RepositoriesProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48px"
      height="48px"
      viewBox="0 0 512.036 512.036"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M512 511.89L0 511.89 0 0.146 32 0.146 32 479.89 512 479.89z" />
      <path fill="#f2b851" d="M84.128 29.506H188.128V433.506H84.128z" />
      <path fill="#fff" d="M84.128 131.522H188.128V163.522H84.128z" />
      <path fill="#32bea6" d="M232.128 29.506H336.128V433.506H232.128z" />
      <path fill="#fff" d="M232.128 131.522H336.128V163.522H232.128z" />
      <path
        transform="scale(-1) rotate(-5.089 -5123.834 9953.776)"
        fill="#e04f5f"
        d="M390.319 25.682H494.32300000000004V429.699H390.319z"
      />
      <path
        transform="scale(-1) rotate(84.899 157.49 -475.433)"
        fill="#fff"
        d="M418.87 92.055H450.869V196.051H418.87z"
      />
    </svg>
  )
}
