import { useCallback } from 'react';
import { services } from '@/services';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTCard, NFTCardLoading } from '../NFTCard';
import { NFTItemType } from '@/types/nft';

export const NFTList = () => {
  const { address, isConnected } = useAccount();
  const [myNFTs, setMyNFTS] = useState<NFTItemType[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);
  const [connected, setConnected] = useState(false);

  const getAllMyNFTs = useCallback(async () => {
    try {
      setLoadingNFTs(true);
      const { data } = await services.getAllMyNFTs(address!);
      setMyNFTS(data?.ownedNfts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingNFTs(false);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      getAllMyNFTs();
    }
  }, [address]);

  // This hook is to prevent next.js hydration error
  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  const renderLoadingState = () => {
    return (
      <div className='flex flex-col flex-wrap gap-y-6  md:flex-row md:gap-4'>
        {new Array(6).fill('loading').map((_, idx) => (
          <NFTCardLoading key={idx} />
        ))}
      </div>
    );
  };

  const showConnectMessage = () => {
    return (
      <div className='flex h-[20rem] items-center justify-center rounded bg-white p-6 shadow'>
        <p className='text-center text-base font-medium text-gray-500  md:w-[60%] md:text-xl'>
          Connect Your Wallet And Select The Testnet Sepolia With Chain ID{' '}
          <b className='font-extrabold'>11155111 </b> To View Your NFTs 🚀
        </p>
      </div>
    );
  };

  const renderNFTs = () => {
    return (
      <div className='flex flex-col flex-wrap gap-y-6  md:flex-row md:gap-4'>
        {myNFTs.map((item) => (
          <NFTCard
            {...item}
            key={`${item.contract.address}-${item.id.tokenId}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='p-10'>
      {loadingNFTs && renderLoadingState()}
      {!connected && showConnectMessage()}
      {!loadingNFTs && connected && renderNFTs()}
    </div>
  );
};
