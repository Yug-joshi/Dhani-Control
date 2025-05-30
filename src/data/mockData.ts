import { 
  Stock, 
  StockQuote, 
  IndexData, 
  SectorPerformance, 
  NewsItem,
  StockDetailData
} from '../types';
import { getRandomValue, getRandomInt, getStockChartData } from '../lib/utils';

// Helper to create random stock data
const createMockStock = (
  symbol: string, 
  name: string, 
  sector: string, 
  exchange: 'NSE' | 'BSE' = 'NSE'
): Stock => {
  const price = getRandomValue(100, 5000);
  const changePercent = getRandomValue(-5, 5);
  const change = price * (changePercent / 100);
  const volume = getRandomInt(100000, 10000000);
  const marketCap = price * getRandomInt(10000000, 1000000000);
  
  return {
    symbol,
    name,
    price,
    change,
    changePercent,
    volume,
    marketCap,
    high52Week: price * (1 + getRandomValue(5, 30) / 100),
    low52Week: price * (1 - getRandomValue(5, 30) / 100),
    pe: getRandomValue(5, 50),
    eps: getRandomValue(1, 200),
    dividend: getRandomValue(0, 5),
    sector,
    exchange
  };
};

// Mock data for major indices
export const mockIndices: IndexData[] = [
  {
    name: 'NIFTY 50',
    value: 22458.95,
    change: 87.70,
    changePercent: 0.39,
  },
  {
    name: 'SENSEX',
    value: 73882.91,
    change: 335.39,
    changePercent: 0.46,
  },
  {
    name: 'NIFTY BANK',
    value: 48239.40,
    change: 144.05,
    changePercent: 0.30,
  },
  {
    name: 'NIFTY IT',
    value: 37426.35,
    change: -132.60,
    changePercent: -0.35,
  },
  {
    name: 'NIFTY AUTO',
    value: 21753.90,
    change: 92.15,
    changePercent: 0.43,
  },
  {
    name: 'NIFTY PHARMA',
    value: 18621.75,
    change: 78.35,
    changePercent: 0.42,
  }
];

// Mock stocks data
export const mockStocks: Stock[] = [
  createMockStock('RELIANCE', 'Reliance Industries Ltd.', 'Oil & Gas'),
  createMockStock('TCS', 'Tata Consultancy Services Ltd.', 'IT'),
  createMockStock('HDFCBANK', 'HDFC Bank Ltd.', 'Banking'),
  createMockStock('INFY', 'Infosys Ltd.', 'IT'),
  createMockStock('ICICIBANK', 'ICICI Bank Ltd.', 'Banking'),
  createMockStock('HINDUNILVR', 'Hindustan Unilever Ltd.', 'FMCG'),
  createMockStock('SBIN', 'State Bank of India', 'Banking'),
  createMockStock('BAJFINANCE', 'Bajaj Finance Ltd.', 'Financial Services'),
  createMockStock('BHARTIARTL', 'Bharti Airtel Ltd.', 'Telecom'),
  createMockStock('KOTAKBANK', 'Kotak Mahindra Bank Ltd.', 'Banking'),
  createMockStock('ASIANPAINT', 'Asian Paints Ltd.', 'Paints'),
  createMockStock('AXISBANK', 'Axis Bank Ltd.', 'Banking'),
  createMockStock('LT', 'Larsen & Toubro Ltd.', 'Construction'),
  createMockStock('MARUTI', 'Maruti Suzuki India Ltd.', 'Automobile'),
  createMockStock('WIPRO', 'Wipro Ltd.', 'IT'),
  createMockStock('HCLTECH', 'HCL Technologies Ltd.', 'IT'),
  createMockStock('SUNPHARMA', 'Sun Pharmaceutical Industries Ltd.', 'Pharma'),
  createMockStock('TATAMOTORS', 'Tata Motors Ltd.', 'Automobile'),
  createMockStock('ULTRACEMCO', 'UltraTech Cement Ltd.', 'Cement'),
  createMockStock('TITAN', 'Titan Company Ltd.', 'Consumer Durables'),
  createMockStock('BAJAJFINSV', 'Bajaj Finserv Ltd.', 'Financial Services'),
  createMockStock('NESTLEIND', 'Nestle India Ltd.', 'FMCG'),
  createMockStock('TECHM', 'Tech Mahindra Ltd.', 'IT'),
  createMockStock('POWERGRID', 'Power Grid Corporation of India Ltd.', 'Power'),
  createMockStock('TATASTEEL', 'Tata Steel Ltd.', 'Metals'),
  createMockStock('HINDALCO', 'Hindalco Industries Ltd.', 'Metals'),
  createMockStock('GRASIM', 'Grasim Industries Ltd.', 'Cement'),
  createMockStock('DRREDDY', 'Dr. Reddy\'s Laboratories Ltd.', 'Pharma'),
  createMockStock('ADANIPORTS', 'Adani Ports and Special Economic Zone Ltd.', 'Ports'),
  createMockStock('COALINDIA', 'Coal India Ltd.', 'Mining')
];

// Filter stocks into gainers and losers
export const mockTopGainers = [...mockStocks]
  .filter(stock => stock.changePercent > 0)
  .sort((a, b) => b.changePercent - a.changePercent)
  .slice(0, 5);

export const mockTopLosers = [...mockStocks]
  .filter(stock => stock.changePercent < 0)
  .sort((a, b) => a.changePercent - b.changePercent)
  .slice(0, 5);

// Most active stocks by volume
export const mockMostActive = [...mockStocks]
  .sort((a, b) => b.volume - a.volume)
  .slice(0, 5);

// Sector performance
export const mockSectorPerformance: SectorPerformance[] = [
  {
    name: 'Banking',
    change: 0.75,
    marketCap: 2500000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Banking'),
  },
  {
    name: 'IT',
    change: -0.35,
    marketCap: 1800000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'IT'),
  },
  {
    name: 'Oil & Gas',
    change: 1.2,
    marketCap: 1500000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Oil & Gas'),
  },
  {
    name: 'Pharma',
    change: 0.42,
    marketCap: 900000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Pharma'),
  },
  {
    name: 'Automobile',
    change: 0.85,
    marketCap: 850000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Automobile'),
  },
  {
    name: 'FMCG',
    change: 0.25,
    marketCap: 950000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'FMCG'),
  },
  {
    name: 'Metals',
    change: -0.68,
    marketCap: 700000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Metals'),
  },
  {
    name: 'Financial Services',
    change: 0.95,
    marketCap: 1200000000000,
    stocks: mockStocks.filter(stock => stock.sector === 'Financial Services'),
  }
];

// Mock news items
export const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Sensex, Nifty scale fresh all-time highs as RBI keeps repo rate unchanged',
    summary: 'The BSE Sensex jumped 335 points to close at a record high of 73,882.91 on Friday, while the NSE Nifty gained 87.70 points to 22,458.95, marking a fresh peak for both indices.',
    url: '#',
    source: 'Economic Times',
    publishedAt: '2023-06-09T09:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: ['NIFTY', 'SENSEX'],
  },
  {
    id: '2',
    title: 'Reliance Industries shares surge 3% on reports of retail unit IPO plans',
    summary: 'Shares of Reliance Industries Ltd rose nearly 3% following reports that the conglomerate is planning to list its retail arm, Reliance Retail, in the domestic market by the end of this year.',
    url: '#',
    source: 'Mint',
    publishedAt: '2023-06-09T07:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: ['RELIANCE'],
  },
  {
    id: '3',
    title: 'TCS wins $200 million deal from leading US healthcare provider',
    summary: 'Tata Consultancy Services (TCS) has secured a $200 million multi-year contract from a leading US healthcare provider for digital transformation services.',
    url: '#',
    source: 'Business Standard',
    publishedAt: '2023-06-08T14:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: ['TCS'],
  },
  {
    id: '4',
    title: 'HDFC Bank completes merger with parent HDFC Ltd',
    summary: 'HDFC Bank has announced the completion of its merger with its parent company HDFC Ltd, creating a banking behemoth with a combined balance sheet of over Rs 30 lakh crore.',
    url: '#',
    source: 'Financial Express',
    publishedAt: '2023-06-08T11:10:00Z',
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: ['HDFCBANK'],
  },
  {
    id: '5',
    title: 'Indian pharma companies see improved growth prospects as global demand recovers',
    summary: 'Indian pharmaceutical companies are witnessing improved growth prospects with the recovery in global demand and stabilization of pricing pressures in the US market.',
    url: '#',
    source: 'CNBC-TV18',
    publishedAt: '2023-06-07T16:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: ['SUNPHARMA', 'DRREDDY'],
  },
  {
    id: '6',
    title: 'Government announces new policy to boost semiconductor manufacturing in India',
    summary: 'The Indian government has announced a new policy to boost semiconductor manufacturing in the country, offering incentives worth Rs 76,000 crore to attract global chipmakers.',
    url: '#',
    source: 'India Today',
    publishedAt: '2023-06-07T09:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    relatedSymbols: [],
  }
];

// Generate stock ticker data for the header
export const mockTickerData: StockQuote[] = mockStocks.map(stock => ({
  symbol: stock.symbol,
  price: stock.price,
  change: stock.change,
  changePercent: stock.changePercent
}));

// Generate detailed data for individual stock pages
export const getStockDetail = (symbol: string): StockDetailData | undefined => {
  const stock = mockStocks.find(s => s.symbol === symbol);
  if (!stock) return undefined;
  
  const price = stock.price;
  const previousClose = price * (1 - getRandomValue(-2, 2) / 100);
  const open = previousClose * (1 + getRandomValue(-1, 1) / 100);
  const dayHigh = price * (1 + getRandomValue(0.5, 2) / 100);
  const dayLow = price * (1 - getRandomValue(0.5, 2) / 100);
  
  return {
    ...stock,
    open,
    close: price,
    previousClose,
    dayHigh,
    dayLow,
    avgVolume: stock.volume * 0.9,
    description: `${stock.name} is a leading company in the ${stock.sector} sector, listed on the ${stock.exchange}. The company has a market capitalization of approximately ${(stock.marketCap / 10000000).toFixed(2)} crore rupees and is known for its strong performance and market leadership.`,
    chartData: getStockChartData(90),
    news: mockNewsItems.filter(news => 
      news.relatedSymbols?.includes(symbol) || 
      Math.random() > 0.7 // Add some random news items
    ),
  };
};

// Search functionality mock data
export const searchStocks = (query: string): Stock[] => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return mockStocks.filter(
    stock => 
      stock.symbol.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
  ).slice(0, 7);
};