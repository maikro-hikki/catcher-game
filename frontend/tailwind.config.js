/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'game': "url('./assets/bg1.png')",
        'sandbox': "url('./assets/bg2.png')",        
      }
    },
  },
  plugins: [],
}

