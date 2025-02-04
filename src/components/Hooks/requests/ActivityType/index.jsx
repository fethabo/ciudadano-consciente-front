import useApiQuery from "../useApiQuery";

/**
 * 
 * @param {*} 
 * @returns 
 */
export function useGetActivityTypes({ ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetActivityTypes'],
        endpoint: `/activity-types`,
        options: {...rest},
        }
      )
    )
}