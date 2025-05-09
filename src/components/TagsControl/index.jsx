import { useEffect, useState } from 'react';
import { TextField, Chip, Autocomplete, Box, Typography, Skeleton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import { useDeleteTagged, useGetTags, useGetTagsOfEntity, usePostTag, usePostTagged } from '@components/Hooks/requests/Tags';
import PropTypes from 'prop-types'
import { useQueryClient } from '@tanstack/react-query';


/**
 * @todo: Corregir autocomplete: se queda el valor en el input al agregar tag.el agregado de tag no sirve para movil, sin el enter no toma el onchange.
 * @param {*} param0 
 * @returns 
 */
const TagsControl = ({ entityId, entityType }) => {
    
    const [inputValue, setInputValue] = useState('');
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
            setInputValue(''); // Limpiar el input después de agregar un tag
            queryClient.resetQueries({ queryKey: ['useGetTagsOfEntity', entityId, entityType], exact: true })
        }
    }, [taggedAdded, isFetchingAddTagged, isErrorAddTagged, entityId, entityType, queryClient]);

    useEffect(() => {
        if(!isFetchingAddTag){
            if(tagAdded){
                setParamsPost({ entityId, entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, tagId: tagAdded.tagId });
            }
            setNewTag(null)
            setInputValue(''); // Limpiar el input después de agregar un tag
            queryClient.resetQueries({ queryKey: ['useGetTags'], exact:true})
        }
    }, [tagAdded, isFetchingAddTag, isErrorAddTag, entityTypes, entityId, entityType, queryClient]);

    const handleNewTagCreation = (newInputValue) => {
        if (!newInputValue) return;
        
        if (tags?.some(existingTag => existingTag.name === newInputValue)) {
            setParamsPost({ 
                entityId, 
                entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, 
                tagId: tags.find(existingTag => existingTag.name === newInputValue).tagId 
            });
        } else {
            setNewTag(newInputValue);
            setEnableAddition(true);
        }
        setInputValue('');
    };

    return (
        <Box>
            <Typography variant="h6">Tags</Typography>
            <Autocomplete
                loading={isFetchingTags}
                freeSolo
                options={tags?.filter(tag => !tagsEntity?.some(entityTag => entityTag.tagId === tag.tagId)) || []}
                getOptionLabel={(option) => {
                    // Manejar diferentes tipos de entrada
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option && option.name) {
                        return option.name;
                    }
                    return '';
                }}
                isOptionEqualToValue={(option, value) => option.tagId === value.tagId}
                onChange={(event, newValue) => {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    if (newValue === null) {
                        return; // No hacer nada si se elimina la selección
                    }
                    
                    if (typeof newValue === 'string') {
                        // Si el usuario introduce texto y presiona enter
                        handleNewTagCreation(newValue);
                    } else if (newValue && !newValue.tagId && newValue.inputValue) {
                        // Si se crea una nueva opción (usado con createFilterOptions)
                        handleNewTagCreation(newValue.inputValue);
                    } else if (newValue && newValue.tagId) {
                        // Si se selecciona una opción existente
                        setParamsPost({ 
                            entityId, 
                            entityTypeId: entityTypes?.find(type => type.title === entityType)?.entityTypeId, 
                            tagId: newValue.tagId 
                        });
                        setInputValue('');
                    }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && inputValue) {
                        event.preventDefault();
                        handleNewTagCreation(inputValue);
                    }
                }}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Add Tag" 
                        variant="outlined" 
                    />
                )}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                {isFetchingTagsEntity ? (
                    Array.from(new Array(5)).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={100} height={32} />
                    ))
                ) : (
                    tagsEntity?.map((tag) => (
                        <Chip
                            key={tag.tagId}
                            label={tag.name || tag.tagname}
                            onDelete={() => setTagToDelete(tag)}
                            deleteIcon={<CloseIcon />}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
};

export default TagsControl;

TagsControl.propTypes= {
    entityId: PropTypes.string,
    entityType: PropTypes.string
}