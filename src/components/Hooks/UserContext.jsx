import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import useUserName from "../../security/hooks/useUserName";
import { useGetUserByUsername, usePostUser } from "./requests/Users/Index";
import { LinearProgress } from "@mui/material";

/**
 * - Genera un contexto para guardar los datos del usuario en la api ciuco
 */

export const UserContext = React.createContext('');
export function UserProvider({children}) {

    const userName= useUserName();
    const [contextValue, setContextValue] = useState(null);
    const [newUser, setNewUser] = useState(false);
    
    const { data: user , isFetching, isFetched, isError, status, error} = useGetUserByUsername({userName: userName, enabled: !!userName})
    const { data: userPost, isFetching: isFetchingPost, isError: isErrorPost} = usePostUser({enabled: newUser})


    useEffect(() => {

        if(!!userPost){
            setContextValue(userPost)
        }
    }, [userPost]);

    console.log("status", status)
    console.log("error", error)
    useEffect(() => {
        if(isFetched && !isFetching){
            if(isError){
                if(error?.status===403){
                    console.log("DEBO HACER EL POST")
                    setNewUser(true)
                }else{
                    console.log("TODO: agregar mensaje flotante de error??? no se me ocurre otra para atajar en este caso")
                    setContextValue(null)
                 }
            }else if(user){
                setContextValue(user)
                }else{
                    setNewUser(true)
                }
        }
    }, [user,isFetched,isFetching, isError, error]);

    return (
            <UserContext.Provider value={contextValue}>
                {children}
            </UserContext.Provider>       
    )
}
UserProvider.propTypes={
    children: PropTypes.node.isRequired,
}