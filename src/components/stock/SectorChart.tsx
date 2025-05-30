import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SectorPerformance } from '../../types';
import { formatPercentage } from '../../lib/utils';

interface SectorChartProps {
  sectorData: SectorPerformance[];
}

const COLORS = [
  '#1E40AF', // primary-800
  '#0369A1', // sky-700
  '#047857', // emerald-700
  '#15803D', // green-700
  '#B45309', // amber-700
  '#7C2D12', // orange-900
  '#831843', // pink-800
  '#9333EA', // purple-600
  '#DC2626', // red-600
  '#0E7490', // cyan-700
];

const SectorChart: React.FC<SectorChartProps> = ({ sectorData }) => {
  // Transform data for the pie chart
  const pieData = sectorData.map((sector) => ({
    name: sector.name,
    value: sector.marketCap,
    change: sector.change,
  }));
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const marketCapInCrores = (data.value / 10000000).toFixed(2);
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Market Cap: ₹{marketCapInCrores} Cr
          </p>
          <p className={data.change >= 0 ? 'text-success-500' : 'text-danger-500'}>
            Change: {formatPercentage(data.change)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Market Capitalization by Sector</h3>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              animationDuration={800}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorChart;