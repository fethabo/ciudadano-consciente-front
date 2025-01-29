import { useCallback, useEffect, useState } from "react";
import Keycloak from 'keycloak-js';
import { KeycloakContext } from "./KeycloakContext";
import PropTypes from "prop-types"

/**
 * - Genera un contexto donde acceder a los valores actualizados de keyclaok 
    @example
    <InitKeycloak>
        {children}
    </InitKeycloak>
 */
export default function InitKeycloak({children, configKc}) {

    const [keycloak, setKeycloak] = useState(null);
    const refreshToken = useCallback((kc) => {
        const tiempoDeDuracion = (kc.tokenParsed.exp - kc.tokenParsed.iat) * 1000; // tiempo en ms que queda antes de que venza el token
        setTimeout(() => {
            //Como argumento en el updateToken FORZAMOS el refresh 
            kc.updateToken(-1).then((refreshed) => {
                if (refreshed) {
                    const kcAux = { ...kc };                    
                    setKeycloak(kcAux);
                } else {
                    console.warn('Token aún válido, evaluar tiempo de refresco');
                }
                refreshToken(kc); // Volvemos a programar el refresco
            }).catch(() => {
                console.error('Error refreshing token');
                kc.logout();
            });
        }, tiempoDeDuracion - Math.round(tiempoDeDuracion * 0.10)); 
    },[]);
    useEffect(() => {
        const kc = new Keycloak(configKc);
        if (keycloak === null || !keycloak || !keycloak?.authenticated) {
            kc.init({
                onLoad: 'login-required',
                flow: 'standard',

            }).then((authenticated) => {
                    setKeycloak(kc);
                    refreshToken(kc)
                    console.log("autenticacion exitosa", authenticated)
                }).catch((errorData) => {
                    // si la autenticacion fallo, redirigimos a formulario de login
                    console.error("Kc inicializacion: errorData index", errorData);
                    kc.logout(true);
                })
        }
    }, [keycloak,configKc, refreshToken]);

    return (
        keycloak !== null
        && (
            <KeycloakContext.Provider value={keycloak}>
                {children}
            </KeycloakContext.Provider>
        )
    )
}
InitKeycloak.propTypes={
    children: PropTypes.node.isRequired,
    configKc: PropTypes.object.isRequired,

}