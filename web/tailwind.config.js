module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false,
  theme: {
    extend: {
      width: {
        content: 'fit-content',
      },
      fontFamily: {
        header: ['Oswald'],
        museo: ['museo'],
        sans:
          'Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      zIndex: {
        '-1': '-1',
      },
      gradientColorStops: {
        nava: '#0e453c',
        navb: '#06211c',
        filtera: '#0a2c61',
        filterb: '#2d7df8',
      },
      backgroundColor: {
        fund: '#1d2129',
      },
    },
  },
  variants: {
    boxShadow: ({ after }) => after(['focus-within']),
    cursor: ({ after }) => after(['disabled']),
    opacity: ({ after }) => after(['disabled', 'focus-within']),
    outline: ({ after }) => after(['focus-within']),
  },
  plugins: [require('@tailwindcss/forms')],
};
