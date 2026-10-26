import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing brand blue, kept as the single accent colour.
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fc",
          400: "#36abf7",
          500: "#0b8de9",
          600: "#026fc7",
          700: "#0359a1",
          800: "#074c84",
          900: "#0c406e",
          950: "#08294a",
        },
        // WhatsApp actions only. Darker than the official #25D366 so white
        // text keeps an AA contrast ratio.
        whatsapp: {
          DEFAULT: "#047857",
          dark: "#065f46",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        arabic: ["Noto Sans Arabic", "Segoe UI", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
