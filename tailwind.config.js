/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 0 2px 3px 0 rgb(0 0 0 / 0.08)',
      },
      fontFamily: {
        'inter': [
          'Inter',
          'sans-serif',
        ],
        'quicksand': [
          'Quicksand'
        ],
        'noto-sans': [
          'Noto Sans',
          'ui-serif',
          'Georgia, Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
        acme: [
          'Acme',
          'ui-serif',
          'Georgia, Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0))' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
}
