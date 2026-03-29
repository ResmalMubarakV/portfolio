export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#0a0a0a", // deep black / charcoal
        surface: "#1a1a1a",
        primary: "#3b82f6", // blue
        secondary: "#8b5cf6", // purple
        muted: "#9ca3af",
      },
      animation: {
        "blob-bounce": "blob-bounce 10s infinite alternate",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
      keyframes: {
        "blob-bounce": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(20px, -20px) scale(1.05)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};