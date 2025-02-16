import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardActions, Tooltip, Skeleton, Alert } from '@mui/material';
import { useDeleteContent, useGetContentsOfOrganization } from '../../components/Hooks/requests/Content';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedIcon from '@mui/icons-material/Feed';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DetailContentOrganization from '@components/Dialogs/DetailContentOrganization';
import AddContentDialog from '@components/Dialogs/AddContentDialog';
import EditContentDialog from '@components/Dialogs/EditContentDialog';
import PropTypes from 'prop-types';
import ConfirmDialog from '@components/Dialogs/ConfirmDialog';
import { useQueryClient } from '@tanstack/react-query';

const MenuAcciones=({content, handleDeleteContent})=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    const queryClient= useQueryClient()
    const handleClose = () => {
        setOpenEdit(false);
        queryClient.resetQueries('getContentsOfOrganization');
    };
    

    return(<>
        <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
    </IconButton>
   {content &&
   <>
        <EditContentDialog open={openEdit} content={content} handleClose={handleClose} />
        <ConfirmDialog open={openDelete} message={`Está eliminando el contenido '${content?.description} '`} content={content} onClose={()=>setOpenDelete(false)} onConfirm={()=> {handleDeleteContent(content?.contentId);setOpenDelete(false)}} />
        <DetailContentOrganization open={openDetails} content={content} handleClose={()=>setOpenDetails(false)} />
    </>}
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={()=> {setOpenDetails(true);handleMenuClose()}}>
            <FeedIcon sx={{ marginRight: 1 }} color="secondary" /> Details
        </MenuItem>
        <MenuItem onClick={()=> {setOpenEdit(true);handleMenuClose()}}>
            <EditIcon sx={{ marginRight: 1 }} color="primary" /> Edit
        </MenuItem>
        <MenuItem onClick={()=> {setOpenDelete(true);handleMenuClose();}}>
            <DeleteIcon sx={{ marginRight: 1 }} color="error" /> Delete
        </MenuItem>
        
    </Menu></>
    )
}
MenuAcciones.propTypes={
    content: PropTypes.object,
    handleDeleteContent: PropTypes.func
}
/**
 *  Permite gestionar los contenidos de una organizacion
 *   @todo: AGREGAR IMAGENES , agregar columna de activityType, AGREGAR FILTROS, AGREGAR PAGINACION, AGREGAR BUSQUEDA, AGREGAR ORDENAMIENTO
 * @returns PageOrganizationContents
 **/
const OrganizationContents = () => {
    const { idOrganization } = useParams();
    const { data, isFetching: isFetchingContentsOfOrganization, isError: isErrorContents } = useGetContentsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });
    //a los contenidos agregarle: activityType, imagenes
    const [view, setView] = useState('table'); // 'table' or 'cards'

    const handleViewChange = (newView) => {
        setView(newView);
    };
    const [enabledDelete, setEnabledDelete] = useState(null);

    const {data: contentDeleted, isFetching: isFetchingDelete, isError: isErrorDelete} = useDeleteContent({contentId: enabledDelete, enabled: !!enabledDelete});

    const handleDeleteContent = (contentId) => {
      if (!isFetchingDelete){
        console.log('Eliminando contenido', contentId);
        setEnabledDelete(contentId);}
    };
    const queryClient= useQueryClient()
  
    useEffect(() => {
        if(!isFetchingDelete){
            setEnabledDelete(null)
            queryClient.resetQueries('getContentsOfOrganization')
        }
    }, [contentDeleted, isFetchingDelete, isErrorDelete, queryClient]);

    //CONTROL DE DIALOGS
    const [openAddContent, setOpenAddContent] = useState(false);
    const [contentEdit, setContentEdit] = useState(null);
    const [openEditContent, setOpenEditContent] = useState(false)
   
    const handleClose = (content) => {
       console.log("content en handle close",content)
        setOpenAddContent(false);
        if(content?.contentId){
            setContentEdit(content)
            setOpenEditContent(true)
        }
    };
    
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Contenidos de la organización
            </Typography>
            <Button onClick={() => { setOpenAddContent(true) }}>Crear Contenido</Button>
            <AddContentDialog open={openAddContent} handleClose={handleClose} />
            <EditContentDialog open={openEditContent} handleClose={() => { setOpenEditContent(false); setContentEdit(null) }} content={contentEdit} />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleViewChange('table')} disabled={view === 'table'}>Table View</Button>
                <Button onClick={() => handleViewChange('cards')} disabled={view === 'cards'}>Card View</Button>
            </ButtonGroup>
            {isErrorContents? <Alert severity='error'>Hubo un error al obtener los contenidos de la organización</Alert>
            :
            (view === 'table' ? (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo de actividad</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Public</TableCell>
                                <TableCell>Creator</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isFetchingContentsOfOrganization ? (
                                Array.from(new Array(5)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                data && data.map(content => (
                                    <TableRow key={content.contentId}>
                                        <TableCell>{content.activityType}</TableCell>
                                        <TableCell>{content.description}</TableCell>
                                        <TableCell>
                                            {content.publicContent ? <Tooltip title="Público, cualquier usuario puede utilizarlo"><LockOpenIcon color="success" /></Tooltip> : <Tooltip title="Privado, sólo puede utilizarlo la organización en sus niveles"><LockIcon color="error" /></Tooltip>}
                                        </TableCell>
                                        <TableCell>{content.username}</TableCell>
                                        <TableCell>
                                            <MenuAcciones content={content} handleDeleteContent={handleDeleteContent} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{ marginTop: 2 }}>
                    {isFetchingContentsOfOrganization ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <Card key={index} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                    <Skeleton variant="rectangular" height={118} />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        data && data.map(content => (
                            <Card key={content.contentId} sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h5">
                                            {content.description}
                                        </Typography>
                                        <MenuAcciones content={content} handleDeleteContent={handleDeleteContent} />
                                    </Box>
                                    {content.publicContent ? <Tooltip title="Público, cualquier usuario puede utilizarlo"><LockOpenIcon color="success" /></Tooltip> : <Tooltip title="Privado, sólo puede utilizarlo la organización en sus niveles"><LockIcon color="error" /></Tooltip>}
                                    <Typography>Creador: {content.username}</Typography>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        ))
                    )}
                </Box>
            ))}
        </Container>
    );
};

export default OrganizationContents;
