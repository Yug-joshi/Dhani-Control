import React from 'react';
import { BarChart2, LineChart, Users, TrendingUp, Shield, Server } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About StockPulse</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <BarChart2 size={32} className="text-primary-600 dark:text-primary-500 mr-4" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            StockPulse is dedicated to providing real-time, accurate, and comprehensive information about the Indian stock market to empower investors and enthusiasts with the insights they need to make informed decisions.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            Our platform aggregates data from major Indian stock exchanges including the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) to offer a complete view of market trends, stock performances, and sector analysis in an intuitive and user-friendly interface.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <LineChart className="text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Real-Time Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Live stock prices, indices, and market data updated in real-time from NSE and BSE.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                  <TrendingUp className="text-success-600 dark:text-success-400" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Market Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive sector performance, top gainers and losers, and market trends.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-warning-100 dark:bg-warning-900 flex items-center justify-center">
                  <Users className="text-warning-600 dark:text-warning-400" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Personalized Watchlists</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create and manage personalized watchlists to track your favorite stocks and investments.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-lg bg-danger-100 dark:bg-danger-900 flex items-center justify-center">
                  <Server className="text-danger-600 dark:text-danger-400" />
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Financial News</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Latest market news and updates affecting Indian stocks and the economy.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <Shield size={24} className="text-primary-600 dark:text-primary-500 mr-4" />
            <h2 className="text-xl font-semibold">Our Commitment</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            At StockPulse, we are committed to:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Providing accurate, up-to-date, and reliable market data</li>
            <li>Maintaining a user-friendly platform accessible to both experienced investors and newcomers</li>
            <li>Continuously improving our tools and features based on user feedback</li>
            <li>Ensuring data privacy and security for all our users</li>
            <li>Offering educational resources to help users better understand the stock market</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We value your feedback and suggestions. If you have any questions, concerns, or ideas for improvement, please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Email</h3>
              <a href="mailto:support@stockpulse.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                support@stockpulse.com
              </a>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Address</h3>
              <address className="text-gray-600 dark:text-gray-400 not-italic">
                StockPulse Technologies<br />
                1234 Market Street<br />
                Mumbai, Maharashtra 400001<br />
                India
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;