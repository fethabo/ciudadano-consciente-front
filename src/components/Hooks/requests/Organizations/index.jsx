import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


export function useGetOrganizations({...rest}){
    return( useQuery({
        queryKey: ['useGetOrganizations'],
        queryFn: () =>
          axios
            .get(`${URL_API}/organizations`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

/**
 * 
 * @param {*} organizationId 
 * @returns 
 */
export function useGetOrganization({organizationId, ...rest}){
    return( useQuery({
        queryKey: ['useGetOrganization'],
        queryFn: () =>
          axios
            .get(`${URL_API}/organizations/${organizationId}`)
            .then((res) => res.data),
        staleTime: 3000,
        ...rest
      })
    )
}

/**
 * 
 * @param {*} userId 
 * @returns 
 */
export function useGetOrganizationsOfUser({userId, ...rest}){
  return( useQuery({
      queryKey: ['useGetOrganizationsOfUser'],
      queryFn: () =>
        axios
          .get(`${URL_API}/organizations/users/${userId}`)
          .then((res) => res.data),
      ...rest
    })
  )
}
/* TODO: 
PROBAR POST, PUEDE QUE HAGA FALTA AGREGAR ALGUN HEADER
*/
/**
 * 
 * @param {*} form = {
  "name": "",
  "email": "",
  "description": ""
}
 * @returns 
 */
export function usePostOrganization({form, ...rest}){
    return( useQuery({
        queryKey: ['usePostOrganization'],
        queryFn: () =>
          axios
            .post(`${URL_API}/organizations`, form)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

export function useDeleteOrganization({organizationId, ...rest}){
    return( useQuery({
        queryKey: ['useDeleteOrganization'],
        queryFn: () =>
          axios
            .delete(`${URL_API}/organizations/${organizationId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}


/**
 * 
 * @param {*} form  {
                    "organizationId": "",
                    "name": "",
                    "email": "",
                    "description": ""
                    }
 * @param organizationId
 * @returns 
 */
export function usePatchOrganization({organizationId,form, ...rest}){
    return( useQuery({
        queryKey: ['usePatchOrganization'],
        queryFn: () =>
          axios
            .patch(`${URL_API}/organizations/${organizationId}`,form)
            .then((res) => res.data),
        ...rest
      })
    )
}


/**
 * 
 * @param {*} organizationId 
 * @param roleId
 * @param userId
 * @returns users with Role in Organization
 */
export function useGetUsersWithRoleOrganization({organizationId, roleId, userId,...rest}){
    return( useQuery({
        queryKey: ['useGetUsersWithRoleOrganization'],
        queryFn: () =>
          axios
            .get(`${URL_API}/organizations/${organizationId}/users/roles${roleId?`?role=${roleId}${userId?`&user=${userId}`:''}`: userId? `?user=${userId}` :'' }`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

/**
 * Assign Role to User in Organization
 * @param {*} form = {
  "user": "",
  "role": "",
  "organization": ""
}
 * @returns 
 */
export function usePostRoleUserOrganization({organizationId,form, ...rest}){
    return( useQuery({
        queryKey: ['usePostRoleUserOrganization'],
        queryFn: () =>
          axios
            .post(`${URL_API}/organizations/${organizationId}/users/roles`, form)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

/**
 * Update Role to User in Organization
 * @param {*} form = {
  "user": "",
  "role": "",
  "organization": ""
}
 * @returns 
 */
export function usePatchRoleUserOrganization({organizationId,form, ...rest}){
    return( useQuery({
        queryKey: ['usePatchRoleUserOrganization'],
        queryFn: () =>
          axios
            .patch(`${URL_API}/organizations/${organizationId}/users/roles`, form)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


/**
 * 
 * @param {*} organizationId 
 * @param userId
 * @returns 
 */
export function useDeleteAllUserRoleOrganization({organizationId, userId, ...rest}){
    return( useQuery({
        queryKey: ['useDeleteAllUserRoleOrganization'],
        queryFn: () =>
          axios
            .delete(`${URL_API}/organizations/${organizationId}/users/${userId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}

/**
 * 
 * @param {*} organizationId 
 * @param userId
 * @param roleId
 * @returns 
 */
export function useDeleteUserRoleOrganization({organizationId, userId,roleId, ...rest}){
  
  return( useQuery({
        queryKey: ['useDeleteUserRoleOrganization'],
        queryFn: () =>
          axios
            .delete(`${URL_API}/organizations/${organizationId}/users/${userId}/roles/${roleId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}
