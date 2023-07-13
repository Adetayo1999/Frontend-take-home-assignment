import { SiBitcoinsv } from 'react-icons/si';
import { BitcoinPriceType } from '@/types/bitcoin-price-index';
import { currencyConverter } from '@/helpers/currency-converter';

type BitcoinPriceCardProps = BitcoinPriceType & {
  hiddenCurrencies: string[];
};

export const BitcoinPriceCard = ({
  code,
  description,
  rate_float,
  hiddenCurrencies,
}: BitcoinPriceCardProps) => {
  const isHidden = hiddenCurrencies.includes(code);
  return (
    <div
      className={`${
        isHidden ? 'hidden' : 'flex'
      } h-[8rem] w-[18.75rem] flex-shrink-0 cursor-pointer items-center gap-x-4 rounded-md bg-white px-5 py-2 shadow transition duration-500 hover:-translate-y-2 `}
    >
      <div className=''>
        <SiBitcoinsv className='text-6xl text-[#F7931A]' />
      </div>
      <div className=''>
        <h4 className='mb-1 font-semibold text-gray-800'>
          {currencyConverter(rate_float, code)}
        </h4>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
    </div>
  );
};

export const BitcoinPriceCardLoading = () => {
  return (
    <div className='flex h-[8rem] w-[18.75rem] flex-shrink-0 cursor-pointer items-center gap-x-4 rounded-md bg-white px-5 py-2 shadow'>
      <div className='h-[3.75rem] w-[3.75rem] animate-pulse rounded-full bg-gray-200' />
      <div className='w-[60%]'>
        <div className='mb-2 h-3  w-[50%] animate-pulse bg-gray-200' />
        <div className='h-3  w-[80%] animate-pulse bg-gray-200' />
      </div>
    </div>
  );
};
