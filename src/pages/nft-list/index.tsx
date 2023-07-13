import Head from 'next/head';
import { NFHHeader } from '@/components/NFTHeader';
import { NFTList } from '@/components/NFTList';

const NFTListPage = () => {
  return (
    <>
      <Head>
        <title>My NFTS</title>
        <meta name='description' content='List of connected wallet nfts' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <NFHHeader />
        <NFTList />
      </div>
    </>
  );
};

export default NFTListPage;
