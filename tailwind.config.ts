import type { Config } from 'tailwindcss'

// Design tokens ERIMAS — palette dédiée (jamais les couleurs par défaut de Tailwind
// pour les teintes de marque). Bleu marine dominant, blanc cassé / noir profond,
// menthe d'accent reprise du logo, utilisée avec parcimonie.
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d7e0ee',
          200: '#aebedd',
          300: '#8199c6',
          400: '#5875ab',
          500: '#3c5686',
          600: '#2b3f68',
          700: '#1f2f50',
          800: '#141f38',
          900: '#0b1526',
          950: '#060c18',
        },
        ink: {
          DEFAULT: '#0a0d12',
          soft: '#12161d',
        },
        cream: {
          DEFAULT: '#f7f5ef',
          dim: '#efece3',
        },
        mint: {
          50: '#eafbf5',
          100: '#cdf5e5',
          200: '#9de9cd',
          300: '#65d8b1',
          400: '#37c096',
          500: '#1fa27d',
          600: '#178067',
          700: '#146555',
          800: '#125045',
          900: '#0f3f38',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.5vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 2.8vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1320px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(6,12,24,0.06), 0 12px 32px -12px rgba(6,12,24,0.18)',
        'card-hover': '0 4px 12px rgba(6,12,24,0.08), 0 24px 48px -16px rgba(6,12,24,0.28)',
        glow: '0 0 0 1px rgba(55,192,150,0.25), 0 8px 30px -8px rgba(55,192,150,0.35)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(247,245,239,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,239,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      animation: {
        'orb-float-1': 'orbFloat1 26s ease-in-out infinite',
        'orb-float-2': 'orbFloat2 32s ease-in-out infinite',
        'orb-float-3': 'orbFloat3 22s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
      keyframes: {
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4%, 6%) scale(1.08)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-6%, -3%) scale(0.94)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(3%, -5%) scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
