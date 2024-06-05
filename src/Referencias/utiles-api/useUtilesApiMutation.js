import { useMutation } from "nodeModulesTemp/@tanstack/react-query";
import useObtenerToken from "servicios/seguridad/hooks/useObtenerToken";
import defaultMensajeError from './defaultMensajeError';
import defaultMensajeExito from './defaultMensajeExito';
//  import _ from 'nodeModulesTemp/lodash';
//  import defaultMensajeAdvertencia from './defaultMensajeAdvertencia';
import { useMensajesContext } from "base/mensajes/MensajesContext";
//  import { useEffect, useState } from "react";

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
export default function useUtilesApiMutation(
  {
    clave,
    url,
    parametros,
    habilitarError,
    habilitarExito,
    //  habilitarAdvertencia,
    mensajeExito,
    //  mensajeAdvertencia,
    mensajeError,
    funcionVerbo,
  }) {

  const token = useObtenerToken();
  const agregarMensaje = useMensajesContext();
  /*   const exito = (d) => {
      if (_.isEmpty(d) && habilitarAdvertencia !== false) {
        return (agregarMensaje(mensajeAdvertencia || defaultMensajeAdvertencia(parametros)))
      }
      if (habilitarExito !== false && mensajeExito !== false) {
        return (agregarMensaje(mensajeExito || defaultMensajeExito(parametros)))
      }
      return null;
    }; */

  function refactUrl(param) {
    let respuestaRefactUrl = url;
    if (param.length > 0) {
      param.map((p, index) => {
        respuestaRefactUrl = url.replace(`parametros[${index}]`, p)
      })
    }
    return respuestaRefactUrl;
  }

  return useMutation(
    [clave],
    {
      mutationFn: (mutacion) => (
        funcionVerbo(
          token,
          refactUrl(mutacion.parametros),
          mutacion.form
        )
      ),
      //useErrorBoundary: true,
      //  onSuccess: (data, variables, context) => {
      onSuccess: () => {
        /* console.log("data, variables, context ", data, variables, context)
        if (habilitarAdvertencia !== false) {
          return (agregarMensaje(mensajeAdvertencia || defaultMensajeAdvertencia(parametros)))
        } */
        if (habilitarExito !== false && mensajeExito !== false) {
          return (agregarMensaje(mensajeExito || defaultMensajeExito(parametros)))
        }
        return null;
      },
      onError: (error) => {
        habilitarError !== false && agregarMensaje(
          mensajeError || defaultMensajeError(error, parametros)
        );
      },
    }
  );
}
