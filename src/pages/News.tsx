import React from 'react';
import { useStocks } from '../context/StockContext';
import { Clock, ExternalLink } from 'lucide-react';
import { getTimeAgo } from '../lib/utils';

const News: React.FC = () => {
  const { newsItems, loading } = useStocks();
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Market News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Market News</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Latest updates and insights from the Indian stock market
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <a 
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow animate-fade-in group"
          >
            {news.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-200">{news.source}</span>
                <span className="mx-2">•</span>
                <Clock size={12} className="mr-1" />
                <span>{getTimeAgo(news.publishedAt)}</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {news.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {news.summary}
              </p>
              <div className="flex items-center text-xs text-primary-600 dark:text-primary-400 font-medium">
                Read more
                <ExternalLink size={12} className="ml-1" />
              </div>
              
              {news.relatedSymbols && news.relatedSymbols.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {news.relatedSymbols.map((symbol) => (
                    <span 
                      key={symbol}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;