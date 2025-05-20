import { Alert, Box, Card, CardContent, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useGetContent } from "../../components/Hooks/requests/Content";
import PropTypes from "prop-types"
import TagsDisplay from "@components/TagsDisplay";
import EditIcon from '@mui/icons-material/Edit';
import EditContentDialog from "@components/Dialogs/EditContentDialog";
import { useState } from "react";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import Activity from "@pages/Activity";
import SkeletonContent from "./SkeletonContent";
import { useGetActivityTypeVersion } from "@components/Hooks/requests/ActivityTypeVersion";
import { useGetActivityType } from "@components/Hooks/requests/ActivityType";
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import CallSplitIcon  from '@mui/icons-material/CallSplit';
import { useGetOrganization } from "@components/Hooks/requests/Organizations";
import { Preview } from "@mui/icons-material";

function ContentDetails({ content, onEdit }) {
    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion}= useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    const { data: activityType, isFetching: isFetchingActivityType, isError: isErrorActivityType } = useGetActivityType({ activityTypeId: activityTypeVersion?.activityTypeId, enabled: !!activityTypeVersion }) 
    const { data: organization, isFetching: isFetchingOrganization, isError: isErrorOrganization } = useGetOrganization({ organizationId: content?.organization, enabled: !!content?.organization })

    if (isFetchingActivityTypeVersion || isFetchingActivityType || isFetchingOrganization) {
        return <SkeletonContent />;
    }

    if (isErrorActivityTypeVersion || isErrorActivityType || isErrorOrganization) {
        return <Alert severity="error">Hubo un error al obtener el tipo de actividad u organización</Alert>;
    }

    const organizationName = organization?.name || content.organization;
    const activityTypeName = activityType?.name || content.activityTypeVersionId;

    return (
        <Card sx={{ marginBottom: 2, width: "100%", textAlign: 'left', padding: 1 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , width: '100%'}}>
                        <Typography variant="h6">{content.description}</Typography>
                        <Tooltip title="Editar" arrow>
                            <IconButton variant="contained" color="secondary" onClick={onEdit}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
                        <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {content.username}
                    </Typography>
                    {organizationName && (
                        <Box display="flex" alignItems="center" gap={0.5} ml={2}>
                            <Tooltip title="Organización verificada">
                                <VerifiedIcon color="primary" fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2" color="primary" fontWeight={500}>
                                {organizationName}
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
                        <CallSplitIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {activityTypeName}
                    </Typography>
                </Box>
                <Box display="flex" gap="1em" alignItems="center" mt={1}>
                    <TagsDisplay entityId={content?.contentId} entityType='contents' />
                </Box>
            </CardContent>

            <CardContent sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: '1em' }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Tooltip title="Vista previa">
                        {/* Puedes cambiar el icono por otro si prefieres */}
                        <Box display="flex" alignItems="center">
                            <Preview color="action" />
                        </Box>
                    </Tooltip>
                    <Typography variant="body2" color="white">Vista previa:</Typography>
                </Box>
                <ErrorBoundary>
                    <Activity id={content.contentId} />
                </ErrorBoundary>
            </CardContent>
        </Card>
    );
}
ContentDetails.propTypes = {
    content: PropTypes.object,
    onEdit: PropTypes.func.isRequired,
};

function ActivityInfo({activity}) {
    const {data: content, isFetching: isFetchingContent, isError: isErrorContent} = useGetContent({contentId: activity?.content, enabled: !!activity?.content})
   
    const [openEditContent,setOpenEditContent] = useState(false)

    return (
        <Stack textAlign={"left"}>
            <Typography variant="h6">Actividad del level: </Typography>
            <Typography variant="body1">Descripción: {activity?.description}</Typography>
            <Typography variant="body1">Contenido: </Typography>
            <EditContentDialog open={openEditContent} handleClose={() => { setOpenEditContent(false) }} content={content} />
            {isFetchingContent ? (
                <SkeletonContent />
            ) : isErrorContent ? (
                <Alert severity="error">Hubo un error al obtener el contenido</Alert>
            ) : (
                <ContentDetails content={content} onEdit={() => setOpenEditContent(true)} />
            )}
        </Stack>
    );
}

export default ActivityInfo;

ActivityInfo.propTypes={
    activity: PropTypes.object
}