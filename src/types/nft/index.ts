export type NFTItemType = {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
  };
  title: string;
  description: string;
  tokenUri: {
    gateway: string;
    raw: string;
  };
  contractMetadata: {
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
  };
};
