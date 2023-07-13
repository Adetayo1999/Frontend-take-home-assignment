export type BitcoinPriceType = {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
};

export type BitcoinPriceAPIResponseType = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    [key: string]: BitcoinPriceType;
  };
};

export type BitcoinPriceRefreshIntervalType = {
  label: string;
  value: string;
};
