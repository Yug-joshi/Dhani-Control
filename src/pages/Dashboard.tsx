import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useStocks } from '../context/StockContext';
import StockCard from '../components/stock/StockCard';
import StockTable from '../components/stock/StockTable';
import SectorChart from '../components/stock/SectorChart';
import SearchBar from '../components/stock/SearchBar';

const Dashboard: React.FC = () => {
  const { 
    topGainers, 
    topLosers, 
    mostActive, 
    sectorPerformance, 
    loading, 
    refreshData 
  } = useStocks();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Market Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights into the Indian stock market
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <div className="w-full sm:w-64">
            <SearchBar />
          </div>
          <button 
            onClick={refreshData}
            disabled={loading}
            className="btn-outline flex items-center justify-center"
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Gainers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topGainers.slice(0, 4).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Losers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topLosers.slice(0, 4).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Most Active Stocks */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Most Active Stocks</h2>
        <StockTable stocks={mostActive} />
      </div>
      
      {/* Sector Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SectorChart sectorData={sectorPerformance} />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Sector Performance</h3>
          
          <div className="space-y-4">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="animate-slide-up">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{sector.name}</span>
                  <span className={sector.change >= 0 ? 'text-success-500' : 'text-danger-500'}>
                    {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${
                      sector.change >= 0 ? 'bg-success-500' : 'bg-danger-500'
                    }`}
                    style={{ width: `${Math.min(Math.abs(sector.change) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;