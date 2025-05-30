import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  BarChart2, 
  Menu, 
  X, 
  Bell, 
  Moon, 
  Sun,
  LineChart,
  BookmarkIcon
} from 'lucide-react';
import { useStocks } from '../../context/StockContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../stock/SearchBar';
import { IndexData } from '../../types';
import { cn } from '../../lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { indices } = useStocks();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderIndexBadge = (index: IndexData) => {
    const isPositive = index.changePercent >= 0;
    return (
      <div key={index.name} className="flex flex-col items-start">
        <div className="flex items-center">
          <span className="font-semibold">{index.name}</span>
          <span className={cn(
            "ml-2 text-xs px-1.5 py-0.5 rounded",
            isPositive ? "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100" : 
                        "bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-100"
          )}>
            {isPositive ? "+" : ""}{index.changePercent.toFixed(2)}%
          </span>
        </div>
        <span className="text-sm font-medium">{index.value.toLocaleString('en-IN')}</span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="bg-primary-800 dark:bg-primary-950 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="ticker-wrapper">
            <div className="ticker">
              {indices.map((index) => (
                <span key={index.name} className="inline-block mx-4">
                  {index.name}: {index.value.toLocaleString('en-IN')} 
                  <span className={index.changePercent >= 0 ? 'text-success-400' : 'text-danger-400'}>
                    {' '}{index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8" onClick={closeMenu}>
              <BarChart2 size={24} className="text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold">StockPulse</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
                  location.pathname === '/' && "text-primary-600 dark:text-primary-400 font-medium"
                )}
              >
                Dashboard
              </Link>
              <Link 
                to="/sectors" 
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
                  location.pathname === '/sectors' && "text-primary-600 dark:text-primary-400 font-medium"
                )}
              >
                Sectors
              </Link>
              <Link 
                to="/news" 
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
                  location.pathname === '/news' && "text-primary-600 dark:text-primary-400 font-medium"
                )}
              >
                News
              </Link>
              <Link 
                to="/watchlist" 
                className={cn(
                  "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
                  location.pathname === '/watchlist' && "text-primary-600 dark:text-primary-400 font-medium"
                )}
              >
                Watchlist
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="User menu"
                >
                  <User size={20} />
                  <span className="hidden md:inline">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                  <Link 
                    to="/watchlist"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <BookmarkIcon size={16} className="mr-2" />
                    My Watchlist
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User size={20} />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}
            
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Major indices display */}
        <div className="hidden md:flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-800">
          {indices.slice(0, 4).map(renderIndexBadge)}
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300",
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out transform",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <BarChart2 size={24} className="text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold">StockPulse</span>
            </div>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="p-4 space-y-4">
            <Link 
              to="/" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link 
              to="/sectors" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/sectors' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              Sectors
            </Link>
            <Link 
              to="/news" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/news' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              News
            </Link>
            <Link 
              to="/watchlist" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/watchlist' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              Watchlist
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/about' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              to="/disclaimer" 
              className={cn(
                "block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                location.pathname === '/disclaimer' && "bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400"
              )}
              onClick={closeMenu}
            >
              Disclaimer
            </Link>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center p-2">
                    <User size={20} className="mr-2" />
                    <span>{user?.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-danger-600 dark:text-danger-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile major indices display */}
          <div className="p-4 mt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-medium mb-2">Major Indices</h3>
            <div className="space-y-2">
              {indices.slice(0, 4).map((index) => (
                <div key={index.name} className="flex justify-between">
                  <span>{index.name}</span>
                  <span className={index.changePercent >= 0 ? 'text-success-500' : 'text-danger-500'}>
                    {index.value.toLocaleString('en-IN')} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search overlay */}
      <div className={cn(
        "fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 flex items-start justify-center pt-16",
        isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transition-transform duration-300 ease-in-out transform",
          isSearchOpen ? "translate-y-0" : "-translate-y-10"
        )}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search Stocks</h2>
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <SearchBar onSelect={() => setIsSearchOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;