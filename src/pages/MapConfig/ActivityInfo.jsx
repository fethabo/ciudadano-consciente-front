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
                ): isErrorContent? <Alert severity="error">Hubo un error al obtener el contenido</Alert>:
         <Card sx={{ marginBottom: 2, width: "100%", textAlign:'left' }}>
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Typography variant="h6">{content.description}</Typography>    <Tooltip title="Editar" arrow>
                        <IconButton variant="contained" color="secondary" onClick={() => {setOpenEditContent(true)}}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>  
                  </Box>
                  <Typography variant="body2">Usuario: {content.username}</Typography>
                  <Typography variant="body2">Organización: {content.organization}</Typography>
                  <Typography variant="body2">Tipo de Actividad: {content.activityTypeVersionId}</Typography>
                  <Box display="flex" gap="1em" alignItems={"center"}>
                    <Typography variant="caption">Tags: </Typography> 
                    <TagsDisplay entityId={content?.contentId} entityType='contents' />
                  </Box>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                  
                  
                </Box>
                <CardContent>
                    <Typography variant="body2">Vista previa:</Typography>
                    <ErrorBoundary>
                        <Activity id={content.contentId}/>
                    </ErrorBoundary>
                </CardContent>
              </Card>
              
              }

           
    </Stack>);
}

export default ActivityInfo;

ActivityInfo.propTypes={
    activity: PropTypes.object
}