import useApiQuery from "../useApiQuery";

/**
 * 
 * @param {*} activityTypeVersionId
 * @returns 
 */
export function useGetActivityTypeVersion({activityTypeVersionId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetActivityTypeVersion',activityTypeVersionId],
        endpoint: `/activity-type-versions/${activityTypeVersionId}`,
        options: {...rest},
        }
      )
    )
}

/**
 * 
 * @param {*} activityTypeId
 * @returns 
 */
export function useGetActivityTypeVersionsOfActivityType({activityTypeId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useGetActivityTypeVersionOfActivityType',activityTypeId],
      endpoint: `/activity-type-versions/activity-type/${activityTypeId}`,
      options: {...rest},
      }
    )
  )
}
