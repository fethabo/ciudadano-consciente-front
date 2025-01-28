import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardActions, Tooltip } from '@mui/material';
import { useGetContentsOfOrganization } from '../../components/Hooks/requests/Content';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedIcon from '@mui/icons-material/Feed';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const MenuAcciones=()=>{
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return(<>
        <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
    </IconButton>
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>
            <FeedIcon sx={{ marginRight: 1 }} color="secondary" /> Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
            <EditIcon sx={{ marginRight: 1 }} color="primary" /> Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
            <DeleteIcon sx={{ marginRight: 1 }} color="error" /> Delete
        </MenuItem>
        
    </Menu></>
    )
}
/**
 *  Permite gestionar los contenidos de una organizacion
 *  CRUD de content
 *   TODO: AGREGAR IMAGENES , agregar columna de creador, agregar columna de publico, agregar columna de activityType, AGREGAR EDICION, AGREGAR BOTON DE CREACION, AGREGAR FILTROS, AGREGAR PAGINACION, AGREGAR BUSQUEDA, AGREGAR ORDENAMIENTO, AGREGAR VISTA DE DETALLE, CAMBIAR BOTONES POR ICONBUTTONS, AGREGAR CONFIRMDIALOG PARA ELIMinar
 * @returns PageOrganizationContents
 **/
const OrganizationContents = () => {
    const { idOrganization } = useParams();
    const { data } = useGetContentsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });
    const [view, setView] = useState('cards'); // 'table' or 'cards'

    const handleViewChange = (newView) => {
        setView(newView);
    };

  
    
    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Contenidos de la organización
            </Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleViewChange('table')} disabled={view === 'table'}>Table View</Button>
                <Button onClick={() => handleViewChange('cards')} disabled={view === 'cards'}>Card View</Button>
            </ButtonGroup>
            {view === 'table' ? (
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Public</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map(content => (
                                <TableRow key={content.contentId}>
                                    <TableCell>{content.description}</TableCell>
                                    <TableCell><pre>{JSON.stringify(JSON.parse(content.model), null, 2)}</pre></TableCell>
                                    <TableCell>
                                    {content.publicContent ? <Tooltip title="Público, cualquier usuario puede utilizarlo"><LockOpenIcon color="success" /></Tooltip> : <Tooltip title="Privado, sólo puede utilizarlo la organización en sus niveles"><LockIcon color="error" /></Tooltip>}
                                    </TableCell>
                                    <TableCell>
                                        <MenuAcciones />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{ marginTop: 2 }}>
                    {data && data.map(content => (
                        <Card key={content.contentId} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h5">
                                        {content.description}
                                    </Typography>
                                    <MenuAcciones />
                                </Box>
                                {content.publicContent ? <Tooltip title="Público, cualquier usuario puede utilizarlo"><LockOpenIcon color="success" /></Tooltip> : <Tooltip title="Privado, sólo puede utilizarlo la organización en sus niveles"><LockIcon color="error" /></Tooltip>}
                           
                                <Typography>Creador:</Typography>
                                
                                
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default OrganizationContents;
