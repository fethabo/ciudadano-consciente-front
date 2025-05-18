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
import { useGetActivityTypes } from '@components/Hooks/requests/ActivityType';
import { useGetActivityTypeVersions } from '@components/Hooks/requests/ActivityTypeVersion';
import { useGetOrganizations } from '@components/Hooks/requests/Organizations';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CallSplitIcon  from '@mui/icons-material/CallSplit';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function PublicContents(){
    const navigate = useNavigate();
    //Obtengo los contenidos publicos para mostrarlos
    const{ data, isFetching, isError} = useGetContents({enabled: true})
    const { userId } = useUserApi()
    const {data: votes, isFetching: isFetchingVotes, isError: isErrorVotes } = useGetUserVotes({userId: userId, enabled: !!userId})
      
      const { data: activityTypes, isFetching: isFetchingActivityTypes,     isError: isErrorActivityTypes       } = useGetActivityTypes({         enabled: true       });
      
      const { data: activityTypesVersions, isFetching: isFetchingActivityTypesVersions, isError: isErrorActivityTypesVersions} = useGetActivityTypeVersions({         enabled: true       });

      const { data: organizations, isFetching: isFetchingOrganizations, isError: isErrorOrganizations } = useGetOrganizations({enabled: true});

        const [contents, setContents] = useState([]);
        const [filteredContents, setFilteredContents] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');


      useEffect(() => {
      if (data && activityTypes && activityTypesVersions) {
        const enrichedContents = data.map(content => {
          const activityTypeVersion = activityTypesVersions.find(
            version => version.activityTypeVersionId === content.activityTypeVersionId
          );
          const activityType = activityTypes.find(
            type => type.activityTypeId === activityTypeVersion?.activityTypeId
          );
          const organization = organizations.find(org => org.organizationId === content.organization);
          return {
            ...content,
            activityType: activityType?.name || 'Desconocido',
            organizationName: organization?.name || null,
          };
        });
        setContents(enrichedContents);
        setFilteredContents(enrichedContents);
    }
  }, [data, activityTypes, activityTypesVersions, organizations]);


    const handleEntrar = (id) => {
      navigate(`/contents/${id}/play`)
    };
  
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [paginatedContents, setPaginatedContents] = useState([]);
  
    useEffect(() => {
      if (filteredContents) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPaginatedContents(filteredContents.slice(startIndex, endIndex));
      }
    }, [filteredContents, page, pageSize, votes]);
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
 useEffect(() => {
          if (searchTerm.trim() === '') {
            setFilteredContents(contents);
          } else {
            const lowerSearch = searchTerm.toLowerCase();
            setFilteredContents(
              contents.filter(
                c =>
                  c.description?.toLowerCase().includes(lowerSearch) ||
                  c.username?.toLowerCase().includes(lowerSearch) ||
                  c.organizationName?.toLowerCase().includes(lowerSearch) ||
                  c.activityType?.toLowerCase().includes(lowerSearch)
              )
            );
            setPage(1);
          }
        }, [searchTerm, contents]);


    return (
      <Stack>
      <Box sx={{ flexGrow: 1, padding: 2, justifyContent: 'center', alignItems: 'center' }}>
        <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar contenidos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
          ),
        }}
        size="small"
        sx={{ mb: 2 }}
        />
        <Stack sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: "1em" , alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        {isFetching || isFetchingActivityTypes || isFetchingActivityTypesVersions || isFetchingOrganizations ? (
          <SkeletonContents />
        ) : isError || isErrorActivityTypes || isErrorActivityTypesVersions || isErrorOrganizations ? (
          <Alert severity="error">Hubo un error al obtener los contenidos</Alert>
        ) : (
          paginatedContents.length === 0 ? (
          <Alert severity="info" sx={{ width: '100%' }}>
            No hay contenidos para mostrar
          </Alert>
          ) : 
          paginatedContents.map((content, index) => (
          <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign: 'left', boxShadow: 3 }}>
            <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{content.description}</Typography>
              </Box>
              <Vote userVotes={votes} entityId={content?.contentId} entityType='contents' isLoading={isFetchingVotes} isError={isErrorVotes} />
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
              <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {content.username}
              </Typography>
              {content.organizationName && (
              <Box display="flex" alignItems="center" gap={0.5} ml={2}>
                <Tooltip title="Organización verificada">
                <VerifiedIcon color="primary" fontSize="small" />
                </Tooltip>
                <Typography variant="body2" color="primary" fontWeight={500}>
                {content.organizationName}
                </Typography>
              </Box>
              )}
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
              {/* Cambiado LocalOfferIcon por CallSplitIcon */}
              <CallSplitIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {content.activityType}
              </Typography>
            </Box>
            <Box display="flex" gap="1em" alignItems="center" mt={1}>
              <TagsDisplay entityId={content?.contentId} entityType='contents' />
            </Box>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Tooltip title="Probar" arrow>
              <IconButton variant="contained" color="primary" onClick={() => handleEntrar(content.contentId)}>
              <PlayArrowIcon />
              </IconButton>
            </Tooltip>
            </Box>
          </Card>
          ))
        )}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, gap: '1em', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <Typography variant="body2">Items por página:</Typography>
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
          count={Math.ceil(filteredContents?.length / pageSize)}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 0, alignSelf: 'center' }}
        />
        </Box>
      </Box>
      </Stack>
    );
  }
  
  export default PublicContents;