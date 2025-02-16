import { Card, CardContent, Typography, Button, Box, Stack, Skeleton, Alert, IconButton, Tooltip, SvgIcon } from '@mui/material';
import { useState } from 'react';
import { useGetContents } from '@components/Hooks/requests/Content';
import useUserApi from '@components/Hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { useGetUserVotes } from '@components/Hooks/requests/Users/Index';
import Vote from '@components/Vote';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import TagsDisplay from '@components/TagsDisplay';
import AddContentDialog from '@components/Dialogs/AddContentDialog';
import EditContentDialog from '@components/Dialogs/EditContentDialog';


/**
 * 
 * PAGINA DE CONTENIDOS: 
 * - Permite al usuario Agregar Contenidos
 * - Ver otros contenidos y votarlos
 * - Jugar contenidos de forma aleatoria (o por categoría).
 * @todo: agregar filtrado y paginado
 * @todo: agregar vista de contenidos del usuario (para que pueda editar, crear, eliminar y hacerlos publicos)
*/
function ContentsPage(){
  const navigate = useNavigate();
  //Obtengo los contenidos publicos para mostrarlos
  const{ data: contents, isFetching, isError} = useGetContents({enabled: true})
  const { userId } = useUserApi()
  const {data: votes, isFetching: isFetchingVotes, isError: isErrorVotes } = useGetUserVotes({userId: userId, enabled: !!userId})
  
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
  }, [contents, page, pageSize, votes]);

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
   
  return (
    <Stack>
      <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
          <AddContentDialog open={openAddContent} handleClose={handleClose} isPublic={true} />
          <EditContentDialog open={openEditContent} handleClose={() => { setOpenEditContent(false); setContentEdit(null) }} content={contentEdit} />
               
         <Button onClick={() => setOpenAddContent(true)}>Nuevo contenido</Button>
        <Stack sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: "1em" }}>
          {isFetching ? (
            [1, 2, 3, 4].map((_, index) => (
              <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" } }}>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="70%" />
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                  <Skeleton variant="rectangular" width="45%" height={36} />
                  <Skeleton variant="rectangular" width="45%" height={36} />
                </Box>
              </Card>
            ))
          ) : isError ? (
            <Alert severity="error">Hubo un error al obtener los contenidos</Alert>
          ) : (
            paginatedContents.map((content, index) => (
              <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign:'left' }}>
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Typography variant="h6">{content.description}</Typography> 
                    <Vote userVotes={votes} entityId={content?.contentId} entityType='contents' isLoading={isFetchingVotes} isError={isErrorVotes} />
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

export default ContentsPage;