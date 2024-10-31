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
        endpoint: `/activity-type-version/${activityTypeVersionId}`,
        options: {...rest},
        }
      )
    )
}
