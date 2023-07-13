export const currencyConverter = (
  number: number,
  currency: string,
  minimumFractionDigits = 2
) => {
  const CURRENCY_CONVERTER = new Intl.NumberFormat(undefined, {
    currency,
    style: 'currency',
    minimumFractionDigits,
  });

  return CURRENCY_CONVERTER.format(number);
};
