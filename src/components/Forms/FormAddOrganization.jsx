import { Alert, AlertTitle, Box, Button,  Stack, Typography } from "@mui/material";
import { usePostOrganization } from "../Hooks/requests/Organizations";
import {  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Skeleton } from "@mui/material";

/**
 * 
 * @returns 
 */
export default function FormAddOrganization() {
    const navigate= useNavigate();
    const [postForm, setPostForm] =useState(null);
 
    const {data: responsePost, isFetching: isFetchingPost, isFetchedAfterMount,isError: isErrorPost}= usePostOrganization({form:postForm, enabled: !!postForm})
 
    useEffect(() => {
       if(isFetchedAfterMount){
        if(!isFetchingPost ){
            if(isErrorPost){
                setPostForm(null);
            }//Reseteo el form para permitir otro submit si falla el post
            if(responsePost){
                const response = responsePost;
                setPostForm(null)
                navigate(`/new-organization/verify/${response?.organizationId}`)
            }
        }
    }
    }, [responsePost, isFetchingPost, isErrorPost, navigate, isFetchedAfterMount]);

    const onSubmit = (values) =>{
        setPostForm(values)
    }

    const config = formConfigs['Organization'];
    
    return (
        isFetchingPost
        ?  
        <Stack gap="1em">
            <Typography variant="h6"><Skeleton variant="text"/></Typography> 
            <Skeleton variant="rounded" width="100%" height={40} />
            <Skeleton variant="rounded" width="100%" height={40} />
            <Skeleton variant="rounded" width="100%" height={40} />
            <Box display={"flex"} justifyContent={"space-around"}>
                    <Skeleton variant="rounded" width={90}  height={30}/>
                    <Skeleton variant="rounded" width={90}  height={30}/>

            </Box>
    </Stack>
        : <>
            <Typography variant="h6">Registrar organización</Typography>
            <FormBase
                fields={config.fields}
                validationSchema={config.validationSchema}
                onSubmit={onSubmit}
            >
                <Box display={"flex"} justifyContent={"space-around"}>
                    <Button key="volver" onClick={() => navigate(`/organizations`)} disabled={isFetchingPost}>Volver</Button>
                    <Button key="submit" type="submit" disabled={isFetchingPost}>GUARDAR</Button>
                </Box>
            </FormBase>
            <Alert severity="info" title="¿Ya registraste tu organización?">
                <AlertTitle align="left">¿Ya registraste tu organización?</AlertTitle>
                Si ya diste de alta a tu organización, tenés que <Button endIcon={<ForwardToInboxIcon />} onClick={() => navigate('/new-organization/verify')}>validar el correo electrónico</Button>
            </Alert>
        </>
    );
}

 