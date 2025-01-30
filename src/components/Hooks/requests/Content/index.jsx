import useApiQuery from "../useApiQuery";


export function useGetContent({contentId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetContent',contentId],
        endpoint: `/contents/${contentId}`,
        options: {...rest},
        }
      )
    )
}

export function usePostContent({form, ...rest}){
  return( 
    useApiQuery({
      queryKey:['usePostContent'],
      endpoint: `/contents`,
      method: 'POST',
      options: {...rest},
      form:form
    }
    )
  )
}


export function usePatchContent({form,contentId, ...rest}){
  return(
    useApiQuery({
      queryKey:['usePatchContent',contentId],
      endpoint: `/contents/${contentId}`,
      method: 'PATCH',
      form:form,
      options: {...rest},
      }
    )
  )
}

export function useGetContentsOfOrganization({organizationId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetContentsOfOrganization',organizationId],
      endpoint: `/contents/organizations/${organizationId}`,
      options: {...rest},
      }
    )
  )
}


export function useGetContentsOfUser({userId, ...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetContentsOfUser', userId],
      endpoint: `/contents/users/${userId}`,
      options: {...rest},
      }
    )
  )
}


//DEVUELVE TODOS LOS PUBLICOS
export function useGetContents({...rest}){
  return( 
    useApiQuery({
      queryKey:['useGetContents'],
      endpoint: `/contents`,
      options: {...rest},
      }
    )
  )
}

/**
 *  Get content images
 * @param {*} param0 
 * @returns 
 */
export function useGetContentImages({contentId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useGetContentImages',contentId],
      endpoint: `/contents/${contentId}/images`,
      options: {...rest},
      }
    )
  )
}

