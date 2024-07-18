import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetOrganization, useGetUserRolesInOrganization, useGetUsersWithRoleOrganization } from "../../components/Hooks/requests/Organizations";
import { Button, Typography } from "@mui/material";
import { useGetOrganizationPaths } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";



export default function Organization() {
    
    const user= 8 //TODO Obtener usuario (8 es prueba)
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetOrganizationPaths({organizationId:idOrganization, enabled:!!idOrganization})
   
    const {data: roles, isFetching: rolesOrganization, isError: isErrorRolesOrganization} = useGetUserRolesInOrganization({organizationId:idOrganization, userId:user, enabled: !!idOrganization&&!!user})
    const navigate = useNavigate();
    return ( 
       ( isFetchingOrganization)?
        <div>cargando.. agregar skeleton</div>
        :<div>
            <Typography variant="h5">Pagina de la organización {organization?.name}</Typography>
            <Typography variant="subtitle1">{organization?.description}</Typography>
            <Button onClick={()=> navigate(`./edit`, {relative: 'path'})}>Editar</Button>          {/* TODO: si el usuario es admin de la organizacion puede editar la organizacion */}
            <Button onClick={()=> navigate(`./users`, {relative: 'path'})}>Permisos</Button>          {/* TODO: si el usuario es admin de la organizacion puede editar la organizacion */}           
            <Typography variant="h6" align="left">Caminos de la organización</Typography>
            <CarouselPaths paths={paths} isError={isErrorPaths} isLoading={isFetchingPaths||isFetchingOrganization} />
            <Typography variant="h6" align="left">Contenidos de la organización</Typography>
            <Button onClick={()=> navigate(`./contents`, {relative: 'path'})}>Ver contenidos</Button> 
            <Outlet />
        </div>
     );
}
