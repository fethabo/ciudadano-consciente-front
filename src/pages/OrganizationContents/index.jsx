import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardActions } from '@mui/material';
import { useGetContentsOfOrganization } from '../../components/Hooks/requests/Content';

/**
 *  Permite gestionar los contenidos de una organizacion
 *  CRUD de content
 *   TODO: AGREGAR IMAGENES , agregar columna de creador, agregar columna de publico, agregar columna de activityType, AGREGAR EDICION, AGREGAR BOTON DE CREACION, AGREGAR FILTROS, AGREGAR PAGINACION, AGREGAR BUSQUEDA, AGREGAR ORDENAMIENTO, AGREGAR VISTA DE DETALLE, CAMBIAR BOTONES POR ICONBUTTONS, AGREGAR CONFIRMDIALOG PARA ELIMinar
 * @returns PageOrganizationContents
 */
const OrganizationContents = () => {
    const { idOrganization } = useParams();
    const { data } = useGetContentsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });
    const [view, setView] = useState('table'); // 'table' or 'cards'

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
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
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map(content => (
                                <TableRow key={content.contentId}>
                                    <TableCell>{content.description}</TableCell>
                                    <TableCell><pre>{JSON.stringify(JSON.parse(content.model), null, 2)}</pre></TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                                        <Button variant="contained" color="secondary">Delete</Button>
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
                                <Typography variant="h5">
                                    {content.description}
                                </Typography>
                                <pre>{JSON.stringify(JSON.parse(content.model), null, 2)}</pre>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Edit</Button>
                                <Button variant="contained" color="secondary">Delete</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default OrganizationContents;
