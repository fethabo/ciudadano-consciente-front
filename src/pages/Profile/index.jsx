import { Alert, Box, Button, Skeleton, Typography } from "@mui/material";
//import useGivenName from "../../security/hooks/useGivenName";
import useUserName from "../../security/hooks/useUserName";
import useEmail from "../../security/hooks/useEmail";
import { useGetStatisticsOfUser } from "@components/Hooks/requests/Statistics";
import { useContext } from "react";
import { KeycloakContext } from "@security/KeycloakContext";

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/**
 * @todo: agregar cambio de contraseña, quizas tambien mostrar a que organizaciones pertenece, 
 * //TODO NO MOSTRAR EL NOMBRE DE USUARIO DEL TOKEN, MOSTRAR EL DE CIUCO Y AGREGAR EDITAR USERNAME
 * // AGREGAR ELIMINAR CUENTA/ ver que hacer a continuacion para que sea fluido
 * {
  "userId": 0,
  "username": "string",
  "email": "string",
  "answersOK": 0,
  "answers": 0,
  "levelsCompleted": 0,
  "votes": 0,
  "concerns": 0,
  "contents": 0
}
 * @returns 
 */
const Profile = () => {
  
  const keycloakContext = useContext(KeycloakContext)
  const userName= useUserName();
  const email= useEmail();
  const {data: statistics, isFetching: isFetchingStatistics, isError: isErrorStatistics} = useGetStatisticsOfUser({enabled: true})
  return (
    <Box>
      <Typography variant="subtitle2">Tus datos</Typography>
      <Typography variant="body2">Correo: <b>{email}</b></Typography>    
      <Typography variant="body2">Nombre de usuario: <b>{userName}</b></Typography> 

      {isFetchingStatistics ? (
        <Box>
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
        </Box>
      ) : isErrorStatistics ? (
        <Alert severity="error">Error al cargar las estadísticas</Alert>
      ) : (
        <Box>
          <Typography variant="subtitle2">Estadísticas</Typography>
          <Typography variant="body2">Respuestas correctas: <b>{statistics.answersOK}</b></Typography>
          <Typography variant="body2">Total de respuestas: <b>{statistics.answers}</b></Typography>
          <Typography variant="body2">Niveles completados: <b>{statistics.levelsCompleted}</b></Typography>
          <Typography variant="body2">Votos: <b>{statistics.votes}</b></Typography>
          <Typography variant="body2">Preocupaciones: <b>{statistics.concerns}</b></Typography>
          <Typography variant="body2">Contenidos: <b>{statistics.contents}</b></Typography>
        </Box>
      )}
        <Button startIcon={<ExitToAppIcon />} onClick={()=> keycloakContext?.logout()}><Typography variant="body2">Logout</Typography></Button>
    </Box>
    )
  };
  
  export default Profile;