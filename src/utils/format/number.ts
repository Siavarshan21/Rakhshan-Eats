const DEFAULT_LOCALE = 'en-US';

export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

type WeightUnit = 'kg' | 'g' | 'lb' | 'oz';

export function formatWeight(value: number, unit: WeightUnit = 'kg'): string {
  const unitLabels: Record<WeightUnit, string> = {
    kg: 'kg',
    g: 'g',
    lb: 'lb',
    oz: 'oz',
  };

  const formattedValue =
    value % 1 === 0 ? value.toString() : value.toFixed(2).replace(/0+$/, '');

  return `${formattedValue} ${unitLabels[unit]}`;
}

export function formatCompactNumber(value: number, locale: string = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}
