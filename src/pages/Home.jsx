import { Stack, Card, CardContent, Typography, Divider, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

/**TODO: en estilos agregar acceso 
 * - obtener levels del usuario (los paths que puede realizar)
 * - armar carousel (se podria usar el stepper de mui)
*/

export default function Home (){
    const navigate= useNavigate();

    return(
        <Stack 
            direction='column' 
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
        
        <img src={'/logo.svg'} />
        <Typography position='top' variant='h3'>¡Bienvenido, ciudadano! </Typography>
        <Card>
           <CardContent>
            <Typography>Tus caminos</Typography>
                Levels carousel
                TODO:HACER CAROUSEL, un item por level (path)
                <Button onClick={()=>navigate("/map/2")}>Ir a mapa de Path especifico</Button>
            </CardContent>
         </Card>

         <Card className="acceso" onClick={()=>navigate("/organizations")}>
            <CardContent>
                <SettingsSuggestRoundedIcon/>
                Crea tu propio camino
            </CardContent>
         </Card>
         <Card className="acceso" onClick={()=>navigate("/pool")}>
            <CardContent>
                <SettingsSuggestRoundedIcon/>
                Comparte tus inquietudes
            </CardContent>
         </Card>
         
            
         </Stack>

    )
}
