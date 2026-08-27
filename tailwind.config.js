/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        cosmic: {
          bg: "#080811",
          surface: "#0d0e1e",
          card: "#14162e",
          border: "rgba(255, 255, 255, 0.12)",
          violet: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          amber: "#f59e0b",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "shimmer": "shimmer 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(90deg)" },
        },
      },
      boxShadow: {
        'cosmic-card': '0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 92, 246, 0.2)',
        'cosmic-violet': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'cosmic-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
        'cosmic-pink': '0 0 35px -5px rgba(236, 72, 153, 0.45)',
      },
    },
  },
  plugins: [],
};