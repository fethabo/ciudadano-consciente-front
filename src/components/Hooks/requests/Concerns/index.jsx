
import useApiQuery from "../useApiQuery";

//GET ALL CONCERNS
export function useGetConcerns({ ...rest }){
    return(
      useApiQuery({
        queryKey:['useGetConcerns'],
        endpoint: `/concerns`,
        options: {...rest},
        }
      )
    )
}

export function useGetConcern({concernId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetConcern',concernId],
        endpoint: `/concerns/${concernId}`,
        options: {...rest},
        }
      )
    )
}

export function useGetConcernsOfUser({userId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetConcernsOfUser',userId],
        endpoint: `/levels/${userId}/concerns`,
        options: {...rest},
        }
      )
    )
}

export function useDeleteConcern({concernId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useDeleteConcern',concernId],
        endpoint: `/concern/${concernId}`,
        method: 'DELETE',
        options: {...rest},
        }
      )
    )
}

/**
 * 
 * @param {*} form: {
  "level": "",
  "title": "",
  "url": "",
  "description": ""
}
 
 * @returns 
 */
export function usePostConcern({form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePostConcern'],
        endpoint: `/concerns`,
        method: 'POST',
        form: form,
        options: {...rest},
        }
      )
    )
}

export function usePatchConcern({concernId, form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePatchConcern',concernId],
        endpoint: `/concerns/${concernId}`,
        method: 'PATCH',
        form: form,
        options: {...rest},
        }
      )
    )
}
