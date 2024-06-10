import { Box, LinearProgress, Typography } from "@mui/material";
//import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../constants";
import MapCytoscape from "../../components/MapCytoscape";
import WindowLevel from "../../components/WindowLevel";
import { useGetLevel, useGetLevelChildrens } from "../../components/Hooks/requests/Level";
import { useGetAnswersFromLevel } from "../../components/Hooks/requests/Answer";

/* TODO: abstraer funciones de axios? organizaria bastante el uso
* - agregar loading a funciones de axios (ver doc)
* agregar alias para dirigir a funciones axios, constantes, componentes (y evitar la ruta relativa)
* cambiar estilo de nodo si tiene respuesta correcta 
* agregar estilo a conexiones entre nodos si existe respuesta correcta en el parent,
*/

const Map = () => {

  const { idParentLevel } = useParams();
  //const [path, setPath] = useState();
  //const [childrens, setChildrens] = useState();
//  const [answers, setAnswers] = useState();
  const {data: path, isFetching: isFetchingPath}= useGetLevel({levelId: idParentLevel, enabled: !!idParentLevel});
  const {data: childrens, isFetching: isFetchingChildrens}= useGetLevelChildrens({levelId: idParentLevel, enabled:!!idParentLevel})
  const {data: answers, isFetching: isFetchingAnswers}= useGetAnswersFromLevel({levelId: idParentLevel, enabled:!!idParentLevel})



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
     // console.log("level", level)
      const position = getPosition(level.parent);

      // Agregar el nuevo elemento
     // console.log(level)
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
const [activity, setActivity] = useState(null);
console.log(activity)
/* TODO: OBTENER EL LEVEL PARA VER SI TIENE ACTIVIDAD; SI TIENE ACTIVIDAD HABILITAR LA VENTANA,  */
const handleSelect= (value)=>{
  //console.log("handleSelect", value)
  setLevelSelectedId(value)
}

//OBTENGO EL LEVEL SELECCIONADO
useEffect(() => {
  if (levelSelectedId){
    axios.get(`${URL_API}/activities/level/${levelSelectedId}`)
      .then((response)=>{
        setActivity(response?.data)
    })
  }
}, [levelSelectedId]);
console.log(childrens?.find((level)=>level?.levelId===levelSelectedId), childrens, levelSelectedId)
    return (
    <Box>
      <h1>Mapa</h1>   
     SELECCIONADO: {levelSelectedId}
     <WindowLevel open={!!activity&&!!levelSelectedId} activity={activity} level={childrens?.find((level)=>level?.levelId===Number(levelSelectedId))} handleClose={()=>setActivity(null)}/>
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
  };
  
  export default Map;

   /* childrens.map((level,index)=>

              <div key={index}>{level.levelId}-{level.name}
         
              <Button onClick={()=>navigate(`${location.pathname}/${level.levelId}`)}>Ir a level</Button> </div>
          )}
    </div> */