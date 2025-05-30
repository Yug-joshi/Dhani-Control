import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Stock } from '../../types';
import { formatCurrency, formatPercentage, getColorByChange, cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface StockCardProps {
  stock: Stock;
  showWatchlistButton?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, showWatchlistButton = true }) => {
  const { isAuthenticated, isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuth();
  const isWatchlisted = isInWatchlist(stock.symbol);
  
  const handleWatchlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWatchlisted) {
      await removeFromWatchlist(stock.symbol);
    } else {
      await addToWatchlist(stock.symbol);
    }
  };
  
  return (
    <Link 
      to={`/stock/${stock.symbol}`} 
      className="card p-4 hover:transform hover:scale-[1.02] transition-all duration-200 animate-fade-in"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold text-lg">{stock.symbol}</h3>
            <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
              {stock.exchange}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{stock.name}</p>
        </div>
        
        {showWatchlistButton && isAuthenticated && (
          <button 
            onClick={handleWatchlistToggle}
            className={cn(
              "p-1.5 rounded-full transition-colors",
              isWatchlisted 
                ? "text-warning-500 hover:text-warning-600 hover:bg-warning-100 dark:hover:bg-warning-900" 
                : "text-gray-400 hover:text-warning-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Star size={18} fill={isWatchlisted ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <div className="text-lg font-bold">{formatCurrency(stock.price)}</div>
          <div className={cn("flex items-center text-sm", getColorByChange(stock.changePercent))}>
            {stock.changePercent > 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : stock.changePercent < 0 ? (
              <TrendingDown size={16} className="mr-1" />
            ) : null}
            <span>{formatPercentage(stock.changePercent)}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-gray-600 dark:text-gray-400">Volume</div>
          <div className="text-sm">{(stock.volume / 1000000).toFixed(2)}M</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <div>
          <div>Sector</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{stock.sector}</div>
        </div>
        <div>
          <div>P/E</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{stock.pe.toFixed(2)}</div>
        </div>
        <div>
          <div>52W High</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(stock.high52Week)}</div>
        </div>
        <div>
          <div>52W Low</div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(stock.low52Week)}</div>
        </div>
      </div>
    </Link>
  );
};

export default StockCard;