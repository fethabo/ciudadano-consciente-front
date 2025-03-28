
import  FavoriteIcon from '@mui/icons-material/Favorite';
import  FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from "prop-types"
import { IconButton, SvgIcon } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import { usePatchVoteStatus, usePostVote } from '@components/Hooks/requests/Votes';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';


/**
 *  el padre debe indicar el id de la entidad y en nombre del tipo de la entidad, pasarle el arreglo del userVotes y el isLoading del mismo.
 *  const { userId } = useUserApi()
   const {data: userVotes, isFetching: isFetchingUserVotes, isError: isErrorUserVotes} = useGetUserVotes({userId: userId, enabled: !!userId})
  
 * @returns 
 */
function Vote({entityType, entityId, userVotes, isError, isLoading = false}) {

/**
 * Tengo dos casos de uso: 
 *  - el voto no existe, por lo que debo realizar el post 
 *  - el voto ya existe, por lo que debo realizar el patch del status
 */

 const [vote, setVote] = useState(null)

 //Obtengo los entityTypes para obtener el id de entityType
 const [entityTypeId, setEntityTypeId]= useState(null)
 const {data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes}= useGetEntityTypes({enabled:true});

 //Seteo el entityTypeId
 useEffect(() => {
    if(entityTypes){
      const id= entityTypes?.find((v)=> v?.title===entityType)?.entityTypeId
      setEntityTypeId(id)
  }
  }, [entityTypes, entityType]);


  const [enablePost, setEnablePost] = useState(false);  
  const [enablePatch, setEnablePatch] = useState(false);
  const { isFetching: isFetchingPostVote, isError: isErrorPostVote } = usePostVote({entityId: entityId, entityTypeId: entityTypeId, enabled: enablePost && !!entityId && !!entityTypeId})
  const { isFetching: isFetchingPatchVote, isError: isErrorPatchVote } = usePatchVoteStatus({voteId: vote?.voteId , entityTypeId: entityTypeId, enabled: !!enablePatch && !!vote && !!entityTypeId})
  

  //busco el voto y lo seteo en el estado interno
    useEffect(() => {
        if (userVotes && !!entityTypeId && !!entityId) {
            const existingVote = userVotes?.find(vote => vote.entityType === entityTypeId && vote.entity === entityId);
            if (existingVote) {
                setVote(existingVote);
            }
        }
    }, [userVotes,entityTypeId,entityId]);

    const queryClient = useQueryClient()
    //
   

     useEffect(() => {
        if(!isFetchingPostVote && !isFetchingPatchVote && (enablePatch||enablePost)){
            queryClient.resetQueries({ queryKey: ['useGetUserVotes'], exact: false });
            queryClient.resetQueries({ queryKey: ['useGetFavoritePaths'], exact: false})
            setEnablePatch(false)
            setEnablePost(false)
        }
      }, [isFetchingPatchVote, isFetchingPostVote, queryClient, enablePatch, enablePost]);


      const handleVote = () =>{
            if (vote) {
                setEnablePatch(true);
            } else {
                setEnablePost(true);
        }
    }

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        if(isFetchingEntityTypes||isFetchingPatchVote||isFetchingPostVote){
            setLoader(true)
        }
    }, [isFetchingEntityTypes,isFetchingPatchVote,isFetchingPostVote]);


    useEffect(() => {
        if(!isLoading){
            setLoader(false)
        }
    }, [isLoading, isFetchingEntityTypes]);

    return ( 
        <IconButton onClick={() => handleVote()} disabled={loader||isError||isErrorEntityTypes}>
                  {(loader)
                  ? <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><circle cx="12" cy="3.5" r="1.5"><animateTransform attributeName="transform" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="0 12 12;90 12 12;180 12 12;270 12 12"/><animate attributeName="opacity" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></circle><circle cx="12" cy="3.5" r="1.5" transform="rotate(30 12 12)"><animateTransform attributeName="transform" begin="0.2s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="30 12 12;120 12 12;210 12 12;300 12 12"/><animate attributeName="opacity" begin="0.2s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></circle><circle cx="12" cy="3.5" r="1.5" transform="rotate(60 12 12)"><animateTransform attributeName="transform" begin="0.4s" calcMode="discrete" dur="2.4s" repeatCount="indefinite" type="rotate" values="60 12 12;150 12 12;240 12 12;330 12 12"/><animate attributeName="opacity" begin="0.4s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></circle></g></svg>
                    </SvgIcon>
                 : ((isError||isErrorEntityTypes||isErrorPostVote||isErrorPatchVote)
                        ? <ErrorTwoToneIcon color="error" />
                        :
                        (vote?.active===true)
                            ? <FavoriteIcon />
                            : <FavoriteBorderIcon />
                    )
                }
                </IconButton>
     );
}

export default Vote;

Vote.propTypes={
    userVotes: PropTypes.array.isRequired,
    entityId: PropTypes.number.isRequired,
    entityType: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool

}