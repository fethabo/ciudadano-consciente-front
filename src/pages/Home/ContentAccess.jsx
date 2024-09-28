import { CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GradientCard } from '../../components/Cards';



const ContentAccess = () => {
    const navigate = useNavigate();
  return (
    <GradientCard sx={{ /* maxWidth: 345, */ m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="#ffffff">
          Únete a la comunidad
        </Typography>
        <Typography variant="body2" color="#ffffff">
          Comparte tus ideas, juega un rato, agrega contenido y nuevas preguntas para el juego.
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <Button size="small" color="primary" variant="contained"  onClick={()=>navigate("/contents")}>
            Contenidos
          </Button>
          <Button size="small" color="primary" variant="outlined" sx={{ color: '#ffffff', borderColor: '#ffffff' }}  onClick={()=>navigate("/pool")}>
            Preguntas
          </Button>
        </Box>
      </CardActions>
    </GradientCard>
  );
};

export default ContentAccess;
