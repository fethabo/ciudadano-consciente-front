import { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

const Pool = () => {
  
  /*TODO: OBTENER PREGUNTAS de la api*/
  const [preguntas, setPreguntas] = useState([
    { id: 1, contenido: '¿Cómo optimizar el rendimiento de React?', votos: 12 },
    { id: 2, contenido: '¿Cuál es la mejor práctica para manejar estados globales?', votos: 8 },
    // Más preguntas iniciales
  ]);

  const handleVotar = (id) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((pregunta) =>
        pregunta.id === id ? { ...pregunta, votos: pregunta.votos + 1 } : pregunta
      )
    );
  };

  //  nueva pregunta
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const handleAgregarPregunta = () => {
    if (nuevaPregunta.trim() !== '') {
      const nueva = {
        id: preguntas.length + 1,
        contenido: nuevaPregunta,
        votos: 0,
      };
      setPreguntas([nueva, ...preguntas]);
      setNuevaPregunta(''); // Limpiar el campo de texto
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Pool de Preguntas
      </Typography>
    
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Introduce tu pregunta"
          variant="outlined"
          minRows={5}
          fullWidth
          value={nuevaPregunta}
          onChange={(e) => setNuevaPregunta(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 1 }}
          onClick={handleAgregarPregunta}
        >
          ¡Preguntar!
        </Button>
      </Box>
      
      {/* DEJARLO COMO GRID? o pensarlo en algo tipo foro? */}
      <Grid container spacing={3}>
        {preguntas.map((pregunta) => (
          <Grid item xs={12} sm={6} key={pregunta.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">{pregunta.contenido}</Typography>
                <Typography variant="body2">Votos: {pregunta.votos}</Typography>
              </CardContent>
              <Box sx={{ padding: 2 }}>
                {/* TODO: CAMBIAR POR UN ICONO FILLED DE CORAZON O DE PULGAR PARA VOTAR, (IMPLEMENTAR BOTON VOTAR) */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleVotar(pregunta.id)}
                >
                  Votar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pool;
