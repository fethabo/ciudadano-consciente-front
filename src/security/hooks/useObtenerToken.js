
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

export default function useObtenerToken() {
    const keycloakContext = useContext(KeycloakContext);
    console.log(keycloakContext?.token, "TOKEN")
   
    return keycloakContext?.token;
}