import PropTypes from "prop-types"
import EmblaCarousel from "./Carousel/EmblaCarousel"
import { Alert, Box, Card, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { DiagonalGradientCard, NeonCard } from "./Cards";
//import { useGetActivityByLevel } from "./Hooks/requests/Activity";
//import { useGetContent, useGetContentImages } from "./Hooks/requests/Content";

/**
 * @todo: agregar imagen en card
 * @todo: agregar tooltip y agregar algun icono, que indique que se puede pulsar alli (quizas una animacion con hover?)
 * @param {*} param0 
 * @returns 
 */
function Slide({path}){
    
  //  const { data: activity, isFetching: isFetchingActivity, isError: isErrorActivity } = useGetActivityByLevel({levelId:path.levelId, enabled: !!path.levelId});
  //  const { data: content, isFetching: isFetchingContent, isError: isErrorContent } = useGetContent({contentId:activity?.content, enabled: !!activity?.content});
   // const { data: images, isFetching: isFetchingImages, isError: isErrorImages } = useGetContentImages({contentId: activity?.content, enabled: !!activity?.content});
    /*     const { data: content, isLoading: isLoadingContent, isError: isErrorContent } = useGetContent({contentId:activity?.content, enabled: !!activity?.content});
    const { data: activityTypeVersion, isLoading: isLoadingActivityTypeVersion, isError: isErrorActivityTypeVersion } = useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content?.activityTypeVersionId});
    const { data: thumbnail, isLoading: isLoadingThumbnail, isError: isErrorThumbnail } = useGetActivityTypeVersionFile({activityTypeVersionId:activityTypeVersion?.activityTypeVersionId, fileName: "thumbnail", enabled: !!activityTypeVersion?.activityTypeVersionId});
 */    const navigate= useNavigate();
    
    return (
        <DiagonalGradientCard onClick={()=>navigate(`./map/${path.levelId}`,{ relative: 'path' })} sx={{ cursor:'pointer' }} >
            {/* TODO: AGREGAR SKELETONS DEL CARD CUANDO EESTA OBTENIENDO EL CONTENT */}
            <CardMedia>
                {/* <Box
                    component="img"
                    sx={{
                        maxWidth:"100%",
                    }}
                    alt={path?.name}
                    src={""}
                   // src={thumbnail}
                    /> */}
            </CardMedia>
            <CardContent>
                <Typography variant="h6">{path?.name}</Typography>
                <Typography variant="body2">{path?.description}</Typography>
            </CardContent>
        </DiagonalGradientCard>
    )
}
Slide.propTypes = {
    path: PropTypes.object,
}

function LoadingSlide(){
    return (
        <Card>
            <CardContent>
                    <Skeleton width="80%" />
                    <Skeleton width="60%" />
            </CardContent>
            <CardMedia>
                <Skeleton variant="rectangular" width="100%" height={30} />
            </CardMedia>
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

function CarouselPaths({paths, isLoading, isError}) {    
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