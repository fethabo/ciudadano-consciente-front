import { Box, Typography } from "@mui/material";
import useGivenName from "../../security/hooks/useGivenName";
import useUserName from "../../security/hooks/useUserName";
import useEmail from "../../security/hooks/useEmail";


/**
 * @todo: agregar cambio de contraseña, quizas tambien mostrar a que organizaciones pertenece, 
 * //TODO NO MOSTRAR EL NOMBRE DE USUARIO DEL TOKEN, MOSTRAR EL DE CIUCO Y AGREGAR EDITAR USERNAME
 * // AGREGAR ELIMINAR CUENTA/ ver que hacer a continuacion para que sea fluido
 * @returns 
 */
const Profile = () => {
  const userName= useUserName();
  const email= useEmail();
  return (
    <Box>
      <Typography variant="subtitle2">Tus datos</Typography>
      <Typography variant="body2">Correo: <b>{email}</b></Typography>    
      <Typography variant="body2">Nombre de usuario: <b>{userName}</b></Typography> 
    </Box>
    )
  };
  
  export default Profile;