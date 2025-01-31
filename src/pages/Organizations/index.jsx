import { Alert, Box, Card, CardContent,  Skeleton,  Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetOrganizationsOfUser } from "../../components/Hooks/requests/Organizations";
import PropTypes from 'prop-types';
import useUserApi from "../../components/Hooks/useUserApi";
import { GradientCard } from "@components/Cards";

function OrganizationCard({organization}) {
  const navigate = useNavigate();
  return ( 
    
    <GradientCard onClick={()=>navigate(`${organization?.organizationId}`)} sx={{cursor:"pointer", width: '48%', marginBottom: '1rem'}}>
      <CardContent>
        <Typography variant="h5">{organization?.name}</Typography>
        <Typography variant="subtitle1">{organization?.description}</Typography>
      </CardContent>
    </GradientCard>
   );
}
OrganizationCard.propTypes = {
  organization: PropTypes.object,
}


const Organizations = () => {
    
  const user = useUserApi();
  const {data: organizations, isFetching: isFetchingOrganizations , isError: isErrorOrganizations} = useGetOrganizationsOfUser({userId:user?.userId, enabled: !!user?.userId})
  const navigate = useNavigate();

    return (
    <Box>
      <Typography variant="h5">Tus organizaciones</Typography>
      {isFetchingOrganizations ?
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {[...Array(3)].map((_, index) => (
      <Card key={index} style={{ marginBottom: '1rem', width:'48%' }}>
        <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        </CardContent>
      </Card>
      ))}
      </Box>
      :
      (isErrorOrganizations
      ? <Alert severity="error">Hubo un error al obtener tus organizaciones</Alert>
      : <Box>
      <Typography variant="body1">
        Selecciona cuál de tus organizaciones quieres gestionar.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap:'1em' }}>
        {organizations?.length>0
        ? organizations?.map((organization, index) => <OrganizationCard key={index} organization={organization} />)
        : <Alert severity="info">No perteneces a ninguna organización. Puedes iniciar la creación de una, nuestro equipo deberá aprobarla para que puedas comenzar a crear contenido.</Alert>
      }
        <GradientCard onClick={() => navigate('/new-organization')} sx={{ cursor: "pointer", width: '48%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent>
            <Typography variant="h5" align="center">+ Crear organización</Typography>
          </CardContent>
        </GradientCard>
      </Box>
      <Outlet />
      </Box>)
      }
    </Box>
    )
  };
  
  export default Organizations;