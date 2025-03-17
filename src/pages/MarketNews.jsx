import { useState } from 'react';
import { FaNewspaper, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import './MarketNews.css';

const MarketNews = () => {
  // Mock news data - replace with actual API data
  const [news] = useState([
    {
      id: 1,
      title: 'Federal Reserve Maintains Interest Rates, Signals Future Cuts',
      source: 'Financial Times',
      category: 'Economy',
      timestamp: '2 hours ago',
      summary: 'The Federal Reserve kept interest rates steady at its latest meeting but indicated it still expects to cut rates three times this year as inflation continues to moderate.',
      url: '#',
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 2,
      title: 'NVIDIA Stock Soars on AI Chip Demand',
      source: 'Reuters',
      category: 'Technology',
      timestamp: '4 hours ago',
      summary: 'NVIDIA shares reached new heights as demand for AI chips continues to surge, with major tech companies increasing their orders for the next generation of AI processors.',
      url: '#',
      image: 'https://placehold.co/600x400/png'
    },
    {
      id: 3,
      title: 'Oil Prices Rise Amid Middle East Tensions',
      source: 'Bloomberg',
      category: 'Commodities',
      timestamp: '6 hours ago',
      summary: 'Crude oil prices increased by 2% following reports of escalating tensions in the Middle East, raising concerns about potential supply disruptions.',
      url: '#',
      image: 'https://placehold.co/600x400/png'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Economy', 'Technology', 'Commodities', 'Markets', 'Companies'];

  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  return (
    <div className="market-news-page">
      {/* Market News Header */}
      <div className="news-header">
        <div className="header-title">
          <FaNewspaper className="header-icon" />
          <h1>Market News</h1>
        </div>
        <div className="category-filter">
          <FaFilter className="filter-icon" />
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map(article => (
          <div key={article.id} className="news-card">
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <span className="news-category">{article.category}</span>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span className="news-source">{article.source}</span>
                <span className="news-time">{article.timestamp}</span>
              </div>
              <h2 className="news-title">{article.title}</h2>
              <p className="news-summary">{article.summary}</p>
              <a href={article.url} className="read-more" target="_blank" rel="noopener noreferrer">
                Read More <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Market Updates */}
      <div className="market-updates">
        <h2>Market Updates</h2>
        <div className="updates-grid">
          <div className="update-card">
            <h3>US Markets</h3>
            <div className="update-item positive">
              <span>S&P 500</span>
              <span>+1.2%</span>
            </div>
            <div className="update-item negative">
              <span>Dow Jones</span>
              <span>-0.3%</span>
            </div>
            <div className="update-item positive">
              <span>Nasdaq</span>
              <span>+2.1%</span>
            </div>
          </div>
          <div className="update-card">
            <h3>Crypto</h3>
            <div className="update-item positive">
              <span>Bitcoin</span>
              <span>+5.4%</span>
            </div>
            <div className="update-item positive">
              <span>Ethereum</span>
              <span>+3.8%</span>
            </div>
          </div>
          <div className="update-card">
            <h3>Forex</h3>
            <div className="update-item negative">
              <span>EUR/USD</span>
              <span>-0.2%</span>
            </div>
            <div className="update-item positive">
              <span>GBP/USD</span>
              <span>+0.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNews; 