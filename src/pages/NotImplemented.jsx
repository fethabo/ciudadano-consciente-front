import { Alert, AlertTitle, Box } from "@mui/material";
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
const NotImplemented = () => {
    return (
    <Box>
      <EngineeringRoundedIcon fontSize="large" />
      <Alert severity="info"><AlertTitle>Page not implemented, yet...</AlertTitle></Alert>
    </Box>
    )
  };
  
  export default NotImplemented;