
import { KeycloakContext } from '../KeycloakContext';
import { useContext } from "react";

export default function useGivenName() {

    const keycloakContext = useContext(KeycloakContext);
    return keycloakContext.tokenParsed.given_name;
}