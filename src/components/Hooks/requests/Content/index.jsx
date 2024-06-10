import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


export function useGetContent({contentId, ...rest}){
    return( useQuery({
        queryKey: ['useGetContent'],
        queryFn: () =>
          axios
            .get(`${URL_API}/contents/${contentId}`)
            .then((res) => res.data),
        ...rest
      })
    )
     

}