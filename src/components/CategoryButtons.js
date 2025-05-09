import React, { useState, useEffect } from 'react';
import './CategoryButtons.css';
import { useNavigate, useLocation } from 'react-router-dom';

function CategoryButtons({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // URL'ye göre seçili kategoriyi ayarla
  useEffect(() => {
    if (location.pathname === '/kapalicarsi') {
      setSelectedCategory(1);
      onCategoryChange && onCategoryChange(1);
    } else if (location.pathname === '/eticaret') {
      setSelectedCategory(2);
      onCategoryChange && onCategoryChange(2);
    } else if (location.pathname === '/bankalar') {
      setSelectedCategory(3);
      onCategoryChange && onCategoryChange(3);
    } else if (location.pathname === '/anasayfa') {
      // Anasayfada seçili kategoriyi sıfırla
      setSelectedCategory(null);
      onCategoryChange && onCategoryChange(null);
    }
  }, [location.pathname, onCategoryChange]);
  
  const categories = [
    { id: 1, name: 'KAPALI ÇARŞI', count: 22, image: `${process.env.PUBLIC_URL}/images/category/kapalicarsi.png` },
    { id: 2, name: 'E-TİCARET', count: 45, image: `${process.env.PUBLIC_URL}/images/category/eticaret.png` },
    { id: 3, name: 'BANKALAR', count: 38, image: `${process.env.PUBLIC_URL}/images/category/bankalar.png` },
    { id: 4, name: 'DÖVİZ BÜROLARI', count: 52, image: `${process.env.PUBLIC_URL}/images/category/dovizburolari.png` }
  ];

  const handleCategoryClick = (id) => {
    const isAlreadySelected = selectedCategory === id;
    
    if (isAlreadySelected) {
      // Zaten seçili olan kategoriye tıklandığında
      setSelectedCategory(null);
      onCategoryChange && onCategoryChange(null);
      navigate('/anasayfa');
    } else {
      // Yeni bir kategoriye tıklandığında
      setSelectedCategory(id);
      onCategoryChange && onCategoryChange(id);
      
      if (id === 1) {
        navigate('/kapalicarsi');
      } else if (id === 2) {
        navigate('/eticaret');
      } else if (id === 3) {
        navigate('/bankalar');
      } else {
        navigate('/anasayfa');
      }
    }
  };

  return (
    <div className="category-buttons">
      {categories.map(category => (
        <div 
          key={category.id} 
          className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className="category-content">
            <div className="category-title">{category.name}</div>
            <div className="category-count">{category.count}+</div>
          </div>
          
          <div className="category-icon">
            <img src={category.image} alt={category.name} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryButtons; 