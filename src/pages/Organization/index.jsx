import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOrganization } from "../../components/Hooks/requests/Organizations";
import { 
  Alert, 
  AlertTitle, 
  Box, 
  Button, 
  Container, 
  Divider, 
  Skeleton, 
  Typography, 
  Paper, 
  Avatar, 
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab
} from "@mui/material";
import useGetOrganizationRole from "../../security/hooks/useGetOrganizationRole";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import noAuth from "../../components/Ilustrations/401.svg";
import { useState } from "react";
import BackToHomeButton from "@components/BackToHomeButton";

/**
 * Componente principal para la vista de organización
 * Actúa como padre de las rutas de la organización
 * @returns Componente de organización
 */
export default function Organization() {
    const { idOrganization } = useParams();    
    const {
      data: organization, 
      isFetching: isFetchingOrganization, 
      isError: isErrorOrganization
    } = useGetOrganization({
      organizationId: idOrganization, 
      enabled: !!idOrganization
    });
    const navigate = useNavigate();
    const role = useGetOrganizationRole({organizationId: idOrganization});
    const {pathname} = useLocation();
    const [showAlert, setShowAlert] = useState(true);

    // Función para obtener las iniciales del nombre de la organización
    const getOrgInitials = () => {
      if (!organization?.name) return "O";
      return organization.name.charAt(0).toUpperCase();
    };

    // Función para generar un color basado en el nombre de la organización
    const getAvatarColor = () => {
      if (!organization?.name) return "#1976d2";
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
      return stringToColor(organization.name);
    };

    if (role === "none") {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh'
        }}>
          <img src={noAuth} alt="No autorizado" style={{ maxWidth: '80%', maxHeight: '50vh' }} />
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            No tienes acceso a esta organización
          </Typography>
          <BackToHomeButton />
        </Box>
      );
    }

    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start"}}>
           <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/organizations')}
          >
            Volver a organizaciones
          </Button>
        </Box>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          {isFetchingOrganization ? (
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Skeleton variant="circular" width={80} height={80} sx={{ mr: 3 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="40%" height={24} />
              </Box>
            </Box>
          ) : isErrorOrganization ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              <AlertTitle>Error</AlertTitle>
              No se pudo cargar la información de la organización
            </Alert>
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      bgcolor: getAvatarColor(),
                      fontSize: 36,
                      mr: 3
                    }}
                  >
                    {getOrgInitials()}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h4" component="h1" gutterBottom>
                        {organization?.name}
                      </Typography>
                      {organization?.verified && (
                        <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                      )}
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      {organization?.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: "flex", ml: { md: "auto" }, mt: { xs: 2, md: 0 }, flexWrap: "wrap", gap: 1 }}>
                  {/* pathname !== `/organizations/${idOrganization}` ? (
                    <Button 
                      variant="outlined"
                      startIcon={<ArrowBackIcon />}
                      onClick={() => navigate(`/organizations/${idOrganization}`)}
                    >
                      Volver
                    </Button>
                  ) : */ (
                    <>
                      <Button 
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`./edit`, { relative: 'path' })}
                        disabled={role !== "moderator"}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outlined"
                        startIcon={<GroupIcon />}
                        onClick={() => navigate(`./users`, { relative: 'path' })}
                        disabled={role !== "moderator"}
                      >
                        Permisos
                      </Button>
                    </>
                  )}
                </Box>
              </Box>

              {!organization?.verified && (
                <Alert 
                  severity="warning" 
                  sx={{ mb: 3 }}
                  icon={<WarningIcon />}
                >
                  <AlertTitle>El correo de la organización no fue confirmado</AlertTitle>
                  <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    Para poder modificar contenido de la organización debes 
                    <Button 
                      sx={{ mx: 1 }}
                      variant="contained" 
                      color="warning"
                      size="small"
                      endIcon={<ForwardToInboxIcon />} 
                      onClick={() => navigate('/new-organization/verify')}
                    >
                      validar el correo electrónico
                    </Button>
                  </Box>
                </Alert>
              )}
            </>
          )}

          {role === "moderator" && showAlert && (
            <Alert 
              severity="warning"
              sx={{ mb: 3 }}
              icon={<WarningIcon />}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>A great power comes with a great responsibility</AlertTitle>
              Los moderadores de la organización pueden editar todo el contenido y configuración. Úsalo sabiamente.
            </Alert>
          )}

          {!isFetchingOrganization && !isErrorOrganization && (
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <BusinessIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body1">Información de la organización</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 2 }}>
                   {role && (
                   <Box sx={{ flexBasis: { sm: "50%" } }}>
                    <Typography variant="body2" color="text.secondary">Tu rol en la organización</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                      {role}
                    </Typography>
                  </Box>
                )}
                  {organization?.email && (
                    <Box sx={{ flexBasis: { sm: "50%" } }}>
                      <Typography variant="body2" color="text.secondary">Email de contacto</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {organization.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
               
              </CardContent>
            </Card>
          )}
        </Paper>

        <Box sx={{ width: '100%', mb: 3 }}>
                <Paper sx={{ borderRadius: 2 }}>
                    <Tabs 
                        value={pathname.includes('/maps') ? 0 : pathname.includes('/contents') ? 1 : 2}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="organization navigation tabs"
                        disabled={isFetchingOrganization || isErrorOrganization}
           >
                         <Tab 
                            label="Mapas" 
                            onClick={() => navigate(`/organizations/${idOrganization}/maps`)}
                            sx={{ py: 2 }}
                        />
                        <Tab 
                            label="Actividades" 
                            onClick={() => navigate(`/organizations/${idOrganization}/contents`)}
                            sx={{ py: 2 }}
                        />
                        <Tab 
                            label="Estadísticas" 
                            onClick={() => navigate(`/organizations/${idOrganization}/stadistics`)}
                            sx={{ py: 2 }}
                        />
                       
                    </Tabs>
                </Paper>
    </Box>
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Outlet />
        </Box>
      </Container>
    );
}