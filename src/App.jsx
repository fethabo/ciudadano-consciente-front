import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';
import { MapProvider } from './components/Hooks/MapContext';
import { UserProvider } from './components/Hooks/UserContext';
import { SnackbarProvider} from 'notistack'
import WrapperClientProvider from './components/WrapperClientProvider';
import { useEffect } from 'react';


/**
 * TODO: definir tema )
 */
function App() {
 
   useEffect(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 1000); // Desvanecer antes de ocultar
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <SnackbarProvider autoHideDuration={5000}>
            <WrapperClientProvider>
              <UserProvider>
                <MapProvider>
                  <Router />
                </MapProvider>
              </UserProvider>
            </WrapperClientProvider>
          </SnackbarProvider>
      </ThemeProvider>
   

  )
}

export default App
