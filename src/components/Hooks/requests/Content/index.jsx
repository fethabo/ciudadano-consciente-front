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