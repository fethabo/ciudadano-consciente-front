import useApiQuery from "../useApiQuery"

export function useGetOrganizations({...rest}){
    return(
      useApiQuery({
        queryKey:['useGetOrganizations'],
        endpoint: `/organizations`,
        options: {...rest},
        }
      )
    ) 
}

/**
 * 
 * @param {*} organizationId 
 * @returns 
 */
export function useGetOrganization({organizationId, ...rest}){
    return( useApiQuery({
      queryKey:['useGetOrganization',organizationId],
      endpoint: `/organizations/${organizationId}`,
      options: {...rest},
    }
    )
  )
}

/**
 * 
 * @param {*} userId 
 * @returns 
 */
export function useGetOrganizationsOfUser({userId, ...rest}){
  return( useApiQuery({
    queryKey:['useGetOrganizationsOfUser',userId],
    endpoint: `/organizations/users/${userId}`,
    options: {...rest},
    }
  ) 
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
    return( useApiQuery({
      queryKey:['usePostOrganization'],
      endpoint: `/organizations`,
      method: 'POST',
      options: {...rest},
      form: form,
      }
    ) 
  )
}

export function useDeleteOrganization({organizationId, ...rest}){
    return( useApiQuery({
      queryKey:['useDeleteOrganization',organizationId],
      endpoint: `/organizations/${organizationId}`,
      method: 'DELETE',
      options: {...rest},
      }

        )    )
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
    return( useApiQuery({
      queryKey:['usePatchOrganization',organizationId],
      endpoint: `/organizations/${organizationId}`,
      method: 'PATCH',
      options: {...rest},
      form: form,
      }
    ) 
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
    return( useApiQuery({
      queryKey:['useGetUsersWithRoleOrganization',organizationId,roleId,userId],
      endpoint: `/organizations/${organizationId}/users/roles${roleId?`?role=${roleId}${userId?`&user=${userId}`:''}`: userId? `?user=${userId}` :'' }`,
      options: {...rest},
      }
     ) 
    ) 
}
/**
 * 
 * @param {*} organizationId 
 * @param roleId
 * @param userId
 * @returns users with Role in Organization
 * OBS: es la misma query que la anterior, la duplico por que el uso del mismo queryKey me esta generando problemas con los cambios de estado
 */
export function useGetUserRolesInOrganization({organizationId, roleId, userId,...rest}){
  return(  useApiQuery({
    queryKey:['useGetUserRolesInOrganization',organizationId,roleId,userId],
    endpoint: `/organizations/${organizationId}/users/roles${roleId?`?role=${roleId}${userId?`&user=${userId}`:''}`: userId? `?user=${userId}` :'' }`,
    options: {...rest},
    }
  )
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
    return( useApiQuery({
      queryKey:['usePostRoleUserOrganization',organizationId],
      endpoint: `/organizations/${organizationId}/users/roles`,
      method: 'POST',
      options: {...rest},
      form: form,
      }
    ) 
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
    return( useApiQuery({
      queryKey:['usePatchRoleUserOrganization',organizationId],
      endpoint: `/organizations/${organizationId}/users/roles`,
      method: 'PATCH',
      options: {...rest},
      form: form,
      }
    ) 
    ) 
}


/**
 * 
 * @param {*} organizationId 
 * @param userId
 * @returns 
 */
export function useDeleteAllUserRoleOrganization({organizationId, userId, ...rest}){
    return( useApiQuery({
      queryKey:['useDeleteAllUserRoleOrganization', organizationId],
      endpoint: `/organizations/${organizationId}/users/${userId}`,
      method: 'DELETE',
      options: {...rest},
      }
    ) 
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
  
  return(  useApiQuery({
    queryKey:['useDeleteUserRoleOrganization',organizationId, userId,roleId],
    endpoint: `/organizations/${organizationId}/users/${userId}/roles/${roleId}`,
    method: 'DELETE',
    options: {...rest},
    }
  )
    )
}
