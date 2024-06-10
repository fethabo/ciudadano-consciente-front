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