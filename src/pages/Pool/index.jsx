import { useEffect, useState } from 'react';
import {  Card, CardContent, Typography, Box, Stack, IconButton, Pagination, Select, MenuItem, Alert } from '@mui/material';
import { useDeleteConcern, useGetConcerns } from '@components/Hooks/requests/Concerns';
import useUserApi from '@components/Hooks/useUserApi';
import { useGetUserVotes } from '@components/Hooks/requests/Users/Index';
import { useQueryClient } from '@tanstack/react-query';
import NewConcern from './NewConcern';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import Vote from '@components/Vote';
import SkeletonConcerns from './SkeletonConcerns';
import EditConcernDialog from '@components/Dialogs/EditConcernDialog';
import  EditIcon from '@mui/icons-material/Edit';

/**
 * @returns 
 */
export default function Pool(){

  const queryClient = useQueryClient();
  const {data: concerns, isFetching: isFetchingConcerns, isError: isErrorConcerns} = useGetConcerns({enabled:true});
  const { userId } = useUserApi()
  const {data: userVotes, isFetching: isFetchingUserVotes, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})
  const [concernToDelete, setConcernToDelete] = useState(null)
  const [openDelete, setOpenDelete] = useState(null)
  const {data: concernDeleted, isFetching: isFetchingConcernDeleted /* isError: isErrorConcernDeleted */} = useDeleteConcern({concernId: concernToDelete, enabled: !!concernToDelete})

  useEffect(() => {
    if(!isFetchingConcernDeleted && concernToDelete){
      queryClient.resetQueries({ queryKey: ['useGetConcerns'], exact: false });
      setConcernToDelete(null)
    }
  }, [isFetchingConcernDeleted, concernDeleted, queryClient, concernToDelete]);
 

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedConcerns = concerns?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const [openEdit, setOpenEdit] = useState(false);
  const [concernToEdit, setConcernToEdit] = useState(null);

  const handleCloseEdit= () =>{
    setConcernToEdit(null);
    setOpenEdit(false)
  }

  return (
    <Stack sx={{ flexGrow: 1, padding: 2, gap: '2em' }}>
      <Typography variant="h4" gutterBottom>
        Pool de Preguntas
      </Typography>
     
    {isFetchingConcerns  ? (
      <SkeletonConcerns />
    ): (isErrorConcerns? <Alert severity='error'>Hubo un error al obtener el pool de preguntas</Alert> 
      :
   <Stack sx={{flexGrow: 1, padding: 2, gap: '2em'}}>
    <NewConcern />
    <EditConcernDialog open={openEdit} handleClose={handleCloseEdit} concern={concernToEdit} />  
      <Stack spacing={3}>
        {paginatedConcerns?.map((concern) => (
          <Card key={concern.concernId}>
            <CardContent>
              <Typography variant="h6" textAlign={"left"}>{concern.description}</Typography>
              <Typography variant="body2" textAlign={"left"} color="textSecondary">
                {concern.explanation}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, width: '100%' }}>
              <Box>
              <Vote entityId={concern.concernId} entityType='concerns' userVotes={userVotes} isLoading={isFetchingUserVotes} isError={isErrorUserVotes} />
               
                {concern.user === userId && (
                  <>
                    <IconButton
                      variant="contained"
                      color="error"
                      onClick={() => setOpenDelete(concern.concernId)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton
                    variant="contained"
                    color="secondary"
                    onClick={() => {setConcernToEdit(concern); setOpenEdit(true); }}
                  >
                    <EditIcon />
                  </IconButton>
                  </>
                )}
              </Box>
              <Typography variant="caption" display="block" align="right">
                Realizada por: {concern.username} el {new Date(concern.date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, alignItems: 'center' , gap: '1em'}}>
        <Typography variant="body2" >Items por página:</Typography>
        <Select
        size='small'
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          displayEmpty
          inputProps={{ 'aria-label': 'Items per page' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination
          count={Math.ceil(concerns?.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
        
      </Box>
      </Stack>
       )
      }
      <ConfirmDialog
        open={!!openDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar esta pregunta?"
        onCancel={() => setConcernToDelete(null)}
        loading={isFetchingConcernDeleted}
        onConfirm={() => {
          setConcernToDelete(openDelete);
          setOpenDelete(null);
        }}
      />
    </Stack>
  );
}
