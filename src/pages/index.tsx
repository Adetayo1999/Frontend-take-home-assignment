import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { BitcoinPriceList } from '../components/BitcoinPriceList';

const BitcoinPriceIndexPage = () => {
  return (
    <div className='p-10'>
      <div className='mb-6'>
        <h1 className=' text-center text-xl font-semibold text-gray-900 md:text-left md:text-3xl'>
          Bitcoin Price Index Page
        </h1>
      </div>
      <div className='mb-6'>
        <BitcoinPriceList />
      </div>
      <div className=''>
        <Link
          href='/nft-list'
          className='inline-flex items-center  justify-center gap-x-3 rounded bg-black px-6 py-3 text-sm text-gray-100'
        >
          <span className='font-semibold'>Go To NFT Page </span>
          <span>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BitcoinPriceIndexPage;
