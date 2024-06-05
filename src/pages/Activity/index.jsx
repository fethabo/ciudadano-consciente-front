import { useEffect, useState } from "react";
import MultipleChoice from "../../components/Templates/MultipleChoice";
import { Box } from "@mui/material";
import { URL_API } from "../../constants";
import axios from "axios";
import FormActivityContent from "../../components/Forms/FormActivityContent";

export default function Activity() {

    const [activityContent, setActivityContent] = useState(null);
    const [answer, setAnswer] =useState(null);
    const [enabledPost, setEnabledPost] = useState(false);
    const [activity, setActivity] = useState(null)

    /*
    TODO: PARA IMPLEMENTAR REACT_QUERY
    const { isPending, error, data, isFetching } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        axios
          .get('https://api.github.com/repos/tannerlinsley/react-query')
          .then((res) => res.data),
    })
  
    if (isPending) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message */
  

    useEffect(() => {
        console.warn("ESTAMOS PROBANDO CON EL ID de activity 5, se debe tomar de la URL")
            axios.get(`${URL_API}/activities/5`)/* ACA NECESITAMOS FILTRAR POR LEVEL al pedirla, no tiene sentido traernos todas las actividades y filtrarlas */
              .then((response)=>{
                setActivity(response.data)
                console.log("Activity:", response.data)
              }
              )
       }, []);
    
    const handleResponse =(value)=>{
        console.log("handleResponse", value)
        setAnswer(value)
        setEnabledPost(true);
    }
    useEffect(() => {
        if(activity&& !activityContent){
            axios.get(`${URL_API}/contents/${activity.content}`)
              .then((response)=>
                {
                  const modelObject = JSON.parse(response.data.model); 
                  setActivityContent(modelObject)
                  console.log("Content:", response.data)
                }
              )
        }
     }, [activity]);
console.log("ANSWER EN ACTIVITY", answer)
useEffect(() => {
    
    if(enabledPost){
        const payload={activity:activity.activityId, userId:4, status: answer}

        axios.post(`${URL_API}/answers`, payload)
            .then((response)=>
            {
                const modelObject = JSON.parse(response.data.model); 
                setActivityContent(modelObject)
                console.log("Content:", response.data)
            }
            )
        //setEnabledPost(false)
        }
    //TODO: usar el estado enabledPost para abrir la ventana, en la ventana poner un progress con el fetching del POST y en el reintentar setear el enablePost en false
}, [answer, enabledPost]);
    return ( 
        <Box>

<FormActivityContent />
            Respuesta:{String(answer)}
        <h1>Activity page</h1>{/* TODO: agregar descripcion /nombre de actividad (quizas la descripcion en un tooltip o similar) */}
        {!!activityContent&&
              <MultipleChoice content={activityContent} onResponse={handleResponse} />
    }

      </Box>

     );
}

