import { Alert, Box, Card, CardContent, Divider, Paper, Skeleton, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetStatisticsOfOrganization } from "@components/Hooks/requests/Statistics";

// Icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
//import DescriptionIcon from '@mui/icons-material/Description';

/**
 * Componente de estadísticas de organización mejorado
 * Muestra información y estadísticas de la organización
 * @returns Componente de estadísticas de organización
 */
function OrganizationStatistics() {
  const { idOrganization } = useParams();
  const { data: statistics, isFetching, isError } = useGetStatisticsOfOrganization({ 
    organizationId: idOrganization, 
    enabled: !!idOrganization 
  });

  // Función para generar un color basado en el nombre de la organización
  const getAvatarColor = () => {
    if (!statistics?.name) return "#1976d2";
    const stringToColor = (string) => {
      let hash = 0;
      for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
      let color = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
      }
      return color;
    };
    return stringToColor(statistics.name);
  };

  // Función para obtener las iniciales del nombre de la organización
  const getOrgInitials = () => {
    if (!statistics?.name) return "O";
    return statistics.name.charAt(0).toUpperCase();
  };

  // Configuración de los íconos y etiquetas para las estadísticas
  const getStatsItems = () => {
    if (!statistics) return [];
    return Object.entries(statistics)
      .filter(([key]) => !["name", "description", "organizationId", "email"].includes(key))
      .map(([key, value]) => {
        let icon, color;
        
        switch(key) {
          case "moderators":
            icon = <GroupIcon />;
            color = "success";
            return { icon, label: "Moderadores", value, color };
          case "divulgators":
            icon = <GroupIcon />;
            color = "info";
            return { icon, label: "Divulgadores", value, color };
          case "paths":
            icon = <BarChartIcon />;
            color = "warning";
            return { icon, label: "Recorridos", value, color };
          case "levels":
            icon = <EmojiEventsIcon />;
            color = "primary";
            return { icon, label: "Niveles", value, color };
          case "activities":
            icon = <QuizIcon />;
            color = "secondary";
            return { icon, label: "Actividades", value, color };
          case "contents":
            icon = <ArticleIcon />;
            color = "error";
            return { icon, label: "Contenidos", value, color };
          default:
            icon = <BarChartIcon />;
            color = "default";
            return { 
              icon, 
              label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(), 
              value, 
              color 
            };
        }
      });
  };

  if (isFetching) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Skeleton variant="circular" width={80} height={80} sx={{ mr: 3 }} />
            <Box>
              <Skeleton variant="text" width={300} height={40} />
              <Skeleton variant="text" width={200} height={24} />
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" width={200} height={32} />
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 2, 
              mt: 2 
            }}>
              {Array.from({ length: 9 }).map((_, index) => (
                <Box key={index} sx={{ flexBasis: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.333% - 16px)" } }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="40%" height={30} />
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error al cargar las estadísticas de la organización
        </Alert>
      </Box>
    );
  }

  const statsItems = getStatsItems();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <EmojiEventsIcon sx={{ mr: 1 }} /> Estadísticas
          </Typography>

          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 2 
          }}>
            {statsItems.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  flexBasis: { 
                    xs: "100%", 
                    sm: "calc(50% - 16px)", 
                    md: "calc(33.333% - 16px)" 
                  } 
                }}
              >
                <Card 
                  variant="outlined" 
                  sx={{ 
                    height: "100%",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box sx={{ mr: 1, display: "flex", color: `${item.color}.main` }}>
                        {item.icon}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", ml: 4 }}>
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrganizationStatistics;