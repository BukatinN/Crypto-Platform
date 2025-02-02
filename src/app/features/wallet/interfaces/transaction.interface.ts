export interface Transaction {
  id: number;
  tokenId: number;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  date: string;
}
