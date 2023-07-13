import BitcoinPriceProvider from '@/context/bitcoin-price-context';
import { BitcoinPriceList } from '../components/BitcoinPriceList';
import { BitcoinPriceHeader } from '@/components/BitcoinPriceHeader';

const BitcoinPriceIndexPage = () => {
  return (
    <BitcoinPriceProvider>
      <div className=''>
        <BitcoinPriceHeader />
        <BitcoinPriceList />
      </div>
    </BitcoinPriceProvider>
  );
};

export default BitcoinPriceIndexPage;
