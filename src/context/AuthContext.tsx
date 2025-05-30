import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, WatchlistItem } from '../types';

interface AuthContextType {
  user: User | null;
  watchlist: WatchlistItem[];
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToWatchlist: (symbol: string) => Promise<boolean>;
  removeFromWatchlist: (symbol: string) => Promise<boolean>;
  isInWatchlist: (symbol: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'Demo User',
};

// Mock watchlist data
const mockWatchlist: WatchlistItem[] = [
  {
    id: 'watch-1',
    userId: 'user-1',
    symbol: 'RELIANCE',
    addedAt: new Date().toISOString(),
  },
  {
    id: 'watch-2',
    userId: 'user-1',
    symbol: 'HDFCBANK',
    addedAt: new Date().toISOString(),
  },
  {
    id: 'watch-3',
    userId: 'user-1',
    symbol: 'TCS',
    addedAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for stored authentication on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedWatchlist = localStorage.getItem('watchlist');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setWatchlist(storedWatchlist ? JSON.parse(storedWatchlist) : []);
    }
    
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      const user = { ...mockUser, email };
      const watchlist = [...mockWatchlist];
      
      setUser(user);
      setWatchlist(watchlist);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
      };
      
      setUser(newUser);
      setWatchlist([]);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('watchlist', JSON.stringify([]));
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setWatchlist([]);
    localStorage.removeItem('user');
    localStorage.removeItem('watchlist');
  };

  // Add stock to watchlist
  const addToWatchlist = async (symbol: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Check if already in watchlist
      if (isInWatchlist(symbol)) return true;
      
      // Create new watchlist item
      const newItem: WatchlistItem = {
        id: `watch-${Date.now()}`,
        userId: user.id,
        symbol,
        addedAt: new Date().toISOString(),
      };
      
      const updatedWatchlist = [...watchlist, newItem];
      setWatchlist(updatedWatchlist);
      
      // Update localStorage
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      
      return true;
    } catch (error) {
      console.error('Add to watchlist error:', error);
      return false;
    }
  };

  // Remove stock from watchlist
  const removeFromWatchlist = async (symbol: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedWatchlist = watchlist.filter(item => item.symbol !== symbol);
      
      if (updatedWatchlist.length === watchlist.length) return false;
      
      setWatchlist(updatedWatchlist);
      
      // Update localStorage
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      
      return true;
    } catch (error) {
      console.error('Remove from watchlist error:', error);
      return false;
    }
  };

  // Check if a symbol is in the watchlist
  const isInWatchlist = (symbol: string): boolean => {
    return watchlist.some(item => item.symbol === symbol);
  };

  const value = {
    user,
    watchlist,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};