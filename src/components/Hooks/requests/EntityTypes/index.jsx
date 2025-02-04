
import useApiQuery from "../useApiQuery";


/**
 * 
 * @returns 
 */
export function useGetEntityTypes({...rest}){
    return(
      useApiQuery({
        queryKey:['useGetEntityTypes'],
        endpoint: `/entity-types`,
        options: {...rest},
        }
      )
    ) 
}
