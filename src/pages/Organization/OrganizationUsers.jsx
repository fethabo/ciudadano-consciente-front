import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import { useParams } from 'react-router-dom';
import { useDeleteUserRoleOrganization, useGetUsersWithRoleOrganization } from '../../components/Hooks/requests/Organizations';
import { useGetRoles } from '../../components/Hooks/requests/Roles';
import { useEffect, useState } from 'react';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { useGetUsersOfOrganization } from '../../components/Hooks/requests/Users/Index';


  function convertData(data, roleIdToName, usersIdToName) {
    const result = data.map(entry => ({
        user: usersIdToName[entry.user],
        userId: entry.user,
        role: roleIdToName[entry.role],
        roleId: entry.role
    }));
    return result;
 }


 /* TODO: SACAR IDORGANIZATION DE LA URL o COMPROBEMOS EL ROL DEL USUARIO QUE LO ACCEDE)
 TODO: Agregar boton para agregar usuario en la organizacion
 TODO: AGREGAR REFETCH de users al eliminar*/
export default function OrganizationUsers() {
    const {idOrganization} =useParams();
    const [parsedUsers, setParsedUsers] = useState(null);

    const [deleteData, setDeleteData] = useState(null);
    const {isFetching: isFetchingDelete}= useDeleteUserRoleOrganization({organizationId:idOrganization, userId:deleteData?.userId, roleId:deleteData?.roleId, enabled:!!deleteData});
    const {data: uros, isFetching: isFetchingUros, isError: isErrorUros} = useGetUsersWithRoleOrganization({organizationId: idOrganization, enabled: (!!idOrganization&&!isFetchingDelete)});
    const {data: users, pending} = useGetUsersOfOrganization({users: uros || [], enabled: !!uros})
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
  
   
console.log(parsedUsers)
    useEffect(() => {
        if(uros &&roles && users && !pending && !parsedUsers){
            const roleIdToName = {};
            roles.forEach(role => {
                roleIdToName[role.roleId] = role.name;
            });
            const userIdToName = {};
            users.forEach(user => {
                userIdToName[user.userId]= user.username;
            })
            setParsedUsers(convertData(uros,roleIdToName, userIdToName))
        }
    },[uros, roles,users, pending, parsedUsers])

    function getIcon(role){
        switch(role){
            case "admin": return <MilitaryTechIcon />;
            case "moderator": return <KeyboardDoubleArrowUpIcon />;
            case "divulgator": return <KeyboardArrowUpIcon />;
        default : return <PersonIcon/>;
        }
    }
    return ( 
        <List >
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
                    <ListItemAvatar>
                    <Tooltip title={user?.role}>
                        <Avatar>
                            {getIcon(user?.role)}
                        </Avatar>
                    </Tooltip>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user?.user}
                    />
                </ListItem>
            ))}
          
      </List>
     );
}
