//tags
// GET /tags
// POST /tags BODY: {  "name": "" }
// DELETE /tags/{id}
// PATCH /tags/{id} BODY: {  "name": "" }

import useApiQuery from "../useApiQuery";

export function useGetTags({ ...rest }){
    return(
      useApiQuery({
        queryKey:['useGetTags'],
        endpoint: `/tags`,
        options: {...rest},
        }
      )
    )
}

export function useGetTag({contentId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetTag',contentId],
        endpoint: `/tags/${contentId}`,
        options: {...rest},
        }
      )
    )
}

export function useDeleteTag({tagId, ...rest}){
    return(
      useApiQuery({
        queryKey:['useDeleteTag',tagId],
        endpoint: `/tags/${tagId}`,
        method: 'DELETE',
        options: {...rest},
        }
      )
    )
}

export function usePostTag({form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePostTag'],
        endpoint: `/tags`,
        method: 'POST',
        form: form,
        options: {...rest},
        }
      )
    )
}

export function usePatchTag({tagId, form, ...rest}){
    return(
      useApiQuery({
        queryKey:['usePatchTag',tagId],
        endpoint: `/tags/${tagId}`,
        method: 'PATCH',
        form: form,
        options: {...rest},
        }
      )
    )
}

//Los tags de una entidad se obtienen por los endpoints dedicados para cada una (por ejemplo: activity-type-versions/{id}/tags)
//TAGGED
// GET /tagged/{id} //No creo que lo usemos
// GET /tagged //No creo que lo usemos
// POST /tagged/{tagId}/{entityTypeId}/{entityId} //
// DELETE /tagged/{id} //

export function useGetTagged({id, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetTagged',id],
        endpoint: `/tagged/${id}`,
        options: {...rest},
        }
      )
    )
}
export function useGetAllTagged({ ...rest }){
    return(
      useApiQuery({
        queryKey:['useGetTagged'],
        endpoint: `/tagged`,
        options: {...rest},
        }
      )
    )
}
export function usePostTagged({tagId, entityTypeId, entityId, ...rest}){

    return(
      useApiQuery({
        queryKey:['usePostTagged',tagId, entityTypeId, entityId],
        endpoint: `/tagged/${tagId}/${entityTypeId}/${entityId}`,
        method: 'POST',
        options: {...rest},
        }
      )
    )
}
export function useDeleteTagged({taggedId, ...rest}){

    return(
      useApiQuery({
        queryKey:['useDeleteTagged',taggedId],
        endpoint: `/tagged/${taggedId}`,
        method: 'DELETE',
        options: {...rest},
        }
      )
    )
}

export function useGetTagsOfEntity({entityId, entityType, ...rest}){
    return(
      useApiQuery({
        queryKey:['useGetTagsOfEntity',entityId, entityType],
        endpoint: `/${entityType}/${entityId}/tags`,
        options: {...rest},
        }
        )
    )
    }