import useApiQuery from "../useApiQuery";

/**
 * 
 * @returns 
 */
export function useGetVotes({...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetVotes'],
      endpoint: `/votes`,
      options: {...rest},
      }
    )
  )  
}


export function useGetVote({voteId,...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetVote', voteId],
      endpoint: `/votes/${voteId}`,
      options: {...rest},
      }
    )
  )   
}

export function usePatchVoteStatus({voteId,...rest}){
  return( 
    useApiQuery({
      queryKey:['usePatchVoteStatus', voteId],
      endpoint: `/votes/${voteId}`,
      method: 'PATCH',
      options: {...rest},
      }
    )
  )  
}

/**
 * 
 * @param {*} userId
 * @param entityTypeId
 * @param entityId 
 * @returns 
 */
export function usePostVote({entityTypeId,entityId,...rest}){
  return( 
    useApiQuery({
      queryKey:['usePostVote', entityTypeId,entityId],
      endpoint: `/votes/${entityTypeId}/${entityId}`,
      method: 'POST',
      options: {...rest},
      }
    )
  )    
}



export function useGetVotesOfEntity({entityId, entityType, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetVotesOfEntity',entityId, entityType],
        endpoint: `/${entityType}/${entityId}/votes`,
        options: {...rest},
        }
        )
    )
    }