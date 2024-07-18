import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteUserRoleOrganization, useGetUsersWithRoleOrganization } from '../../components/Hooks/requests/Organizations';
import { useGetRoles } from '../../components/Hooks/requests/Roles';
import { useEffect, useState } from 'react';
import {  Avatar, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { useGetUsersOfOrganization } from '../../components/Hooks/requests/Users/Index';

import AddIcon from '@mui/icons-material/Add';

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
    console.log("ROLE:", role)
    switch(role){
        case "Admin": return <MilitaryTechIcon />;
        case "Moderator": return <KeyboardDoubleArrowUpIcon />;
        case "Divulgator": return <KeyboardArrowUpIcon />;
        default : return <PersonIcon/>;
    }
}

 /* 
 TODO: SACAR IDORGANIZATION DE LA URL o COMPROBEMOS EL ROL DEL USUARIO QUE LO ACCEDE)
 TODO: Agregar boton para agregar usuario en la organizacion
 TODO: AGREGAR REFETCH de users al eliminar
 TODO: navegar correctamente a la ruta anterior
 */
export default function OrganizationUsers() {
    const {idOrganization} =useParams();
    const [parsedUsers, setParsedUsers] = useState(null);
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState(null);
    const {isFetching: isFetchingDelete}= useDeleteUserRoleOrganization({organizationId:idOrganization, userId:deleteData?.userId, roleId:deleteData?.roleId, enabled:!!deleteData});
    const [enabledUROS, setEnabledUROS] = useState(!!idOrganization);
    const {data: uros, isFetching: isFetchingUros, isError: isErrorUros} = useGetUsersWithRoleOrganization({organizationId: idOrganization, enabled: enabledUROS||!isFetchingDelete});
    const {data: users, pending} = useGetUsersOfOrganization({users: uros || [], enabled: !!uros})
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
    

    useEffect(() => {
        if(uros &&roles && users && !pending && !parsedUsers){
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
        }
    },[uros, roles,users, pending, parsedUsers])

    const handleClose = () => {
        navigate(-1)
    }
    return ( 
        <Dialog onClose={handleClose} open>
        <DialogTitle>Usuarios en la organización</DialogTitle>
        <List dense>
            {parsedUsers?.length>0
            &&parsedUsers.map((user,index) => (
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
            ))}
           <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => console.log('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
      </Dialog>
     );
}
