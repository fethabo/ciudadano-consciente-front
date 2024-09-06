import { Stack, Card, CardContent, Typography, Divider, Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { useGetFavoritePaths, useGetPaths, useGetRecentlyPaths } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import { generateForm } from "../../components/Forms/generateForm";

export default function Home (){
    const navigate= useNavigate();
    //TODO: OBTENER usuario! se usa el 8 para probar
    const user= 8;
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetPaths({enabled:true});
    const {data: favoritePaths, isFetching: isFetchingFavoritePaths, isError: isErrorFavoritePaths}= useGetFavoritePaths({userId: user ,enabled:true});
    const {data: recentPaths, isFetching: isFetchingRecentlyPaths, isError: isErrorRecentlyPaths}= useGetRecentlyPaths({userId: user ,enabled:true});
  
    return(
        <Stack 
            direction='column' 
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
          {/*   {generateForm('Activity',{name:'Un nombre'}, ()=>console.log("SUBMIT"), <Button type="submit">GUARDAR</Button> )} */}
            <Typography position='top' variant='h3'>¡Bienvenido, ciudadano! </Typography>

            {/* disponibles */}
            <Box >
                <Typography variant="h5">Explora nuevos caminos!</Typography>
                <CarouselPaths style={{maxWidth:'100%'}} paths={paths} isLoading={isFetchingPaths} isError={isErrorPaths}/>
            </Box>
            {/* Recientes*/}
            <Typography variant="h5">Recientes</Typography>
            <CarouselPaths paths={recentPaths} isLoading={isFetchingRecentlyPaths} isError={isErrorRecentlyPaths}/>
            {/* Favoritos */}
            <Typography variant="h5">Tus Favoritos</Typography>
            <CarouselPaths paths={favoritePaths} isLoading={isFetchingFavoritePaths} isError={isErrorFavoritePaths}/>
            <Card className="acceso" onClick={()=>navigate("/organizations")}>
                <CardContent>
                    <SettingsSuggestRoundedIcon/>
                    Gestión de organizaciones
                </CardContent>
            </Card>
            
            <Card className="acceso" onClick={()=>navigate("/contents")}>
                <CardContent>
                    <SettingsSuggestRoundedIcon/>
                    Crea tu contenido
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
