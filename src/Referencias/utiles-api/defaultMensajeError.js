/**
 * 
 * Mensaje por defecto cuando ocurre un error en una petición 
 * @returns {object} object
 * @example 
 *  {
 *    - tipo: 'error',
 *    - titulo: `Error: ${error?.response?.status ? ''.concat(error?.response?.status).concat(" - ").concat(error?.response?.statusText) : error?.code}`,
 *    - mensaje: `Ocurrió un error al realizar la consulta - ${parametros}`,
 *  }
 */
export default function defaultMensajeError(error, parametros) {
  return (
    {
      tipo: 'error',
      titulo: `Error: ${error?.response?.status ? ''.concat(error?.response?.status).concat(" - ").concat(error?.response?.statusText) : error?.code}`,
      mensaje: `Ocurrió un error al realizar la consulta ${parametros ? ('- ' + parametros) : ''}`,
    }
  )
}