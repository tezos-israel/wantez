module.exports = {
  important: true,
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
    boxShadow: ({ after }) => after(['focus-within']),
    cursor: ({ after }) => after(['disabled']),
    opacity: ({ after }) => after(['disabled', 'focus-within']),
    outline: ({ after }) => after(['focus-within']),
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
