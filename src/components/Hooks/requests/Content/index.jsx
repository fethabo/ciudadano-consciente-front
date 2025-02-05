import useGetToken from "@security/hooks/useGetToken";
import useApiQuery from "../useApiQuery";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "@constants";


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

export function useDeleteContent({contentId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useDeleteContent',contentId],
      endpoint: `/contents/${contentId}`,
      method: 'DELETE',
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


/**
 * 
 * @param {*} form: content *integer($int32)
                    imageName *string
                    image *string($binary) 
 * @returns 
 */
export function usePostContentImage({form,contentId, ...rest}){
  return(
    useApiQuery({
      queryKey:['usePostContentImage',contentId],
      endpoint: `/contents/images`,
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data'},
      form:form,
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
export function useGetContentImage({contentId, imageId, ...rest}){
  return(
    useApiQuery({
      queryKey:['useGetContentImage',contentId, imageId],
      endpoint: `/contents/${contentId}/images/${imageId}`,
      options: {...rest},
      }
    )
  )
}
export function useGetImagesFilesOfContent({images,...rest}){
  const token = useGetToken();
  const result= useQueries({
      queries: images.map((image) => ({
          queryKey: ['useGetContentImage',image.contentId, image.imageId],
          queryFn: () => axios.get(`${URL_API}/contents/${image.contentId}/images/${image.imageId}`, {
            responseType: 'arraybuffer',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then((res) => res.data)
          })),
          ...rest,
          refetchOnWindowFocus: false,//TODO: ver que onda estoooo
          combine: (results) => {
                return {
                data: results.map((result, index) => ({
                  data: URL.createObjectURL(new Blob([result.data], { type: 'image/png' })),
                  image: images[index]
                })),
                pending: results.some((result) => result.isPending),
                }
            }
     
    })
  return result
}