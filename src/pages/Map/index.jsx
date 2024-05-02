import { Box, Button, Typography } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

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

  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 0, y: 20 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
 ];


    return (
    <Box>
      <PsychologyAltIcon fontSize="large" />
      <h1>Mapa</h1>   
      <MapCytoscape elements={elements} />
  {
   path?
    <div className="path" style={{background:'darkred'}}>
          <Typography className="nombre">{path.name}</Typography>
          <Typography className="descripcion">{path.description}</Typography>
          {childrens&&childrens?.length>0&&
            childrens.map((level,index)=>

              <div key={index}>{level.levelId}-{level.name}
              {/* TODO: BUSCAR RESPUESTA */}
              <Button onClick={()=>navigate(`${location.pathname}/${level.levelId}`)}>Ir a level</Button> </div>
          )}
    </div>
    :<div>cargando</div>
  }    
    </Box>
    )
  };
  
  export default Map;