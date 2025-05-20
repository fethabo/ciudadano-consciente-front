import { Chip, Box, Skeleton, CardContent, Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useGetReferencesOfLevel } from '@components/Hooks/requests/References';
import { useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function ReferencesDisplay({ entityId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');

  const { 
    data: referencesEntity, 
    isFetching: isFetchingReferencesEntity, 
    isError: isErrorReferencesEntity
  } = useGetReferencesOfLevel({
    levelId: entityId, 
    enabled: !!entityId 
  });

  const handleLinkClick = (event, url) => {
    event.preventDefault();
    setSelectedUrl(url);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    window.open(selectedUrl, '_blank', 'noopener,noreferrer');
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: "center" }}>
        {isFetchingReferencesEntity ? (
          Array.from(new Array(5)).map((_, index) => (
            <Skeleton key={index} animation="wave" variant='rounded' sx={{ borderRadius: '2em', minWidth: '3em' }} />
          ))
        ) : isErrorReferencesEntity ? (
          <Chip
            color="error"
            key={"error"}
            label={"error"}
            size="small"
          />
        ) : referencesEntity?.length === 0 ? (
          <Chip
            color="warning"
            size="small"
            key={"empty"}
            label={"Sin referencias"}
          />
        ) : (
          referencesEntity?.map((reference, index) => (
            <Card
              key={reference?.referenceId}
              sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
              onClick={(e) => handleLinkClick(e, reference?.url)}
            >
              <CardContent>
                <Box>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {reference?.title}
                    <OpenInNewIcon fontSize="small" color="action" />
                  </Typography>
                  <Typography variant="caption">{reference?.description}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Enlace externo</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Estás a punto de acceder a un sitio web externo. ¿Deseas continuar?
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            URL: {selectedUrl}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReferencesDisplay;

ReferencesDisplay.propTypes = {
  entityId: PropTypes.number,
  entityType: PropTypes.string
};