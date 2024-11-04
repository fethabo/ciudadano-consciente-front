import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostLevel } from "../Hooks/requests/Level";
import formConfigs from "./formConfigs";
import FormBase from "./FormBase";
import { Box, Button, LinearProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

function FormMap() {
    const navigate= useNavigate();
    const [postForm, setPostForm] =useState(null);
    const { idOrganization } = useParams();    
    const {data, isFetching, isError, isSuccess, isFetchedAfterMount}= usePostLevel({form:postForm, enabled: !!postForm})
    
    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.resetQueries({ queryKey:"usePostLevel", exact: true }) 
    }, []);
    
    useEffect(() => {
        if(data){
           setPostForm(null);//Reseteo el form para permitir otro submit
           if(isSuccess){
            navigate(`/organizations/${idOrganization}/maps/${data?.levelId}`)
           }
        }
    }, [data]);

    const onSubmit = (values) =>{
        console.log("onSubmit",values)
        setPostForm({...values, organization: idOrganization, parent: null})
    }
    const config = formConfigs['Level'];
    return (  
      <FormBase
            fields={config.fields}
            initialValues={ { name: null, description: null }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={isFetching}
        >
        {isFetching && <LinearProgress />}
             <Box display={"flex"} justifyContent={"space-around"}>
                <Button key="volver" onClick={()=>navigate(`/organizations/${idOrganization}/maps`)} disabled={isFetching}>Volver</Button>
                <Button key="submit" type="submit" disabled={isFetching}>Crear</Button>
            </Box>
        </FormBase> 
    );
}

export default FormMap;