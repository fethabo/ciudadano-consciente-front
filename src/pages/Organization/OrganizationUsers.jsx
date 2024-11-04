import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteUserRoleOrganization, useGetUsersWithRoleOrganization } from '../../components/Hooks/requests/Organizations';
import { useGetRoles } from '../../components/Hooks/requests/Roles';
import { useEffect, useState } from 'react';
import {  Avatar, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { useGetUsersOfOrganization } from '../../components/Hooks/requests/Users/Index';

import AddIcon from '@mui/icons-material/Add';
import FormSearchUsers from '../../components/Forms/FormSearchUser';

  function convertData(data, roleIdToName, usersIdToName, usersIdToEmail) {
    
    const result = data.map(entry => ({
        user: usersIdToName[entry.user],
        userId: entry.user,
        role: roleIdToName[entry.role],
        roleId: entry.role,
        email: usersIdToEmail[entry.user],
    }));
    
    return result;
 }
 function getIcon(role){
    switch(role){
        case "Admin": return <MilitaryTechIcon />;
        case "Moderator": return <KeyboardDoubleArrowUpIcon />;
        case "Divulgator": return <KeyboardArrowUpIcon />;
        default : return <PersonIcon/>;
    }
}

 /* 
    TODO: AGREGAR REFETCH de users al eliminar
    TODO: atajar errores de hooks no atajados
 */
export default function OrganizationUsers() {
    const {idOrganization} =useParams();
    const [parsedUsers, setParsedUsers] = useState(null);
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState(null);
    const {isFetching: isFetchingDelete, isFetched: isFetchedDelete}= useDeleteUserRoleOrganization({organizationId:idOrganization, userId:deleteData?.userId, roleId:deleteData?.roleId, enabled:!!deleteData});
    const [enabledUROS, setEnabledUROS] = useState(!!idOrganization);
    const {data: uros, isFetching: isFetchingUros, isError: isErrorUros} = useGetUsersWithRoleOrganization({organizationId: idOrganization, enabled: enabledUROS});
    const {data: users,pending} = useGetUsersOfOrganization({users: uros || [], enabled: !!uros})
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
    useEffect(() => {
        if(isFetchedDelete&&!isFetchingDelete){
            setEnabledUROS(true);
        }
    }, [isFetchedDelete,isFetchingDelete]);

    useEffect(() => {
        if(uros && roles && users  &&!pending && !parsedUsers){
            console.log(uros,roles,users,parsedUsers)
            const roleIdToName = {};
            roles.forEach(role => {
                roleIdToName[role.roleId] = role.name;
            });
            const userIdToName = {};
            const userIdToEmail = {};
            users.forEach(user => {
                userIdToName[user.userId]= user.username;
                userIdToEmail[user.userId]= user.email;
            })
            setParsedUsers(convertData(uros,roleIdToName, userIdToName, userIdToEmail))
            setEnabledUROS(false);
        }
    },[uros, roles,users, parsedUsers])

    /* CERRADO DE VENTANA DE USUARIOS */
    const handleClose = () => {
        navigate(`/organizations/${idOrganization}`)
    }
    
    /* APERTURA/CIERRE DE VENTANA AGREGAR USUARIO */
    const [formOpen, setFormOpen] = useState(false);
    const handleCloseForm = () => {
        setFormOpen(false)
    }
    const handleSubmit = ({v}) =>{
        console.log("handleSubmit de OrganizationsUSERS", v)
    }
   

    return ( 
        <Dialog onClose={handleClose} open>
            <DialogTitle>Usuarios en la organización</DialogTitle>
            <Dialog onClose={handleCloseForm} open={formOpen}>
                <DialogTitle>Agregar usuario a la organizacion</DialogTitle>
                <DialogContent>
                    <FormSearchUsers handleSubmit={handleCloseForm}/>
                </DialogContent>
            </Dialog>
            <List dense>
                {(isFetchingUros || pending || isFetchingRoles)
                ?<LinearProgress />
                : parsedUsers?.length>0
                    ?(parsedUsers.map((user,index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={()=>setDeleteData({roleId: user?.roleId, userId: user?.userId})}>
                                    <DeleteIcon />
                                </IconButton>
                                }
                            >
                                <Tooltip title={user?.role}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {getIcon(user.role)}
                                        </Avatar>
                                    </ListItemAvatar>
                                </Tooltip>
                                <ListItemText
                                    primary={user?.user}
                                    secondary={user?.email}
                                />
                            </ListItem>
                    ))
                ):<LinearProgress />
                }
            <ListItem disableGutters>
            <ListItemButton
                disabled={isFetchingUros|| isFetchingDelete}
                autoFocus
                onClick={() => setFormOpen(true)}
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
      </Dialog>
     );
}
