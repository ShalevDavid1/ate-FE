// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // base mode is dark
    primary: {
      main: '#90caf9', // light blue for highlights (e.g., star icons, buttons)
    },
    secondary: {
      main: '#ce93d8', // soft purple (used subtly)
    },
    background: {
      default: '#1e2a38', // matches your sidebar
      paper: '#2c3e50',   // cards & popups
    },
    error: {
      main: '#f44336', // red delete button
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    button: {
      textTransform: 'none', // nicer, lowercase buttons
    },
  },
  shape: {
    borderRadius: 16, // round edges
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // keep cards white for contrast on dark map
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
