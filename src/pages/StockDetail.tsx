import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  DollarSign, 
  Star,
  Share2,
  Clock
} from 'lucide-react';
import { useStocks } from '../context/StockContext';
import { useAuth } from '../context/AuthContext';
import StockChart from '../components/stock/StockChart';
import { StockDetailData } from '../types';
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage, 
  getColorByChange,
  formatLargeNumber,
  getTimeAgo,
  cn
} from '../lib/utils';

const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { getStockBySymbol, loading } = useStocks();
  const { isAuthenticated, isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuth();
  const [stockData, setStockData] = useState<StockDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return;
      
      try {
        const data = await getStockBySymbol(symbol);
        if (data) {
          setStockData(data as StockDetailData);
        } else {
          setError(`Stock with symbol ${symbol} not found.`);
        }
      } catch (err) {
        setError(`Failed to fetch data for ${symbol}. Please try again later.`);
        console.error(err);
      }
    };
    
    fetchStockData();
  }, [symbol, getStockBySymbol]);
  
  const handleWatchlistToggle = async () => {
    if (!symbol) return;
    
    if (isInWatchlist(symbol)) {
      await removeFromWatchlist(symbol);
    } else {
      await addToWatchlist(symbol);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-80"></div>
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-80"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-danger-50 dark:bg-danger-900 border-l-4 border-danger-500 p-4 rounded-md mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <TrendingDown className="h-5 w-5 text-danger-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-danger-800 dark:text-danger-200">Error</h3>
              <div className="mt-2 text-sm text-danger-700 dark:text-danger-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Link to="/" className="btn-outline">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  if (!stockData) {
    return null;
  }
  
  const isWatchlisted = isAuthenticated && isInWatchlist(stockData.symbol);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </Link>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">{stockData.symbol}</h1>
            <span className="ml-3 px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
              {stockData.exchange}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{stockData.name}</p>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {isAuthenticated && (
            <button 
              onClick={handleWatchlistToggle}
              className={cn(
                "btn",
                isWatchlisted 
                  ? "bg-warning-100 text-warning-800 hover:bg-warning-200 dark:bg-warning-900 dark:text-warning-100 dark:hover:bg-warning-800" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              )}
            >
              <Star 
                size={16} 
                className="mr-2" 
                fill={isWatchlisted ? "currentColor" : "none"} 
              />
              {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          )}
          
          <button className="btn-outline">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center mb-6">
        <div className="mr-6 mb-2">
          <div className="text-3xl font-bold">{formatCurrency(stockData.price)}</div>
          <div className={cn("flex items-center", getColorByChange(stockData.changePercent))}>
            {stockData.changePercent > 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : stockData.changePercent < 0 ? (
              <TrendingDown size={16} className="mr-1" />
            ) : null}
            <span>{formatCurrency(stockData.change)}</span>
            <span className="ml-1">({formatPercentage(stockData.changePercent)})</span>
          </div>
        </div>
        
        <div className="flex flex-wrap">
          <div className="mr-6 mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Open</div>
            <div className="font-medium">{formatCurrency(stockData.open)}</div>
          </div>
          <div className="mr-6 mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Previous Close</div>
            <div className="font-medium">{formatCurrency(stockData.previousClose)}</div>
          </div>
          <div className="mr-6 mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Day High</div>
            <div className="font-medium">{formatCurrency(stockData.dayHigh)}</div>
          </div>
          <div className="mr-6 mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Day Low</div>
            <div className="font-medium">{formatCurrency(stockData.dayLow)}</div>
          </div>
          <div className="mr-6 mb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Volume</div>
            <div className="font-medium">{formatNumber(stockData.volume)}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <StockChart 
            data={stockData.chartData} 
            color={stockData.changePercent >= 0 ? '#10B981' : '#EF4444'} 
          />
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Company Overview</h3>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {stockData.description}
              </p>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Market Cap</div>
                    <div className="font-medium">{formatLargeNumber(stockData.marketCap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">P/E Ratio</div>
                    <div className="font-medium">{stockData.pe.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">EPS</div>
                    <div className="font-medium">₹{stockData.eps.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Dividend Yield</div>
                    <div className="font-medium">{stockData.dividend.toFixed(2)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">52 Week High</div>
                    <div className="font-medium">{formatCurrency(stockData.high52Week)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">52 Week Low</div>
                    <div className="font-medium">{formatCurrency(stockData.low52Week)}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center">
                  <BarChart2 size={16} className="mr-2 text-primary-500" />
                  <span className="font-medium">{stockData.sector}</span>
                </div>
                <div className="flex items-center mt-2">
                  <DollarSign size={16} className="mr-2 text-success-500" />
                  <span>{stockData.exchange}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related News */}
      {stockData.news && stockData.news.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Related News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stockData.news.map((news) => (
              <a 
                key={news.id}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow animate-fade-in"
              >
                {news.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{news.source}</span>
                    <span className="mx-2">•</span>
                    <Clock size={12} className="mr-1" />
                    <span>{getTimeAgo(news.publishedAt)}</span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {news.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDetail;