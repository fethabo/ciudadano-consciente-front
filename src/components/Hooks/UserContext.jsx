import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useGetUserByEmail, usePostUser } from "./requests/Users/Index";
import useEmail from "../../security/hooks/useEmail";
import { useSnackbar } from "notistack";

/**
 * - Genera un contexto para guardar los datos del usuario en la api ciuco
 */

export const UserContext = React.createContext('');
export function UserProvider({children}) {

    const userEmail = useEmail();
    const [contextValue, setContextValue] = useState(null);
    const [newUser, setNewUser] = useState(false);
    
    const { data: user , isFetching, isFetched, isError, error} = useGetUserByEmail({userEmail: userEmail, enabled: !!userEmail})
    const { data: userPost, isFetching: isFetchingPost, isError: isErrorPost} = usePostUser({enabled: newUser})

    const { enqueueSnackbar } = useSnackbar()
    
    useEffect(() => {
        //si se da de alta el usuario seteamos el valor en el contexto
        if(userPost && !isFetchingPost && !isErrorPost){
            setContextValue(userPost)
        }
    }, [userPost, isFetchingPost, isErrorPost]);

    useEffect(() => {
        if(isFetched && !isFetching){
            if(isError){
                if(error?.status===403){
                    console.log("Usuario no existente en ciuco")
                    setNewUser(true)
                }else{
                    enqueueSnackbar(`Error: ${error}`, {variant:"error"})
                    setContextValue(null)
                 }
            }else if(user){
                setContextValue(user)
                }else{
                    setNewUser(true)
                }
        }
    }, [user,isFetched,isFetching, isError, error, enqueueSnackbar]);

    return (
            <UserContext.Provider value={contextValue}>
                {contextValue && children} {/* TODO: evaluar si esto no jode mucho, si es notorio hay que agregar un cargando */}
            </UserContext.Provider>       
    )
}
UserProvider.propTypes={
    children: PropTypes.node.isRequired,
}