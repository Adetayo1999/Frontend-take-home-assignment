import { BitcoinPriceType } from '@/types/bitcoin-price-index';
import { useCallback, useEffect, useState, useRef } from 'react';
import { services } from '@/services';
import { BitcoinPriceCard, BitcoinPriceCardLoading } from '../BitcoinPriceCard';
import { CustomLoader } from '@/components/CustomLoader';
import { useBitcoinPrice } from '@/context/bitcoin-price-context';

const DEFAULT_REQUEST_INTERVAL = '5000';

export const BitcoinPriceList = () => {
  const intervalId = useRef<NodeJS.Timer | null>(null);
  const [data, setData] = useState<BitcoinPriceType[]>([]);
  const [loadingBitcoinPrice, setLoadingBitcoinPrice] = useState(true);
  const { hiddenCurrencies, selectedInterval } = useBitcoinPrice();

  const getBitcoinPriceData = useCallback(async () => {
    try {
      setLoadingBitcoinPrice(true);
      const { data: requestData } = await services.getBitcoinPriceIndex();
      //  convert the response from an object format to an array format
      const formattedResponseData = Object.values(requestData?.bpi) || [];
      setData(formattedResponseData);
    } catch (error) {
      if (intervalId.current) clearInterval(intervalId.current);
    } finally {
      setLoadingBitcoinPrice(false);
    }
  }, []);

  useEffect(() => {
    getBitcoinPriceData();
  }, [getBitcoinPriceData]);

  useEffect(() => {
    intervalId.current = setInterval(
      getBitcoinPriceData,
      Number(selectedInterval?.value || DEFAULT_REQUEST_INTERVAL)
    );

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [selectedInterval, getBitcoinPriceData]);

  const renderLoadingState = () => {
    return (
      <div className='mb-8 flex flex-col flex-wrap items-center gap-y-6 p-10 md:flex-row md:gap-x-10 md:gap-y-3'>
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
    <div className='p-10'>
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
