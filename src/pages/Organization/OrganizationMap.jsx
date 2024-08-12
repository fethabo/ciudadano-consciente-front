import { Box, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import MapCytoscape from "../../components/MapCytoscape";
import WindowLevel from "../../components/WindowLevel";
import { useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
//import { useGetAnswersFromLevel } from "../../components/Hooks/requests/Answer";
import { useGetActivityByLevel } from "../../components/Hooks/requests/Activity";
import useMap from "../../components/Hooks/useMap";


/**
 * CONFIGURACION DE MAPA DE LA ORGANIZACION.
 * - Modificar mapa (es igual al de ejecucion)
 * @returns 
 */

export default function OrganizationMap() {

  const { idParentLevel, idOrganization } = useParams();
  const {data: path, isFetching: isFetchingPath, isError: isErrorPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens, isError: isErrorChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})

const [mapElements,setMapElements]=useState([]);
useEffect(() => {
  if (!!childrens && childrens.length > 0) {
    const elements = [];
    const auxParents=[];
    // Función para encontrar la posición de un elemento según su parentId
    const getPosition = (parentId) => {
      console.log("parentId",parentId);
      const parentElement = elements.find(el => el.data.id === parentId);
      if (parentElement) {
        const childrenAuxSize= [...auxParents].filter(x => x===parentId).length;
       // console.log(childrenAuxSize)
        auxParents.push(parentId);
        // Si se encuentra el elemento padre, la posición será un poco más a la derecha
        return { x: parentElement.position.x + 150, y: parentElement.position.y+ (childrenAuxSize*100) };
      } else {
        // Si no hay elemento padre, posición inicial
        return { x: 50, y: 50 };
      }
    };

    // Iterar sobre los childrens
    childrens.forEach(level => {
      // Calcular la posición
      const position = getPosition(level.parent);
      // Agregar el nuevo elemento
      elements.push({ data:{id:level.levelId, label: level.name}, position:position, classes: 'outline' });
      // Si hay parentId, agregar enlace desde el padre
      //falta reubicar los niveles inferiores en una linea (conviene armar una matriz?)
      if (level.parent) {
        elements.push({
          data: { source: level.parent, target: level.levelId }
        });
      }
    });

    // Actualizar el estado con los nuevos elementos
    setMapElements(elements);
  }
}, [childrens]);
const [levelSelectedId, setLevelSelectedId] = useState(null);
//const [activity, setActivity] = useState(null);
//console.log(activity)
/* TODO: OBTENER EL LEVEL PARA VER SI TIENE ACTIVIDAD; SI TIENE ACTIVIDAD HABILITAR LA VENTANA,  */
const handleSelect= (value)=>{
  //console.log("handleSelect", value)
  setLevelSelectedId(value)
}

const {activity, setActivity} = useMap();
console.log(levelSelectedId, "levelSelectedId")

const [habilitadoGetActivity, setHabilitadoGetActivity] =useState(true)
const {data: activityFetched, isFetching: isFetchingActivity, isFetched: isFetchedActivity}= useGetActivityByLevel({levelId:levelSelectedId, enabled: !!levelSelectedId&&habilitadoGetActivity})


/* TODO: actualizar contexto cuando actualizo la actividad */
useEffect(() => {
  console.log(activityFetched, "activityFetched", levelSelectedId)
  if(isFetchedActivity){
    setHabilitadoGetActivity(true);
  }
  if (activityFetched){
    setActivity(activityFetched);
  }
}, [activityFetched, isFetchedActivity]);

console.log(childrens?.find((level)=>level?.levelId===levelSelectedId), childrens, levelSelectedId)
    return (
    <Box>
      <h1>Mapa</h1>   
     SELECCIONADO: {levelSelectedId}
     <WindowLevel open={!!activity&&!!levelSelectedId} activity={!!activity&&activity} level={childrens?.find((level)=>level?.levelId===Number(levelSelectedId))} handleClose={()=>setActivity(null)}/>
            {
            path
             ? <div className="path" style={{background:'darkred'}}>
                    <Typography className="nombre">{path.name}</Typography>
                    <Typography className="descripcion">{path.description}</Typography>
                    {mapElements&&mapElements?.length>0
                    && <MapCytoscape elements={mapElements} onSelect={handleSelect}/>
                    }
                </div>            
                  :<LinearProgress color={'secondary'}/>
            }
                
    </Box>
    )
  }