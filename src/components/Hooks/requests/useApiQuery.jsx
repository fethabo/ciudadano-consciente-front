import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import useGetToken from '../../../security/hooks/useGetToken';
import { URL_API } from "../../../constants";

/**
 * @example return( 
    useApiQuery({
      queryKey:['',],
      endpoint: ``,
      method: '',
      options: {...rest},
      form: form,
      requiresAuth: true
      }
    )
  )
 * @param {*} param0 
 * @returns 
 */
export default function useApiQuery({ queryKey, endpoint, method = 'GET', form, requiresAuth = true, options = {}, headers }) {
  const token = useGetToken();

  function isWriting(){
    return (method==="POST" || method==="PUT" || method==="DELETE" || method=="PATCH")
  }

  return useQuery({
    queryKey,
    queryFn: async () => {
      const config = {
        method,
        url: `${URL_API}${endpoint}`,
        data: (((method === 'POST' || method === 'PUT' || method === 'PATCH') && form) ? form : undefined), // agregamos el form solo en los POST y PUT
        headers: {
          ...(requiresAuth && { Authorization: `Bearer ${token}` }),
          ...headers
        },
      };
      const response = await axios(config);
      return response.data;
    },
    retry: isWriting() ? false: 1,
    staleTime: isWriting()? 1 : 30*1000,
    refetchOnWindowFocus: false,
    //refetchOnInvalidate: true, // Add this line to enable refetch on invalidate
    ...options,
  });
}
