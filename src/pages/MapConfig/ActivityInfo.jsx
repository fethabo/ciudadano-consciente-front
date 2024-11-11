import { Stack, Typography } from "@mui/material";
import { useGetContent } from "../../components/Hooks/requests/Content";
import PropTypes from "prop-types"

function ActivityInfo({activity}) {
    const {data: content, isFetching: isFetchingContent, isError: isErrorContent} = useGetContent({contentId: activity?.content, enabled: !!activity?.content})


    return (  
    <Stack>
        <Typography>Actividad del level: </Typography>
        <Typography>Descripción: {activity?.description}</Typography>
        <Typography>Contenido: {activity?.content}</Typography>
    </Stack>);
}

export default ActivityInfo;

ActivityInfo.propTypes={
    activity: PropTypes.object
}