import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos:   "#0D0B1E",
        dusk:     "#2D1B69",
        lavender: "#C4B0E8",
        horizon:  "#F2A97E",
        brass:    "#D4A843",
        teal:     "#4ECDC4",
        ember:    "#FF8C42",
        ivory:    "#F5F0E8",
        bloom:    "#7BC67E",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body:    ["DM Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
