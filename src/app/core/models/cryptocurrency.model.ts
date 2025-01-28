export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  supply: number;
  priceHistory: number[];
}

export interface ApiCryptocurrency {
  id: string;
  name: string;
  symbol: string;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      market_cap: number;
    };
  };
}

export interface GroupedCurrency {
  type: string;
  items: {
    id: string;
    symbol: string;
    name: string
  }
}
