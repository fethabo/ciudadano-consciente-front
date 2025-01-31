import { CardContent, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import { FrostedGlassCard } from "@components/Cards";

const backgroundImages = {
    maps: 'url(/images/maps.jpg)',
    contents: 'url(/images/activities.jpg)',
    references: 'url(/images/references.jpg)',
    stadistics: 'url(/images/statistics.jpg)',
};
function AccessCard({text, url, ...rest}){
    const navigate = useNavigate();
    const backgroundImage = backgroundImages[url] || 'none';

    return (
       <Container sx={{display:'flex',width:'50%',flexGrow:1, padding:'0.5em'}}>
       <FrostedGlassCard onClick={()=>navigate(url)} sx={{ 
                    cursor: 'pointer', 
                    width: '100%', 
                    height: '100%', 
                    backgroundImage: backgroundImage, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}  {...rest}>
            <CardContent><Typography>{text}</Typography></CardContent>
        </FrostedGlassCard>
        </Container>
    )
}
AccessCard.propTypes={
    text: PropTypes.string,
    url: PropTypes.string,
}

function OrganizationAccess() {
    const accessCards= [
        {text: 'Mapas', url: 'maps'},
        {text: 'Actividades', url: 'contents'},
        {text: 'Referencias', url: 'references'},
        {text: 'Estadisticas', url: 'stadistics'},

    ]

    return ( <Stack width="100%" display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
      {accessCards.map((ac, index)=>
        <AccessCard key={index} {...ac} />
    )}
    </Stack> );
}

export default OrganizationAccess;