import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostLevel } from "../Hooks/requests/Level";
import formConfigs from "./formConfigs";
import FormBase from "./FormBase";
import { Alert, Box, Button,  Skeleton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

function FormMap() {
    const navigate= useNavigate();
    const [postForm, setPostForm] =useState(null);
    const { idOrganization } = useParams();    
    const {data, isFetching, isError, isSuccess, isFetchedAfterMount}= usePostLevel({form:postForm, enabled: !!postForm})
    
    const queryClient = useQueryClient()
   
    useEffect(() => {
        if(isFetchedAfterMount){
            if(!isFetching)
                {
                    setPostForm(null);//Reseteo el form para permitir otro submit
                    if(isSuccess){
                      queryClient.resetQueries({ queryKey:['useGetOrganizationPaths', idOrganization], exact: true }) 
                      navigate(`/organizations/${idOrganization}/maps/${data?.levelId}`)
                    }
                }
        }
    }, [data, isFetchedAfterMount, isFetching, isSuccess, idOrganization,navigate, queryClient]);

    const onSubmit = (values) =>{
      //  console.log("onSubmit",values)
        setPostForm({...values, organization: idOrganization, parent: null})
    }
    const config = formConfigs['Level'];
    return (
      <>
        {isFetching ? (
          <Box>
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Box display={"flex"} justifyContent={"space-around"} mt={2}>
              <Skeleton variant="rectangular" width={100} height={36} />
              <Skeleton variant="rectangular" width={100} height={36} />
            </Box>
          </Box>
        ) : isError? <Alert severity="error">Hubo un error al guardar los datos, intenta nuevamente</Alert>
        
        :(
          <FormBase
          formTitle="Nuevo mapa"
            fields={config.fields}
            initialValues={{ name: null, description: null, hidden: false }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
            disableForm={isFetching}
          >
            <Box display={"flex"} justifyContent={"space-around"}>
              <Button key="volver" onClick={() => navigate(`/organizations/${idOrganization}/maps`)} disabled={isFetching}>Volver</Button>
              <Button key="submit" type="submit" disabled={isFetching}>Crear</Button>
            </Box>
          </FormBase>
        )}
      </>
    );
}

export default FormMap;