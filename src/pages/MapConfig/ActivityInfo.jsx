import { Stack, Typography } from "@mui/material";
import { useGetContent } from "../../components/Hooks/requests/Content";
import PropTypes from "prop-types"

function ActivityInfo({activity}) {
    const {data: content, isFetching: isFetchingContent, isError: isErrorContent} = useGetContent({contentId: activity?.content, enabled: !!activity?.content})


    return (  
    <Stack>
        <Typography variant="h6">Actividad del level: </Typography>
        <Typography variant="body1">Descripción: {activity?.description}</Typography>
        <Typography variant="body1">Contenido: {activity?.content}</Typography>
    </Stack>);
}

export default ActivityInfo;

ActivityInfo.propTypes={
    activity: PropTypes.object
}