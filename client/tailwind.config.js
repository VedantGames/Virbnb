/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D"
      },
    },
    fontSize: {
      xxs: [".6rem", "0.7rem"],
    },
  },
  plugins: [],
}

