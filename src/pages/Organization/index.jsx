import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOrganization } from "../../components/Hooks/requests/Organizations";
import { Alert, Box, Button, Container, LinearProgress, Typography } from "@mui/material";
import useGetOrganizationRole from "../../security/hooks/useGetOrganizationRole";
import noAuth from "../../components/Ilustrations/401.svg";


/**
 * @todo edicion y users solo deben mostrarse en la raiz de la organizacion o no?
 * @returns 
 */
export default function Organization() {
    
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
    const navigate = useNavigate();
    const role = useGetOrganizationRole({organizationId:idOrganization})
    const {pathname} = useLocation();
return ( 
       role !=="none" 
       ?(
        <Container>
         { ( isFetchingOrganization)?
                <LinearProgress />
                : isErrorOrganization? <Alert severity="error">Error al cargar la organización</Alert>
                :   <>
                        <Typography variant="h5">{organization?.name}</Typography>
                        <Typography variant="subtitle1">{organization?.description}</Typography>
                        <Box>
                            {pathname!==`/organizations/${idOrganization}` && <Button onClick={()=> navigate(`/organizations/${idOrganization}`)} >Volver</Button>       }
                            <Button onClick={()=> navigate(`./edit`, {relative: 'path'})} disabled={role !== "moderator"} >Editar</Button>          
                            <Button onClick={()=> navigate(`./users`, {relative: 'path'})} disabled={role !== "moderator"} >Permisos</Button>       
                        </Box>
                        </>
        }            
                    <Outlet />
                </Container>)
        : <img src={noAuth}/>
     );
}
