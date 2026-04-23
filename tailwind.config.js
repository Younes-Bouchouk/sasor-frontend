/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
      },
      spacing: {
        xs:   "8px",
        sm:   "12px",
        md:   "16px",     // ← le plus utilisé pour padding écran / gutters
        lg:   "20px",     // ou 24px selon tes goûts
        xl:   "24px",
      }
    },
  },
  plugins: [],
}