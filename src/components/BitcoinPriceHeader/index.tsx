import {
  CURRENCIES,
  DEFAULT_REQUEST_INTERVAL,
  useBitcoinPrice,
} from '@/context/bitcoin-price-context';
import { CustomDropdown } from '../CustomDropDown';
import { CustomToggle } from '../CustomToggle';

const INTERVAL_OPTIONS = [
  { label: '5s', value: DEFAULT_REQUEST_INTERVAL },
  { label: '10s', value: '10000' },
  { label: '15s', value: '15000' },
];

export const BitcoinPriceHeader = () => {
  const {
    handleCurrencyToggle,
    handleIntervalChange,
    selectedInterval,
    hiddenCurrencies,
  } = useBitcoinPrice();

  const isCurrencyChecked = (code: string): boolean => {
    return hiddenCurrencies.includes(code);
  };

  return (
    <header className='mb-6 bg-white px-10 py-6'>
      <div className='mb-6'>
        <h1 className=' text-center text-xl font-semibold text-gray-900 md:text-left '>
          Bitcoin Price Index Page
        </h1>
      </div>
      <div className='flex flex-col-reverse  items-center justify-between gap-y-6 md:flex-row md:gap-x-10 md:gap-y-0 '>
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
          {CURRENCIES.map((currency) => (
            <div className='flex  gap-x-2' key={currency}>
              <p className='text-sm font-medium'>
                <span className='hidden md:inline'>Toggle</span> {currency}
              </p>
              <CustomToggle
                checked={isCurrencyChecked(currency)}
                onChange={() => handleCurrencyToggle(currency)}
              />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
