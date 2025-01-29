import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogContent, DialogTitle, Stack, Skeleton } from '@mui/material';
import FormContent from '../../components/Forms/FormContent';
import { useState } from 'react';
import { useGetContents } from '@components/Hooks/requests/Content';
import { PhoneEnabled } from '@mui/icons-material';


/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Ver otros contenidos y votarlos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 */
function ContentsPage(){

  const{ data: contents, isFetching, isError} = useGetContents({enabled: true})

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
    <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Dialog onClose={handleClose} open={formOpen} fullWidth>
                <DialogTitle>Agregar contenido</DialogTitle>
                <DialogContent >
                    <FormContent  public/>
                </DialogContent>
            </Dialog>
      <Button onClick={()=>setFormOpen(true)}>Nuevo contenido</Button>
<Stack sx={{display:'flex', flexWrap:'wrap', flexDirection:'row', gap: "1em"}} >
  {isFetching ? (
  [1, 2, 3, 4].map((_, index) => (
    <Card key={index} sx={{ marginBottom: 2, width: {xs:'100%', sm: "48%"} }}>
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="70%" />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Skeleton variant="rectangular" width="45%" height={36} />
        <Skeleton variant="rectangular" width="45%" height={36} />
      </Box>
    </Card>
  ))
   
  ):
        contents?.map((content, index) => (
            <Card key={index} sx={{ marginBottom: 2, width: {xs:'100%', sm: "48%"} }}>
              <CardContent>
                <Typography variant="h6">{content.description}</Typography>
                <Typography variant="body2">Usuario: {content.creator}</Typography>
                <Typography variant="body2">Organization: {content.organization}</Typography>
                <Typography variant="body2">Activity type version (CAMBIAR por nombre de tipo de actividad): {content.activityTypeVersionId}</Typography>
                <Typography variant="body2">Temática(tags): Obtener tags y mostrarlos</Typography>
                <Typography variant="body2">Votos: obtener votos y mostrarlos</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleEntrar(content.contentId)}>
                  Entrar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleVotar(content.contentId)}>
                  Votar
                </Button>
              </Box>
            </Card>
        ))}
        </Stack>
    </Box>
  );
}

export default ContentsPage;