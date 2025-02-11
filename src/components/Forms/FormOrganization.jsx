import { Alert, Box, Button, LinearProgress } from "@mui/material";
import { useGetOrganization, usePatchOrganization } from "../Hooks/requests/Organizations";
import {  useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";
import { Skeleton } from "@mui/material";


/**
 * 
 * @returns 
 */
export default function FormOrganization() {
    const navigate= useNavigate();
    const [postForm, setPostForm] =useState(null);
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
 
    const {data: responsePatch, isFetching: isFetchingPatch, isError: isErrorPatch}= usePatchOrganization({form:postForm, organizationId: idOrganization, enabled: !!postForm&&!!idOrganization})
 
    useEffect(() => {
        if(!isFetchingPatch ){
            setPostForm(null);
        }
    }, [responsePatch, isFetchingPatch, isErrorPatch]);

    const onSubmit = (values) =>{
       // console.log("onSubmit",values)
        const org = {};
        org.organizationId = organization.organizationId
        org.email = values.email
        org.description = values.description
        setPostForm(org)
    }
    const config = formConfigs['Organization'];
    config.fields = config.fields.map(field => 
        field.name === 'name' ? { ...field, disabled: true } : field
    );
    return (
        isFetchingOrganization ? (
            <Box>
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Box display={"flex"} justifyContent={"space-around"} mt={2}>
                    <Skeleton variant="rectangular" width={100} height={36} />
                    <Skeleton variant="rectangular" width={100} height={36} />
                </Box>
            </Box>
        ) : (
            isErrorOrganization? <Alert severity="error" >Hubo un error al obtener los datos de la organizacion, intenta nuevamente</Alert>
            :
            <FormBase
                fields={config.fields}
                initialValues={{ name: organization?.name, description: organization?.description, email: organization?.email }}
                validationSchema={config.validationSchema}
                onSubmit={onSubmit}
                formTitle="Editar datos básicos de organización"
            >
                {isFetchingPatch && <LinearProgress />}
                <Box display={"flex"} justifyContent={"space-around"}>
                    <Button key="volver" onClick={() => navigate(`/organizations/${idOrganization}`)} disabled={isFetchingPatch}>Volver</Button>
                    <Button key="submit" type="submit" disabled={isFetchingPatch || isFetchingOrganization}>GUARDAR</Button>
                </Box>
            </FormBase>
        )
    );
}

 