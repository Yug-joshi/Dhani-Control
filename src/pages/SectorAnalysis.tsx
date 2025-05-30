import React, { useState } from 'react';
import { useStocks } from '../context/StockContext';
import SectorChart from '../components/stock/SectorChart';
import StockTable from '../components/stock/StockTable';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

const SectorAnalysis: React.FC = () => {
  const { sectorPerformance, loading } = useStocks();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'performance' | 'marketCap'>('performance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Get the selected sector data
  const selectedSectorData = selectedSector
    ? sectorPerformance.find(sector => sector.name === selectedSector)
    : null;
  
  // Sort sectors
  const sortedSectors = [...sectorPerformance].sort((a, b) => {
    const valueA = sortBy === 'performance' ? a.change : a.marketCap;
    const valueB = sortBy === 'performance' ? b.change : b.marketCap;
    
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });
  
  const handleSortChange = (newSortBy: 'performance' | 'marketCap') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc'); // Default to descending when changing sort field
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Sector Analysis</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Performance and breakdown of market sectors
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SectorChart sectorData={sectorPerformance} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sector Performance</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleSortChange('performance')}
                className={cn(
                  "flex items-center px-2 py-1 text-xs rounded",
                  sortBy === 'performance' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                Performance
                {sortBy === 'performance' && (
                  sortOrder === 'asc' ? <ArrowUp size={12} className="ml-1" /> : <ArrowDown size={12} className="ml-1" />
                )}
              </button>
              <button 
                onClick={() => handleSortChange('marketCap')}
                className={cn(
                  "flex items-center px-2 py-1 text-xs rounded",
                  sortBy === 'marketCap' ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                Market Cap
                {sortBy === 'marketCap' && (
                  sortOrder === 'asc' ? <ArrowUp size={12} className="ml-1" /> : <ArrowDown size={12} className="ml-1" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedSectors.map((sector) => (
              <button
                key={sector.name}
                onClick={() => setSelectedSector(selectedSector === sector.name ? null : sector.name)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors",
                  selectedSector === sector.name 
                    ? "bg-primary-50 dark:bg-primary-900/50 border border-primary-200 dark:border-primary-800" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
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
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Market Cap: ₹{(sector.marketCap / 10000000).toFixed(2)} Cr
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {selectedSectorData && (
        <div className="mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">{selectedSectorData.name} Stocks</h2>
          <StockTable stocks={selectedSectorData.stocks} />
        </div>
      )}
    </div>
  );
};

export default SectorAnalysis;