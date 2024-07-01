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
/* TODO: Post de Activity */

/* TODO: PATCH de Activity */