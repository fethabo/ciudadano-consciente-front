import { FrostedGlassCard } from "@components/Cards";
import { CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrganizationsAccess() {
    const navigate = useNavigate();
    return ( 
         <FrostedGlassCard onClick={() => navigate("/organizations")} sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(0,0,0,0.1)'}}}>
                <CardContent className="cardOrganizations">
                    <Typography variant="h5" color="#ffffff">
                      Organizaciones
                    </Typography>
                    <Typography variant="body2" color="#ffffff">
                        Gestiona el contenido de tus organizaciones.
                    </Typography>
                </CardContent>
               </FrostedGlassCard>
     );
}

export default OrganizationsAccess;