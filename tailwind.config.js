module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: '450px' }, // 👈 Custom screen for devices smaller than 450px
      },
    },
  },
  plugins: [],
};
