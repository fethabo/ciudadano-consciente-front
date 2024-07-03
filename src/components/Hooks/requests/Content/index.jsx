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

export function usePostContent({form, ...rest}){
  return( useQuery({
      queryKey: ['usePostContent'],
      queryFn: () =>
        axios
          .post(`${URL_API}/contents/`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}


export function usePatchContent({form, ...rest}){
  return( useQuery({
      queryKey: ['usePatchContent'],
      queryFn: () =>
        axios
          .patch(`${URL_API}/contents/`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}