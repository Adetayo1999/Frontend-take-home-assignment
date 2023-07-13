import {
  getHiddenCurrencies,
  getRefreshInterval,
  persistHiddenCurrencies,
  persistRefreshInterval,
} from '@/helpers/storage';
import { createContext, useState, useContext, useEffect } from 'react';

export type IntervalType = {
  label: string;
  value: string;
};

type ContextType = {
  selectedInterval: IntervalType | null;
  hiddenCurrencies: string[];
  handleIntervalChange(interval: IntervalType): void;
  handleCurrencyToggle(currency: string): void;
};

type ContextProviderProps = {
  children: React.ReactNode;
};

const BitcoinPriceContext = createContext({} as ContextType);

const BitcoinPriceProvider = ({ children }: ContextProviderProps) => {
  const [hiddenCurrencies, setHiddenCurrencies] = useState<string[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const handleIntervalChange = (option: IntervalType) => {
    setSelectedInterval(option);
    persistRefreshInterval(option);
  };

  const handleCurrencyToggle = (code: string) => {
    setHiddenCurrencies((prev) => {
      let updatedCurrencies: string[];

      if (prev.includes(code)) {
        updatedCurrencies = prev.filter((item) => item !== code);
      } else updatedCurrencies = [...prev, code];

      persistHiddenCurrencies(updatedCurrencies);
      return updatedCurrencies;
    });
  };

  useEffect(() => {
    // We Remember User Preferences Here
    // This is because localstorage is part of the window object and is not accessible on the server
    setHiddenCurrencies(getHiddenCurrencies());
    setSelectedInterval(getRefreshInterval());
  }, []);

  return (
    <BitcoinPriceContext.Provider
      value={{
        handleCurrencyToggle,
        handleIntervalChange,
        hiddenCurrencies,
        selectedInterval,
      }}
    >
      {children}
    </BitcoinPriceContext.Provider>
  );
};

export const useBitcoinPrice = () => useContext(BitcoinPriceContext);

export default BitcoinPriceProvider;

export const DEFAULT_REQUEST_INTERVAL = '5000';

export const CURRENCIES = ['USD', 'GBP', 'EUR'];
