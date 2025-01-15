import { Box, Button, LinearProgress } from "@mui/material";
//import { generateForm } from "../../components/Forms/generateForm";
import { useGetOrganization, usePatchOrganization, usePostOrganization } from "../Hooks/requests/Organizations";
import {  useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormBase from "./FormBase";
import formConfigs from "./formConfigs";


/**
 * 
 * @returns 
 * @todo: no se tiene que poder editar el nombre de la org.
 *  - BUG: si falla el patch no permite realizar otro
 */
export default function FormOrganization() {
    const navigate= useNavigate();
    const [postForm, setPostForm] =useState(null);
    //const {data, isFetching, isError} = usePostOrganization({form: postForm, enabled: !!postForm})
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
 
    const {data: responsePatch, isFetching: isFetchingPatch, isError: isErrorPatch}= usePatchOrganization({form:postForm, organizationId: idOrganization, enabled: !!postForm&&!!idOrganization})
 
    useEffect(() => {
        if(!isFetchingPatch && responsePatch ){
            setPostForm(null);//Reseteo el form para permitir otro submit
        }
    }, [responsePatch, isFetchingPatch]);

    const onSubmit = (values) =>{
        console.log("onSubmit",values)
        const org = organization;
        Object.keys(values).forEach(key => {
            if (key in org) {
              org[key] = values[key];
            }
          });
        setPostForm(org)
    }
    const config = formConfigs['Organization'];
    return (  
        isFetchingOrganization?
        <LinearProgress/>
        : <FormBase
            fields={config.fields}
            initialValues={ { name: organization?.name, description: organization?.description, email: organization?.email }}
            validationSchema={config.validationSchema}
            onSubmit={onSubmit}
        >
        {isFetchingPatch && <LinearProgress />}
             <Box display={"flex"} justifyContent={"space-around"}>
                <Button key="volver" onClick={()=>navigate(`/organizations/${idOrganization}`)} disabled={isFetchingPatch}>Volver</Button>
                <Button key="submit" type="submit" disabled={isFetchingPatch||isFetchingOrganization}>GUARDAR</Button>
            </Box>
        </FormBase> 
    );
}

 