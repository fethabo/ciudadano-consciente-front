import { Stack, Card, CardContent, Typography, Divider, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API } from "../constants";
import EmblaCarousel from "../components/Carousel/EmblaCarousel";
import { useGetFavoritePaths, useGetPaths, useGetRecentlyPaths } from "../components/Hooks/requests/Level";


export default function Home (){
    const navigate= useNavigate();
    //TODO: OBTENER usuario! se usa el 8 para probar
    const user= 8;
    const {data: paths, isFetching: isFetchingPaths, isError: isErrorPaths}= useGetPaths({enabled:true});
    const {data: favoritePaths, isFetching: isFetchingFavoritePaths, isError: isErrorFavoritePaths}= useGetFavoritePaths({userId: user ,enabled:true});
    const {data: recentPaths, isFetching: isFetchingRecentlyPaths, isError: isErrorRecentlyPaths}= useGetRecentlyPaths({userId: user ,enabled:true});

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
       {/* TODO: PASAR ARREGLO DE PATHS A SLIDES (DEFINIR ANTES?) */}
       
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
