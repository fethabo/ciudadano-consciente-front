import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent,  Container,  IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrganization } from "../../components/Hooks/requests/Organizations";
import useGetOrganizationRole from "../../security/hooks/useGetOrganizationRole";
import { useDeleteLevel, /* useGetLevelsOfUserInOrganization, */ useGetOrganizationPaths } from "../../components/Hooks/requests/Level";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetRoles } from "../../components/Hooks/requests/Roles";
import CloseIcon from '@mui/icons-material/Close';
import RouteIcon from '@mui/icons-material/Route';
import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";


/* TODO: ver de mejorar la visibilidad del divulgator */
function OrganizationMaps() {
    
    const { idOrganization } = useParams();
    const navigate= useNavigate();
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization} = useGetOrganization({organizationId: idOrganization, enabled: !!idOrganization})
    const role = useGetOrganizationRole({organizationId:idOrganization});
    const user=useUserApi()
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled:true});
    //Si es divulgador Rquest de los levels en los que es divulgador, para esto la asignacion de los user-role-level deben ser en un nodo especifico, impactando sin persisitir en los levels children.
  // console.log( role=="divulgator", idOrganization,!!user?.userId ,  !!roles?.find((r)=>r?.name==role)?.roleId)
  //  const {data: userMaps, isFetching: isFetchingUserMaps, isError: isErrorUserMaps} = useGetLevelsOfUserInOrganization({organizationId: idOrganization, userId:user?.userId, roleId: 6, enabled: role=="divulgator" &&!!idOrganization&&!!user?.userId })    
   
    //si es moderador REQUEST de PATHS DE LA ORGANIZACION (en el peor de los casos el divulgador vera esto pero deshabilitado, si es que no funciona lo otro)
    const {data: organizationMaps, isFetching: isFetchingOrganizationMaps, isError: isErrorOrganizationMaps} = useGetOrganizationPaths({organizationId:idOrganization, enabled: (!!idOrganization)})

    const [deleteLevel, setDeleteLevel] = useState(null);
    const {data: deleteResponse, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteLevel({levelId: deleteLevel, enabled: !!deleteLevel})
    const [openLevel, setOpenLevel] = useState(null);
    const queryClient = useQueryClient()

    useEffect(() => {
        if(deleteResponse){
            queryClient.resetQueries({ queryKey:['useGetOrganizationPaths', idOrganization], exact: true }) 
            setDeleteLevel(null)
            setOpenLevel(null)
        }
    }, [deleteResponse]);

    return ( 
    <Container sx={{textAlign:"left"}}>
         <ConfirmDialog
            open={!!openLevel}
            onClose={()=>setOpenLevel(null)}
            onConfirm={()=>setDeleteLevel(openLevel?.levelId)}
            title={`Eliminando mapa ${openLevel?.name}`}
            message="Esta acción no se puede deshacer. ¿Quierés continuar?"
            loading={isFetchingDelete}
        />
        <Typography variant="h5" >Configuración de mapas: {organization?.name}</Typography>
        <Typography variant="body1">Aquí puedes ver los mapas para los cuales tienes permiso de edición. Si estás buscando alguno en particular y no aparece, puede que no tengas los permisos suficientes.
            También puedes crear nuevos, o eliminar aquellos que ya no se usen en tu organización. </Typography>
        {role=="moderator" && <Alert severity="info" ><AlertTitle>A great power comes with a great responsibility</AlertTitle>Los moderadores de la organizacion pueden editar todo el contenido y configuración. Úsalo sabiamente.</Alert>}
        <Box sx={{width:"100%", justifyContent: "end", display:'flex'}}><Button startIcon={<RouteIcon/>} onClick={()=> navigate(`add`)}>Nuevo</Button>    </Box>
        {organizationMaps?.length > 0 ?
        <Stack display="flex" flexDirection="row" flexWrap={"wrap"} width={"100%"}>   
              {organizationMaps.map((path, index)=>
               <Container key={index} sx={{width:'50%', padding: '1em'}}>
               <Card  sx={{display:'flex', flexDirection:'column', width:'100%', minHeight:'100%'}}>
                    <CardContent>
                        <Typography variant="subtitle1" sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>{path?.name ?? "Nothing here..."} <IconButton onClick={()=>setOpenLevel(path)}><CloseIcon/></IconButton></Typography>
                        <Typography variant="body2">{path?.description ?? "nothing there"}</Typography>
                    </CardContent>
                    <CardActions>
                        <Stack flexDirection={"row"} justifyContent={"space-evenly"} width={"100%"}>
                            <Button startIcon={<VisibilityIcon/>} onClick={()=>navigate(`/map/${path?.levelId}`)}>Probar</Button>
                            <Button startIcon={<EditIcon/>} onClick={()=>navigate(`${path?.levelId}`)}>Editar</Button>
                          
                        </Stack>
                    </CardActions>
                </Card>
                </Container>)}
          </Stack>
           : ((isFetchingOrganizationMaps || isFetchingUserMaps)? <LinearProgress />
                    : <Alert severity="info">No hay mapas disponibles</Alert>
               ) 
            }
            
       
    </Container> );
}

export default OrganizationMaps;