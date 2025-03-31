import { Stack,  CardContent, Typography, Divider, Box} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetFavoritePaths, useGetPaths, /* useGetRecentlyPaths */ } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import ContentAccess from "./ContentAccess";
import { FrostedGlassCard } from "../../components/Cards";
import HeroSection from "./HeroSection";
//import useUserApi from "../../components/Hooks/useUserApi";

export default function Home (){
    const navigate= useNavigate();
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetPaths({enabled:true, retry:false});
    const {data: favoritePaths, isFetching: isFetchingFavoritePaths, isError: isErrorFavoritePaths}= useGetFavoritePaths({enabled:true});
 //   const {data: recentPaths, isFetching: isFetchingRecentlyPaths, isError: isErrorRecentlyPaths}= useGetRecentlyPaths({enabled:true});
    return(
        <Stack 
            direction='column' 
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
            <div id="heroSection" style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <HeroSection /> 
            </div>

            {/* disponibles */}
            <Box id="pathsSection" >
                <Typography variant="h5">Explora nuevos caminos!</Typography>
                <CarouselPaths style={{maxWidth:'100%'}} paths={paths} isLoading={isFetchingPaths} isError={isErrorPaths}/>
            </Box>
            {/* Recientes*/}
            {/* <Typography variant="h5">Recientes</Typography>
                <CarouselPaths paths={recentPaths} isLoading={isFetchingRecentlyPaths} isError={isErrorRecentlyPaths}/> */}
            {/* Favoritos */}
            <Typography variant="h5">Tus Favoritos</Typography>
            {favoritePaths?.length > 0 ? (
                <CarouselPaths paths={favoritePaths} isLoading={isFetchingFavoritePaths} isError={isErrorFavoritePaths}/>
            ) : (
                <Box textAlign="center" p={2} borderRadius={2} bgcolor="rgba(0, 0, 0, 0.05)">
                    <Typography variant="body1" color="textSecondary">
                        Aún no tienes caminos favoritos. ¡Marca como favorito alguno para que se muestren aquí!
                    </Typography>
                </Box>
            )}
           
            <ContentAccess />
            <FrostedGlassCard onClick={() => navigate("/organizations")} sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}}>
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
