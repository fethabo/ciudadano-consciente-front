import { useEffect, useState } from "react";
import MultipleChoice from "../../components/Activities/MultipleChoice";
import { Box } from "@mui/material";
import { URL_API } from "../../constants";
import axios from "axios";
import FormActivityContent from "../../components/Forms/FormActivityContent";

export default function Activity() {

    const [activityContent, setActivityContent] = useState(null);
    const [answer, setAnswer] =useState(null);
    const [enabledPost, setEnabledPost] = useState(false);
    const [activity, setActivity] = useState(null)
    useEffect(() => {
        console.warn("ESTAMOS PROBANDO CON EL ID de activity 5, porque no tengo forma de filtrar por level")
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
        setEnabledPost(false)
        }
    
}, [answer, enabledPost]);
    return ( 
        <Box>

<FormActivityContent />
            Respuesta:{String(answer)}
        <h1>Activity page</h1>
        {!!activityContent&&
              <MultipleChoice content={activityContent} onResponse={handleResponse} />
    }

      </Box>

     );
}

