import React, { useState } from 'react';
import './CategoryButtons.css';

function CategoryButtons({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { id: 1, name: 'KAPALI ÇARŞI', count: 22, image: '/images/category/kapalicarsi.png' },
    { id: 2, name: 'E-TİCARET', count: 45, image: '/images/category/eticaret.png' },
    { id: 3, name: 'BANKALAR', count: 38, image: '/images/category/bankalar.png' },
    { id: 4, name: 'DÖVİZ BÜROLARI', count: 52, image: '/images/category/dovizburolari.png' }
  ];

  const handleCategoryClick = (id) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
      onCategoryChange && onCategoryChange(null);
    } else {
      setSelectedCategory(id);
      onCategoryChange && onCategoryChange(id);
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