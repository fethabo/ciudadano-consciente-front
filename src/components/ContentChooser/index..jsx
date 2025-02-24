import { useGetContents, useGetContentsOfOrganization } from "@components/Hooks/requests/Content";
import { Box, Button, Skeleton, Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import AddContentDialog from "@components/Dialogs/AddContentDialog";

function ContentChooser({ onSelectContent, onCreateContent }) {
    const { idOrganization } = useParams();
    const { data: orgContents, isFetching: isFetchingOrg } = useGetContentsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });
    const { data: publicContents, isFetching: isFetchingPublic } = useGetContents({enabled: true});
    const [selectedContent, setSelectedContent] = useState(null);
    const [openAddContent, setOpenAddContent] = useState(false);

    const handleCreateContent = () => {
        setOpenAddContent(true);
        onCreateContent();
    };

    const [tab, setTab] = useState('organization');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const filteredContents = (tab === 'organization' ? orgContents : publicContents)?.filter(content =>
        content.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <AddContentDialog resultContent={setSelectedContent} open={openAddContent} handleClose={() => { setOpenAddContent(false) }} />
            <TextField
                label="Buscar Contenido"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab label="Organización" value="organization" />
                <Tab label="Público" value="public" />
            </Tabs>

            {isFetchingOrg || isFetchingPublic ?
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(rowsPerPage)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            : 
            
            
            <><Table>
                    <TableHead>
                        <Button onClick={handleCreateContent} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Crear Nuevo Contenido
                        </Button>

                        <TableRow>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContents?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((content) => (
                            <TableRow key={content.contentId}>
                                <TableCell>{content.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => { setSelectedContent(content.contentId); onSelectContent(content.contentId); } } variant="contained" color="primary">
                                        Seleccionar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table><TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={filteredContents?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange} /></>
                }
        </Box>
    );
}

ContentChooser.propTypes = {
    onSelectContent: PropTypes.func.isRequired,
    onCreateContent: PropTypes.func.isRequired,
};

export default ContentChooser;