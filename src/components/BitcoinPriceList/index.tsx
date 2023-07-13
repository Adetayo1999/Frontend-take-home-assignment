import {
  BitcoinPriceRefreshIntervalType,
  BitcoinPriceType,
} from '@/types/bitcoin-price-index';
import { useCallback, useEffect, useState } from 'react';
import { services } from '@/services';
import { BitcoinPriceCard, BitcoinPriceCardLoading } from '../BitcoinPriceCard';
import { CustomDropdown } from '@/components/CustomDropDown';
import { CustomLoader } from '@/components/CustomLoader';
import { CustomToggle } from '@/components/CustomToggle';
import {
  getHiddenCurrencies,
  getRefreshInterval,
  persistHiddenCurrencies,
  persistRefreshInterval,
} from '@/helpers/storage';

const DEFAULT_REQUEST_INTERVAL = '5000';

const INTERVAL_OPTIONS = [
  { label: '5s', value: DEFAULT_REQUEST_INTERVAL },
  { label: '10s', value: '10000' },
  { label: '15s', value: '15000' },
];

export const BitcoinPriceList = () => {
  const [data, setData] = useState<BitcoinPriceType[]>([]);
  const [loadingBitcoinPrice, setLoadingBitcoinPrice] = useState(true);
  const [hiddenCurrencies, setHiddenCurrencies] = useState<string[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const getBitcoinPriceData = useCallback(async () => {
    try {
      setLoadingBitcoinPrice(true);
      const { data: requestData } = await services.getBitcoinPriceIndex();
      //  convert the response from an object format to an array format
      const formattedResponseData = Object.values(requestData?.bpi) || [];
      setData(formattedResponseData);
    } catch (error) {
    } finally {
      setLoadingBitcoinPrice(false);
    }
  }, []);

  useEffect(() => {
    getBitcoinPriceData();
  }, [getBitcoinPriceData]);

  useEffect(() => {
    const interval = setInterval(
      getBitcoinPriceData,
      Number(selectedInterval?.value || DEFAULT_REQUEST_INTERVAL)
    );

    return () => {
      clearInterval(interval);
    };
  }, [selectedInterval]);

  useEffect(() => {
    // We Remember User Preferences Here
    // This is because localstorage is part of the window object and is not accessible on the server
    setHiddenCurrencies(getHiddenCurrencies());
    setSelectedInterval(getRefreshInterval());
  }, []);

  const isCurrencyChecked = (code: string): boolean => {
    return hiddenCurrencies.includes(code);
  };

  const handleIntervalChange = (option: BitcoinPriceRefreshIntervalType) => {
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

  const renderLoadingState = () => {
    return (
      <div className='flex flex-wrap gap-6'>
        {new Array(6).fill('loading').map((_, idx) => (
          <BitcoinPriceCardLoading key={idx} />
        ))}
      </div>
    );
  };

  const renderRefreshState = () => {
    return (
      <div className='flex gap-x-2'>
        <CustomLoader className='h-[1rem] w-[1rem] border-blue-500' />
        <p className='animate-pulse text-xs'>Refreshing</p>
      </div>
    );
  };

  if (loadingBitcoinPrice && data.length === 0) {
    return renderLoadingState();
  }

  return (
    <div className=''>
      <div className='mb-8 flex items-center gap-x-10'>
        <div className=''>
          <p className='mb-1 text-sm font-medium'>Request Refresh Interval</p>
          <CustomDropdown
            options={INTERVAL_OPTIONS}
            selectedValue={selectedInterval}
            placeHolder='Select an interval'
            changeHandler={handleIntervalChange}
          />
        </div>
        <div className='flex items-center gap-x-8'>
          {data.map((item) => (
            <div className='flex  gap-x-2' key={item.code}>
              <p className='text-sm font-medium'>Toggle {item.code}</p>
              <CustomToggle
                checked={isCurrencyChecked(item.code)}
                onChange={() => handleCurrencyToggle(item.code)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mb-4 flex flex-wrap gap-6'>
        {data.map((item) => (
          <BitcoinPriceCard
            {...item}
            key={item.code}
            hiddenCurrencies={hiddenCurrencies}
          />
        ))}
      </div>
      <div className='h-[5rem]'>
        {loadingBitcoinPrice && data.length !== 0 && renderRefreshState()}
      </div>
    </div>
  );
};
