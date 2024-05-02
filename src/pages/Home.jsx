import { Stack, Card, CardContent, Typography, Divider, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../constants";
import EmblaCarousel from "../components/Carousel/EmblaCarousel";

/**TODO: en estilos agregar acceso 
 * - armar carousel (se podria usar el stepper de mui)
*/

export default function Home (){
    const navigate= useNavigate();
    const [paths,setPaths]= useState();
    const [favoritePaths,setFavoritePaths]= useState();

    const [recentPaths,setRecentPaths]= useState();
    useEffect(() => {
        //OBTENGO TODOS LOS PATHS
        axios.get(`${URL_API}/levels/paths`)
            .then((response)=>{
              setPaths(response?.data)
            })
        axios.get(`${URL_API}/levels/paths/recently/users/8`)// usuario de s
            .then((response)=>{
              setRecentPaths(response?.data)
            })
        axios.get(`${URL_API}/levels/paths/favorites/users/8`)// usuario de s
            .then((response)=>{
              setFavoritePaths(response?.data)
            })
        }, []);

        const OPTIONS = {
            align: 'start',
            dragFree: true,
            loop: true,
            slidesToScroll: 'auto'
          }
          const SLIDE_COUNT = 5
          const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    return(
        <Stack 
            direction='column' 
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
        >
        
        <Typography position='top' variant='h3'>¡Bienvenido, ciudadano! </Typography>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        
 {/* Recientes */}
 <Card>
           <CardContent>
            <Typography>Recientes</Typography>
               {recentPaths&&recentPaths?.length>0 &&
                    recentPaths.map((path,index)=>
                    <Button key={index} onClick={()=>navigate(`/map/${path.levelId}`)}>{path.name}</Button>
                )
               }
           
            </CardContent>
         </Card>
        {/* FAVORITOS (paths del usuario) */}
        <Card>
           <CardContent>
            <Typography>Tus Favoritos</Typography>
                Levels carousel
                TODO:HACER CAROUSEL, un item por path
                {favoritePaths&&favoritePaths?.length>0 &&
                    favoritePaths.map((path,index)=>
                    <Button key={index} onClick={()=>navigate(`/map/${path.levelId}`)}>{path.name}</Button>
                )
               }
                
            </CardContent>
         </Card>
        {/* TODOS los paths (paths disponibles) */}
        <Card>
           <CardContent>
            <Typography>Explora nuevos caminos!</Typography>
                Levels carousel
                {paths&&paths?.length>0 &&
                    paths.map((path,index)=>
                    <Button key={index} onClick={()=>navigate(`/map/${path.levelId}`)}>{path.name}</Button>
                )
               }
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
