/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Exact palette pulled from the original Flutter app
        navy: {
          900: "#1A1A2E",
          800: "#16213E",
          700: "#0F3460",
        },
        brand: {
          cyan: "#00DBDE",
          magenta: "#FC00FF",
          skyblue: "#22E5FF",
          blue: "#3E7ACF",
          teal: "#45B7D1",
        },
        danger: "#FF6B6B",
      },
      backgroundImage: {
        "app-gradient":
          "linear-gradient(to bottom, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
        "brand-gradient": "linear-gradient(to bottom right, #00DBDE, #FC00FF)",
        "drawer-gradient": "linear-gradient(to bottom, #22E5FF, #3E7ACF)",
      },
      fontFamily: {
        sans: ["Roboto", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "24px",
      },
    },
  },
  plugins: [],
};
