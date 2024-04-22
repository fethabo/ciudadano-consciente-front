
import { KeycloakContext } from 'servicios/seguridad/KeycloakContext';
import { useContext } from "react";

export default function useDatosUsuario() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext.tokenParsed.given_name;
}