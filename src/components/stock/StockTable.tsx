import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Stock } from '../../types';
import { formatCurrency, formatPercentage, formatLargeNumber, getColorByChange, cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface StockTableProps {
  stocks: Stock[];
  title?: string;
  showWatchlistButtons?: boolean;
}

const StockTable: React.FC<StockTableProps> = ({ 
  stocks, 
  title, 
  showWatchlistButtons = true 
}) => {
  const { isAuthenticated, isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuth();
  
  const handleWatchlistToggle = async (e: React.MouseEvent, symbol: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist(symbol)) {
      await removeFromWatchlist(symbol);
    } else {
      await addToWatchlist(symbol);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-xs uppercase">
            <tr>
              {showWatchlistButtons && isAuthenticated && <th className="px-6 py-3 text-left w-10"></th>}
              <th className="px-6 py-3 text-left">Symbol</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Change</th>
              <th className="px-6 py-3 text-right">Volume</th>
              <th className="px-6 py-3 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stocks.map((stock) => (
              <tr 
                key={stock.symbol}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                {showWatchlistButtons && isAuthenticated && (
                  <td className="px-6 py-4">
                    <button 
                      onClick={(e) => handleWatchlistToggle(e, stock.symbol)}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        isInWatchlist(stock.symbol) 
                          ? "text-warning-500 hover:text-warning-600 hover:bg-warning-100 dark:hover:bg-warning-900" 
                          : "text-gray-400 hover:text-warning-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      <Star size={16} fill={isInWatchlist(stock.symbol) ? "currentColor" : "none"} />
                    </button>
                  </td>
                )}
                <td className="px-6 py-4">
                  <Link to={`/stock/${stock.symbol}`} className="font-medium hover:text-primary-600 dark:hover:text-primary-400">
                    {stock.symbol}
                    <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded">
                      {stock.exchange}
                    </span>
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  <Link to={`/stock/${stock.symbol}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                    {stock.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-right font-medium">
                  {formatCurrency(stock.price)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={cn("flex items-center justify-end", getColorByChange(stock.changePercent))}>
                    {stock.changePercent > 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : stock.changePercent < 0 ? (
                      <TrendingDown size={16} className="mr-1" />
                    ) : null}
                    <span>{formatPercentage(stock.changePercent)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {formatLargeNumber(stock.volume)}
                </td>
                <td className="px-6 py-4 text-right">
                  {formatLargeNumber(stock.marketCap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;