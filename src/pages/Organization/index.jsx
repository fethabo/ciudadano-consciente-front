import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOrganization } from "../../components/Hooks/requests/Organizations";
import { Alert, AlertTitle, Box, Button, Container, Divider, Skeleton, Typography } from "@mui/material";
import useGetOrganizationRole from "../../security/hooks/useGetOrganizationRole";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import noAuth from "../../components/Ilustrations/401.svg";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


/**
 * @returns 
 */
export default function Organization() {
    
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
    const navigate = useNavigate();
    const role = useGetOrganizationRole({organizationId:idOrganization})
    const {pathname} = useLocation();
const [showAlert, setShowAlert] = useState(true);

return ( 
    role !=="none" 
    ?(
     <Container sx={{display:'flex', gap:'1em', flexDirection: 'column'}} >
      { ( isFetchingOrganization)?
          (
          <>
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="text" width={300} height={20} />
            <Box>
            <Skeleton variant="rectangular" width={100} height={36} />
            <Skeleton variant="rectangular" width={100} height={36} style={{ marginLeft: '1em' }} />
            </Box>
          </>
        )
          : isErrorOrganization? <Alert severity="error">Error al cargar la organización</Alert>
          :   <>
               <Typography variant="h5">{organization?.name}</Typography>
               <Typography variant="subtitle1">{organization?.description}</Typography>
               {organization?.verified
                ? 
               <Box>
                    {pathname!==`/organizations/${idOrganization}` ? 
                        <Button onClick={()=> navigate(`/organizations/${idOrganization}`)} >Volver</Button>       
                        :<>
                            <Button onClick={()=> navigate(`./edit`, {relative: 'path'})} disabled={role !== "moderator"} >Editar</Button>          
                            <Button onClick={()=> navigate(`./users`, {relative: 'path'})} disabled={role !== "moderator"} >Permisos</Button>    
                        </>}   
               </Box>
               : <Alert severity="warning"> <AlertTitle>El correo de la organizacion no fue confirmado</AlertTitle> Para poder modificar contenido de la organizacion tenes que <Button endIcon={<ForwardToInboxIcon />} onClick={() => navigate('/new-organization/verify')}>validar el correo electrónico</Button>.</Alert>
                }
               </>
     }            
     {role=="moderator" && showAlert && (
         <Alert severity="warning" 
             action={
              <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowAlert(false)}
              >
                  <CloseIcon fontSize="inherit" />
              </IconButton>
             }
         >
          <AlertTitle>A great power comes with a great responsibility</AlertTitle>
          Los moderadores de la organizacion pueden editar todo el contenido y configuración. Úsalo sabiamente.
         </Alert>
     )}
      <Divider orientation="horizontal" />
           
              <Outlet />
          </Container>)
     : <img src={noAuth}/>
     );
}
