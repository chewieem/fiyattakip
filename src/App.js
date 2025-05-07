import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CategoryButtons from './components/CategoryButtons';
import Banner from './components/Banner';
import MarketCards from './components/MarketCards';
import LivePriceTable from './components/LivePriceTable';
import AppPromotion from './components/AppPromotion';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showLiveTable, setShowLiveTable] = useState(true);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    
    setShowLiveTable(categoryId === 1);
  };

  return (
    <Router>
    <div className="App">
        <Header />
        <div className="main-content">
          <CategoryButtons onCategoryChange={handleCategoryChange} />
          <Banner />
          
          {showLiveTable ? (
            <LivePriceTable />
          ) : (
            <MarketCards selectedCategory={selectedCategory} />
          )}
          
          <AppPromotion />
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
