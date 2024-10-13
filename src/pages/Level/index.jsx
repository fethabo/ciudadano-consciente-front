import { Box, Button } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect} from 'react';
import { useGetLevel } from "../../components/Hooks/requests/Level";

/* TODO:
* ESTE COMPONENTE DEJA DE TENER SENTIDO AL IMPLEMENTAR LOS NODOS EN EL MAPA, POR EL MOMENTO LO DEJO
* -definir contexto
*- anidar mas? 
*/
const Level = () => {
  const { level } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const {data: levelData} = useGetLevel({levelId: level, enabled: !!level})
 useEffect(() => {
  if (levelData){
    //SET en el useMAP?
  }
 }, [levelData]);
  return (
    <Box>
      <PsychologyAltIcon fontSize="large" />
      <h1>Level page</h1>
      <div className="level-data">
        <h2>{levelData?.name}</h2>
        <div>{levelData?.description}</div>
        Si se mantiene esta estructura, en este componente obtener los archivos del content y guardarlos en el contexto 
      </div>
      <Button onClick={()=>navigate(location?.pathname+"/activity")}>Comenzar nivel</Button>

    </Box>
    )
  };
  
  export default Level;