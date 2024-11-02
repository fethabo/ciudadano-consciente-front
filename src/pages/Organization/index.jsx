import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetOrganization, useGetUsersWithRoleOrganization } from "../../components/Hooks/requests/Organizations";
import { Button, LinearProgress, Typography } from "@mui/material";
import { useGetOrganizationPaths } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import useGetOrganizationRole from "../../security/hooks/useGetOrganizationRole";
import noAuth from "../../components/Ilustrations/401.svg";


export default function Organization() {
    
    const { idOrganization } = useParams();    
    const {data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization}= useGetOrganization({organizationId:idOrganization, enabled:!!idOrganization})
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetOrganizationPaths({organizationId:idOrganization, enabled:!!idOrganization})
    // const {data: roles, isFetching: rolesOrganization, isError: isErrorRolesOrganization} = useGetUserRolesInOrganization({organizationId:idOrganization, userId:user?.userId, enabled: !!idOrganization&&!!user})
    const navigate = useNavigate();
    const role = useGetOrganizationRole({organizationId:idOrganization})

    return ( 
       role !=="none" ?(
        ( isFetchingOrganization)?
        <LinearProgress />
        :<div>
            <Typography variant="h5">Pagina de la organización {organization?.name}</Typography>
            <Typography variant="subtitle1">{organization?.description}</Typography>
            <Button onClick={()=> navigate(`./edit`, {relative: 'path'})} disabled={role !== "moderator"} >Editar</Button>          
            <Button onClick={()=> navigate(`./users`, {relative: 'path'})} disabled={role !== "moderator"} >Permisos</Button>       
            <Typography variant="h6" align="left">Caminos de la organización</Typography>
            <CarouselPaths paths={paths} isError={isErrorPaths} isLoading={isFetchingPaths||isFetchingOrganization} />
            <Typography variant="h6" align="left">Contenidos de la organización</Typography>
            <Button onClick={()=> navigate(`./contents`, {relative: 'path'})}>Ver contenidos</Button> 
            <Outlet />
        </div>)
        : <img src={noAuth}/>
     );
}
