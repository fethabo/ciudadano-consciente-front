import {  Chip, Box, Skeleton } from '@mui/material';
import {  useGetTagsOfEntity } from '@components/Hooks/requests/Tags';
import PropTypes from 'prop-types'

function TagsDisplay({ entityId, entityType}) {

 
  const { data: tagsEntity, isFetching: isFetchingTagsEntity, isError: isErrorTagsEntity} = useGetTagsOfEntity({entityId:entityId, entityType:entityType, enabled: !!entityId && !!entityType});
 
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5,  alignItems: "center"}}>
                {isFetchingTagsEntity ? (
                    Array.from(new Array(5)).map((_, index) => (
                        <Skeleton key={index}  animation="wave" variant='rounded' sx={{borderRadius:'2em', minWidth:'3em'}} />
                    ))
                ) : 
                    isErrorTagsEntity?
                            <Chip
                                color="error"
                                key={"error"}
                                label={"error"}
                                size="small"
                             />
                    :  
                    tagsEntity?.length === 0 ? (
                        <Chip
                            color="warning"
                            size="small"
                            key={"empty"}
                            label={"Sin etiquetas"}
                        />
                    ) :
                    (
                    tagsEntity?.map((tag) => (
                        <Chip
                            size="small"
                            key={tag?.tagId}
                            label={tag?.tagname}
                        />
                    ))
                )}
            </Box>
      );
}

export default TagsDisplay;

TagsDisplay.propTypes={
    entityId: PropTypes.number,
    entityType: PropTypes.string
}