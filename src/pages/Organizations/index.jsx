import { Box } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const Organizations = () => {

  /** TODO: obtener organizaciones desde la api 
   * - si el usuario pertenece a alguna, mostrar disponible? o solo traer las organizaciones del usuario?
  */

    return (
    <Box>
      <PsychologyAltIcon fontSize="large" />
      <h1>Organizations page</h1>
      <div>
        Muestro la organizacion
        <div>
          muestro sus paths(levels de mayor jerarquia) tenemos como identificarlos?
          
        </div>
      </div>
    </Box>
    )
  };
  
  export default Organizations;