
import useApiQuery from "../useApiQuery";


/*TODO: ver si se van a usar mas que el get*/
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
