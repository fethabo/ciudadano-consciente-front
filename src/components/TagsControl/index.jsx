import { useEffect, useState } from 'react';
import { TextField, Chip, Autocomplete, Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';
import { useDeleteTagged, useGetTags, useGetTagsOfEntity, usePostTag, usePostTagged } from '@components/Hooks/requests/Tags';
import PropTypes from 'prop-types'

const TagsControl = ({ entityId, entityType }) => {
    const [inputValue, setInputValue] = useState('');
    const { data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes  } = useGetEntityTypes({enabled:true});
    const { data: tagsEntity, isFetching: isFetchingTagsEntity, isError: isErrorTagsEntity} = useGetTagsOfEntity({entityId:entityId, entityType:entityType, enabled: !!entityId && !!entityType});
    const { data: tags, isFetching: isFetchingTags, isError: isErrorTags} = useGetTags({enabled: true})
    const [paramsPost, setParamsPost] = useState(null)
    const [enableAddition, setEnableAddition] = useState(false)
    const { data: taggedAdded, isFetching: isFetchingAddTagged, isErro: isErrorAddTagged} = usePostTagged({...paramsPost, enabled: !!paramsPost })
    const { data: tagAdded, isFetching: isFetchingAddTag, isError: isErrorAddTag} = usePostTag({form: {name: inputValue}, enabled: !!inputValue && enableAddition})

    const [tagToDelete, setTagToDelete] = useState(null)
    const { data: tagDeleted, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteTagged({taggedId: tagToDelete?.taggedId, enabled: !!tagToDelete})


    const handleAdd= (e, values)=>{
        console.log("add¿", e, values)
    }
    useEffect(() => {
        if(!isFetchingAddTagged){
            setEnableAddition(false)
        }
    }, [taggedAdded, isFetchingAddTagged, isErrorAddTagged]);
   

    return (
        <Box>
            <Typography variant="h6" >Tags</Typography>
            <Autocomplete
                freeSolo
                multiple
                options={tags}
                getOptionLabel={(tag) => tag.name }
                onChange={handleAdd}
                defaultValue={tagsEntity}
                //onChange={handleAdd}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Add Tag" variant="outlined" />
                )}
            />
            <IconButton onClick={()=> !!inputValue && setEnableAddition(true)}><AddIcon/></IconButton>
            <Box mt={2}>
                {tagsEntity?.map((tagEntity, index) => (
                    <Chip
                        key={index}
                        label={tags?.find((tag)=> tag?.tagId == tagEntity?.tagId)?.name}
                        onDelete={() => setTagToDelete(tagEntity)}
                        deleteIcon={<CloseIcon />}
                        style={{ margin: '4px' }}
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