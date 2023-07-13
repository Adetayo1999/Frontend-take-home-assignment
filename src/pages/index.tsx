import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { BitcoinPriceList } from '../components/BitcoinPriceList';
import { Container } from '@/components/Container';

const BitcoinPriceIndexPage = () => {
  return (
    <Container>
      <div className=''>
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold text-gray-900'>
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
    </Container>
  );
};

export default BitcoinPriceIndexPage;
