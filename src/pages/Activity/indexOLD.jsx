import { Box } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../../constants";
import axios from "axios";

/**
 * TODO: 
 * PROBAR CON UN TEMPLATE.js VALIDO!!!
 * Probar con un componente de aceternity
 * verificar dependencias de librerias
 * tiene mucha actividad con la api este componente (Y MUY ENCADENADA), pensar como reducirla, principalmente para minimizar el componente Y los tiempos de carga
 */
const Activity = () => {
 //1. obtengo el codigo del nivel
  const {level} = useParams();
 //2. obtengo la actividad del nivel
 const [activity,setActivity] = useState(null);
//OTRA ES QUE A PARTIR DEL CODIGO DE LEVEL OBTENER DE UNA EL CONTENIDO, YA QUE LA ACTIVIDAD NO ME INTERESA MAS QUE PARA ESO
 useEffect(() => {
  console.warn("ESTAMOS PROBANDO CON EL ID de activity 11, porque no tengo forma de filtrar por level")
  if(level){
      axios.get(`${URL_API}/activities/11`)/* ACA NECESITAMOS FILTRAR POR LEVEL al pedirla, no tiene sentido traernos todas las actividades y filtrarlas */
        .then((response)=>{
          setActivity(response.data)
          console.log("Activity:", response.data)
        }
        )
    }
 }, [level]);
 //3. obtengo el contenido de la actividad
 const [content, setContent] = useState(null);
 //const modelObject = JSON.parse(content.model); // para pasar a json el contenido 
 useEffect(() => {
    if(activity){
        axios.get(`${URL_API}/contents/${activity.content}`)
          .then((response)=>
            {
              setContent(response.data)
              console.log("Content:", response.data)
            }
          )
    }
 }, [activity]);
 //4. obtengo el tipo de actividad (activityTypeVersion) (a modo de optimizacion, podriamos obtenerlos previamente, de modo asincronico, para ya tenerlas disponibles, quizas el contexto podria obtener todo el path... hay que masticarlo)
  const [contentModel, setContentModel] =useState(null);
  const [activityTypeVersion, setActivityTypeVersion] = useState(null);
 useEffect(() => {
    if (content){
      axios.get(`${URL_API}/activity-type-version/${content.activityTypeVersionId}`)
        .then((response)=>
{          setActivityTypeVersion(response.data);
          setContentModel(JSON.parse(content.model)); //parseo el contenido para tenerlo disponible
          console.log("ActivityTypeVersion: ",response.data)
        }        )
    }
 }, [content]);

 const [template, setTemplate] = useState(null);
 useEffect(() => {

  const fetchDynamicComponent = async () => {
    try {
      /* import("./utils").then((utils) => {
        console.log(utils.capitalizeFirstLetter("nnamdi chidume"));
      }); */
     /*  const ruta = import.meta.env.DEV ? '/@templates/47/index' : '/public/templates/47/index';
import(ruta).then((componente) => {
  // Haz lo que necesites con el componente
  console.log("componente",componente.default);
  setTemplate(componente.default)
}).catch(error => {
  console.error("Error al cargar el componente dinámico:", error);
}); */
      /* const ruta = import.meta.resolve('@templates/47/index');
      import(ruta).then((componente) => {
        console.log("componente",componente.default);
        setTemplate(componente.default)
        // Haz lo que necesites con el componente
      }).catch(error => {
        console.error("Error al cargar el componente dinámico:", error);
      });  */   
      /*
      import( '/templates/47/index').then((componente) => {
          console.log("componente",componente.default);
          setTemplate(componente.default)
        })
*/
//      setTemplate(module.default);
   //   console.log(module)
      //const response = await axios.get('ruta/al/archivo/DynamicComponent.js');
     // const scriptText = activityTypeVersion.template;
     //const scriptBlob = new Blob([scriptText], { type: 'application/javascript' });
     //const scriptURL = URL.createObjectURL(scriptBlob, { type: 'text/jsx' });
       //    const module = await import(/* @vite-ignore */scriptURL );
       
    //   const module = await eval(`${scriptText}`); // Envuelve el script en una función para convertirlo en un módulo
       // setTemplate(scriptText)
    // const module = eval(scriptText)
  //    setTemplate(module.default);
    } catch (error) {
      console.error('Error al cargar el componente dinámico:', error);
    }
  };

  if(activityTypeVersion){
    fetchDynamicComponent();
  }
}, [activityTypeVersion]);
 
 //5. obtengo los archivos del tipo de actividad.
 //6. renderizo el .js obtenido, pasandole como parametros los valores del contenido.
 //7. espero el cambio de estado para enviar el post con la respuesta a la api.
 //8. muestro un mensaje de respuesta (modal temporizado) y vuelvo hacia atras (si guardamos el path en el contexto podriamos continuar al siguiente level (sabemos cual es el siguiente? que define el orden?))
 return (
    <Box>
      <h1>Activity page</h1>
      { template && 
            template
      }
    </Box>
    )
  };
  
  export default Activity;