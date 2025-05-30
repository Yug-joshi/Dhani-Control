import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '../../context/StockContext';
import { Stock } from '../../types';
import { debounce } from '../../lib/utils';

interface SearchBarProps {
  onSelect?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { searchStocksByQuery } = useStocks();

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const searchResults = await searchStocksByQuery(searchQuery);
      setResults(searchResults);
      setIsLoading(false);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectStock = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setQuery('');
    setResults([]);
    if (onSelect) onSelect();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for stocks..."
          className="input pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full" />
          ) : (
            <Search size={18} className="text-gray-400" />
          )}
        </div>
      </div>
      
      {(results.length > 0 && isFocused) && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
          <ul className="py-1">
            {results.map((stock) => (
              <li key={stock.symbol}>
                <button
                  onClick={() => handleSelectStock(stock.symbol)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                      <div className={stock.changePercent >= 0 ? 'text-success-500' : 'text-danger-500'}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;