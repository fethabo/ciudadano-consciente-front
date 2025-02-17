import { Alert, Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteUserRoleLevel, useGetUsersWithRoleInLevel } from "../Hooks/requests/Level";
import useUserApi from "../Hooks/useUserApi";
import { useEffect, useState } from "react";
//import FormSearchUsers from "../Forms/FormSearchUser";
import { useQueryClient } from "@tanstack/react-query";
import { useGetRoles } from "../Hooks/requests/Roles";
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import FormUserLevel from "../Forms/FormUserLevel";

function getIcon(role){
    switch(role){
        case "Ciuco-Admin": return <MilitaryTechIcon />;
        case "L-Moderator": return <KeyboardDoubleArrowUpIcon />;
        case "L-Divulgator": return <KeyboardArrowUpIcon />;
        default : return <PersonIcon/>;
    }
}


export default function EditLevelPermissionsDialog({open, level, handleClose, path,...rest}) {
    const { userId } = useUserApi();//id de usuario para creator
        
    const {data: users, isFetching: isFetchingUsers, isError: isErrorUsers} = useGetUsersWithRoleInLevel({levelId: level?.levelId, enabled: !!level?.levelId && !!userId})
    const [parsedUsers, setParsedUsers] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const {isFetching: isFetchingDelete, isFetched: isFetchedDelete}= useDeleteUserRoleLevel({levelId:level?.levelId, userId:deleteData?.userId, roleId:deleteData?.roleId, enabled:!!deleteData && !!level});
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});

//vuelvo a habilitar el get de usuarios
const queryClient =useQueryClient();
useEffect(() => {
    if(isFetchedDelete&&!isFetchingDelete){
        setDeleteData(null)
        queryClient.resetQueries({ queryKey: ['useGetUsersWithRoleInLevel', level?.levelId,null,null], exact: true })
        
    }
}, [level, isFetchedDelete, isFetchingDelete, queryClient]);

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


/* APERTURA/CIERRE DE VENTANA AGREGAR USUARIO */
const [formOpen, setFormOpen] = useState(false);
const handleCloseForm = () => {
    setFormOpen(false)
    queryClient.resetQueries({ queryKey: ['usePostRoleUserLevel'], exact: false })
    queryClient.resetQueries({ queryKey: ['useGetUsersWithRoleInLevel', level?.levelId,null,null], exact: true })
}
    return ( <Dialog
        fullScreen
                open={open}
                aria-labelledby="edit-level-permissions-dialog"
                onClose={(e,reason) => { if (reason === 'backdropClick') { handleClose() } }}
                {...rest}
            >
               <DialogTitle> Permisos del nivel  <IconButton type='button'  onClick={handleClose} disabled={isFetchingUsers} ><CloseIcon/></IconButton> </DialogTitle>
                               
                            <Dialog onClose={handleCloseForm} open={formOpen}>
                                <DialogTitle>Agregar usuario al nivel</DialogTitle>
                                <DialogContent>
                                   <FormUserLevel levelId={level?.levelId} handleSubmit={handleCloseForm} />
                               </DialogContent>
                            </Dialog>
               
               <DialogContent dividers>
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
                           !isErrorUsers && <Typography>No hay usuarios con permisos en el nivel seleccionado</Typography>
                        )}
                        <ListItem disableGutters>
                            <ListItemButton
                                autoFocus
                                onClick={() => setFormOpen(true)}
                                disabled={isErrorUsers || isErrorRoles || isFetchingDelete || formOpen}
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
            </Dialog> );
}

EditLevelPermissionsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    level: PropTypes.object,
    path: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

