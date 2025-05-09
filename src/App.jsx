import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';
import { MapProvider } from './components/Hooks/MapContext';
import { UserProvider } from './components/Hooks/UserContext';
import { SnackbarProvider} from 'notistack'
import WrapperClientProvider from './components/WrapperClientProvider';
import { useEffect } from 'react';
import Joyride from 'react-joyride';


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
      primary: {
        main: '#FFA500',
        dark: '#CC8400',
        light: '#FFB733',
      },
      secondary: {
        main: '#0077CC',
        light: '#4DA6FF',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#BBBBBB',
      },
      success: {
        main: '#4CAF50',
      },
      error: {
        main: '#F44336',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: { color: '#FFFFFF' },
      h2: { color: '#FFFFFF' },
      body1: { color: '#BBBBBB' },
      body2: { color: '#BBBBBB' },
    },
  });

 /*  const steps = [
    {
      target: '.pathsSection',
      content: 'Explora nuevos caminos y comienza a jugar en cualquiera de ellos.',
    },
    {
      target: '.cardOrganizations',
      content: 'Gestiona el contenido de tus organizaciones o crea nuevos caminos.',
    },
    {
        target: '.contentsButton',
        content: 'Pulsa aquí para ver los contenidos de la comunidad, puedes crear los tuyos también!'
    }
    ,
    {
        target: '.poolButton',
        content: 'Pulsa aquí para hacer alguna pregunta, ¡comparte tus inquietudes!'
    },
    {
      target: '.path',
      content: 'Pulsa sobre uno de las tarjetas para comenzar a jugar'
    }
  ]; */

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <SnackbarProvider autoHideDuration={5000}>
            <WrapperClientProvider>
              <UserProvider>
                <MapProvider>
                {/* <Joyride steps={steps} continuous debug  /> */}
                  <Router />
                </MapProvider>
              </UserProvider>
            </WrapperClientProvider>
          </SnackbarProvider>
      </ThemeProvider>
   

  )
}

export default App
