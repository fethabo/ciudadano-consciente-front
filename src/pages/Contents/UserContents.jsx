import { Card, CardContent, Typography, Button, Box, Stack, Alert, IconButton, Tooltip, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDeleteContent, useGetContentsOfUser } from '@components/Hooks/requests/Content';
import useUserApi from '@components/Hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import TagsDisplay from '@components/TagsDisplay';
import AddContentDialog from '@components/Dialogs/AddContentDialog';
import EditContentDialog from '@components/Dialogs/EditContentDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SkeletonContents from './SkeletonContents';
import { useQueryClient } from '@tanstack/react-query';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import PlayAnimatedIcon from '@icons/PlayAnimatedIcon';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetActivityTypes } from '@components/Hooks/requests/ActivityType';
import { useGetActivityTypeVersions } from '@components/Hooks/requests/ActivityTypeVersion';
import { useGetOrganizations } from '@components/Hooks/requests/Organizations';

/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 * - Filtrar y paginar contenidos
 * - Ver detalles de tipos de actividad y organización
*/
function UsersContent(){
  const navigate = useNavigate();
  //Obtengo los contenidos del usuario para mostrarlos
  const { userId } = useUserApi();

  const { data: userContents, isFetching, isError } = useGetContentsOfUser({userId: userId, enabled: !!userId});
  
  // Obtener tipos de actividades, versiones y organizaciones
  const { data: activityTypes, isFetching: isFetchingActivityTypes, isError: isErrorActivityTypes } = useGetActivityTypes({
    enabled: true
  });
  
  const { data: activityTypesVersions, isFetching: isFetchingActivityTypesVersions, isError: isErrorActivityTypesVersions } = useGetActivityTypeVersions({
    enabled: true
  });

  const { data: organizations, isFetching: isFetchingOrganizations, isError: isErrorOrganizations } = useGetOrganizations({
    enabled: true
  });
  
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Enriquecer los datos de contenido con información adicional
  useEffect(() => {
    if (userContents && activityTypes && activityTypesVersions && organizations) {
      const enrichedContents = userContents.map(content => {
        const activityTypeVersion = activityTypesVersions.find(
          version => version.activityTypeVersionId === content.activityTypeVersionId
        );
        const activityType = activityTypes.find(
          type => type.activityTypeId === activityTypeVersion?.activityTypeId
        );
        const organization = organizations.find(org => org.organizationId === content.organization);
        return {
          ...content,
          activityType: activityType?.name || 'Desconocido',
          organizationName: organization?.name || null,
        };
      });
      setContents(enrichedContents);
      setFilteredContents(enrichedContents);
    }
  }, [userContents, activityTypes, activityTypesVersions, organizations]);
  
  // Filtrado de contenidos
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContents(contents);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredContents(
        contents.filter(
          c =>
            c.description?.toLowerCase().includes(lowerSearch) ||
            c.username?.toLowerCase().includes(lowerSearch) ||
            c.organizationName?.toLowerCase().includes(lowerSearch) ||
            c.activityType?.toLowerCase().includes(lowerSearch)
        )
      );
      setPage(1);
    }
  }, [searchTerm, contents]);

  const handleEntrar = (id) => {
    navigate(`/contents/${id}/play`);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [paginatedContents, setPaginatedContents] = useState([]);

  useEffect(() => {
    if (filteredContents) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedContents(filteredContents.slice(startIndex, endIndex));
    }
  }, [filteredContents, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //CONTROL DE DIALOGS
  const [openAddContent, setOpenAddContent] = useState(false);
  const [contentEdit, setContentEdit] = useState(null);
  const [openEditContent, setOpenEditContent] = useState(false);
  
  const handleClose = (content) => {
    setOpenAddContent(false);
    if(content?.contentId){
      setContentEdit(content);
      setOpenEditContent(true);
    }
  };

  const queryClient = useQueryClient();
  const [contentToDelete, setContentToDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const {data: contentDeleted, isFetching: isFetchingContentDeleted } = useDeleteContent({contentId: contentToDelete, enabled: !!contentToDelete});
   
  useEffect(() => {
    if(!isFetchingContentDeleted && contentToDelete){
      queryClient.resetQueries({ queryKey: ['useGetContents'], exact:true});
      queryClient.resetQueries({ queryKey: ['useGetContentsOfUser'], exact: false });
      setOpenDelete(null);
      setContentToDelete(null);
    }
  }, [isFetchingContentDeleted, contentDeleted, queryClient, contentToDelete]);
   
  return (
    <Stack>
      <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
        <AddContentDialog open={openAddContent} handleClose={handleClose} isPublic={true} />
        <EditContentDialog open={openEditContent} handleClose={() => { setOpenEditContent(false); setContentEdit(null) }} content={contentEdit} />
        <ConfirmDialog
          open={!!openDelete}
          title="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este contenido?"
          onCancel={() => {setContentToDelete(null); setOpenDelete(null)}}
          loading={isFetchingContentDeleted}
          onConfirm={() => {
            setContentToDelete(openDelete);
          }}
        />
        
        <Card sx={{ marginBottom: 2, width: '100%', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">¿Quieres aportar a la comunidad creando tu propio contenido?</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddContent(true)} sx={{ marginTop: 2 }}>
              Crear contenido
            </Button>
          </CardContent>
        </Card>

        {/* Barra de búsqueda */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en tus contenidos..."
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
          sx={{ mb: 2 }}
        />

        <Stack sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: "1em", alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          {isFetching || isFetchingActivityTypes || isFetchingActivityTypesVersions || isFetchingOrganizations ? (
            <SkeletonContents />
          ) : isError || isErrorActivityTypes || isErrorActivityTypesVersions || isErrorOrganizations ? (
            <Alert severity="error">Hubo un error al obtener los contenidos</Alert>
          ) : (
            paginatedContents.length === 0 ? (
              <Alert severity="info" sx={{ width: '100%' }}>
                No hay contenidos para mostrar
              </Alert>
            ) : 
            paginatedContents.map((content, index) => (
              <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign: 'left', boxShadow: 3 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{content.description}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    
                    {content.organizationName && (
                       <Tooltip title="Organización verificada">
                          <Box display="flex" alignItems="center" gap={0.5} >
                              <VerifiedIcon color="primary" fontSize="small" />
                            <Typography variant="body2" color="primary" fontWeight={500}>
                              {content.organizationName}
                            </Typography>
                          </Box>
                        </Tooltip>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
                      <CallSplitIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {content.activityType}
                    </Typography>
                  </Box>
                  <Box display="flex" gap="1em" alignItems="center" mt={1}>
                    <TagsDisplay entityId={content?.contentId} entityType='contents' />
                  </Box>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                  <Tooltip title="Eliminar" arrow>
                    <IconButton variant="contained" color="error" onClick={() => {setOpenDelete(content.contentId)}}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>  
                  <Tooltip title="Editar" arrow>
                    <IconButton variant="contained" color="secondary" onClick={() => {setContentEdit(content);setOpenEditContent(true)}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>  
                  <Tooltip title="Probar" arrow>
                    <IconButton variant="contained" color="primary" onClick={() => handleEntrar(content.contentId)}>
                      <PlayAnimatedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            ))
          )}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, gap: '1em', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <Typography variant="body2">Items por página:</Typography>
            <Select
              size='small'
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              displayEmpty
              inputProps={{ 'aria-label': 'Items per page' }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Box>
          <Pagination
            count={Math.ceil(filteredContents?.length / pageSize)}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 0, alignSelf: 'center' }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default UsersContent;