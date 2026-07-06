/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/renderer/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#0d0d0d",
          panel: "#1a1a1a",
          input: "#262626",
          hover: "#333333",
          border: "#333333",
          text: "#ffffff",
          muted: "#a1a1a1",
          dim: "#6b6b6b",
          accent: "#10a37f",
          "accent-hover": "#0d8c6d",
        },
        brand: {
          DEFAULT: "#3b82f6",
          dim: "rgba(59,130,246,0.15)",
        },
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["SF Mono", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
