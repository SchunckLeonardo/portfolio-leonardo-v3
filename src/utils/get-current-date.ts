import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getCurrentDate() {
  const date = new Date()
  return format(date, 'PPP', {
    locale: ptBR,
  })
}
