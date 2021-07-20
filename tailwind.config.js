module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgray: '#121212',
        darkgraylight: '#1a1a1a',
        grpurple: '#8E2DE2',
        grpurple2: '#4A00E0',
        grpink: '#8A2387',
        grredorange: '#E94057',
        grorange: '#EB5757',
        grblue: '#4568DC',
        grpink2: '#B06AB3',
        grblue2: '#0B486B',
        grorange2: '#F56217',
        grblue3: '#0F2027',
        grblue4: '#203A43',
      },
      width: {
        '20vw': '20vw'
      },
      minWidth: {
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '1/4': '25%',
      },
      maxWidth: {
        '24': '6rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '35%': '35%',
        '50%': '50%',
      },
      maxHeight: {
        '40': '10rem',
        '50%': '50%',
        '15vh': '15vh',
        '35vh': '35vh',
        '50vh': '50vh',
        '65vh': '65vh',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
