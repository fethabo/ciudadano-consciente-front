import { Box, Button } from "@mui/material";
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import useKeycloak from "../security/hooks/useKeycloak";

const Login = () => {
  const keycloak = useKeycloak();
  console.log(keycloak)
    return (
    <Box>
      <PsychologyAltIcon fontSize="large" />
      <h1>Login</h1>
      {keycloak && !keycloak.authenticated &&
      <Button onClick={()=>keycloak.login(true)}>
        Login
      </Button>}

    </Box>
    )
  };
  
  export default Login;