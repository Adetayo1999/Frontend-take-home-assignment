import { ConnectButton } from '@rainbow-me/rainbowkit';

export const NFHHeader = () => {
  return (
    <header className='sticky top-0 z-50 mb-10 flex w-full items-center justify-between rounded bg-white px-10 py-6 shadow-sm'>
      <div className=''>
        <h1 className='text-xl font-bold text-gray-700'>NFT Page</h1>
      </div>
      <div className=''>
        <ConnectButton />
      </div>
    </header>
  );
};
