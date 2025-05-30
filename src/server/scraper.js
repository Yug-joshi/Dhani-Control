import WebSocket from 'ws';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

// Cache for storing latest stock data
let stockCache = new Map();
let indicesCache = new Map();

// Function to scrape NSE data
async function scrapeNSE() {
  try {
    const response = await fetch('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const data = await response.json();
    return data.data.map(stock => ({
      symbol: stock.symbol,
      price: parseFloat(stock.lastPrice),
      change: parseFloat(stock.change),
      changePercent: parseFloat(stock.pChange),
      volume: parseInt(stock.totalTradedVolume),
      exchange: 'NSE'
    }));
  } catch (error) {
    console.error('Error scraping NSE:', error);
    return [];
  }
}

// Function to scrape BSE data
async function scrapeBSE() {
  try {
    const response = await fetch('https://api.bseindia.com/BseIndiaAPI/api/GetSensexData/w', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const data = await response.json();
    return data.map(stock => ({
      symbol: stock.scripname,
      price: parseFloat(stock.ltradert),
      change: parseFloat(stock.change),
      changePercent: parseFloat(stock.pchange),
      volume: parseInt(stock.trd_vol),
      exchange: 'BSE'
    }));
  } catch (error) {
    console.error('Error scraping BSE:', error);
    return [];
  }
}

// Function to scrape major indices
async function scrapeIndices() {
  try {
    const [nseResponse, bseResponse] = await Promise.all([
      fetch('https://www.nseindia.com/api/allIndices', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }),
      fetch('https://api.bseindia.com/BseIndiaAPI/api/Sensex/w', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      })
    ]);

    const [nseData, bseData] = await Promise.all([
      nseResponse.json(),
      bseResponse.json()
    ]);

    return {
      nifty50: {
        name: 'NIFTY 50',
        value: parseFloat(nseData.data[0].last),
        change: parseFloat(nseData.data[0].change),
        changePercent: parseFloat(nseData.data[0].percentChange)
      },
      sensex: {
        name: 'SENSEX',
        value: parseFloat(bseData.sensex),
        change: parseFloat(bseData.change),
        changePercent: parseFloat(bseData.percentChange)
      }
    };
  } catch (error) {
    console.error('Error scraping indices:', error);
    return null;
  }
}

// Function to scrape financial news
async function scrapeNews() {
  try {
    const response = await fetch('https://www.moneycontrol.com/news/business/markets/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const news = [];
    $('.article-list li').each((i, el) => {
      const title = $(el).find('h2').text().trim();
      const summary = $(el).find('.article-desc').text().trim();
      const url = $(el).find('a').attr('href');
      const imageUrl = $(el).find('img').attr('src');
      
      if (title && url) {
        news.push({
          id: `news-${i}`,
          title,
          summary,
          url,
          imageUrl,
          source: 'MoneyControl',
          publishedAt: new Date().toISOString()
        });
      }
    });
    
    return news.slice(0, 10); // Return top 10 news items
  } catch (error) {
    console.error('Error scraping news:', error);
    return [];
  }
}

// Function to update data
async function updateData() {
  try {
    const [nseStocks, bseStocks, indices, news] = await Promise.all([
      scrapeNSE(),
      scrapeBSE(),
      scrapeIndices(),
      scrapeNews()
    ]);

    const allStocks = [...nseStocks, ...bseStocks];
    
    // Update cache
    allStocks.forEach(stock => stockCache.set(stock.symbol, stock));
    if (indices) {
      indicesCache.set('NIFTY50', indices.nifty50);
      indicesCache.set('SENSEX', indices.sensex);
    }

    // Broadcast to all connected clients
    const data = {
      stocks: Array.from(stockCache.values()),
      indices: Array.from(indicesCache.values()),
      news
    };

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

// WebSocket connection handling
wss.on('connection', ws => {
  console.log('Client connected');
  
  // Send initial data
  const initialData = {
    stocks: Array.from(stockCache.values()),
    indices: Array.from(indicesCache.values())
  };
  ws.send(JSON.stringify(initialData));
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Update data every 5 seconds
setInterval(updateData, 5000);

// Initial update
updateData();

console.log('Stock market scraper running on ws://localhost:8080');