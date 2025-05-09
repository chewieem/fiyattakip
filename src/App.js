import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CategoryButtons from './components/CategoryButtons';
import Banner from './components/Banner';
import MarketCards from './components/MarketCards';
import LivePriceTable from './components/LivePriceTable';
import AppPromotion from './components/AppPromotion';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showLiveTable, setShowLiveTable] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);

  // URL değişikliklerini izle
  useEffect(() => {
    // Geçiş animasyonunu başlat
    setPageTransition(true);
    
    // Sayfa en üste kaydır
    window.scrollTo(0, 0);
    
    // Animasyon tamamlandıktan sonra içeriği güncelle
    setTimeout(() => {
      const path = location.pathname;
      
      if (path.includes('/kapalicarsi')) {
        setSelectedCategory(1);
        setShowLiveTable(true);
      } else if (path.includes('/eticaret')) {
        setSelectedCategory(2);
        setShowLiveTable(true);
      } else if (path.includes('/bankalar')) {
        setSelectedCategory(3);
        setShowLiveTable(true);
      } else {
        // Anasayfa veya diğer URL'ler için
        setSelectedCategory(null);
        setShowLiveTable(false); // MarketCards göster
      }
      
      // Animasyon tamamlandığında pageTransition'ı false yap
      setTimeout(() => {
        setPageTransition(false);
      }, 100);
    }, 300);
  }, [location.pathname]);

  const handleCategoryChange = (categoryId) => {
    // İçerik state'ini güncelle
    setSelectedCategory(categoryId);
    setShowLiveTable(categoryId === 1 || categoryId === 2 || categoryId === 3);
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <CategoryButtons onCategoryChange={handleCategoryChange} />
        <Banner />
        
        {/* Sayfa geçiş animasyonu sınıfı */}
        <div className={`page-content ${pageTransition ? 'page-transition' : ''}`}>
          {showLiveTable ? (
            <LivePriceTable key={`liveTable-${selectedCategory}`} selectedCategory={selectedCategory} />
          ) : (
            <MarketCards key="marketCards" selectedCategory={selectedCategory} />
          )}
        </div>
        
        <AppPromotion />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename="/fiyattakip">
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/anasayfa" element={<AppContent />} />
        <Route path="/kapalicarsi" element={<AppContent />} />
        <Route path="/eticaret" element={<AppContent />} />
        <Route path="/bankalar" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
