import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <AlertTriangle size={24} className="text-warning-500 mr-2" />
          <h1 className="text-3xl font-bold">Disclaimer</h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Market Data Disclaimer</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The stock market data, quotes, charts, and analysis provided on StockPulse are for informational purposes only and not intended for trading purposes or advice. While we strive to ensure that the information provided is accurate and up-to-date, we cannot guarantee its accuracy or completeness.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Market data may be delayed, and the displayed prices may not reflect the actual trading prices. The data is sourced from various stock exchanges and third-party data providers, and delays or inaccuracies may occur due to various factors beyond our control.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            Users should always verify the information with official sources before making any investment decisions.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">No Investment Advice</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            StockPulse does not provide investment advice, recommendations, or financial planning services. The content, information, and tools available on our platform should not be construed as investment advice. We do not recommend or endorse any particular stock, security, or investment strategy.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Investing in stocks involves risk, including the possible loss of principal. Past performance is not indicative of future results. Before making any investment decision, you should carefully consider your investment objectives, level of experience, and risk appetite. You should also seek advice from an independent financial advisor if you have any doubts.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Third-Party Content</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            StockPulse may include content, information, and links from third-party sources. We do not endorse, approve, or certify such information, nor do we guarantee its accuracy, completeness, efficacy, or timeliness. Reference to any third-party information, products, services, or organizations does not constitute or imply endorsement, sponsorship, or recommendation by StockPulse.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            In no event shall StockPulse, its affiliates, directors, employees, or agents be liable for any direct, indirect, incidental, special, punitive, or consequential damages arising out of or in connection with your use of our platform, including but not limited to, loss of profits, trading losses, or damages resulting from use of or reliance on the information presented.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400">
            StockPulse will not be liable for any losses or damages incurred as a result of any investment decisions made based on the information provided on our platform.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Legal Compliance</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The information on StockPulse is not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Users are responsible for compliance with all applicable local, state, national, and international laws and regulations.
          </p>
          
          <div className="bg-warning-50 dark:bg-warning-900/30 border-l-4 border-warning-500 p-4 rounded-md mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-warning-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-warning-800 dark:text-warning-200">Important Notice</h3>
                <div className="mt-2 text-sm text-warning-700 dark:text-warning-300">
                  <p>
                    By using StockPulse, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please do not use our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;