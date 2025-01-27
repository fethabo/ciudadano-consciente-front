import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteUserRoleOrganization, useGetUsersWithRoleOrganization } from '../../components/Hooks/requests/Organizations';
import { useGetRoles } from '../../components/Hooks/requests/Roles';
import { useEffect, useState } from 'react';
import {  Alert, Avatar, Box, Dialog, DialogContent, DialogTitle, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'

import AddIcon from '@mui/icons-material/Add';
import FormSearchUsers from '../../components/Forms/FormSearchUser';
import { useQueryClient } from '@tanstack/react-query';

 function getIcon(role){
    switch(role){
        case "Ciuco-Admin": return <MilitaryTechIcon />;
        case "O-Moderator": return <KeyboardDoubleArrowUpIcon />;
        case "O-Divulgator": return <KeyboardArrowUpIcon />;
        default : return <PersonIcon/>;
    }
}

/* 
    TODO: atajar errores de hooks no atajados
 */
export default function OrganizationUsers() {
    const { idOrganization } = useParams();
    const [parsedUsers, setParsedUsers] = useState(null);
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState(null);
    const {isFetching: isFetchingDelete, isFetched: isFetchedDelete}= useDeleteUserRoleOrganization({organizationId:idOrganization, userId:deleteData?.userId, roleId:deleteData?.roleId, enabled:!!deleteData});
    const {data: users, isFetching: isFetchingUsers, isError: isErrorUsers} = useGetUsersWithRoleOrganization({organizationId: idOrganization, enabled: !!idOrganization});
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
    
    //vuelvo a habilitar el get de usuarios
    const queryClient =useQueryClient();
    useEffect(() => {
        if(isFetchedDelete&&!isFetchingDelete){
            setDeleteData(null)
            queryClient.resetQueries({ queryKey: ['useGetUsersWithRoleOrganization', idOrganization,null,null], exact: true })
            
        }
    }, [idOrganization, isFetchedDelete, isFetchingDelete, queryClient]);

    //parseo de datos(agrego el nombre del rol)
    useEffect(() => {
        if (users && roles && !isFetchingUsers && !isFetchingRoles) {
            const parsed = users.map(user => {
                const role = roles.find(role => role.roleId === user.role);
                return {
                    ...user,
                    roleName: role ? role.name : 'Unknown'
                };
            });
            setParsedUsers(parsed);
        }
    }, [users, roles, isFetchingUsers, isFetchingRoles]);
   

    /* CERRADO DE VENTANA DE USUARIOS */
    const handleClose = () => {
        navigate(`/organizations/${idOrganization}`)
    }
    
    /* APERTURA/CIERRE DE VENTANA AGREGAR USUARIO */
    const [formOpen, setFormOpen] = useState(false);
    const handleCloseForm = () => {
        setFormOpen(false)
        queryClient.resetQueries({ queryKey: ['usePostRoleUserOrganization'], exact: false })
        queryClient.resetQueries({ queryKey: ['useGetUsersWithRoleOrganization', idOrganization,null,null], exact: true })
    }

    return ( 
        <Dialog onClose={handleClose} open fullScreen>
            <DialogTitle sx={{ justifyContent: 'space-between', display:'flex' }}>
                <Typography>Usuarios en la organización</Typography>
                <IconButton onClick={handleClose}>
                    <Icon>close</Icon>
                </IconButton>
            </DialogTitle>
            <Dialog onClose={handleCloseForm} open={formOpen}>
                <DialogTitle>Agregar usuario a la organizacion</DialogTitle>
                <DialogContent>
                    <FormSearchUsers handleSubmit={handleCloseForm} />
                </DialogContent>
            </Dialog>
            <DialogContent>
                {isErrorRoles && <Alert severity="error">Error al obtener roles</Alert>}
                {isErrorUsers && <Alert severity="error">Error al obtener usuarios</Alert>}
                {(isFetchingUsers || isFetchingRoles) ? (
                    <Box>
                        {[...Array(3)].map((_, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Skeleton variant="circular" width={40} height={40} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton variant="text" width="80%" />}
                                    secondary={<Skeleton variant="text" width="60%" />}
                                />
                            </ListItem>
                        ))}
                    </Box>
                ) : (
                    <List dense>
                        {parsedUsers?.length > 0 ? (
                            parsedUsers.map((user, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton disabled={deleteData}  loading={isFetchingDelete && deleteData?.userId===user?.user?.userId} edge="end" aria-label="delete" onClick={() => setDeleteData({ roleId: user?.role, userId: user?.user.userId })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <Tooltip title={user?.roleName}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {getIcon(user?.roleName)}
                                            </Avatar>
                                        </ListItemAvatar>
                                    </Tooltip>
                                    <ListItemText
                                        primary={user?.user.username}
                                        secondary={user?.user.email}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography>No hay usuarios en la organización</Typography>
                        )}
                        <ListItem disableGutters>
                            <ListItemButton
                                autoFocus
                                onClick={() => setFormOpen(true)}
                                disabled={isFetchingDelete || formOpen}
                            >
                                <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Agregar usuario" />
                            </ListItemButton>
                            </ListItem>
                    </List>
                )}
            </DialogContent>
        </Dialog>
     );
}
