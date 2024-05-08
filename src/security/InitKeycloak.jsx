import { useEffect, useState } from "react";
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
    
    useEffect(() => {
       // console.log("INITkeycloak",keycloak)
        const kc = new Keycloak(configKc);
        if (keycloak === null || !keycloak /* || !keycloak.authenticated */) {
           setKeycloak(kc);
            /* kc.init({
                onLoad: 'check-sso', enableLogging: true,
            }).then((authenticated) => {// eslint-disable-line
                    setKeycloak(kc);
                    console.log("autenticacion exitosa")
                }).catch((errorData) => {
                    // si la autenticacion fallo, redirigimos a formulario de login
                    console.error("Kc inicializacion: errorData index", errorData);// eslint-disable-line
                    kc.logout(true);
                }) */

            kc.onTokenExpired = () => {
                kc.updateToken(5).then(() => {
                    const kcAux = { ...kc };
                    kcAux.token = kc?.token
                    setKeycloak(kcAux);
                }).catch(() => {
                    console.error('falló el refresco del token');
                    kc.logout();
                });
            };
        }
    }, [keycloak,configKc]);

    return (
       
            <KeycloakContext.Provider value={keycloak}>
                {children}
            </KeycloakContext.Provider>
       
    )
}
InitKeycloak.propTypes={
    children: PropTypes.node.isRequired,
    configKc: PropTypes.object.isRequired,

}