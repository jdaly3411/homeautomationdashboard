/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(-180deg) scale(1.2)" },
          "100%": { transform: "rotate(-360deg) scale(1)" },
        },
      },
      animation: {
        spin: "spin 40s linear infinite",
        spinReverse: "spinReverse 50s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
