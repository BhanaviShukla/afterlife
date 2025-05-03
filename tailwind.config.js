/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//     },
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       textColor: {
//         secondary: "#474949",
//         accent: "#285857",
//         "accent-secondary": "#379B99",
//       },
//       backgroundColor: {
//         secondary: "#285857", // Added this line - matches --colour-g300
//       },
//       borderColor: {
//         secondary: "#285857", // Added this line - matches --colour-g300
//       },
//     },
//   },
//   plugins: [],
// };

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
      colors: {
        // Neutrals
        white: "var(--colour-white)",
        n50: "var(--colour-n50)",
        n100: "var(--colour-n100)",
        n200: "var(--colour-n200)",
        n300: "var(--colour-n300)",
        n400: "var(--colour-n400)",
        n500: "var(--colour-n500)",
        black: "var(--colour-black)",

        // Primary (Green)
        g0: "var(--coloud-g0)",
        g25: "var(--colour-g25)",
        g100: "var(--colour-g100)",
        g200: "var(--colour-g200)",
        g300: "var(--colour-g300)",
        g400: "var(--colour-g400)",

        // Status - Positive
        "status-p100": "var(--colour-status-p100)",
        "status-p300": "var(--colour-status-p300)",

        // Status - Warning
        "status-w100": "var(--colour-status-w100)",
        "status-w300": "var(--colour-status-w300)",

        // Status - Negative
        "status-d100": "var(--colour-status-d100)",
        "status-d300": "var(--colour-status-d300)",

        // Disabled content
        "content-disabled": "var(--colour-content-disabled)",
      },
      spacing: {
        unit: "var(--dimensions-unit)",
        2: "var(--dimensions-2)",
        3: "var(--dimensions-3)",
      },
      fontSize: {
        base: "16px", // Matches your root font-size
      },
      textColor: {
        secondary: "var(--colour-n400)",
        accent: "var(--colour-g300)",
        "accent-secondary": "var(--colour-g200)",
      },
      backgroundColor: {
        secondary: "var(--colour-g300)",
      },
      borderColor: {
        secondary: "var(--colour-g300)",
      },
    },
  },
  plugins: [],
};
