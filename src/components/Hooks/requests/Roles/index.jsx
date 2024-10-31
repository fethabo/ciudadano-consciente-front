import useApiQuery from "../useApiQuery";

/**
 * 
 * @returns  all roles
 */
export function useGetRoles({...rest}){
   return( useApiQuery({
    queryKey:['useGetRoles'],
    endpoint: `/roles`,
    options: {...rest},
    }
  ))
  }