import { Stack,  CardContent, Typography, Divider, Box} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetFavoritePaths, useGetPaths, useGetRecentlyPaths } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import ContentAccess from "./ContentAccess";
import { FrostedGlassCard } from "../../components/Cards";

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
           
            <FrostedGlassCard onClick={()=>navigate("/organizations")}>
                <CardContent>
                    <Typography variant="h5" color="#ffffff">
                      Organizaciones
                    </Typography>
                    <Typography variant="body2" color="#ffffff">
                        Gestiona el contenido de tus organizaciones.
                    </Typography>

                </CardContent>
               </FrostedGlassCard>
            <ContentAccess />
         </Stack>

    )
}
