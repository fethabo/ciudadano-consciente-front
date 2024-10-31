import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

export default function useKeycloak() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext;
}