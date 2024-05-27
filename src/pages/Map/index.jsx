import { Box, Button, LinearProgress, Typography } from "@mui/material";
//import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../constants";
import MapCytoscape from "../../components/MapCytoscape";

/* TODO: abstraer funciones de axios? organizaria bastante el uso
* - agregar loading a funciones de axios (ver doc)
* agregar alias para dirigir a funciones axios, constantes, componentes (y evitar la ruta relativa)
*/

const Map = () => {

  const navigate= useNavigate();
  const location= useLocation();
  const { idParentLevel } = useParams();
  const [path, setPath] = useState();
  const [childrens, setChildrens] = useState();
  const [answers, setAnswers] = useState();
  
  useEffect(() => {
    if (idParentLevel){
      axios.get(`${URL_API}/levels/${idParentLevel}`)
        .then((response)=>{
          setPath(response?.data)
      })
      axios.get(`${URL_API}/levels/${idParentLevel}/childrens`)
      .then((response)=>{
        setChildrens(response?.data)
    })
    axios.get(`${URL_API}/answers/levels/${idParentLevel}/childrens`)
    .then((response)=>{
      setAnswers(response?.data)
      /*  {
    "answer": 1,
    "user": 5,
    "created": "2024-01-09",
    "lastModified": "2024-01-09",
    "status": false,
    "level": 5,
    "parent": 2,
    "activity": 5,
    "content": 7
  } */
  })
    }
  }, [idParentLevel]);
/* useEffect(() => {
  if (!!childrens && childrens?.length>0 ){
    const newElements=[];
    //TODO: calcular la posicion segun padre (Y) y por transición (parentID)
    let position= { x:0, y:0}; //posicion del primero
    childrens.map((level)=>{
      newElements.push({data: level.levelId, label: level.name, position:position })
      
      position= {}
    })
  
  }
}, [childrens]); */


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
        console.log(childrenAuxSize)
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
      console.log("level", level)
      const position = getPosition(level.parent);

      // Agregar el nuevo elemento
      console.log(level)
      elements.push({ data:{id:level.levelId, label: level.name}, position:position });

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
const [levelSelected, setLevelSelected] = useState(null);
//console.log("levelSelected",levelSelected)
  /* const elements = [
    { data: { id: 'one', label: 'nana'}, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 0, y: 20 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
 ]; */
//console.log("mapElements",mapElements)
const handleSelect= (value)=>{
  //console.log("handleSelect", value)
  setLevelSelected(value)
}

    return (
    <Box>
      <h1>Mapa</h1>   
     SELECCIONADO: {levelSelected}
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