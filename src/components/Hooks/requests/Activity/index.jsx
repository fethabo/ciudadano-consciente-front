
import useApiQuery from "../useApiQuery";




export function useGetActivity({activityId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetActivity',activityId],
        endpoint: `/activities/${activityId}`,
        options: {...rest},
        }
      )
    )
}


export function useGetActivityByLevel({levelId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useGetActivityByLevel',levelId],
      endpoint: `/activities/level/${levelId}`,
      options: {...rest},
      }
    )
  )   

}

/**
 * 
 * @param {*} form 
 * @returns 
 */
export function usePostActivity({form, ...rest}){
  return(
    useApiQuery({
      queryKey:['usePostActivity'],
      form: form,
      method: 'POST',
      endpoint: `/activities`,
      options: {...rest},
      }
    )
  )   
}

/**
 * 
 * @param {*} activityId
 * @param form 
 * @returns 
 */
export function usePatchActivity({activityId,form, ...rest}){
  return(
    useApiQuery({
      queryKey:['usePatchActivity', activityId],
      form: form,
      method: 'PATCH',
      endpoint: `/activities/${activityId}`,
      options: {...rest},
      }
    )
  )   
}
