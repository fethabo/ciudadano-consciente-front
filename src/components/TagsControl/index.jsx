import { useEffect, useState } from 'react';
import { TextField, Chip, Autocomplete, Box, Typography, LinearProgress, Skeleton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import { useDeleteTagged, useGetTags, useGetTagsOfEntity, usePostTag, usePostTagged } from '@components/Hooks/requests/Tags';
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query';

const TagsControl = ({ entityId, entityType }) => {
    
    const [newTag, setNewTag] = useState(null);
    const { data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes  } = useGetEntityTypes({enabled:true});
    const { data: tagsEntity, isFetching: isFetchingTagsEntity, isError: isErrorTagsEntity} = useGetTagsOfEntity({entityId:entityId, entityType:entityType, enabled: !!entityId && !!entityType});
    const { data: tags, isFetching: isFetchingTags, isError: isErrorTags} = useGetTags({enabled: true})
    const [paramsPost, setParamsPost] = useState(null)
    const [enableAddition, setEnableAddition] = useState(false)
    const { data: taggedAdded, isFetching: isFetchingAddTagged, isErro: isErrorAddTagged} = usePostTagged({...paramsPost, enabled: !!paramsPost })
    const { data: tagAdded, isFetching: isFetchingAddTag, isError: isErrorAddTag} = usePostTag({form: {name: newTag}, enabled: !!newTag && enableAddition})

    const [tagToDelete, setTagToDelete] = useState(null)
    const { data: tagDeleted, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteTagged({taggedId: tagToDelete?.taggedId, enabled: !!tagToDelete})

    const queryClient = useQueryClient();
    useEffect(() => {
        if (!isFetchingDelete){
            setTagToDelete(null)
            setNewTag(null)
            queryClient.resetQueries({ queryKey: ['useGetTagsOfEntity', entityId, entityType], exact: true })
            queryClient.resetQueries({ queryKey: ['useGetTags'], exact: true })
        }
    }, [tagDeleted, isFetchingDelete, isErrorDelete, entityId, entityType, queryClient]);

    useEffect(() => {
        if(!isFetchingAddTagged){
            setParamsPost(null)
            setNewTag(null)
            queryClient.resetQueries({ queryKey: ['useGetTagsOfEntity', entityId, entityType], exact: true })
        }
    }, [taggedAdded, isFetchingAddTagged, isErrorAddTagged, entityId,entityType,queryClient]);

    useEffect(() => {
        if(!isFetchingAddTag){
            if(tagAdded){
                setParamsPost({ entityId,  entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, tagId: tagAdded.tagId });
            }
            setNewTag(null)
            queryClient.resetQueries({ queryKey: ['useGetTags'], exact:true})
        }
    }, [tagAdded,isFetchingAddTag, isErrorAddTag, queryClient]);

    console.log("filtro de tags",tags?.filter(tag => !tagsEntity?.some(entityTag => entityTag.tagId === tag.tagId)))
    return (
        <Box>
            <Typography variant="h6" >Tags</Typography>
            <Autocomplete
                loading={isFetchingTags}
                freeSolo
                //value={newTag || ''}
                options={tags?.filter(tag => !tagsEntity?.some(entityTag => entityTag.tagId === tag.tagId)) || []}
                getOptionLabel={(tag) => tag?.name}
                isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
                onChange={(event, newValue) => {
                    console.log(newValue)
                        if (!newValue.tagId) {
                            console.log(newValue, "no existe")
                            //si el tag ya existe lo agrego al EntityTag
                            if (tags.some(existingTag => existingTag.name === newValue.name)) {
                                setParamsPost({ entityId, entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, tagId: tags.find(existingTag => existingTag.name === newValue.name).tagId });
                                setNewTag(null)
                            } else {
                                setNewTag(newValue);
                                setEnableAddition(true);
                            }
                        } else {
                            setParamsPost({ entityId,  entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, tagId: newValue.tagId });
                        }
                    
                }}
                renderInput={(params) => (
                    <>
                    {console.log("params", params)}
                    <TextField {...params} label="Add Tag" variant="outlined" />
                    </>
                )}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                {tagsEntity?.map((tag) => (
                    <Chip
                        key={tag.tagId}
                        label={tag.name || tag.tagname}
                        onDelete={() => setTagToDelete(tag)}
                        deleteIcon={<CloseIcon />}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TagsControl;

TagsControl.propTypes= {
    entityId: PropTypes.string,
    entityType: PropTypes.string
}