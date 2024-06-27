const locale = 'pt-BR'
const currency = 'BRL'

export function priceFormatter(amount: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
