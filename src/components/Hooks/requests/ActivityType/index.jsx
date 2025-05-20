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

/**
 * 
 * @param {Object} params
 * @param {string|number} params.id - The ID of the activity type to fetch
 * @param {*} rest - Additional options
 * @returns 
 */
export function useGetActivityType({ activityTypeId, ...rest }) {
  return useApiQuery({
    queryKey: ['useGetActivityType', activityTypeId],
    endpoint: `/activity-types/${activityTypeId}`,
    options: { ...rest },
  });
}