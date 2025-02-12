import { Alert, AlertTitle, Box } from "@mui/material";
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animatedWorkInProgress from "@animations/WorkInProgress.lottie"
const NotImplemented = () => {
    return (
    <Box>
     
      <Alert severity="info" icon={<EngineeringRoundedIcon fontSize="medium" />}><AlertTitle> Page not implemented, yet...</AlertTitle></Alert>
      <DotLottieReact
                                    src={animatedWorkInProgress}
                                    loop
                                    autoplay
                                    />
    </Box>
    )
  };
  
  export default NotImplemented;