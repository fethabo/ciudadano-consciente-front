
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

export default function useUserName() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext?.tokenParsed?.preferred_username;
}