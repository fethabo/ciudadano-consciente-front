import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';//admin 3
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';//moderator 5
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';//divulgator 4
import { useParams } from 'react-router-dom';
import { useGetUsersWithRoleOrganization } from '../../components/Hooks/requests/Organizations';
import { useGetRoles } from '../../components/Hooks/requests/Roles';
import { useEffect, useState } from 'react';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import { useGetUsersOfOrganization } from '../../components/Hooks/requests/Users/Index';


  function convertData(data, roleIdToName, usersIdToName) {
    const result = data.map(entry => ({
        user: usersIdToName[entry.user],
        role: roleIdToName[entry.role]
    }));
    return result;
 }


export default function OrganizationUsers() {
    const {idOrganization} =useParams();
    const {data: uros, isFetching: isFetchingUros, isError: isErrorUros} = useGetUsersWithRoleOrganization({organizationId: idOrganization, enabled: !!idOrganization});
    const {data:users, pending} = useGetUsersOfOrganization({users: uros || [], enabled: !!uros})
    const {data: roles, isFetching: isFetchingRoles, isError: isErrorRoles}= useGetRoles({enabled: true});
    const [parsedUsers, setParsedUsers] = useState(null);
    console.log(uros, users, roles, parsedUsers)
    
    
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
                    <IconButton edge="end" aria-label="delete">
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
