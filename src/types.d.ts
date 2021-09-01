export interface Currencies {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: string; // eslint-disable-line camelcase
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
}

export interface DataCurrency {
  name: string;
  cash: number;
  pctChange: number;
  dollar: number;
  result: string;
  state: string;
  stateImg: string;
}
