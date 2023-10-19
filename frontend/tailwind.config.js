/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        120: "600px",
        130: "450px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

