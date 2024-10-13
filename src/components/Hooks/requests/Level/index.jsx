import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";
import useObtenerToken from "../../../../security/hooks/useObtenerToken";

export function useGetLevel({levelId, ...rest}){
    return( useQuery({
        queryKey: ['useGetLevel', levelId],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/${levelId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}

export function useGetLevels({...rest}){
    return( useQuery({
        queryKey: ['useGetLevels'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


export function useGetLevelChildrens({levelId,...rest}){
    return( useQuery({
        queryKey: ['useGetLevelChildrens'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/${levelId}/childrens`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}





export function useGetOrganizationPaths({organizationId, ...rest}){
    return( useQuery({
        queryKey: ['useGetOrganizationPaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/organizations/${organizationId}/paths`)
            .then((res) => res.data),
            staleTime: 3000,
        ...rest
      })
    ) 
}

export function useGetPaths({...rest}){
  
//const token = useObtenerToken()
    return( useQuery({
        queryKey: ['useGetPaths'],
        refetchOnWindowFocus: false,
        retry:false,
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


export function useGetFavoritePaths({userId, ...rest}){
  
const token = useObtenerToken()
    return( useQuery({
        queryKey: ['useGetFavoritePaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths/favorites/users/${userId}`,{
              headers: {
                Authorization: `Bearer ${token}` // Incluye el token en los encabezados
              }
            })
            .then((res) => res.data),
        ...rest
      })
    ) 
}

export function useGetRecentlyPaths({userId, ...rest}){
    return( useQuery({
        queryKey: ['useGetRecentlyPaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths/recently/users/${userId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}       

/**
 * 
 * @param {*} form =  
{
  "name": "",
  "description": "",
  "organization": "",
  "parent": ""
}
 * @returns 
 */
export function usePostLevel({form,...rest}){
  return( useQuery({
      queryKey: ['usePostLevel'],
      queryFn: () =>
        axios
          .post(`${URL_API}/levels`, form)
          .then((res) => res.data),
      ...rest
    })
  ) 
}



export function useDeleteLevel({levelId, ...rest}){
  return( useQuery({
      queryKey: ['useDeleteLevel'],
      queryFn: () =>
        axios
          .delete(`${URL_API}/levels/${levelId}`)
          .then((res) => res.data),
      ...rest
    })
  )
}

/**
 * 
 * @param {*} levelId
 * @param form = {
  "levelId": "",
  "name": "",
  "description": "",
  "organization": "",
  "parent": ""
} 
 * @returns 
 */
export function usePatchLevel({levelId,form, ...rest}){
  return( useQuery({
      queryKey: ['usePatchLevel'],
      queryFn: () =>
        axios
          .patch(`${URL_API}/levels/${levelId}`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}



/*OBTENER LEVELS DE UNA ORGANIZACION DONDE UN USUARIO TIENE UN ROL ESPECIFICO*/
export function useGetLevelsOfUserInOrganization({organizationId, roleId,userId, ...rest}){
    return( useQuery({
        queryKey: ['useGetLevelsOfUserInOrganization'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/organizations/${organizationId}/users/${userId}/roles/${roleId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}  



export function useGetUsersWithRoleInLevel({levelId, roleId,userId, ...rest}){
  return( useQuery({
      queryKey: ['useGetUsersWithRoleInLevel'],
      queryFn: () =>
        axios
          .get(`${URL_API}/levels/organizations/${levelId}/users/roles${userId? `?user=${userId} ${roleId? `&role=${roleId}`:''}`: roleId?`?role=${roleId}`:''}`)
          .then((res) => res.data),
      ...rest
    })
  ) 
}  


/**
 * assign Role to user in level
 * @param {*} levelId
 * @param form =  {
  "user": "",
  "role": "",
  "level": ""
}
 * @returns 
 */
export function usePostUserRoleLevel({levelId,form, ...rest}){
  return( useQuery({
      queryKey: ['usePostUserRoleLevel'],
      queryFn: () =>
        axios
          .post(`${URL_API}/levels/${levelId}/users/roles`, form)
          .then((res) => res.data),
      ...rest
    })
  ) 
}  

/**
 * update Role of user in level
 * @param {*} levelId
 * @param form =  {
  "user": "",
  "role": "",
  "level": ""
}
 * @returns 
 */
export function usePatchUserRoleLevel({levelId,form, ...rest}){
  return( useQuery({
      queryKey: ['usePatchUserRoleLevel'],
      queryFn: () =>
        axios
          .patch(`${URL_API}/levels/${levelId}/users/roles`, form)
          .then((res) => res.data),
      ...rest
    })
  ) 
}  

/**
 * 
 * @param {*} levelId
 * @param userId 
 * @returns 
 */
export function useDeleteAllRolesUserLevel({levelId,userId,...rest}){
  return( useQuery({
      queryKey: ['useDeleteAllRolesUserLevel'],
      queryFn: () =>
        axios
          .delete(`${URL_API}/levels/${levelId}/users/${userId}`)
          .then((res) => res.data),
      ...rest
    })
  ) 
}

/**
 * 
 * @param {*} levelId
 * @param userId
 * @param roleId 
 * @returns 
 */
export function useDeleteRoleUserLevel({levelId,userId,roleId, ...rest}){
  return( useQuery({
      queryKey: ['useDeleteRoleUserLevel'],
      queryFn: () =>
        axios
          .delete(`${URL_API}/levels/${levelId}/users/${userId}/roles/${roleId}`)
          .then((res) => res.data),
      ...rest
    })
  ) 
}
