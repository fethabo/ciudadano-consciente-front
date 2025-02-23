import { useDeleteReference, useGetReferencesOfLevel } from "@components/Hooks/requests/References";
import { Alert, Box, Button, Card, CardContent, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import AddReferenceDialog from "@components/Dialogs/AddReferenceDialog";
import EditReferenceDialog from "@components/Dialogs/EditReferenceDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

function ReferencesControl({ entityId}) {

    const { data: references, isFetching: isFetchingReferences, isError: isErrorReferences} = useGetReferencesOfLevel({levelId:entityId, enabled: !!entityId});
    const [referenceToDelete, setReferenceToDelete] = useState(null)
    const { data: referenceDeleted, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteReference({referenceId: referenceToDelete?.referenceId, enabled: !!referenceToDelete})
   
    const queryClient = useQueryClient();
    useEffect(() => {
        if (!isFetchingDelete){
            setReferenceToDelete(null)
            queryClient.resetQueries({ queryKey: ['useGetReferencesOfLevel', entityId], exact: true })
        }
    }, [referenceDeleted, isFetchingDelete, isErrorDelete, entityId, queryClient]);

  
    const [openAddReference, setOpenAddReference] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [referenceToEdit, setReferenceToEdit] = useState(null);
    return (  
        <Stack>
            <Typography variant="h6" gutterBottom>Referencias</Typography>
            <AddReferenceDialog levelId={entityId} open={openAddReference} handleClose={()=>setOpenAddReference(false)}/>
            <EditReferenceDialog reference={referenceToEdit} open={openEdit} handleClose={()=> setOpenEdit(false)} />
            <Box>
            <Button variant="contained" color="primary" onClick={() => setOpenAddReference(true)}>
                Agregar Referencia
            </Button></Box>
            {isFetchingReferences ? <LinearProgress />
            : isErrorReferences? <Alert severity="error">Error al obtener las referencias</Alert>
            : references?.length===0 ? <Alert severity="warning">Sin referencias</Alert>
            :
            
                references?.map((reference) => (
                    <Card key={reference?.referenceId}  target="_blank" onClick={(e) => e.stopPropagation()}>
                    <CardContent>
                    <Box href={reference?.url}>
                            <Typography variant="body2">{reference?.title}</Typography>
                            <Typography variant="caption">{reference?.description}</Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                            <IconButton
                                onClick={() => {
                                    setReferenceToEdit(reference);
                                    setOpenEdit(true);
                                }}
                                color="primary"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => setReferenceToDelete(reference)}
                                color="secondary"
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Stack>
                    </CardContent>
                </Card>
            ))
            }
        </Stack>

    );
}

export default ReferencesControl;

ReferencesControl.propTypes={
    entityId: PropTypes.number,
    entityType: PropTypes.string
}