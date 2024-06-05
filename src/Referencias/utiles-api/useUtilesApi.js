import { useQuery } from "nodeModulesTemp/@tanstack/react-query";
import useObtenerToken from "servicios/seguridad/hooks/useObtenerToken";
import defaultMensajeError from './defaultMensajeError';
import defaultMensajeExito from './defaultMensajeExito';
import _ from 'nodeModulesTemp/lodash';
import defaultMensajeAdvertencia from './defaultMensajeAdvertencia';
import { useMensajesContext } from "base/mensajes/MensajesContext";

/**
 * Ejecuta el request con axios y react-query
 * @property {string} clave - identificador de react-query
   @property {string} url - url completa (incluye parametros)
   @property {array} parametros - arreglo de parametros
   @property {object} form - objeto json con los parametros
   @property {bool} habilitado -  habilita el request
   @property {bool} habilitarError - default(true) false => no muestra mensaje de error
   @property {bool} habilitarExito - default(true) false => no muestra mensaje de exito
   @property {bool} habilitarAdvertencia - default(true) false => no muestra mensaje de advertencia
   @property {object} mensajeExito -  mensaje de exito o defaultMensajeExito
   @property {object} mensajeAdvertencia -  mensaje de advertencia o defaultMensajeAdvertencia
   @property {object} mensajeError -  mensaje de error o defaultMensajeError
   @property {function} funcionVerbo - funcion que ejecuta el request (con axios)
 * 
 * @returns resultado de useQuery {data, isFetching, error}
 */

   /* TODO: DESHABILITAR CACHE DE LOS POST y los PUT y los DELETE (quizas viendo el contenido de la clave??)*/
export default function useUtilesApi({ clave, url, parametros, form, habilitado, habilitarError, habilitarExito, habilitarAdvertencia, mensajeExito, mensajeAdvertencia, mensajeError, funcionVerbo, funcionDirectus, staleTime, refetchOnWindowFocus, retry, cacheTime }) {

  const token = useObtenerToken();
  const agregarMensaje = useMensajesContext();

  const exito = (d) => {
    if (_.isEmpty(d) && habilitarAdvertencia !== false) {
      return (agregarMensaje(mensajeAdvertencia || defaultMensajeAdvertencia(parametros)))
    }
    if (habilitarExito !== false && mensajeExito !== false) {
      return (agregarMensaje(mensajeExito || defaultMensajeExito(parametros)))
    }
    return null;
  };

  return useQuery(
    [clave, parametros || [null]],
    () => (funcionVerbo ? funcionVerbo(token, url, form) : funcionDirectus(parametros)),
    {
      enabled: habilitado,
      cacheTime: cacheTime ?? 5 * 60 * 1000,
      staleTime: staleTime ?? 0, // 'Infinity' || nro milisegundos
      refetchOnWindowFocus: refetchOnWindowFocus ?? false, // 'always || true || false
      onError: (error) => habilitarError !== false && agregarMensaje(
        mensajeError || defaultMensajeError(error, parametros)
      ),
      onSuccess: exito,
      retry: retry ?? 3
    });
}
