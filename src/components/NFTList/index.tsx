import { useCallback } from 'react';
import { services } from '@/services';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTCard, NFTCardLoading } from '../NFTCard';
import { NFTItemType } from '@/types/nft';

export const NFTList = () => {
  const { address } = useAccount();
  const [myNFTs, setMyNFTS] = useState<NFTItemType[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

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
  }, []);

  useEffect(() => {
    if (address) {
      getAllMyNFTs();
    }
  }, [address]);

  const renderLoadingState = () => {
    return (
      <div className='flex flex-col flex-wrap gap-y-6 p-10 md:flex-row md:gap-4'>
        {new Array(6).fill('loading').map((_, idx) => (
          <NFTCardLoading key={idx} />
        ))}
      </div>
    );
  };

  if (loadingNFTs) {
    return renderLoadingState();
  }

  return (
    <div className='flex flex-col flex-wrap gap-y-6 p-10 md:flex-row md:gap-4'>
      {myNFTs.map((item) => (
        <NFTCard
          {...item}
          key={`${item.contract.address}-${item.id.tokenId}`}
        />
      ))}
    </div>
  );
};
