const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          fontFamily: {
            sans: ["var(--font-sans)", "sans-serif"],
            serif: ["var(--font-serif)", "serif"],
          },
        },
      },
    },
  },
};

export default config;
