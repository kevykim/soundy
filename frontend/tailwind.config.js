/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        120: "600px",
        130: "450px",
        350: "350px",
      },
      width: {
        120: "500px",
        400: "400px",
        650 : "650px",
        750: "750px",
        680: "680px",
        900: "900px",
      },
      colors: {
        audioplayer: "#eff1f2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

