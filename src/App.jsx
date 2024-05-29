import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';
import { MapProvider } from './components/Hooks/MapContext';


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
        <MapProvider>
          <Router />
        </MapProvider>
      </ThemeProvider>
   

  )
}

export default App
