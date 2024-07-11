import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";

/**
 * 
 * @returns  all roles
 */
export function useGetRoles({...rest}){
    return( useQuery({
        queryKey: ['useGetRoles'],
        queryFn: () =>
          axios
            .get(`${URL_API}/roles`)
            .then((res) => res.data),
        ...rest
      })
    )
  }