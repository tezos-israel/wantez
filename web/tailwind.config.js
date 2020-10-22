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
      fontFamily: {
        header: ['Oswald'],
      },
      inset: {
        '-1/2': '-50%',
        '-35': '-35%',
      },
      gradientColorStops: {
        nava: '#0e453c',
        navb: '#06211c',
      },
    },
  },
  variants: {
    opacity: ['disabled'],
    cursor: ['disabled'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
