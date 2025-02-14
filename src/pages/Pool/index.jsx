import { useEffect, useState } from 'react';
import {  Card, CardContent, Typography, Box, Stack, IconButton, Pagination, Select, MenuItem, Skeleton, Alert } from '@mui/material';
import { useDeleteConcern, useGetConcerns } from '@components/Hooks/requests/Concerns';
import { usePatchVoteStatus, usePostVote } from '@components/Hooks/requests/Votes';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import  FavoriteIcon from '@mui/icons-material/Favorite';
import  FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useUserApi from '@components/Hooks/useUserApi';
import { useGetUserVotes } from '@components/Hooks/requests/Users/Index';
import { useQueryClient } from '@tanstack/react-query';
import NewConcern from './NewConcern';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';


/**
 * @todo: llevar responsabilidad de votos a cada Card, de esta forma invalido solo ese voto en particular y no tengo un parpadeo en el Refetch tras la actualizcion de estado (ademas puedo reutilizar el control del voto segun la entidad)
 * @returns 
 */
export default function Pool(){

  const { userId } = useUserApi()
  const queryClient = useQueryClient();
  const {data: concerns, isFetching: isFetchingConcerns, isError: isErrorConcerns} = useGetConcerns({enabled:true});
  const [entityTypeId, setEntityTypeId]= useState(null)
  const {data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes}= useGetEntityTypes({enabled:true});
  const [vote, setVote] = useState(null)
  const [updateVote, setUpdateVote] = useState(null)
  const {data: concernVoted, isFetching: isFetchingPostVote, isError: isErrorPostVote } = usePostVote({entityId: vote, entityTypeId: entityTypeId, enabled: !!vote && !!entityTypeId})
  const {data: concernPatched, isFetching: isFetchingPatchVote, isError: isErrorPatchVote } = usePatchVoteStatus({voteId: updateVote, entityTypeId: entityTypeId, enabled: !!updateVote && !!entityTypeId})
  const {data: userVotes, isFetching: isFetchingUserVotes, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})
  const [concernToDelete, setConcernToDelete] = useState(null)
  const [openDelete, setOpenDelete] = useState(null)
  const {data: concernDeleted, isFetching: isFetchingConcernDeleted, isError: isErrorConcernDeleted} = useDeleteConcern({concernId: concernToDelete, enabled: !!concernToDelete})

  useEffect(() => {
    if(!isFetchingConcernDeleted && concernToDelete){
      queryClient.resetQueries({ queryKey: ['useGetConcerns'], exact: false });
        setConcernToDelete(null)
    }
  }, [isFetchingConcernDeleted, concernDeleted, queryClient, concernToDelete]);
 

  //Seteo el entityTypeId
  useEffect(() => {
    if(entityTypes){
      const id= entityTypes?.find((v)=> v?.title==="concerns")?.entityTypeId
      setEntityTypeId(id)
  }
  }, [entityTypes]);

  useEffect(() => {
    if(!isFetchingPostVote && !isFetchingPatchVote && (vote||updateVote)){
      console.log("se cumple funcion en uef", vote, updateVote, userId, queryClient)
      queryClient.resetQueries({ queryKey: ['useGetUserVotes'], exact: false });
      //queryClient.resetQueries({ queryKey: ['useGetUserVotes', userId], exact: true }) // fuerzo la lectura del mapa actualizado
        setVote(null)
        setUpdateVote(null)
    }
  }, [vote, updateVote, isFetchingPatchVote, isFetchingPostVote, queryClient, userId]);

  const handleVotar = (id) => {
    const vote = userVotes?.find(vote => vote.entityType === entityTypeId && vote.entity === id)
    if (vote) {
      setUpdateVote(vote?.voteId);// para el patch uso el id del voto, no de la entidad
    } else {
      setVote(id);
    }
  };


  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedConcerns = concerns?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Stack sx={{ flexGrow: 1, padding: 2, gap: '2em' }}>
      <Typography variant="h4" gutterBottom>
        Foro de Preguntas
      </Typography>
     
    {isFetchingConcerns  ? (
      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" textAlign={"left"}>
              <Skeleton width="40%" />
            </Typography>
            <Skeleton variant="rectangular" height={56} sx={{ marginBottom: 2 }} />
            <Skeleton variant="rectangular" height={100} />
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Skeleton variant="rectangular" width={100} height={36} />
          </Box>
        </Card>
        {[1, 2, 3].map((index) => (
      <Card key={index}>
        <CardContent>
          <Typography variant="h6" textAlign={"left"}>
        <Skeleton width="80%" />
          </Typography>
          <Typography variant="body2" textAlign={"left"} color="textSecondary">
        <Skeleton width="60%" />
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, width: '100%' }}>
          <Box display={"flex"}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          </Box>
          <Typography variant="caption" width={40} display="block" align="right">
        <Skeleton width="100%" />
          </Typography>
        </Box>
      </Card>
        ))}
      </Stack>
    ): (isErrorConcerns? <Alert severity='error'>Hubo un error al obtener el pool de preguntas</Alert> 
      :
   <Stack sx={{flexGrow: 1, padding: 2, gap: '2em'}}>
    <NewConcern />
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
                <IconButton onClick={() => handleVotar(concern.concernId)}>
                  {userVotes?.some(vote => vote.entityType === entityTypeId && vote.entity === concern.concernId && vote.active===true)
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon />
                  }
                </IconButton>
                {concern.user === userId && (
                  <IconButton
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDelete(concern.concernId)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
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
