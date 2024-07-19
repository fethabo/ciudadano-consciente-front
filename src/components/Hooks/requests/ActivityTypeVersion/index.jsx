import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";

/**
 * 
 * @param {*} activityTypeVersionId
 * @returns 
 */
export function useGetActivityTypeVersion({activityTypeVersionId, ...rest}){
    return( useQuery({
        queryKey: ['useGetActivityTypeVersion'],
        queryFn: () =>
          axios
            .get(`${URL_API}/activity-type-version/${activityTypeVersionId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}
