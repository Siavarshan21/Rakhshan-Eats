const DEFAULT_LOCALE = 'en-US';
const DEFAULT_CURRENCY = 'USD';

export function formatCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDiscount(originalPrice: number, salePrice: number): string {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return `${Math.round(discount)}%`;
}
