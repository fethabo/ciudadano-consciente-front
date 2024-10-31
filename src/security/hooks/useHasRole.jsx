
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "nodeModulesTemp/react";

export default function useHasRole(rol, cliente) {

    const keycloakContext = useContext(KeycloakContext);
    return (
        keycloakContext.hasResourceRole(rol, cliente || keycloakContext.clientId)
        || keycloakContext.hasRealmRole(rol)
    );
}