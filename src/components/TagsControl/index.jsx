import { useState } from 'react';
import { TextField, Chip, IconButton, Autocomplete, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { useGetEntityTypes } from '@components/Hooks/requests/EntityTypes';

const TagsControl = ({ entityId, entityTypeId }) => {
    const [inputValue, setInputValue] = useState('');
    const { data: entityTypes, isFetching: isFetchingEntityTypes, isError: isErrorEntityTypes  } = useGetEntityTypes({enabled:true});
    const { data: tags, isFetching: isFetchingTags, isError: isErrorTags} = useGetTags();
    const [tagToDelete, setTagToDelete] = useState(null)

    const handleDelete = (tagToDelete) => {
        setTagToDelete(tagToDelete)
    };

    const handleAdd = (event, newValue) => {
        if (newValue && !tags.includes(newValue)) {
            setTags([...tags, newValue]);
            // Make a POST request to add the tag to the entity
            axios.post(`/api/entities/${entityId}/tags`, { tag: newValue });
        }
        setInputValue('');
    };

    return (
        <Box>
            <Autocomplete
                freeSolo
                options={allTags}
                value={inputValue}
                onChange={handleAdd}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Add Tag" variant="outlined" />
                )}
            />
            <Box mt={2}>
                {entityTags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDelete(tag)}
                        deleteIcon={<CloseIcon />}
                        style={{ margin: '4px' }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TagsControl;