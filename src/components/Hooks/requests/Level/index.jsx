
import useApiQuery from "../useApiQuery";

/*
useApiQuery({
      queryKey:['',],
      endpoint: ``,
//      method: '', //Usar solo si no es GET
      options: {...rest},
      }
    )
*/
export function useGetLevel({levelId, ...rest}){
    return(
      useApiQuery({
      queryKey:['useGetLevel',levelId],
      endpoint: `/levels/${levelId}`,
      options: {...rest},
      }
    )
  )
}

export function useGetLevels({...rest}){
  return(
    useApiQuery({
    queryKey:['useGetLevels'],
    endpoint: `/levels`,
    options: {...rest},
    }
  )
)  
}


export function useGetLevelChildrens({levelId,...rest}){
  return useApiQuery({
    queryKey: ['useGetLevelChildrens', levelId],
    endpoint: `/levels/${levelId}/childrens`,
    options: {...rest} ,
  });  
}


export function useGetOrganizationPaths({ organizationId, ...options }) {
  return useApiQuery({
    queryKey: ['useGetOrganizationPaths', organizationId],
    endpoint: `/levels/organizations/${organizationId}/paths`,
    options: { staleTime: 3000, ...options },
  });
}

export function useGetPaths(options) {
  return useApiQuery({
    queryKey: ['useGetPaths'],
    endpoint: '/levels/paths',
    requiresAuth: true,
    options: { refetchOnWindowFocus: false, retry: 3, ...options },
  });
}

export function useGetFavoritePaths({ userId, ...options }) {
  return useApiQuery({
    queryKey: ['useGetFavoritePaths', userId],
    endpoint: `/levels/paths/favorites/users/${userId}`,
    requiresAuth: true,
    options,
  });
}

export function useGetRecentlyPaths({ userId, ...options }) {
  return useApiQuery({
    queryKey: ['useGetRecentlyPaths', userId],
    endpoint: `/levels/paths/recently/users/${userId}`,
    requiresAuth: true,
    options,
  });
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
export function usePostLevel({ form, ...options }) {
  return useApiQuery({
    queryKey: ['usePostLevel'],
    endpoint: '/levels',
    method: 'POST',
    form: form,
    options,
  });
}


export function useDeleteLevel({levelId, ...rest}){
  return useApiQuery({
    queryKey: ['useDeleteLevel'],
    endpoint: `/levels/${levelId}`,
    method: 'DELETE',
    options:{...rest},
  });
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
  return( 
    useApiQuery({
      queryKey:['usePatchLevel',levelId],
      endpoint: `/levels/${levelId}`,
      method: 'PATCH',
      form: form,
      options: {...rest},
      }
    )
  )
   
}

/*OBTENER LEVELS DE UNA ORGANIZACION DONDE UN USUARIO TIENE UN ROL ESPECIFICO*/
export function useGetLevelsOfUserInOrganization({organizationId, roleId,userId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetLevelsOfUserInOrganization',organizationId,userId,roleId],
      endpoint: `/levels/organizations/${organizationId}/users/${userId}/roles/${roleId}`,
      options: {...rest},
      }
    )
  )
}  



//*OBTENER LOS USUARIOS DE UN NIVEL CON UN ROL ESPECIFICO*/
export function useGetUsersWithRoleInLevel({levelId, roleId,userId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetUsersWithRoleInLevel',levelId,userId,roleId],
      endpoint: `/levels/${levelId}/users/roles${userId? `?user=${userId} ${roleId? `&role=${roleId}`:''}`: roleId?`?role=${roleId}`:''}`,
      options: {...rest},
      }
    )
  )
  
}  


/**
 * n Role to user in level
 * @param {*} levelId
 * @param form =  {
  "user": "",
  "role": "",
  "level": ""
}
 * @returns 
 */
export function usePostUserRoleLevel({levelId,form, ...rest}){
  return( 
    useApiQuery({
      queryKey:['usePostUserRoleLevel',levelId],
      endpoint: `/levels/${levelId}/users/roles`,
      options: {...rest},
      form: form,
      method: 'POST'
      }
    )
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
  return( 
    useApiQuery({
      queryKey:['usePatchUserRoleLevel',levelId],
      endpoint: `/levels/${levelId}/users/roles`,
      options: {...rest},
      form: form,
      method: 'PATCH'
      }
    )
  ) 
}  

/**
 * 
 * @param {*} levelId
 * @param userId 
 * @returns 
 */
export function useDeleteAllUserRoleLevel({levelId,userId,...rest}){
  return( 
    useApiQuery({
      queryKey:['useDeleteAllUserRoleLevel',levelId],
      endpoint: `/levels/${levelId}/users/${userId}`,
      options: {...rest},
      method: 'DELETE'
      }
    )
  ) 
}

/**
 * 
 * @param {*} levelId
 * @param userId
 * @param roleId 
 * @returns 
 */
export function useDeleteUserRoleLevel({levelId,userId,roleId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useDeleteUserRoleLevel',levelId, userId,roleId],
      endpoint: `/levels/${levelId}/users/${userId}/roles/${roleId}`,
      options: {...rest},
      method: 'DELETE'
      }
    )
  ) 
}
