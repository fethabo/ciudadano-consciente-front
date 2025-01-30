import { useGetActivityTypeVersion } from '@components/Hooks/requests/ActivityTypeVersion';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DetailContentOrganization = ({ open, handleClose, content }) => {
    const { activityTypeVersionId, contentId, creator, description, model, organization, publicContent, username } = content;

    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion } = useGetActivityTypeVersion({ activityTypeVersionId, enabled: !!activityTypeVersionId });
    const parsedModel = JSON.parse(model);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Detalle del Contenido</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Descripción</Typography>
                <Typography variant="body1">{description}</Typography>
                
                <Typography variant="h6">Detalles</Typography>
                <Typography variant="body1">ID de Versión de Actividad: {activityTypeVersionId}</Typography>
                <Typography variant="body1">ID de Contenido: {contentId}</Typography>
                <Typography variant="body1">Creador: {creator}</Typography>
                <Typography variant="body1">Organización: {organization}</Typography>
                <Typography variant="body1">Contenido Público: {publicContent ? 'Sí' : 'No'}</Typography>
                <Typography variant="body1">Usuario: {username}</Typography>

                EDICION
                {/* 
                <Typography variant="h6">Modelo</Typography>
                <Typography variant="body1">Pregunta: {parsedModel.question}</Typography>
                <Typography variant="body1">Opciones: {parsedModel.options.join(', ')}</Typography>
                <Typography variant="body1">Respuestas Correctas: {parsedModel.correct_answers.join(', ')}</Typography> */}

                <Typography variant="h6">Imágenes</Typography>
                {/* Aquí puedes agregar la lógica para obtener y mostrar las imágenes del contenido */}

                <Typography variant="h6">Vista Previa</Typography>
                {/* Aquí puedes agregar la lógica para mostrar una vista previa de la ejecución del contenido */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailContentOrganization;