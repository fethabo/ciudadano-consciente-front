
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

/**
 * 
 * @param {*} param0 
 * @returns "none"/"divulgator"/"moderator"
 */
export default function useGetLevelRole({levelId}) {
    const {tokenParsed} = useContext(KeycloakContext);
    if(tokenParsed?.mal?.find((v)=>v==levelId)){
        return "moderator"
    }
    if(tokenParsed?.dal?.find((v)=>v==levelId)){
        return "divulgator"
    }
    return "none"
}