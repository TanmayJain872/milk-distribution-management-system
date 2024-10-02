/* jshint esversion: 9 */

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    button: {
        textTransform: 'none',
        fontSize: '10px',
        fontWeight: '540'
    }
  }
});

export { ThemeProvider };

