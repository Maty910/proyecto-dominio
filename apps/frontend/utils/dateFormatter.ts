/**
 * Formatea una fecha en formato DD/MM/YYYY
 * @param date - Fecha en formato string ISO o objeto Date
 * @returns Fecha formateada como DD/MM/YYYY
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  
  return `${day}/${month}/${year}`
}

/**
 * Formatea un rango de fechas
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de fin
 * @returns Rango formateado como "DD/MM/YYYY - DD/MM/YYYY"
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}