import { useQueries } from "nodeModulesTemp/@tanstack/react-query";
import useObtenerToken from "servicios/seguridad/hooks/useObtenerToken";
import defaultMensajeError from './defaultMensajeError';
import defaultMensajeExito from './defaultMensajeExito';
import _ from 'nodeModulesTemp/lodash';
import defaultMensajeAdvertencia from './defaultMensajeAdvertencia';
import { useMensajesContext } from "base/mensajes/MensajesContext";

/**
 * Ejecuta el request con axios y react-query
 * @property {array} queries - arreglo de queries de react-query (clave, url, funcionVerbo )
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
export default function useUtilesApiParalelo({ queries, form, habilitado, habilitarError, habilitarExito, habilitarAdvertencia, mensajeExito, mensajeAdvertencia, mensajeError, staleTime, refetchOnWindowFocus }) {

  const token = useObtenerToken();
  const agregarMensaje = useMensajesContext();

  const exito = (d) => {
    if (_.isEmpty(d) && habilitarAdvertencia !== false) {
      return (agregarMensaje(mensajeAdvertencia || defaultMensajeAdvertencia(queries)))
    }
    if (habilitarExito !== false && mensajeExito !== false) {
      return (agregarMensaje(mensajeExito || defaultMensajeExito(queries)))
    }
    return null;
  };

  const data = useQueries({
    queries: queries.map((query) => (
      {
        queryKey: [query.clave, form],
        queryFn: () => (query.funcionVerbo(token, query.url, form)),
        enabled: habilitado,
        refetchOnWindowFocus: refetchOnWindowFocus ?? false,
        staleTime: staleTime ?? 0, // 'Infinity' || nro milisegundos
        onError: (error) => habilitarError !== false && agregarMensaje(
          mensajeError || defaultMensajeError(error)
        ),
        onSuccess: exito
      }
    ))
  })
  return data
}
