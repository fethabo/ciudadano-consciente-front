import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


/*TODO: ver si se van a usar mas que el get*/
/**
 * 
 * @returns 
 */
export function useGetEntityTypes({...rest}){
    return( useQuery({
        queryKey: ['useGetEntityTypes'],
        queryFn: () =>
          axios
            .get(`${URL_API}/entity-types`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}
