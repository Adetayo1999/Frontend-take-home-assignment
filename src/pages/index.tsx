import Head from 'next/head';
import BitcoinPriceProvider from '@/context/bitcoin-price-context';
import { BitcoinPriceList } from '../components/BitcoinPriceList';
import { BitcoinPriceHeader } from '@/components/BitcoinPriceHeader';

const BitcoinPriceIndexPage = () => {
  return (
    <>
      <Head>
        <title>Bitcoin Price Index Page</title>
        <meta
          name='description'
          content='show the price for BTC in USD, EUR and GBP'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <BitcoinPriceProvider>
        <div className=''>
          <BitcoinPriceHeader />
          <BitcoinPriceList />
        </div>
      </BitcoinPriceProvider>
    </>
  );
};

export default BitcoinPriceIndexPage;
