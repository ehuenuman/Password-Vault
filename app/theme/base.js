import { extendTheme } from "native-base";

export default theme = extendTheme({
  colors: {
    primary: {
      50: '#ebebff',
      100: '#c4c6f1',
      200: '#9ea0e1',
      300: '#777ad4',
      400: '#5154c7',
      500: '#383bae',
      600: '#2b2e88',
      700: '#1e2162',
      800: '#10143d',
      900: '#04061a',
    },
    secondary: {
      50: '#dff6ff',
      100: '#b3e1ff',
      200: '#84ccfc',
      300: '#57b8fb',
      400: '#33a4fa',
      500: '#248ae1',
      600: '#186caf',
      700: '#0d4d7e',
      800: '#002e4d',
      900: '#00101e',
    },
    tertiary:
    {
      50: '#ffe3ff',
      100: '#feb2ff',
      200: '#fc80ff',
      300: '#fa4efe',
      400: '#f920fe',
      500: '#e00ce5',
      600: '#ae04b2',
      700: '#7d0080',
      800: '#4c004e',
      900: '#1c001d',
    }
  },
  components: {
    Input: {
      baseStyle: {
        _disabled: {
          opacity: 1
        }
      }
    }
  }
});
