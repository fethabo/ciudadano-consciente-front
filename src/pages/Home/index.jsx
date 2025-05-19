import { Stack,  Typography, Divider, Box} from "@mui/material"
import { useGetFavoritePaths, useGetPaths, /* useGetRecentlyPaths */ } from "../../components/Hooks/requests/Level";
import CarouselPaths from "../../components/CarouselPaths";
import ContentAccess from "./ContentAccess";
import HeroSection from "./HeroSection";
import ExplorePathsSection from "./ExplorePathsSection";
import RandomPlayAccess from "./RandomPlayAccess";
import OrganizationsAccess from "./OrganizationsAccess";

export default function Home (){

    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetPaths({enabled:true, retry:false});
    const {data: favoritePaths, isFetching: isFetchingFavoritePaths, isError: isErrorFavoritePaths}= useGetFavoritePaths({enabled:true});

    const visiblePaths = paths?.filter(path => path.hidden === false) || [];
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

            <ExplorePathsSection 
                paths={visiblePaths} 
                isLoading={isFetchingPaths} 
                isError={isErrorPaths}
            />
           <RandomPlayAccess />
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
           <OrganizationsAccess />
         </Stack>

    )
}
