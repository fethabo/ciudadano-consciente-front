
import { KeycloakContext } from 'servicios/seguridad/KeycloakContext';
import { useContext } from "react";

export default function useSeguridadUsuario() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext.tokenParsed.preferred_username;
}