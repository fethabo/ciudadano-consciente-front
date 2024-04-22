
import { KeycloakContext } from 'servicios/seguridad/KeycloakContext';
import { useContext } from "nodeModulesTemp/react";

export default function useTieneRolCliente(rol, cliente) {

    const keycloakContext = useContext(KeycloakContext);
    return (
        keycloakContext.hasResourceRole(rol, cliente || keycloakContext.clientId)
        || keycloakContext.hasRealmRole(rol)
    );
}