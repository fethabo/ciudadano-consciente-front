import {  Chip, Box, Skeleton, CardContent, Card, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import { useGetReferencesOfLevel } from '@components/Hooks/requests/References';

function ReferencesDisplay({ entityId }) {

 
  const { data: referencesEntity, isFetching: isFetchingReferencesEntity, isError: isErrorReferencesEntity} = useGetReferencesOfLevel({levelId:entityId, enabled: !!entityId });
 
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: "center" }}>
            {isFetchingReferencesEntity ? (
                Array.from(new Array(5)).map((_, index) => (
                    <Skeleton key={index} animation="wave" variant='rounded' sx={{ borderRadius: '2em', minWidth: '3em' }} />
                ))
            ) :
                isErrorReferencesEntity ? 
                    <Chip
                        color="error"
                        key={"error"}
                        label={"error"}
                        size="small"
                    />
                    :
                    referencesEntity?.length === 0 ? (
                        <Chip
                            color="warning"
                            size="small"
                            key={"empty"}
                            label={"Sin referencias"}
                        />
                    ) :
                        (
                            referencesEntity?.map((reference, index) => (
                                <a key={index}  href={reference?.url}  target="_blank" rel="noopener noreferrer">
                                <Card
                                    key={reference?.referenceId}
                                    sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
                                >
                                    <CardContent>
                                        <Box>
                                            <Typography variant="body2">{reference?.title}</Typography>
                                            <Typography variant="caption">{reference?.description}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                                </a>
                            ))
                        )}
        </Box>
    );
}

export default ReferencesDisplay;

ReferencesDisplay.propTypes={
    entityId: PropTypes.number,
    entityType: PropTypes.string
}