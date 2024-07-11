import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";

/**
 * 
 * @returns  all users
 */
export function useGetUsers({...rest}){
    return( useQuery({
        queryKey: ['useGetUsers'],
        queryFn: () =>
          axios
            .get(`${URL_API}/users`)
            .then((res) => res.data),
        ...rest
      })
    )
  }


  /* TODO: POST (la version actual espera password, evaluar cuando se implemtnte kc) */

  /**
 * @param userId
 * @returns  user
 */
export function useGetUser({userId,...rest}){
    return( useQuery({
        queryKey: ['useGetUser', userId],
        queryFn: () =>
          axios
            .get(`${URL_API}/users/${userId}`)
            .then((res) => res.data),
        ...rest
      })
    )
  }


  /**
 * @param users
 * @returns  users of organization {}
 */
  /* const combinedQueries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['post', id],
      queryFn: () => fetchPost(id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  }) */
  export function useGetUsersOfOrganization({users,...rest}){
    const result= useQueries({
        queries: users.map((user) => ({
            queryKey: ['useGetUser', user.user],
            queryFn: () => axios.get(`${URL_API}/users/${user.user}`).then((res) => res.data)
            })),
            ...rest,
            combine: (results) => {
                return {
                  data: results.map((result) => result.data),
                  pending: results.some((result) => result.isPending),
                }
              }
        })
        console.log(result, "result")
    return result
  }



    /**
 * @param userId
 * @returns  votes of user
 */
export function useGetUserVotes({userId,...rest}){
    return( useQuery({
        queryKey: ['useGetUserVotes', userId],
        queryFn: () =>
          axios
            .get(`${URL_API}/users/${userId}/votes`)
            .then((res) => res.data),
        ...rest
      })
    )
  }