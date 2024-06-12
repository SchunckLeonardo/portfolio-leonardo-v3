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
        nav: '55px',
      },
      boxShadow: {
        logoShadow: '0px 3px 16.1px 7px rgba(0, 0, 0, 0.38)',
        hoverShadow: '0px 3px 24.1px 7px rgba(0, 0, 0, 0.38)',
        navShadow: '0px -3px 5.7px 2px rgba(0, 0, 0, 0.25)',
      },
      backgroundColor: {
        glass: 'rgba(176, 173, 198, 0.31)',
      },
      transitionProperty: {
        slideUp: 'transform 1s',
      },
      colors: {
        linkedin: '#0288D1',
      },
      keyframes: {
        slideUpAndShown: {
          from: { transform: 'translateY(150px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        navbar: 'slideUpAndShown 1s cubic-bezier(.16, 1, .3, 1)',
        fadeIn: 'fadeIn 1s cubic-bezier(.16, 1, .3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
