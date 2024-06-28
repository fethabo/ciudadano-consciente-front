import PropTypes from "prop-types"
import EmblaCarousel from "../../components/Carousel/EmblaCarousel"
import { Button, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Slide({path}){

    const navigate= useNavigate();
    return (
        <Card >
            <CardContent>{path?.name}</CardContent>
            <CardContent>{path?.description}</CardContent>
            <Button onClick={()=>navigate(`/map/${path.levelId}`)}>Explorar</Button>
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
        <Card>
            <CardContent>ERROR</CardContent>
            <CardContent>AGREGAR MENSAJE DE ERROR BONITO</CardContent>
        </Card>
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