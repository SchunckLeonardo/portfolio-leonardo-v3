import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backdropBlur: {
        background: '3px',
      },
      width: {
        logo: '204px',
        select: '124px',
      },
      height: {
        logo: '204px',
      },
      boxShadow: {
        logoShadow: '0px 3px 16.1px 7px rgba(0, 0, 0, 0.38)',
      },
      backgroundColor: {
        glass: 'rgba(176, 173, 198, 0.31)',
      },
    },
  },
  plugins: [],
}
export default config
