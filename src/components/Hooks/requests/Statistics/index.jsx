import useApiQuery from "../useApiQuery";
/*
useApiQuery({
      queryKey:['',],
      endpoint: ``,
//      method: '', //Usar solo si no es GET
      options: {...rest},
      }
    )
*/

/**
 * 
 * @returns  Statistics of USER
 */
export function useGetStatisticsOfUser({...rest}){
  return(
    useApiQuery({
      queryKey:['useGetStatisticsOfUser'],
      endpoint: `/users/statistics`,
      options: {...rest},
      }
    )
  ) 
}


/**
 * 
 * @returns  Statistics of USER
 */
export function useGetStatisticsOfOrganization({organizationId,...rest}){
    return(
      useApiQuery({
        queryKey:['useGetStatisticsOfUser'],
        endpoint: `/organizations/${organizationId}/statistics`,
        options: {...rest},
        }
      )
    ) 
  }