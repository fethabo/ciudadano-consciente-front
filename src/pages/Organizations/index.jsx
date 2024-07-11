import { Box, Card, CardContent,  Typography } from "@mui/material";
//import { useGetOrganizations } from "../../components/Hooks/requests/Organizations";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetOrganizationsOfUser } from "../../components/Hooks/requests/Organizations";
import PropTypes from 'prop-types';

function OrganizationCard({organization}) {
  const navigate = useNavigate();
  return ( 
    <Card onClick={()=>navigate(`${organization?.organizationId}`)}>
      <CardContent>
        <Typography variant="h5">{organization?.name}</Typography>
        <Typography variant="subtitle1">{organization?.description}</Typography>
      </CardContent>
    </Card>
   );
}
OrganizationCard.propTypes = {
  organization: PropTypes.object,
}


const Organizations = () => {

  /** TODO: obtener organizaciones desde la api 
   * - si el usuario pertenece a alguna, mostrar organizaciones a las que pertenece
   * -> Selecciona la organizacion:
   *    ->Acceso a edicion de Organizacion 
   *       
   *     ->Mapas disponibles de la organizacion (o nuevo mapa)
   *        ->Mapa de configuracion
   *          ->Agregar level -Abre ventana para carga de level (intentar configuracion visual con el cytoscape, 
   *                cada nodo tendra la opcion de editar level,agregar actividad y de agregar hijos, 
   *                las hojas tendran la opcion de ser eliminadas)
   *                ->Agregar Actividad
   *                      ->Abre ventana para carga de actividad.
   *                ->Modificar Level
   *                      ->Abre ventana para edicion de level
   *          
  */
const user= 8; // TODO OBTENER USUARIO; SE USA 8 COMO PRUEBA

const {data: organizations, isFetching: isFetchingOrganizations , isError: isErrorOrganizations} = useGetOrganizationsOfUser({userId:user, enabled: !!user})

//const {data: organizations, isFetching: isFetchingOrganizations , isError: isErrorOrganizations} = useGetOrganizations({enabled: true})

    return (
    <Box>
      <h1>Tus organizaciones</h1>
      <Typography variant="body1" >
        Selecciona cuál de tus organizaciones quieres gestionar.
      </Typography>
      
      TODO: PONER EN EMBLA CAROUSEL ESTAS ORGANIZACIONES:
      {organizations?.map((organization,index) => <OrganizationCard key={index} organization={organization} />)}
      <Outlet/> 
    </Box>
    )
  };
  
  export default Organizations;