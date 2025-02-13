import { useEffect, useState } from 'react';
import {  Card, CardContent, Typography, Button, TextField, Box, Stack, IconButton } from '@mui/material';
import { useGetConcerns } from '@components/Hooks/requests/Concerns';
import { usePatchVoteStatus, usePostVote } from '@components/Hooks/requests/Votes';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import  FavoriteIcon from '@mui/icons-material/Favorite';
import  FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useUserApi from '@components/Hooks/useUserApi';
import { useGetUserVotes } from '@components/Hooks/requests/Users/Index';
const Pool = () => {

  const { userId } = useUserApi()
  const {data: concerns, isFetching: isFetchingConcerns, isError: isErrorConcerns} = useGetConcerns({enabled:true});
  const [entityTypeId, setEntityTypeId]= useState(null)
  const {data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes}= useGetEntityTypes({enabled:true});
  const [vote, setVote] = useState(null)
  const [updateVote, setUpdateVote] = useState(null)
  const {data: concernVoted, isFetching: isFetchingPostVote, isError: isErrorPostVote } = usePostVote({entityId: vote, entityTypeId: entityTypeId, enabled: !!vote && !!entityTypeId})
  const {data: concernPatched, isFetching: isFetchingPatchVote, isError: isErrorPatchVote } = usePatchVoteStatus({voteId: updateVote, entityTypeId: entityTypeId, enabled: !!updateVote && !!entityTypeId})
  
 
  const {data: userVotes, isFetching: isFetchingUserVots, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})
  
  useEffect(() => {
    if(!!entityTypes){
    const id= entityTypes?.find((v)=> v?.title==="concerns")?.entityTypeId
      setEntityTypeId(id)
  }
  }, [entityTypes]);

  const handleVotar = (id) => {
    setPreguntas((prevPreguntas) =>
      prevPreguntas.map((pregunta) =>
        pregunta.id === id ? { ...pregunta, votos: pregunta.votos + 1 } : pregunta
      )
    );
  };

  //  nueva pregunta
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const handleAgregarPregunta = () => {
    if (nuevaPregunta.trim() !== '') {
      const nueva = {
        id: preguntas.length + 1,
        contenido: nuevaPregunta,
        votos: 0,
      };
      //setPreguntas([nueva, ...preguntas]);
      setNuevaPregunta(''); // Limpiar el campo de texto
    }
  };

  const handleEliminar = (id) => {
   console.log("debo eliminar", id)
    // setPreguntas((prevPreguntas) => prevPreguntas.filter((pregunta) => pregunta.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Foro de Preguntas
      </Typography>
    
      <Stack spacing={3}>
        {concerns?.map((concern) => (
          <Card key={concern.concernId}>
            <CardContent >
              <Typography variant="h6" textAlign={"left"}>{concern.description}</Typography>
              <Typography variant="body2" textAlign={"left"} color="textSecondary">
                {concern.explanation}
              </Typography>
             
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, width:'100%'}}>
              <Box>
              <IconButton
                onClick={() => setVote(concern.concernId)}
              >
              
                {!userVotes?.some(vote =>vote.entityType===entityTypeId && vote.entity === concern.concernId)
                    ?<FavoriteIcon />
                    :<FavoriteBorderIcon />
                }
                
              </IconButton>
              {concern.user === userId && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEliminar(concern.concernId)}
                >
                  Eliminar
                </Button>
              )}
               </Box>
               <Typography variant="caption" display="block" align="right">
                Realizada por: {concern.user} el {new Date(concern.date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
              </Typography>
             
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Pool;
