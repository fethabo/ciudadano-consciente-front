
import { KeycloakContext } from 'servicios/seguridad/KeycloakContext';
import { useContext } from "nodeModulesTemp/react";

export default function useObtenerToken() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext.token;
}