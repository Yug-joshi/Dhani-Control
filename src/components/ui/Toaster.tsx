import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { Toast as ToastType } from '../../types';
import { cn } from '../../lib/utils';

interface ToastContextType {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: Omit<ToastType, 'id'>) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const Toast: React.FC<{ toast: ToastType; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-success-50 dark:bg-success-900 border-success-500';
      case 'error':
        return 'bg-danger-50 dark:bg-danger-900 border-danger-500';
      case 'warning':
        return 'bg-warning-50 dark:bg-warning-900 border-warning-500';
      case 'info':
      default:
        return 'bg-primary-50 dark:bg-primary-900 border-primary-500';
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 mb-3 rounded-md shadow-md border-l-4 animate-fade-in',
        getToastClasses()
      )}
    >
      <div>
        <h4 className="font-medium">{toast.title}</h4>
        {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const Toaster: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <div className="fixed top-4 right-4 z-50" />;
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

export default Toaster;