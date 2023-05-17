import { createTheme } from '@mui/material';
import '../index.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9B57F2',
      light: '#ebddfc',
      dark: '#5d3d9b'
    },
    secondary: {
      main: '#44D441'
    },
    error: {
      main: '#ff5a5f'
    },
    grey: {
      main: '#95A4A6',
      light: '#dfdfdf',
      secondary: '#74767e'
    },
    darkGrey: {
      main: '#242D38',
      light: '#4f5863'
    },
    white: {
      main: '#ffffff'
    },
    black: {
      main: '#000000'
    },
    anchor: {
      main: '#1f57c3'
    },
    white: {
      main: '#ffffff'
    },
    lightGrey: {
      main: '#f4f4f4'
    },
    red: {
      main: '#E02020'
    }
  }
});
