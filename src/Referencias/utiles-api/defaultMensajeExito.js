/**
 * 
 * Mensaje por defecto cuando se realiza una petición con éxito
 * @returns {object} object
 * @example
 * {
 *   tipo: 'exito',
 *   titulo: 'Se obtuvieron los datos correctamente',
 *   tiempo: true
 * }
 */
export default function defaultMensajeExito() {
  return (
    {
      tipo: 'exito',
      titulo: 'Se obtuvieron los datos correctamente',
      tiempo: true
    }
  )
}