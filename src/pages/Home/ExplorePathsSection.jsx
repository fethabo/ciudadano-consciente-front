import {  Typography, Box} from "@mui/material"
import CarouselPaths from "../../components/CarouselPaths";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const ExplorePathsSection = ({ paths, isLoading, isError }) => {
    return (
        <Box   id="pathsSection" className="pathsSection" sx={{paddingTop:"4em", mb: 2 }}>
            <Box sx={{ mt: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Left side - Text with treasure map background */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 41.67%' } }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    ><Box position="top" zIndex={1}>
                    <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
                        ¡Inicia tu aventura!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Descubre rutas fascinantes de aprendizaje y comienza un viaje hacia nuevos conocimientos.
                    </Typography>
                </Box>
                       {/* Treasure Map Path and X Mark */}
<Box 
    sx={{ 
        position: "relative", 
        width: "100%", 
        height: "200px", 
      //  backgroundColor: "rgba(253, 240, 213, 0.2)",
        borderRadius: 2,
        overflow: "hidden",
        mb: 3
    }}
>
    {/* Dotted Path */}
    <motion.svg
        width="100%"
        height="200px"
        viewBox="0 0 400 200"
        style={{ position: "absolute", top: 0, left: 0 }}
        preserveAspectRatio="xMidYMid meet"
    >
        <motion.path
            d="M 50,100 Q 100,50 150,120 T 220,90 T 290,120 T 350,100"
            fill="transparent"
            stroke="#8B4513"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
                duration: 5, 
                ease: "linear", 
                repeat: Infinity, 
                repeatType: "loop",
                repeatDelay: 0.5
            }}
        />
        
        {/* X marks the spot - within the same SVG coordinate system */}
        <motion.text
            x="350"
            y="100"
            fontSize="24"
            fill="#8B4513"
            textAnchor="middle"
            dominantBaseline="middle"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            ✖
        </motion.text>
    </motion.svg>
</Box>
                    </motion.div>
                </Box>
                
                {/* Right side - CarouselPaths */}
                <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 58.33%' }, alignContent:'center', marginLeft: {md:'-1.2em'} }}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <CarouselPaths 
                            style={{ maxWidth: '100%' }} 
                            paths={paths} 
                            isLoading={isLoading} 
                            isError={isError} 
                        />
                    </motion.div>
                </Box>
            </Box>
        </Box>
    );
};

export default ExplorePathsSection;

ExplorePathsSection.propTypes = {
    paths: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool
};

ExplorePathsSection.defaultProps = {
    paths: [],
    isLoading: false,
    isError: false
};