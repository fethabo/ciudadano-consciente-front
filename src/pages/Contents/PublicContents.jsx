import { Card, CardContent, Typography,Box, Stack, Alert, IconButton, Tooltip, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useGetContents } from '@components/Hooks/requests/Content';
import useUserApi from '@components/Hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { useGetUserVotes } from '@components/Hooks/requests/Users/Index';
import Vote from '@components/Vote';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';
import TagsDisplay from '@components/TagsDisplay';
import SkeletonContents from './SkeletonContents';
import PlayAnimatedIcon from '@icons/PlayAnimatedIcon';


function PublicContents(){
    const navigate = useNavigate();
    //Obtengo los contenidos publicos para mostrarlos
    const{ data: contents, isFetching, isError} = useGetContents({enabled: true})
    const { userId } = useUserApi()
    const {data: votes, isFetching: isFetchingVotes, isError: isErrorVotes } = useGetUserVotes({userId: userId, enabled: !!userId})
    
    const handleEntrar = (id) => {
      navigate(`/contents/${id}/play`)
    };
  
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [paginatedContents, setPaginatedContents] = useState([]);
  
    useEffect(() => {
      if (contents) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPaginatedContents(contents.slice(startIndex, endIndex));
      }
    }, [contents, page, pageSize, votes]);
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    return (
      <Stack>
        <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Stack sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: "1em" }}>
            {isFetching ? (
              <SkeletonContents />
            ) : isError ? (
              <Alert severity="error">Hubo un error al obtener los contenidos</Alert>
            ) : (
              paginatedContents.map((content, index) => (
                <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign:'left' }}>
                  <CardContent>
                    <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                      <Typography variant="h6">{content.description}</Typography> 
                      <Vote userVotes={votes} entityId={content?.contentId} entityType='contents' isLoading={isFetchingVotes} isError={isErrorVotes} />
                    </Box>
                    <Typography variant="body2">Usuario: {content.username}</Typography>
                    <Typography variant="body2">Organización: {content.organization}</Typography>
                    <Typography variant="body2">Tipo de Actividad: {content.activityTypeVersionId}</Typography>
                    <Box display="flex" gap="1em" alignItems={"center"}>
                      <Typography variant="caption">Tags: </Typography> 
                      <TagsDisplay entityId={content?.contentId} entityType='contents' />
                    </Box>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                    <Tooltip title="Probar" arrow>
                    <IconButton variant="contained" color="primary" onClick={() => handleEntrar(content.contentId)}>
                        <PlayAnimatedIcon/>
                    </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              ))
            )}
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, alignItems: 'center' , gap: '1em'}}>
        <Typography variant="body2" >Items por página:</Typography>
        <Select
        size='small'
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          displayEmpty
          inputProps={{ 'aria-label': 'Items per page' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </Box>
          <Pagination
            count={Math.ceil(contents?.length / pageSize)}
            page={page}
            onChange={handlePageChange}
            sx={{ marginTop: 2, alignSelf: 'center' }}
          />
        </Box>
      </Stack>
    );
  }
  
  export default PublicContents;