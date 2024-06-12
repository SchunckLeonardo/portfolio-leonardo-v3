import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getCurrentDate() {
  const date = new Date()
  return {
    PPP: format(date, 'PPP', {
      locale: ptBR,
    }),
    P: format(date, 'P', {
      locale: ptBR,
    }),
  }
}
