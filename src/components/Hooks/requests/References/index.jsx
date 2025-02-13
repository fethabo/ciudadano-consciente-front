
import useApiQuery from "../useApiQuery";

//GET ALL REFERENCES
export function useGetReferences({ ...rest }){
    return(
      useApiQuery({
        queryKey:['useGetReferences'],
        endpoint: `/references`,
        options: {...rest},
        }
      )
    )
}

export function useGetReference({referenceId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetReference',referenceId],
        endpoint: `/references/${referenceId}`,
        options: {...rest},
        }
      )
    )
}

export function useGetReferencesOfLevel({levelId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetReferencesOfLevel',levelId],
        endpoint: `/levels/${levelId}/references`,
        options: {...rest},
        }
      )
    )
}

export function useDeleteReference({referenceId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useDeleteReference',referenceId],
        endpoint: `/reference/${referenceId}`,
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
export function usePostReference({form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePostReference'],
        endpoint: `/references`,
        method: 'POST',
        form: form,
        options: {...rest},
        }
      )
    )
}

export function usePatchReference({referenceId, form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePatchReference',referenceId],
        endpoint: `/references/${referenceId}`,
        method: 'PATCH',
        form: form,
        options: {...rest},
        }
      )
    )
}
