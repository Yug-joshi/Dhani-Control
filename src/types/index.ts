export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  pe: number;
  eps: number;
  dividend: number;
  sector: string;
  exchange: 'NSE' | 'BSE';
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface SectorPerformance {
  name: string;
  change: number;
  marketCap: number;
  stocks: Stock[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  relatedSymbols?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ChartDataPoint {
  date: string;
  price: number;
  volume?: number;
}

export interface StockDetailData extends Stock {
  open: number;
  close: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  avgVolume: number;
  description: string;
  chartData: ChartDataPoint[];
  news: NewsItem[];
}

export interface WatchlistItem {
  id: string;
  userId: string;
  symbol: string;
  addedAt: string;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}