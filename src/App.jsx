import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';


/**
 * TODO: definir tema / o irnos por tailwindCss (habria que reemplazar todo lo realizado actualmente con material)
 */
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>

  )
}

export default App
