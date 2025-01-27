
import { useQueries } from "@tanstack/react-query";
import useGetToken from "../../../../security/hooks/useGetToken";
import useApiQuery from "../useApiQuery";
import axios from "axios";
import { URL_API } from "../../../../constants";




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


export function useGetActivitiesOfLevels({levels,...rest}){
  const token = useGetToken();
  const result= useQueries({
      queries: levels.map((level) => ({
          queryKey: ['useGetActivityByLevel', level.levelId],
          queryFn: () => axios.get(`${URL_API}/activities/level/${level.levelId}`, {headers: {Authorization: `Bearer ${token}`} } ).then((res) => res.data)
          })),
          refetchOnWindowFocus: false,
          staleTime: 300*10000,
          ...rest,
          combine: (results) => {
              return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
              }
            }
     
    })
     // console.log(result, "result")
  return result
}

export function useDeleteActivity({activityId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useDeleteActivity',activityId],
      method: 'DELETE',
      endpoint: `/activities/${activityId}`,
      options: {...rest},
      }
    )
  )   
}