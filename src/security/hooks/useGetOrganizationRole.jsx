
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

/**
 * 
 * @param {*} param0 
 * @returns "none"/"divulgator"/"moderator"
 */
export default function useGetOrganizationRole({organizationId}) {
    const {tokenParsed} = useContext(KeycloakContext);
    if(tokenParsed?.mao?.find((v)=>v==organizationId)){
        return "moderator"
    }
    if(tokenParsed?.dao?.find((v)=>v==organizationId)){
        return "divulgator"
    }
    return "none"
}