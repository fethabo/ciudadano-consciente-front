import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";

/**
 * 
 * @returns 
 */
export function useGetVotes({...rest}){
    return( useQuery({
        queryKey: ['useGetVotes'],
        queryFn: () =>
          axios
            .get(`${URL_API}/votes`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


export function useGetVote({voteId,...rest}){
    return( useQuery({
        queryKey: ['useGetVote'],
        queryFn: () =>
          axios
            .get(`${URL_API}/votes/${voteId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

export function usePatchVoteStatus({voteId,...rest}){
    return( useQuery({
        queryKey: ['usePatchVoteStatus'],
        queryFn: () =>
          axios
            .patch(`${URL_API}/votes/${voteId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

/**
 * 
 * @param {*} userId
 * @param entityTypeId
 * @param entityId 
 * @returns 
 */
export function usePostVote({userId,entityTypeId,entityId,...rest}){
    return( useQuery({
        queryKey: ['usePostVote'],
        queryFn: () =>
          axios
            .post(`${URL_API}/votes/${userId}/${entityTypeId}/${entityId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}
