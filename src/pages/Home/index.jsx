import { Stack,  CardContent, Typography, Divider, Box} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetFavoritePaths, useGetPaths, useGetRecentlyPaths } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import ContentAccess from "./ContentAccess";
import { FrostedGlassCard } from "../../components/Cards";
//import useUserApi from "../../components/Hooks/useUserApi";

export default function Home (){
    const navigate= useNavigate();
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetPaths({enabled:true, retry:false});
    const {data: favoritePaths, isFetching: isFetchingFavoritePaths, isError: isErrorFavoritePaths}= useGetFavoritePaths({enabled:true});
 //   const {data: recentPaths, isFetching: isFetchingRecentlyPaths, isError: isErrorRecentlyPaths}= useGetRecentlyPaths({enabled:true});
  /* Encabezado: "¿Listo para comenzar tu aventura educativa?"

Descripción: "Elige entre nuestras opciones de juego y descubre un mundo de aprendizaje interactivo. Desde situaciones cotidianas hasta decisiones importantes, cada partida es una oportunidad para mejorar tus habilidades como ciudadano. */
    return(
        <Stack 
            direction='column' 
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            <Box>
            <Typography position='top' variant='h6'>¿Listo para comenzar tu aventura educativa? </Typography>
            <Typography variant="body2">Abre tu camino entre nuestras opciones de juego y descubre un mundo de aprendizaje interactivo. Cada partida es una oportunidad para mejorar tus habilidades como ciudadano.</Typography>
            </Box>
            {/* disponibles */}
            <Box >
                <Typography variant="h5">Explora nuevos caminos!</Typography>
                <CarouselPaths style={{maxWidth:'100%'}} paths={paths} isLoading={isFetchingPaths} isError={isErrorPaths}/>
            </Box>
            {/* Recientes*/}
      {/*       <Typography variant="h5">Recientes</Typography>
            <CarouselPaths paths={recentPaths} isLoading={isFetchingRecentlyPaths} isError={isErrorRecentlyPaths}/> */}
            {/* Favoritos */}
            <Typography variant="h5">Tus Favoritos</Typography>
            <CarouselPaths paths={favoritePaths} isLoading={isFetchingFavoritePaths} isError={isErrorFavoritePaths}/>
           
           
            <ContentAccess />
            <FrostedGlassCard onClick={()=>navigate("/organizations")} sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}}>
                <CardContent>
                    <Typography variant="h5" color="#ffffff">
                      Organizaciones
                    </Typography>
                    <Typography variant="body2" color="#ffffff">
                        Gestiona el contenido de tus organizaciones.
                    </Typography>

                </CardContent>
               </FrostedGlassCard>
         </Stack>

    )
}
