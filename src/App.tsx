import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster, ToastProvider } from './components/ui/Toaster';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import News from './pages/News';
import SectorAnalysis from './pages/SectorAnalysis';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock/:symbol" element={<StockDetail />} />
          <Route path="sectors" element={<SectorAnalysis />} />
          <Route path="news" element={<News />} />
          <Route 
            path="watchlist" 
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } 
          />
          <Route path="about" element={<About />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </ToastProvider>
  );
}

export default App;