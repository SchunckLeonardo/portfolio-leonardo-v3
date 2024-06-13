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
        popup: '80vw',
      },
      height: {
        logo: '204px',
        nav: '55px',
        popup: '80vh',
      },
      boxShadow: {
        logoShadow: '0px 3px 16.1px 7px rgba(0, 0, 0, 0.38)',
        hoverShadow: '0px 3px 24.1px 7px rgba(0, 0, 0, 0.38)',
        navShadow: '0px -3px 5.7px 2px rgba(0, 0, 0, 0.25)',
        album: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundColor: {
        glass: 'rgba(176, 173, 198, 0.31)',
        popup: 'rgba(176, 173, 198, 0.50)',
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
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        navbar: 'slideUpAndShown 1s cubic-bezier(.16, 1, .3, 1)',
        fadeIn: 'fadeIn 1s cubic-bezier(.16, 1, .3, 1)',
        content: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      gridTemplateColumns: {
        desktop: '1fr 500px',
      },
      borderRadius: {
        popup: '24px',
      },
      fontFamily: {
        ibm: 'var(--ibm)',
      },
    },
  },
  plugins: [],
}
export default config
