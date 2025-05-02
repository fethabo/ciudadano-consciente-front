import { useGetContents, useGetContentsOfOrganization } from "@components/Hooks/requests/Content";
import { Alert, Button, Card, CardContent, Tab, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import AddContentDialog from "@components/Dialogs/AddContentDialog";
import SkeletonTableOfContents from "./SkeletonTableOfContents";
import  SearchIcon  from "@mui/icons-material/Search";
import EditContentDialog from "@components/Dialogs/EditContentDialog";

function ContentChooser({ onSelectContent, onCreateContent, initialContentId }) {
    const { idOrganization } = useParams();
    const { data: orgContents, isFetching: isFetchingOrg } = useGetContentsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });
    const { data: allPublicContents, isFetching: isFetchingPublic } = useGetContents({enabled: true});
    const [selectedContent, setSelectedContent] = useState(null);
    const [openAddContent, setOpenAddContent] = useState(false);
    const [publicContents, setPublicContents] = useState([]);

    useEffect(() => {
        if (!isFetchingPublic && allPublicContents) {
            const filteredPublicContents = allPublicContents.filter(content => content.organization != idOrganization);
            setPublicContents(filteredPublicContents);
        }
    }, [allPublicContents, isFetchingPublic, idOrganization]);

    useEffect(() => {
        if(!!initialContentId && !isFetchingOrg && !isFetchingPublic) {
            const content = orgContents?.find(content => content.contentId === initialContentId) ?? publicContents?.find(content => content.contentId === initialContentId);
            setSelectedContent(content)
        }
    }, [initialContentId, orgContents, publicContents, isFetchingOrg, isFetchingPublic]);


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
    const [contentEdit, setContentEdit] = useState(null);
    const [openEditContent, setOpenEditContent] = useState(false)
    const handleClose = (content) => {
       // console.log("content en handle close",content)
         setOpenAddContent(false);
         if(content?.contentId){
             setContentEdit(content)
             setOpenEditContent(true)
         }
     };
     

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Contenido</Typography>
            <AddContentDialog resultContent={setSelectedContent} open={openAddContent} handleClose={handleClose } />
            <EditContentDialog open={openEditContent} handleClose={() => { setOpenEditContent(false); setContentEdit(null) }} content={contentEdit} />
                           
            <TextField
                label="Buscar Contenido"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
                style={{ marginBottom: '10px' }}
                slotProps={{
                    input: {
                      endAdornment: <SearchIcon />
                    }
                  }}
            />
            <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab label="Organización" value="organization" />
                <Tab label="Externo" value="public" />
            </Tabs>
            {selectedContent
                        ?<Alert severity="info">Contenido seleccionado: {selectedContent?.description}{selectedContent?.organization!=idOrganization && " (externo)"} </Alert>
                        :<Alert severity="warning">Seleccione un contenido </Alert>
                    }
            {isFetchingOrg || isFetchingPublic ?
               <SkeletonTableOfContents />
            : 
            <><Table >
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
                            <TableRow 
                                key={content.contentId} 
                                selected={selectedContent?.contentId === content?.contentId}
                                style={{ backgroundColor: selectedContent?.contentId === content?.contentId ? 'revert-layer' : 'inherit' }}
                            >
                                <TableCell>{content.description}</TableCell>
                                <TableCell>
                                    <Button onClick={() => { setSelectedContent(content); onSelectContent(content.contentId); } } variant="contained" color="primary">
                                        Seleccionar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={filteredContents?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange} />
            </>
                }
                </CardContent>
        </Card>
    );
}

ContentChooser.propTypes = {
    onSelectContent: PropTypes.func.isRequired,
    onCreateContent: PropTypes.func.isRequired,
    initialContentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ContentChooser;