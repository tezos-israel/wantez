module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        content: 'fit-content',
      },
    },
  },
  variants: {
    opacity: ['disabled'],
    cursor: ['disabled'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
