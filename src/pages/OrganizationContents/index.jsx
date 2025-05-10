import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  ButtonGroup, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Card, 
  CardContent, 
  CardActions, 
  Tooltip, 
  Skeleton, 
  Alert,
  TextField,
  InputAdornment,
  TablePagination,
  TableSortLabel,
  Grid,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { useDeleteContent, useGetContentsOfOrganization } from '../../components/Hooks/requests/Content';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedIcon from '@mui/icons-material/Feed';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FilterListIcon from '@mui/icons-material/FilterList';
import DetailContentOrganization from '@components/Dialogs/DetailContentOrganization';
import AddContentDialog from '@components/Dialogs/AddContentDialog';
import EditContentDialog from '@components/Dialogs/EditContentDialog';
import PropTypes from 'prop-types';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useGetActivityTypes } from '@components/Hooks/requests/ActivityType';
import { useGetActivityTypeVersions } from '@components/Hooks/requests/ActivityTypeVersion';

const MenuAcciones = ({ content, handleDeleteContent }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpenEdit(false);
    queryClient.resetQueries('getContentsOfOrganization');
  };
  
  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      {content && (
        <>
          <EditContentDialog 
            open={openEdit} 
            content={content} 
            handleClose={handleClose} 
          />
          <ConfirmDialog 
            open={openDelete} 
            message={`Está eliminando el contenido '${content?.description}'`} 
            content={content} 
            onClose={() => setOpenDelete(false)} 
            onConfirm={() => {
              handleDeleteContent(content?.contentId);
              setOpenDelete(false);
            }} 
          />
          <DetailContentOrganization 
            open={openDetails} 
            content={content} 
            handleClose={() => setOpenDetails(false)} 
          />
        </>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          setOpenDetails(true);
          handleMenuClose();
        }}>
          <FeedIcon sx={{ marginRight: 1 }} color="secondary" /> Detalles
        </MenuItem>
        <MenuItem onClick={() => {
          setOpenEdit(true);
          handleMenuClose();
        }}>
          <EditIcon sx={{ marginRight: 1 }} color="primary" /> Editar
        </MenuItem>
        <MenuItem onClick={() => {
          setOpenDelete(true);
          handleMenuClose();
        }}>
          <DeleteIcon sx={{ marginRight: 1 }} color="error" /> Eliminar
        </MenuItem>
      </Menu>
    </>
  );
};

MenuAcciones.propTypes = {
  content: PropTypes.object,
  handleDeleteContent: PropTypes.func
};

/**
 * Permite gestionar los contenidos de una organización
 * Con ordenamiento, filtros, paginación y búsqueda
 * @returns {JSX.Element} PageOrganizationContents
 */
const OrganizationContents = () => {
  const { idOrganization } = useParams();
  const { 
    data, 
    isFetching: isFetchingContentsOfOrganization, 
    isError: isErrorContents 
  } = useGetContentsOfOrganization({ 
    organizationId: idOrganization, 
    enabled: !!idOrganization 
  });
  
  const { 
    data: activityTypes, 
    isFetching: isFetchingActivityTypes, 
    isError: isErrorActivityTypes 
  } = useGetActivityTypes({ 
    enabled: true 
  });
  
  const { 
    data: activityTypesVersions, 
    isFetching: isFetchingActivityTypesVersions, 
    isError: isErrorActivityTypesVersions 
  } = useGetActivityTypeVersions({ 
    enabled: true 
  });
   
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Ordenamiento
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('description');
  
  // Vista
  const [view, setView] = useState('table'); // 'table' o 'cards'

  useEffect(() => {
    if (data && activityTypes && activityTypesVersions) {
      const enrichedContents = data.map(content => {
        const activityTypeVersion = activityTypesVersions.find(
          version => version.activityTypeVersionId === content.activityTypeVersionId
        );
        const activityType = activityTypes.find(
          type => type.activityTypeId === activityTypeVersion?.activityTypeId
        );
        return {
          ...content,
          activityType: activityType?.name || 'Desconocido'
        };
      });
      setContents(enrichedContents);
      setFilteredContents(enrichedContents);
    }
  }, [data, activityTypes, activityTypesVersions]);

  // Función para manejar la búsqueda
  useEffect(() => {
    if (contents.length > 0) {
      const filtered = contents.filter(content => 
        content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.activityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContents(filtered);
      setPage(0); // Volver a la primera página al filtrar
    }
  }, [searchTerm, contents]);

  // Función para manejar el cambio de vista
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Función para manejar el ordenamiento
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Función de comparación para ordenamiento
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Aplicar ordenamiento y paginación
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Obtener los elementos paginados y ordenados
  const visibleContents = stableSort(filteredContents, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Función para manejar el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para manejar el cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Eliminación de contenido
  const [enabledDelete, setEnabledDelete] = useState(null);
  const { 
    data: contentDeleted, 
    isFetching: isFetchingDelete, 
    isError: isErrorDelete 
  } = useDeleteContent({
    contentId: enabledDelete, 
    enabled: !!enabledDelete
  });

  const handleDeleteContent = (contentId) => {
    if (!isFetchingDelete) {
      console.log('Eliminando contenido', contentId);
      setEnabledDelete(contentId);
    }
  };
  
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (!isFetchingDelete) {
      setEnabledDelete(null);
      queryClient.resetQueries('getContentsOfOrganization');
    }
  }, [contentDeleted, isFetchingDelete, isErrorDelete, queryClient]);

  // Control de diálogos
  const [openAddContent, setOpenAddContent] = useState(false);
  const [contentEdit, setContentEdit] = useState(null);
  const [openEditContent, setOpenEditContent] = useState(false);
   
  const handleClose = (content) => {
    console.log("content en handle close", content);
    setOpenAddContent(false);
    if (content?.contentId) {
      setContentEdit(content);
      setOpenEditContent(true);
    }
  };

  // Estado de carga
  const isLoading = isFetchingContentsOfOrganization || 
                   isFetchingActivityTypes || 
                   isFetchingActivityTypesVersions;
    
  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Contenidos de la organización
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={() => { setOpenAddContent(true); }}
            >
              Crear Contenido
            </Button>
          </Grid>
        </Grid>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar contenidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
            <ButtonGroup variant="outlined" aria-label="Cambiar vista">
              <Button 
                onClick={() => handleViewChange('table')} 
                color={view === 'table' ? 'primary' : 'inherit'}
                variant={view === 'table' ? 'contained' : 'outlined'}
                startIcon={<ViewListIcon />}
              >
                Tabla
              </Button>
              <Button 
                onClick={() => handleViewChange('cards')} 
                color={view === 'cards' ? 'primary' : 'inherit'}
                variant={view === 'cards' ? 'contained' : 'outlined'}
                startIcon={<ViewModuleIcon />}
              >
                Tarjetas
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <AddContentDialog open={openAddContent} handleClose={handleClose} />
        <EditContentDialog 
          open={openEditContent} 
          handleClose={() => { 
            setOpenEditContent(false); 
            setContentEdit(null); 
          }} 
          content={contentEdit} 
        />

        {isErrorContents ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            Hubo un error al obtener los contenidos de la organización
          </Alert>
        ) : (
          <>
            {view === 'table' ? (
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'activityType'}
                            direction={orderBy === 'activityType' ? order : 'asc'}
                            onClick={() => handleRequestSort('activityType')}
                          >
                            Tipo de actividad
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'description'}
                            direction={orderBy === 'description' ? order : 'asc'}
                            onClick={() => handleRequestSort('description')}
                          >
                            Descripción
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'publicContent'}
                            direction={orderBy === 'publicContent' ? order : 'asc'}
                            onClick={() => handleRequestSort('publicContent')}
                          >
                            Público
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === 'username'}
                            direction={orderBy === 'username' ? order : 'asc'}
                            onClick={() => handleRequestSort('username')}
                          >
                            Creador
                          </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        Array.from(new Array(5)).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell><Skeleton /></TableCell>
                          </TableRow>
                        ))
                      ) : visibleContents.length > 0 ? (
                        visibleContents.map(content => (
                          <TableRow key={content.contentId} hover>
                            <TableCell>
                              <Chip 
                                label={content.activityType} 
                                size="small" 
                                color="primary" 
                                variant="outlined" 
                              />
                            </TableCell>
                            <TableCell>{content.description}</TableCell>
                            <TableCell>
                              {content.publicContent ? (
                                <Tooltip title="Público, cualquier usuario puede utilizarlo">
                                  <LockOpenIcon color="success" />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Privado, sólo puede utilizarlo la organización en sus niveles">
                                  <LockIcon color="error" />
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell>{content.username}</TableCell>
                            <TableCell align="center">
                              <MenuAcciones 
                                content={content} 
                                handleDeleteContent={handleDeleteContent} 
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Typography variant="body1" sx={{ py: 2 }}>
                              No se encontraron contenidos
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredContents.length}
                  rowsPerPage={rowsPerPage}
                  page={filteredContents.length <= page * rowsPerPage && page > 0 ? 0 : page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por página:"
                  labelDisplayedRows={({ from, to, count }) => 
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                  }
                />
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  {isLoading ? (
                    Array.from(new Array(6)).map((_, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Skeleton variant="text" height={40} />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" height={118} />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : visibleContents.length > 0 ? (
                    visibleContents.map(content => (
                      <Grid item xs={12} sm={6} md={4} key={content.contentId}>
                        <Card sx={{ height: '100%' }} variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" component="h2" noWrap>
                                {content.description}
                              </Typography>
                              <MenuAcciones 
                                content={content} 
                                handleDeleteContent={handleDeleteContent} 
                              />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                              <Chip 
                                label={content.activityType} 
                                size="small" 
                                color="primary" 
                                sx={{ mr: 1 }} 
                              />
                              {content.publicContent ? (
                                <Chip
                                  icon={<LockOpenIcon />}
                                  label="Público"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                              ) : (
                                <Chip
                                  icon={<LockIcon />}
                                  label="Privado"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Creador: {content.username}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body1">
                          No se encontraron contenidos
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <TablePagination
                    rowsPerPageOptions={[6, 12, 24]}
                    component="div"
                    count={filteredContents.length}
                    rowsPerPage={rowsPerPage}
                    page={filteredContents.length <= page * rowsPerPage && page > 0 ? 0 : page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Items por página:"
                    labelDisplayedRows={({ from, to, count }) => 
                      `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                    }
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default OrganizationContents;