/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "custom-700": "700px",
      },
      keyframes: {
        heroAnimF: {
          "0%": {
            transform: "translateY(10px) scale(1)",
            opacity: "0.8",
          },
          "25%": {
            transform: "translateY(-50px) translateX(0) scale(1.03)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(-50px) translateX(-40px) scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(10px) translateX(-40px) scale(1)",
            opacity: "0.8",
          },
        },
        heroAnimF1: {
          "0%": {
            transform: "translateY(0px) scale(1)",
            opacity: "0.8",
          },
          "25%": {
            transform: "translateY(70px) translateX(0) scale(1.03)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(70px) translateX(50px) scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-70px) translateX(50px) scale(1)",
            opacity: "0.8",
          },
        },
        hero89: {
          "0%": { transform: "rotate(-30deg)" },
          "50%": { transform: "rotate(-15deg)" },
          "100%": { transform: "translateY(20%)" },
        },
        hero98: {
          "0%": { transform: "rotate(35deg)" },
          "50%": { transform: "rotate(15deg)" },
          "100%": { transform: "translateY(20%)" },
        },
        scaleUp: {
          "0%,80%,100%": {
            transform: "scale(0)",
          },
          "40%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "hero-pulse": "heroAnimF 5s infinite alternate linear",
        "hero-pulse1": "heroAnimF1 5s infinite alternate linear",
        hero89: "hero89 5s ease-in-out infinite alternate",
        hero98: "hero98 5s ease-in-out infinite alternate",
        "scale-up": "scaleUp 1s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
