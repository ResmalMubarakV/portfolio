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
        lab: {
          bg: "#030305",
          surface: "#0B0E14",
          card: "#10141E",
          border: "rgba(255, 255, 255, 0.10)",
          emerald: "#10b981",
          teal: "#14b8a6",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        'lab-card': '0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(16, 185, 129, 0.15)',
        'lab-glow': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
      },
    },
  },
  plugins: [],
};