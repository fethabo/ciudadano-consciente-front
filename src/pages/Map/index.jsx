import { Box, Button, Typography } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../../constants";

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
    }
  }, [idParentLevel]);

    return (
    <Box>
      <PsychologyAltIcon fontSize="large" />
      <h1>Map page</h1>
      Aca listaremos todos los levels (branches y sus hijos) de un path
      En principio los podemos mostrar listados en acordeones (a modo de vista simplificada), luego hacer una vista copada visualmente
   
  {
   path?
    <div className="path" style={{background:'darkred'}}>
          <Typography className="nombre">{path.name}</Typography>
          <Typography className="descripcion">{path.description}</Typography>
          {childrens&&childrens?.length>0&&
          childrens.map((level,index)=>
            <div key={index}>{level.levelId}-{level.name}
            <Button onClick={()=>navigate(`${location.pathname}/${level.levelId}`)}>Ir a level</Button> </div>
          )}
    </div>
    :<div>cargando</div>
  }    
    </Box>
    )
  };
  
  export default Map;