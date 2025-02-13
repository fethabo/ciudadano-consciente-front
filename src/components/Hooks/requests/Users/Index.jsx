import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";
import useApiQuery from "../useApiQuery";
import useGetToken from "../../../../security/hooks/useGetToken";
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
 * @returns  all users
 */
export function useGetUsers({...rest}){
  return(
    useApiQuery({
      queryKey:['useGetUsers'],
      endpoint: `/users`,
      options: {...rest},
      }
    )
  ) 
}

/**
 * @param userId
 * @returns  user
 */
export function useGetUser({userId,...rest}){
  return(
    useApiQuery({
      queryKey:['useGetUser', userId],
      endpoint: `/users/${userId}`,
      options: {...rest},
      }
    )
  )  
  }

/**
 * @param userEmail
 * @returns  user
 */
export function useGetUserByEmail({userEmail, ...rest}){
  return useApiQuery({
    queryKey: ['useGetUserByEmail', userEmail],
    endpoint: `/users/email/${userEmail}`,
    options: { ...rest },
  });
}

/**
 * @param userName
 * @returns  user
 */
export function useGetUserByUsername({userName, ...rest}){
  return useApiQuery({
    queryKey: ['useGetUserByUsername', userName],
    endpoint: `/users/username/${userName}`,
    options: { ...rest },
  });
}



 /**
 * @param userId
 * @returns  votes of user
 */
    export function useGetUserVotes({...rest}){
      return useApiQuery({
        queryKey: ['useGetUserVotes'],
        endpoint: `/votes/users`,
        options: { ...rest },
      });
    }


/**
 * @param userId
 * @returns  user
 */
export function usePostUser({...rest}){
  return(
    useApiQuery({
      queryKey:['usePostUser'],
      endpoint: `/users`,
      method:"POST",
      options: {...rest},
      }
    )
  )  
  }



  /**
   * @deprecated use useGetUsersWithRoleOrganization, ahora devuelve los datos de los usuarios con el rol
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
    const token = useGetToken();
    const result= useQueries({
        queries: users.map((user) => ({
            queryKey: ['useGetUser', user.user],
            queryFn: () => axios.get(`${URL_API}/users/${user.user}`, {headers: {Authorization: `Bearer ${token}`} } ).then((res) => res.data)
            })),
            ...rest,
            refetchOnWindowFocus: false,//TODO: ver que onda estoooo
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

