/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontSize: {
        xs: 'clamp(10px, 0.8vw, 12px)',
        sm: 'clamp(12px, 0.9vw, 14px)',
        base: 'clamp(14px, 1.2vw, 18px)',
        lg: 'clamp(16px, 1.1vw, 18px)',
        xl: 'clamp(16px, 1.2vw, 20px)',
        '2xl': 'clamp(20px, 2vw, 24px)',
        '3xl': 'clamp(26px, 1.5vw, 30px)',
        '4xl': 'clamp(28px, 2vw, 36px)',
      },
    },
  },
  plugins: [],
}

