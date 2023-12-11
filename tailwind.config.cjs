/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/**/*.{js,ts,jsx,tsx,html,twig}",
    "./theme/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#0a0a0a',
          },
        },
      },
      fontFamily: {
        body: ["zid-font"],
        icons: ["fl-icons"],
        arlit: ['IBM Plex Sans Arabic', 'sans-serif']
      },
      fontWeight: {
        bolder: 'bolder',
      },
      colors: {
        "primary": {
          DEFAULT: "var(--primary-color)",
        },
        "secondary": {
          DEFAULT: "var(--secondary-color)",
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}