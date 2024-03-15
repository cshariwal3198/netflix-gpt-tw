export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgColor: "var(--background)",
        textColor: "var(--textColor)"
      },
      // backgroundImage: {
      //   bgImage: "url('/images/nflix-bg.jpg')",
      // }
    },
  },
  plugins: [],
}
