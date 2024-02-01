import './App.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Router from './Router';

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
