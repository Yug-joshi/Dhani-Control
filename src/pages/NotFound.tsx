import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning-100 dark:bg-warning-900 mb-6">
          <AlertTriangle size={40} className="text-warning-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/" className="btn-primary">
            <Home size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <Link to="/sectors" className="btn-outline">
            View Sectors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;