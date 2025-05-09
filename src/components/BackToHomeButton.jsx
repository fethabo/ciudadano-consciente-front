import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReplyIcon from '@mui/icons-material/Reply';
function BackToHomeButton() {
    const navigate = useNavigate();
    return (
        <Box sx={{ marginBottom: '1rem', display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
            <Tooltip title="Volver a Inicio">
                <IconButton onClick={() => navigate('/')} sx={{ cursor: "pointer" }}>
                    <ReplyIcon color="secondary"/>
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default BackToHomeButton;