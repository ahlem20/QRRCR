/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#0553B1',    // Add your custom background colors here
        'rose-200': '#FFCFD1',
        'lavender-200': '#F3C6F1',
        'glass': 'var(--glass)',
      },
      fontFamily: {  // Fixed syntax error here (changed curly brace to colon)
        DM: ['DM Sans'],
      },
    },
  },
  plugins: [],
}
