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
        // Warm cream / ivory / sand — primary surfaces
        cream: {
          50: '#FBF7F0',
          100: '#F5EFE3',
          200: '#EDE3CE',
          300: '#E0D2B3',
        },
        // Temple brown / muted copper — secondary
        temple: {
          400: '#B08664',
          500: '#8E6849',
          600: '#6E4F36',
          700: '#4E3825',
          800: '#2E2118',
        },
        // Accents — used sparingly
        saffron: {
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
        // Neutrals (deep ink, not pure black — keeps the palette warm)
        ink: {
          900: '#15131A',
          800: '#1E1A24',
          700: '#27212E',
        },
      },
      fontFamily: {
        // Display: Fraunces (variable serif) — headings, em-dashes
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        // Body: Work Sans — calm, neutral, readable
        sans: ['"Work Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Mono: IBM Plex Mono — small labels, time tags
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        // Bengali / Sanskrit fallback chain
        serifBn: ['"Tiro Bangla"', 'Noto Serif Bengali', 'Fraunces', 'serif'],
      },
      fontSize: {
        // Tighter, more deliberate scale than the default
        'display-xl': ['clamp(3.25rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20, 16, 24, 0.04), 0 8px 24px rgba(20, 16, 24, 0.06)',
        ring: '0 0 0 1px rgba(217, 138, 43, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        divine: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
