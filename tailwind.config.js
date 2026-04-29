/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        border: "var(--border)",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        screen_edge: "12px",
        "badge-x": "8px",
        "badge-y": "2px",
      },
      width: {
        avatar_sm: "40px",
        avatar_lg: "96px",
        "event-card": "200px",
      },
      height: {
        navbar: "60px",
      },
      aspectRatio: {
        event_image: "16/9",
      },
      borderRadius: {
        event_image: "8px",
      },
    },
  },
  plugins: [],
};
