import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStocks } from '../context/StockContext';
import { Stock } from '../types';
import StockTable from '../components/stock/StockTable';
import { BookmarkIcon, AlertCircle } from 'lucide-react';

const Watchlist: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, watchlist } = useAuth();
  const { stocks, loading } = useStocks();
  const [watchlistStocks, setWatchlistStocks] = useState<Stock[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/watchlist' } });
      return;
    }
    
    // Filter stocks based on watchlist
    const filteredStocks = stocks.filter(stock => 
      watchlist.some(item => item.symbol === stock.symbol)
    );
    
    setWatchlistStocks(filteredStocks);
  }, [isAuthenticated, navigate, stocks, watchlist]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <BookmarkIcon size={24} className="mr-2 text-primary-600 dark:text-primary-500" />
        <h1 className="text-2xl font-bold">My Watchlist</h1>
      </div>
      
      {watchlistStocks.length > 0 ? (
        <StockTable stocks={watchlistStocks} showWatchlistButtons />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <AlertCircle size={32} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add stocks to your watchlist to track their performance.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Browse Stocks
          </button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;