import { createTheme } from '@mui/material';
import '../index.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9B57F2',
      light: '#ebddfc'
    },
    secondary: {
      main: '#44D441'
    },
    error: {
      main: '#E02020'
    },
    grey: {
      main: '#95A4A6',
      light: '#dfdfdf'
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
    }
  }
});
