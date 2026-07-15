/** @type {import('tailwindcss').Config} */
// Design tokens. The website must feel peaceful, divine, elegant, premium,
// spiritual, emotionally calming. Inspired by Japanese minimalism, Apple HIG,
// Material simplicity, and Indian temple aesthetics.
//
// All colors are exposed as Tailwind utilities (e.g. `bg-cream-50`,
// `text-saffron-600`, `border-maroon-700`) and CSS custom properties in
// `src/styles/tokens.css`. Keep both in sync.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        cream: {
          50: '#FBF7F0',
          100: '#F5EFE3',
          200: '#EDE3CE',
          300: '#E0D2B3',
        },
        // New for v0.2 — warm-beige atmosphere
        beige: {
          50: '#F7F0E2',
          100: '#EFE6D2',
        },
        // New for v0.2 — pure-cream atmosphere (almost white, still warm)
        'pure-cream': '#FEFBF5',
        temple: {
          400: '#B08664',
          500: '#8E6849',
          600: '#6E4F36',
          700: '#4E3825',
          800: '#2E2118',
        },
        saffron: {
          300: '#F1B96B',
          400: '#E5A24A',
          500: '#D98A2B',
          600: '#B86E1E',
        },
        peacock: {
          500: '#1B5E7A',
          600: '#134A60',
          700: '#0D3A4C',
        },
        maroon: {
          600: '#7A1F2B',
          700: '#5C1620',
          800: '#3F0E16',
        },
        ink: {
          900: '#15131A',
          800: '#1E1A24',
          700: '#27212E',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serifBn: ['"Tiro Bangla"', 'Noto Serif Bengali', 'Fraunces', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        // New for v0.2 — editorial-size quotes
        'quote': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
        editorial: '52ch',
      },
      // New for v0.2 — full soft-shadow scale
      boxShadow: {
        soft: '0 1px 2px rgba(20,16,24,0.04), 0 8px 24px rgba(20,16,24,0.06)',
        lift: '0 2px 4px rgba(20,16,24,0.05), 0 16px 40px rgba(20,16,24,0.08)',
        temple: '0 4px 8px rgba(20,16,24,0.06), 0 24px 56px rgba(20,16,24,0.10)',
        saffron: '0 8px 28px rgba(217,138,43,0.22)',
        // Inner highlight used on glass surfaces
        'inset-top-light': 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
      borderRadius: {
        xl2: '1.25rem',
        // New for v0.2
        '2xl2': '2.5rem',
        'editorial': '1.75rem',
      },
      // New for v0.2 — backdrop blur scale
      backdropBlur: {
        xs: '2px',
        glass: '14px',
      },
      transitionTimingFunction: {
        divine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        450: '450ms',
        700: '700ms',
        900: '900ms',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' },
        },
        // New for v0.2 — slow, ambient radial-light drift
        'ambient-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -1%, 0) scale(1.05)' },
        },
        // Subtle vertical breathing used inside editorial images
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        glow: 'glow 4s ease-in-out infinite',
        'ambient-drift': 'ambient-drift 18s ease-in-out infinite',
        'breathe': 'breathe 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
