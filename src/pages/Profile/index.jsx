import { Box, Typography } from "@mui/material";
import useGivenName from "../../security/hooks/useGivenName";
import useUserName from "../../security/hooks/useUserName";
import useEmail from "../../security/hooks/useEmail";


/**
 * @todo: agregar cambio de contraseña, quizas tambien mostrar a que organizaciones pertenece
 * @returns 
 */
const Profile = () => {
  const givenName = useGivenName();
  const userName= useUserName();
  const email= useEmail();
  return (
    <Box>
      <Typography variant="subtitle2">Tus datos</Typography>
      <Typography variant="body2">Nombre: <b>{givenName}</b></Typography>
      <Typography variant="body2">Nombre de usuario: <b>{userName}</b></Typography>
      <Typography variant="body2">Correo: <b>{email}</b></Typography>      
    </Box>
    )
  };
  
  export default Profile;