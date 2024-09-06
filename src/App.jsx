import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

  const queryClient = new QueryClient()

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      
          <QueryClientProvider client={queryClient}>
            <MapProvider>
              <Router />
            </MapProvider>
          </QueryClientProvider>       
      </ThemeProvider>
   

  )
}

export default App
