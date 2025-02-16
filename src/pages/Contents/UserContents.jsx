import { Card, CardContent, Typography, Button, Box, Stack,  Alert, IconButton, Tooltip, SvgIcon } from '@mui/material';
import { useState } from 'react';
import {  useDeleteContent, useGetContentsOfUser } from '@components/Hooks/requests/Content';
import useUserApi from '@components/Hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import TagsDisplay from '@components/TagsDisplay';
import AddContentDialog from '@components/Dialogs/AddContentDialog';
import EditContentDialog from '@components/Dialogs/EditContentDialog';
import EditIcon from '@mui/icons-material/Edit';
import  DeleteForeverIcon  from '@mui/icons-material/DeleteForever';
import SkeletonContents from './SkeletonContents';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';

/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 * @todo: agregar filtrado y paginado
 * @todo: agregar vista de contenidos del usuario (para que pueda editar, crear, eliminar y hacerlos publicos)
*/
function UsersContent(){
  const navigate = useNavigate();
  //Obtengo los contenidos publicos para mostrarlos
  const { userId } = useUserApi()

  const{ data: contents, isFetching, isError} = useGetContentsOfUser({userId: userId, enabled: !!userId})
  
  const handleEntrar = (id) => {
    navigate(`/pool/content/${id}/play`)
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [paginatedContents, setPaginatedContents] = useState([]);

  useEffect(() => {
    if (contents) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setPaginatedContents(contents.slice(startIndex, endIndex));
    }
  }, [contents, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

   //CONTROL DE DIALOGS
   const [openAddContent, setOpenAddContent] = useState(false);
   const [contentEdit, setContentEdit] = useState(null);
   const [openEditContent, setOpenEditContent] = useState(false)
  
   const handleClose = (content) => {
      console.log("content en handle close",content)
       setOpenAddContent(false);
       if(content?.contentId){
           setContentEdit(content)
           setOpenEditContent(true)
       }
   };

   const queryClient = useQueryClient()
   const [contentToDelete, setContentToDelete] = useState(null)
   const [openDelete, setOpenDelete] = useState(null)
     const {data: contentDeleted, isFetching: isFetchingContentDeleted } = useDeleteContent({contentId: contentToDelete, enabled: !!contentToDelete})
   
     useEffect(() => {
       if(!isFetchingContentDeleted && contentToDelete){
        queryClient.resetQueries({ queryKey: ['useGetContents'], exact:true})
         queryClient.resetQueries({ queryKey: ['useGetContentsOfUser'], exact: false });
         setOpenDelete(null);
         setContentToDelete(null)
       }
     }, [isFetchingContentDeleted, contentDeleted, queryClient, contentToDelete]);
   
  return (
    <Stack>
      <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h5">Tus contenidos</Typography>
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
         <Button onClick={() => setOpenAddContent(true)}>Nuevo contenido</Button>
        <Stack sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: "1em" }}>
           
          {isFetching ? (
           <SkeletonContents />
          ) : isError ? (
            <Alert severity="error">Hubo un error al obtener los contenidos</Alert>
          ) : (
            paginatedContents.map((content, index) => (
              <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign:'left' }}>
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Typography variant="h6">{content.description}</Typography> 
                  </Box>
                  <Typography variant="body2">Usuario: {content.username}</Typography>
                  <Typography variant="body2">Organización: {content.organization}</Typography>
                  <Typography variant="body2">Tipo de Actividad: {content.activityTypeVersionId}</Typography>
                  <Box display="flex" gap="1em" alignItems={"center"}>
                    <Typography variant="caption">Tags: </Typography> 
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
                    <SvgIcon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6l10 6l-10 6Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.15s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0"/></path></svg>
                    </SvgIcon>
                  </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            ))
          )}
        </Stack>
        <Pagination
          count={Math.ceil(contents?.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2, alignSelf: 'center' }}
        />
      </Box>
    </Stack>
  );
}

export default UsersContent;