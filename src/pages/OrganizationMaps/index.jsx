import { Alert, Box, Button, Card, CardActions, CardContent,  Container,   IconButton,  Skeleton, Stack, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteLevel,  useGetOrganizationPaths } from "../../components/Hooks/requests/Level";
import CloseIcon from '@mui/icons-material/Close';
import RouteIcon from '@mui/icons-material/Route';
import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";


function OrganizationMaps() {
    
    const { idOrganization } = useParams();
    const navigate= useNavigate();
   
    //si es moderador REQUEST de PATHS DE LA ORGANIZACION (en el peor de los casos el divulgador vera esto pero deshabilitado, si es que no funciona lo otro)
    const {data: organizationMaps, isFetching: isFetchingOrganizationMaps, isError: isErrorOrganizationMaps} = useGetOrganizationPaths({organizationId:idOrganization, enabled: (!!idOrganization)})

    const [deleteLevel, setDeleteLevel] = useState(null);
    const {data: deleteResponse, isFetching: isFetchingDelete} = useDeleteLevel({levelId: deleteLevel, enabled: !!deleteLevel})
    const [openLevel, setOpenLevel] = useState(null);
    const queryClient = useQueryClient()

    useEffect(() => {
        if(deleteResponse){
            queryClient.resetQueries({ queryKey:['useGetOrganizationPaths', idOrganization], exact: true }) 
            setDeleteLevel(null)
            setOpenLevel(null)
        }
    }, [deleteResponse, idOrganization, queryClient]);

    return ( 
    <Container sx={{textAlign:"left"}}>
           
         <Stack gap="1em" marginTop={"1em"}>
            <Typography variant="h5" >Configuración de mapas</Typography>
            <Typography variant="body1">Aquí puedes ver los mapas para los cuales tienes permiso de edición. Si estás buscando alguno en particular y no aparece, puede que no tengas los permisos suficientes.
                También puedes crear nuevos, o eliminar aquellos que ya no se usen en tu organización. </Typography>
            <Box sx={{width:"100%", justifyContent: "center", display:'flex'}}><Button startIcon={<RouteIcon/>} onClick={()=> navigate(`add`)}>Nuevo mapa</Button>    </Box>
        </Stack>
        {isFetchingOrganizationMaps ? (
            <Stack display="flex" flexDirection="row" flexWrap={"wrap"} gap="1em" width={"100%"} marginTop={"1em"}>
                {[...Array(4)].map((_, index) => (
                    <Container key={index} sx={{width:{xs:"100%", sm: '48%'}}}>
                        <Card sx={{display:'flex', flexDirection:'column', width:'100%', minHeight:'100%'}}>
                            <CardContent>
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="60%" />
                            </CardContent>
                            <CardActions>
                                <Stack flexDirection={"row"} justifyContent={"space-evenly"} width={"100%"}>
                                    <Skeleton variant="rectangular" width="40%" height={36} />
                                    <Skeleton variant="rectangular" width="40%" height={36} />
                                </Stack>
                            </CardActions>
                        </Card>
                    </Container>
                ))}
            </Stack>
        ): isErrorOrganizationMaps? <Alert severity="error">Hubo un problema al obtener los mapas</Alert>:
        organizationMaps?.length > 0 ?
        <Stack display="flex" flexDirection="row" flexWrap={"wrap"} gap="1em" width={"100%"} marginTop={"1em"}>   
              {organizationMaps.map((path, index)=>
               <Container key={index} sx={{width:{xs:"100%", sm: '48%'}}}>
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
           : ((isFetchingOrganizationMaps)? 
           <Stack display="flex" flexDirection="row" flexWrap={"wrap"} gap="1em" width={"100%"}>   
            {[...Array(4)].map((_, index) => (
                   <Container key={index} sx={{width:{xs:"100%", sm: '48%'}}}>
                   <Card sx={{display:'flex', flexDirection:'column', width:'100%', minHeight:'100%'}}>
                           <CardContent>
                               <Skeleton variant="text" width="80%" />
                               <Skeleton variant="text" width="60%" />
                           </CardContent>
                           <CardActions>
                               <Stack flexDirection={"row"} justifyContent={"space-evenly"} width={"100%"}>
                                   <Skeleton variant="rectangular" width="40%" height={36} />
                                   <Skeleton variant="rectangular" width="40%" height={36} />
                               </Stack>
                           </CardActions>
                       </Card>
                   </Container>
               ))}
           </Stack>
           : <Alert severity="info">No hay mapas disponibles</Alert>
               ) 
            }
            
            <ConfirmDialog
            open={!!openLevel}
            onClose={()=>setOpenLevel(null)}
            onConfirm={()=>setDeleteLevel(openLevel?.levelId)}
            title={`Eliminando mapa ${openLevel?.name}`}
            message="Esta acción no se puede deshacer. ¿Quierés continuar?"
            loading={isFetchingDelete}
        />
    </Container> );
}

export default OrganizationMaps;