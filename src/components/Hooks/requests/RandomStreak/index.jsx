import useApiQuery from "../useApiQuery";

export function useGetStreakOfUser({userId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetStreakOfUser', userId],
      endpoint: `/streak/random/users/${userId}`,
      options: {...rest},
      }
    )
  )
}



export function usePostStreak({form, userId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['usePostStreak', userId],
      endpoint: `/streak/random/users/${userId}`,
      method: 'POST',
      options: {...rest},
      form:form
    }
    )
  )
}


export function usePatchStreak({form,userId, ...rest}){
  return(
    useApiQuery({
      queryKey:['usePatchStreak',userId],
      endpoint: `/streak/random/users/${userId}`,
      method: 'PATCH',
      form:form,
      options: {...rest},
      }
    )
  )
}

