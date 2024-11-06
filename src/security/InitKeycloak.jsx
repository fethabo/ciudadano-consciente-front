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
        const kc = new Keycloak(configKc);
        if (keycloak === null || !keycloak || !keycloak?.authenticated) {
            kc.init({
                onLoad: 'login-required',
                flow: 'standard',

            }).then((authenticated) => {
                    setKeycloak(kc);
                    console.log("autenticacion exitosa", authenticated)
                }).catch((errorData) => {
                    // si la autenticacion fallo, redirigimos a formulario de login
                    console.error("Kc inicializacion: errorData index", errorData);
                    kc.logout(true);
                })

                //esto no es util, si coincide una request cuando expira el token ya no sirve. Refrescarlo antes de que expire para evitarlo
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