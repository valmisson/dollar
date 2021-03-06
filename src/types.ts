export interface ICurrency {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: string;
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
}


export interface IDataCurrency {
  name: string;
  cash: number;
  pctChange: number;
  dollar: number;
  result: string;
  state: string;
}
