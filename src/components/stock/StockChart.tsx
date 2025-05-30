import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface StockChartProps {
  data: ChartDataPoint[];
  color?: string;
  showVolume?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ 
  data, 
  color = '#3b82f6', 
  showVolume = true 
}) => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('1M');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!data.length) return [];
    
    const currentDate = new Date();
    let filterDate = new Date();
    
    switch (timeRange) {
      case '1M':
        filterDate.setMonth(currentDate.getMonth() - 1);
        break;
      case '3M':
        filterDate.setMonth(currentDate.getMonth() - 3);
        break;
      case '6M':
        filterDate.setMonth(currentDate.getMonth() - 6);
        break;
      case '1Y':
        filterDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case 'ALL':
      default:
        return data;
    }
    
    return data.filter(point => new Date(point.date) >= filterDate);
  };
  
  const filteredData = getFilteredData();
  
  // Calculate change percentage
  const calculateChange = () => {
    if (filteredData.length < 2) return { change: 0, changePercent: 0 };
    
    const firstPrice = filteredData[0].price;
    const lastPrice = filteredData[filteredData.length - 1].price;
    const change = lastPrice - firstPrice;
    const changePercent = (change / firstPrice) * 100;
    
    return { change, changePercent };
  };
  
  const { change, changePercent } = calculateChange();
  const isPositive = change >= 0;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{label}</p>
          <p className="text-primary-600 dark:text-primary-400">
            Price: {formatCurrency(payload[0].value)}
          </p>
          {payload[1] && (
            <p className="text-gray-600 dark:text-gray-400">
              Volume: {payload[1].value.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Stock Price</h3>
          <div className="flex items-center">
            <span className={isPositive ? 'text-success-500' : 'text-danger-500'}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
            <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
              {timeRange} change
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              tickMargin={10}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              stroke="#9CA3AF"
            />
            <YAxis 
              domain={['dataMin', 'dataMax']} 
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              width={80}
              stroke="#9CA3AF"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {showVolume && (
        <div className="h-32 mt-4">
          <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tickMargin={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
                stroke="#9CA3AF"
              />
              <YAxis 
                tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'}
                width={60}
                stroke="#9CA3AF"
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#94A3B8"
                fill="#94A3B8"
                fillOpacity={0.3}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StockChart;