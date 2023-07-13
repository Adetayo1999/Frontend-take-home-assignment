import { NFTItemType } from '@/types/nft';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const NFTCard = ({
  contract,
  contractMetadata,
  description,
  id,
  title,
  tokenUri,
}: NFTItemType) => {
  const [imageUrl, setImageUrl] = useState('');
  const [backupDescription, setBackupDescription] = useState('');

  useEffect(() => {
    const getNFTImage = async () => {
      try {
        const { data } = await axios.get(tokenUri.gateway);

        if (typeof data === 'object') {
          setImageUrl(data?.image || '');
          setBackupDescription(data?.description || '');
        }
      } catch (error) {}
    };

    if (tokenUri.gateway) {
      getNFTImage();
    }
  }, [tokenUri.gateway]);

  return (
    <div className='flex h-[25rem] flex-shrink-0 flex-col gap-y-3 overflow-hidden rounded bg-white shadow md:h-[20rem] md:w-[18rem]'>
      <div className='h-[57%] w-full overflow-hidden bg-gray-200 md:h-[50%]'>
        <img
          src={imageUrl || '/no-img.png'}
          alt={`${contractMetadata?.name} #${Number(id.tokenId)}`}
          className='h-full w-full object-contain  md:object-cover  '
        />
      </div>
      <div className='flex flex-col gap-y-2  p-3'>
        <div className='flex gap-x-2'>
          <p className='text-sm text-gray-500'>Name: </p>
          <h4 className='w-full truncate text-sm font-bold text-gray-800'>
            {title || `${contractMetadata?.name} #${Number(id.tokenId)}`}
          </h4>
        </div>
        <div className='flex flex-col gap-y-1 '>
          <p className='text-sm text-gray-500'>Contract Address: </p>
          <h4 className='w-full truncate text-sm font-bold text-gray-800'>
            {contract.address}
          </h4>
        </div>
        {(description || backupDescription) && (
          <div className='flex flex-col gap-y-1'>
            <p className='text-sm text-gray-500'>Description: </p>
            <p className='w-full truncate text-xs text-gray-500'>
              {description || backupDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ANIMATE_CLASSNAME = 'animate-pulse  bg-gray-200';

export const NFTCardLoading = () => {
  return (
    <div className='flex h-[25rem] flex-shrink-0 flex-col gap-y-3 overflow-hidden rounded bg-white shadow md:h-[20rem] md:w-[18rem]'>
      <div
        className={`h-[57%] w-full animate-pulse  overflow-hidden md:h-[50%] ${ANIMATE_CLASSNAME}`}
      />
      <div className='flex flex-col gap-y-4  p-3'>
        <div className={`${ANIMATE_CLASSNAME} w-[60%] py-2 `} />
        <div className='flex flex-col gap-y-1'>
          <div className={`${ANIMATE_CLASSNAME} w-[20%] py-1 `} />
          <div className={`${ANIMATE_CLASSNAME} w-[80%] py-2 `} />
        </div>
        <div className='flex flex-col gap-y-1'>
          <div className={`${ANIMATE_CLASSNAME} w-[20%] py-1 `} />
          <div className={`${ANIMATE_CLASSNAME} w-full py-2 `} />
        </div>
      </div>
    </div>
  );
};
