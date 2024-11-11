import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormContent from '../../components/Forms/FormContent';
import { useState } from 'react';

const actividades = [
  {
    id: 1,
    usuario: 'Organización A',
    tematica: 'Medio Ambiente',
    fechaCreacion: '2024-09-01',
    votos: 42,
  },
  {
    id: 2,
    usuario: 'Usuario B',
    tematica: 'Educación',
    fechaCreacion: '2024-08-25',
    votos: 30,
  },
  // Agrega más actividades aquí
];
/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Ver otros contenidos y votarlos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 */
function ContentsPage(){


  const handleVotar = (id) => {
    // Lógica para votar (incrementar el número de votos)
    console.log(`Votar por actividad con id: ${id}`);
  };

  const handleEntrar = (id) => {
    // Lógica para entrar en la actividad
    console.log(`Entrar en actividad con id: ${id}`);
  };

  const [formOpen, setFormOpen] =useState(false);
  const handleClose = ()=>{
    setFormOpen(false)
  }
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Dialog onClose={handleClose} open={formOpen}>
                <DialogTitle>Agregar contenido</DialogTitle>
                <DialogContent>
                    <FormContent/>
                </DialogContent>
            </Dialog>
      <Button onClick={()=>setFormOpen(true)}>Nuevo contenido</Button>
      <Grid container spacing={3}>
        {actividades.map((actividad) => (
          <Grid item xs={12} sm={6} key={actividad.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{actividad.usuario}</Typography>
                <Typography variant="body2">Temática: {actividad.tematica}</Typography>
                <Typography variant="body2">Fecha de creación: {actividad.fechaCreacion}</Typography>
                <Typography variant="body2">Votos: {actividad.votos}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleEntrar(actividad.id)}>
                  Entrar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleVotar(actividad.id)}>
                  Votar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ContentsPage;