//import reactLogo from '../assets/react.svg'
//import viteLogo from '/vite.svg'
import { Box, Card, CardContent, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
export default function Home (){
    const navigate= useNavigate();

    return(
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-around', minHeight: '50%'}}>
        
        <Typography position='top' variant='h3'>¡Bienvenido, ciudadano! </Typography>
        <Card>
           <CardContent>
                Levels carousel
        </CardContent>
         </Card>

         <Card onClick={()=>navigate("/organizations")}>
            <CardContent>
                <SettingsSuggestRoundedIcon/>
                Gestioná tu organización
            </CardContent>
         </Card>
         
            
         </Box>

    )
}


{/*    
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a> */}
        