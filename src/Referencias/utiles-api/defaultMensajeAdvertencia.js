/**
 * 
 * Mensaje por defecto cuando se realiza una petición con éxito
 * @returns {object} object
 * @example
 * {
 *   tipo: 'advertencia',
 *   titulo: 'No se encontraron resultados',
 *   tiempo: true
 * }
 */
export default function defaultMensajeAdvertencia() {
  return (
    {
      tipo: 'advertencia',
      titulo: 'No se encontraron resultados',
      tiempo: true
    }
  )
}