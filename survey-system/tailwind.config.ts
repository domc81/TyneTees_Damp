import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette - deep naval blue for Tyne Tees
        brand: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a6ff',
          500: '#0c8ce9',
          600: '#006fc7',
          700: '#0058a1',
          800: '#004883',
          900: '#053c6b',
          950: '#042748',
        },
        // Deep navy for dark theme
        navy: {
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c4d8eb',
          300: '#9abdd8',
          400: '#6a9cc1',
          500: '#4a7fa8',
          600: '#3a668a',
          700: '#2e4f6e',
          800: '#264259',
          900: '#1f3748',
          950: '#14202d',
          1000: '#0d1520',
        },
        // Surface colors
        surface: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Glass effect colors
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          heavy: 'rgba(255, 255, 255, 0.25)',
          border: 'rgba(255, 255, 255, 0.2)',
          borderStrong: 'rgba(255, 255, 255, 0.3)',
        },
      },
      fontFamily: {
        display: ['var(--font-geist-mono)', 'SF Mono', 'Monaco', 'Consolas', 'monospace'],
        body: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-geist-sans)', 'Inter', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(12, 140, 233, 0.15)',
        'brand-lg': '0 8px 28px 0 rgba(12, 140, 233, 0.2)',
        'inner-brand': 'inset 0 2px 4px 0 rgba(12, 140, 233, 0.1)',
        // Glass shadows
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glass-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glow': '0 0 40px 5px rgba(12, 140, 233, 0.3)',
        'glow-lg': '0 0 60px 10px rgba(12, 140, 233, 0.4)',
        // Accent glows
        'glow-success': '0 0 30px 3px rgba(16, 185, 129, 0.3)',
        'glow-warning': '0 0 30px 3px rgba(245, 158, 11, 0.3)',
        'glow-error': '0 0 30px 3px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-delay': 'fadeIn 0.4s ease-out 0.1s both',
        'fade-in-delay-2': 'fadeIn 0.4s ease-out 0.2s both',
        'fade-in-delay-3': 'fadeIn 0.4s ease-out 0.3s both',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-up-delay': 'slideUp 0.4s ease-out 0.1s both',
        'slide-up-delay-2': 'slideUp 0.4s ease-out 0.2s both',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-in-delay': 'scaleIn 0.2s ease-out 0.1s both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 1s',
        'tilt': 'tilt 10s ease-in-out infinite',
        'aurora': 'aurora 15s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 40px 5px rgba(12, 140, 233, 0.3)' },
          '50%': { boxShadow: '0 0 60px 10px rgba(12, 140, 233, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        tilt: {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)' },
          '50%': { transform: 'perspective(1000px) rotateX(-1deg) rotateY(-2deg)' },
          '75%': { transform: 'perspective(1000px) rotateX(1deg) rotateY(1deg)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
        'grid-dark': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, transparent 50%), linear-gradient(225deg, var(--tw-gradient-to) 0%, transparent 50%), linear-gradient(45deg, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        'aurora-gradient': 'conic-gradient(from 90deg at 50% 50%, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #1a1a2e 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
