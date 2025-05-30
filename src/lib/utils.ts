import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatPercentage(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatLargeNumber(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} K`;
  }
  return value.toString();
}

export function getColorByChange(change: number): string {
  if (change > 0) return 'stock-up';
  if (change < 0) return 'stock-down';
  return 'stock-neutral';
}

export function getRandomValue(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getStockChartData(days = 30) {
  let startPrice = getRandomValue(100, 5000);
  const volatility = getRandomValue(0.5, 5) / 100;
  
  const data = [];
  let date = new Date();
  date.setDate(date.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    date.setDate(date.getDate() + 1);
    const change = startPrice * volatility * (Math.random() - 0.5);
    startPrice += change;
    
    data.push({
      date: new Date(date).toISOString().split('T')[0],
      price: parseFloat(startPrice.toFixed(2)),
      volume: getRandomInt(100000, 10000000),
    });
  }
  
  return data;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function (...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function getTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs} seconds ago`;
  } else if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return 'yesterday';
  } else {
    return `${diffDays} days ago`;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}