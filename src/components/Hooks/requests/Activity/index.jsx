import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


export function useGetActivity({activityId, ...rest}){
    return( useQuery({
        queryKey: ['useGetActivity'],
        queryFn: () =>
          axios
            .get(`${URL_API}/activities/${activityId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}


export function useGetActivityByLevel({levelId, ...rest}){
  return( useQuery({
      queryKey: ['useGetActivityByLevel'],
      queryFn: () =>
        axios
          .get(`${URL_API}/activities/level/${levelId}`)
          .then((res) => res.data),
      ...rest
    })
  )
   

}

/**
 * 
 * @param {*} form 
 * @returns 
 */
export function usePostActivity({form, ...rest}){
  return( useQuery({
      queryKey: ['usePostActivity'],
      queryFn: () =>
        axios
          .post(`${URL_API}/activities`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}

/**
 * 
 * @param {*} activityId
 * @param form 
 * @returns 
 */
export function usePatchActivity({activityId,form, ...rest}){
  return( useQuery({
      queryKey: ['usePatchActivity'],
      queryFn: () =>
        axios
          .patch(`${URL_API}/activities/${activityId}`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}
