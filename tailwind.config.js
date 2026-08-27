/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0612",
        card: "#18161f",
        cardborder: "#2a2733",
        muted: "#9ca3af",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(120% 70% at 20% 0%, rgba(139,92,246,0.55) 0%, rgba(236,72,153,0.25) 35%, rgba(10,6,18,0) 70%)",
        "accent-gradient": "linear-gradient(135deg, #c084fc 0%, #f472b6 100%)",
      },
    },
  },
  plugins: [],
};
