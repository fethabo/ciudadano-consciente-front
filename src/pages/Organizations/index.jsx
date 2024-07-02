import { Box } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const Organizations = () => {

  /** TODO: obtener organizaciones desde la api 
   * - si el usuario pertenece a alguna, mostrar organizaciones a las que pertenece
   * -> Selecciona la organizacion:
   *    ->Acceso a edicion de Organizacion 
   *       
   *     ->Mapas disponibles de la organizacion (o nuevo mapa)
   *        ->Mapa de configuracion
   *          ->Agregar level -Abre ventana para carga de level (intentar configuracion visual con el cytoscape, 
   *                cada nodo tendra la opcion de editar level,agregar actividad y de agregar hijos, 
   *                las hojas tendran la opcion de ser eliminadas)
   *                ->Agregar Actividad
   *                      ->Abre ventana para carga de actividad.
   *                ->Modificar Level
   *                      ->Abre ventana para edicion de level
   *          
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