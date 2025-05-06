import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CategoryButtons from './components/CategoryButtons';
import Banner from './components/Banner';
import MarketCards from './components/MarketCards';
import AppPromotion from './components/AppPromotion';
import Footer from './components/Footer';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Router>
    <div className="App">
        <Header />
        <div className="main-content">
          <CategoryButtons onCategoryChange={handleCategoryChange} />
          <Banner />
          <MarketCards selectedCategory={selectedCategory} />
          <AppPromotion />
        </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
