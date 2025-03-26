/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        secondary: "#474949",
        accent: "#285857",
        "accent-secondary": "#379B99",
      },
      backgroundColor: {
        secondary: "#285857", // Added this line - matches --colour-g300
      },
      borderColor: {
        secondary: "#285857", // Added this line - matches --colour-g300
      },
    },
  },
  plugins: [],
};
