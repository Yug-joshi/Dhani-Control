import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Stock, 
  IndexData, 
  StockQuote, 
  SectorPerformance,
  NewsItem
} from '../types';
import { mockStocks, mockIndices, mockTickerData, mockTopGainers, mockTopLosers, mockMostActive, mockSectorPerformance, mockNewsItems } from '../data/mockData';

interface StockContextType {
  stocks: Stock[];
  indices: IndexData[];
  tickerData: StockQuote[];
  topGainers: Stock[];
  topLosers: Stock[];
  mostActive: Stock[];
  sectorPerformance: SectorPerformance[];
  newsItems: NewsItem[];
  loading: boolean;
  error: string | null;
  getStockBySymbol: (symbol: string) => Promise<Stock | undefined>;
  searchStocksByQuery: (query: string) => Promise<Stock[]>;
  refreshData: () => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [indices, setIndices] = useState<IndexData[]>(mockIndices);
  const [tickerData, setTickerData] = useState<StockQuote[]>(mockTickerData);
  const [topGainers, setTopGainers] = useState<Stock[]>(mockTopGainers);
  const [topLosers, setTopLosers] = useState<Stock[]>(mockTopLosers);
  const [mostActive, setMostActive] = useState<Stock[]>(mockMostActive);
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance[]>(mockSectorPerformance);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(mockNewsItems);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('Connected to stock data server');
      setError(null);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.stocks) {
          setStocks(data.stocks);
          
          // Update derived data
          const sortedStocks = [...data.stocks];
          setTopGainers(sortedStocks.sort((a, b) => b.changePercent - a.changePercent).slice(0, 5));
          setTopLosers(sortedStocks.sort((a, b) => a.changePercent - b.changePercent).slice(0, 5));
          setMostActive(sortedStocks.sort((a, b) => b.volume - a.volume).slice(0, 5));
          setTickerData(data.stocks.map(stock => ({
            symbol: stock.symbol,
            price: stock.price,
            change: stock.change,
            changePercent: stock.changePercent
          })));
        }
        
        if (data.indices) {
          setIndices(data.indices);
        }
        
        if (data.news) {
          setNewsItems(data.news);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error parsing WebSocket data:', err);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Failed to connect to stock data server. Using mock data instead.');
    };

    ws.current.onclose = () => {
      console.log('Disconnected from stock data server');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Get detailed stock data by symbol
  const getStockBySymbol = async (symbol: string): Promise<Stock | undefined> => {
    return stocks.find(stock => stock.symbol === symbol);
  };

  // Search stocks by query
  const searchStocksByQuery = async (query: string): Promise<Stock[]> => {
    const lowerQuery = query.toLowerCase();
    return stocks.filter(
      stock => 
        stock.symbol.toLowerCase().includes(lowerQuery) || 
        stock.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 7);
  };

  // Manually refresh data
  const refreshData = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'refresh' }));
    }
  };

  const value = {
    stocks,
    indices,
    tickerData,
    topGainers,
    topLosers,
    mostActive,
    sectorPerformance,
    newsItems,
    loading,
    error,
    getStockBySymbol,
    searchStocksByQuery,
    refreshData
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

export const useStocks = () => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStocks must be used within a StockProvider');
  }
  return context;
};