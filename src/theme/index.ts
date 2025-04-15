import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Create a theme instance for each mode
export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#0066cc', // --primary-color
        light: '#4d8fda',
        dark: '#004c99',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff9900', // --secondary-color
        light: '#ffb84d',
        dark: '#cc7a00',
        contrastText: '#000000',
      },
      error: {
        main: '#e63946', // --accent-color
        light: '#ec6b76',
        dark: '#b82e38',
      },
      warning: {
        main: '#ffc107', // --warning-color
      },
      info: {
        main: '#17a2b8', // --info-color
      },
      success: {
        main: '#28a745', // --success-color
      },
      text: {
        primary: mode === 'light' ? '#333333' : '#f5f5f5', // --text-color
        secondary: mode === 'light' ? '#5f6368' : '#b0b0b0',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f5f5f5' : '#1e1e1e', // --light-bg
      },
    },
    typography: {
      fontFamily: '&quot;Roboto&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif', // --font-main
      h1: {
        fontFamily: '&quot;Georgia&quot;, serif', // --font-headings
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: '&quot;Georgia&quot;, serif',
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontFamily: '&quot;Georgia&quot;, serif',
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 5, // --border-radius
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 5,
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: 250,
          },
        },
      },
    },
  });
