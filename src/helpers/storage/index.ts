import { BitcoinPriceRefreshIntervalType } from '@/types/bitcoin-price-index';

const STORAGE_KEYS = {
  HIDDEN_CURRENCIES_KEY: 'btc.price.hidden.currencies',
  REFRESH_INTERVAL_KEY: 'btc.price.refresh.interval',
};

const getItem = (key: string) => {
  return localStorage.getItem(key) || null;
};

const setItem = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const persistHiddenCurrencies = (currencies: string[]) => {
  setItem(STORAGE_KEYS.HIDDEN_CURRENCIES_KEY, JSON.stringify(currencies));
};

export const getHiddenCurrencies = (): string[] => {
  const hiddenCurrencies = getItem(STORAGE_KEYS.HIDDEN_CURRENCIES_KEY) || '[]';
  return JSON.parse(hiddenCurrencies);
};

export const persistRefreshInterval = (
  option: BitcoinPriceRefreshIntervalType
) => {
  setItem(STORAGE_KEYS.REFRESH_INTERVAL_KEY, JSON.stringify(option));
};

export const getRefreshInterval =
  (): BitcoinPriceRefreshIntervalType | null => {
    const refreshInterval = getItem(STORAGE_KEYS.REFRESH_INTERVAL_KEY);

    if (typeof refreshInterval === 'string')
      return JSON.parse(refreshInterval) as BitcoinPriceRefreshIntervalType;

    return null;
  };
