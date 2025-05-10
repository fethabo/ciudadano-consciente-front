import { Alert, Box, Button, Card, CardContent, Divider, Grid, Paper, Skeleton, Typography, Avatar, Tooltip } from "@mui/material";
import useUserName from "../../security/hooks/useUserName";
import useEmail from "../../security/hooks/useEmail";
import { useGetStatisticsOfUser } from "@components/Hooks/requests/Statistics";
import { useContext } from "react";
import { KeycloakContext } from "@security/KeycloakContext";

// Icons
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ArticleIcon from '@mui/icons-material/Article';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import BackToHomeButton from "@components/BackToHomeButton";

/**
 * Componente de perfil de usuario mejorado
 * Muestra información personal y estadísticas del usuario
 * @returns Componente de perfil
 */
const Profile = () => {
  const keycloakContext = useContext(KeycloakContext);
  const userName = useUserName();
  const email = useEmail();
  const { data: statistics, isFetching: isFetchingStatistics, isError: isErrorStatistics } = useGetStatisticsOfUser({ enabled: true });

  // Función para obtener las iniciales del nombre de usuario
  const getUserInitials = () => {
    if (!userName) return "U";
    return userName.charAt(0).toUpperCase();
  };

  // Función para generar un color basado en el nombre de usuario
  const getAvatarColor = () => {
    if (!userName) return "#1976d2";
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
    return stringToColor(userName);
  };

  // Elementos del panel de estadísticas
  const statsItems = [
    { icon: <CheckCircleIcon color="success" />, label: "Respuestas correctas", value: statistics?.answersOK || 0 },
    { icon: <QuizIcon color="info" />, label: "Total de respuestas", value: statistics?.answers || 0 },
    { icon: <EmojiEventsIcon color="warning" />, label: "Niveles completados", value: statistics?.levelsCompleted || 0 },
    { icon: <ThumbUpIcon color="primary" />, label: "Votos", value: statistics?.votes || 0 },
    { icon: <ReportProblemIcon color="error" />, label: "Preocupaciones", value: statistics?.concerns || 0 },
    { icon: <ArticleIcon color="secondary" />, label: "Contenidos", value: statistics?.contents || 0 },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <BackToHomeButton/>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: getAvatarColor(),
              fontSize: 36,
              mr: 3
            }}
          >
            {getUserInitials()}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>Perfil del Usuario</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Bienvenido a tu perfil personal
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <AccountCircleIcon sx={{ mr: 1 }} /> Información Personal
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body1">Correo:</Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="bold" sx={{ ml: 4 }}>
                    {email}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body1">Nombre de usuario:</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", ml: 4 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {userName}
                    </Typography>
                    <Tooltip title="Editar nombre de usuario">
                      <Button size="small" sx={{ ml: 1, minWidth: "auto", p: 0.5 }}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ display: "flex", mt: 2 }}>
            <Tooltip title="Cambiar contraseña">
              <Button 
                variant="outlined" 
                startIcon={<LockIcon />} 
                sx={{ mr: 2 }}
              >
                Cambiar contraseña
              </Button>
            </Tooltip>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <EmojiEventsIcon sx={{ mr: 1 }} /> Estadísticas
          </Typography>

          {isFetchingStatistics ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <CardContent>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="40%" height={30} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : isErrorStatistics ? (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
            >
              Error al cargar las estadísticas
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {statsItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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
                        <Box sx={{ mr: 1, display: "flex" }}>
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
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button 
            variant="contained" 
            color="error"
            startIcon={<ExitToAppIcon />} 
            onClick={() => keycloakContext?.logout()}
            sx={{ 
              px: 3,
              py: 1
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;