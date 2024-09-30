import PropTypes from "prop-types"
import EmblaCarousel from "./Carousel/EmblaCarousel"
import { Alert, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { NeonCard } from "./Cards";

function Slide({path}){

    const navigate= useNavigate();
    return (
        <Card onClick={()=>navigate(`./map/${path.levelId}`,{ relative: 'path' })} >
            <CardContent>
                <Typography variant="h6">{path?.name}</Typography>
                <Typography variant="body2">{path?.description}</Typography>
            </CardContent>
        </Card>
    )
}
Slide.propTypes = {
    path: PropTypes.object,
}

function LoadingSlide(){
    return (
        <Card>
            <CardContent>CARGANDO</CardContent>
            <CardContent>AGREGAR SKELETON</CardContent>
        </Card>
    )
}

function ErrorSlide(){
    return (
        <NeonCard>
            <CardContent>ERROR</CardContent>
            <Alert severity="error" title="ups..">Parece que hubo un error al obtener los datos, intenta nuevamente</Alert>
        </NeonCard>
    )
}

function CarouselPaths({paths, isLoading, isError}) {paths    
    
    const [slides, setSlides] = useState([<LoadingSlide key={0} />]);
    useEffect(() => {
        if (isLoading) {
            setSlides([<LoadingSlide key={0} />])
        }else{
            if (isError){
                setSlides([<ErrorSlide key={0}/>])
            } else if(paths){
                const slidesPaths=[];
                paths.map((path,index) => {                
                    slidesPaths.push(<Slide key={index} path={path} />);
                })
                setSlides(slidesPaths);
            }}
    }, [paths, isError, isLoading]);
    
    /* TODO; corregir posicion de botones */
    const OPTIONS = {
        align: 'start',
        dragFree: true,
        loop: true,
        slidesToScroll: 'auto'
      }

    return ( 
        !!slides&& 
            <EmblaCarousel slides={slides} options={OPTIONS}/>        
     );
}

export default CarouselPaths;

CarouselPaths.propTypes = {
    paths: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
}