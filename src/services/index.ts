import { BitcoinPriceAPIResponseType } from '@/types/bitcoin-price-index';
import axios, { AxiosResponse } from 'axios';

export const services = {
  async getBitcoinPriceIndex(): Promise<
    AxiosResponse<BitcoinPriceAPIResponseType, any>
  > {
    return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
  },

  async getAllMyNFTs(address: string) {
    return axios.get(
      `https://eth-sepolia.g.alchemy.com/v2/eTShAVkZrRUksNDcyjcb_qBoVkMdwGpi/getNFTs/?owner=${address}`
    );
  },
};