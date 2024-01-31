import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/login" element={<Login />} />
            {/* Agregar rutas propias */}
            {/* INIT (pagina inicial, previo al home) */}
            {/* POOL */}
            {/* SETTINGS */}
            {/* MAP */}
            {/* LEVEL */}
            {/* ACTIVITI (DINAMICO) */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
