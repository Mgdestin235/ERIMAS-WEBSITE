import type { Config } from 'tailwindcss'

// Design tokens ERIMAS — palette calquée sur l'identité réelle du cabinet
// (logo fourni) : bleu marine profond + blanc comme couleurs dominantes,
// vert sauge/menthe du pictogramme en accent, utilisé avec parcimonie.
// navy-700 (#15335e) = le bleu marine exact du logo/de la charte.
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3f9',
          100: '#cddceb',
          200: '#a3bfda',
          300: '#7099c2',
          400: '#4778ab',
          500: '#2c5a8f',
          600: '#1e4573',
          700: '#15335e',
          800: '#122a4f',
          900: '#0e2140',
          950: '#0a1830',
        },
        ink: {
          DEFAULT: '#15335e',
          soft: '#1c3f6e',
        },
        cream: {
          DEFAULT: '#ffffff',
          dim: '#dde6f2',
        },
        mint: {
          50: '#eff6f6',
          100: '#d7e9e8',
          200: '#b0d3d1',
          300: '#82b8b6',
          400: '#5b9aa0',
          500: '#457f86',
          600: '#35656c',
          700: '#294f55',
          800: '#1f3c41',
          900: '#182f33',
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
        glow: '0 0 0 1px rgba(91,154,160,0.3), 0 8px 30px -8px rgba(91,154,160,0.4)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(21,51,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(21,51,94,0.05) 1px, transparent 1px)',
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
