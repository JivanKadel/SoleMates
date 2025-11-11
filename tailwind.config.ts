// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        btn: {
          bg: "var(--btn-bg)",
          text: "var(--btn-text)",
        },
        card: {
          bg: "var(--card-bg)",
        },
      },
      boxShadow: {
        card: "var(--shadow)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
