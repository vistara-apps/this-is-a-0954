/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color tokens based on the PRD
        primary: "hsl(240 85% 50%)",
        accent: "hsl(340 80% 55%)",
        bg: "hsl(220 15% 10%)",
        surface: "hsl(220 10% 14%)",
        text: "hsl(0 0% 100%)",
        muted: "hsl(220 10% 70%)",
        border: "hsl(220 15% 20%)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        card: "0px 4px 16px hsla(0, 0%, 0%, 0.2)",
      },
    },
  },
  plugins: [],
}

