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
    },
  });

  const steps = [
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
  ];

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <SnackbarProvider autoHideDuration={5000}>
            <WrapperClientProvider>
              <UserProvider>
                <MapProvider>
                <Joyride steps={steps} continuous debug  />
                  <Router />
                </MapProvider>
              </UserProvider>
            </WrapperClientProvider>
          </SnackbarProvider>
      </ThemeProvider>
   

  )
}

export default App
