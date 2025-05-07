import React, { useState, useEffect, useRef } from 'react';
import HaremAltinSocket from './HaremAltinSocket';
import './MarketCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const LivePriceTable = () => {
  // Helper fonksiyon: Boş fiyat tablosu durumu oluşturur
  const createEmptyPriceState = () => {
    const products = [
      'HAS/TRY', 'ONS', 'Gramaltın', 'USD/KG', 'EUR/KG', 
      'Gümüş TL', 'Gümüş Ons', 'Gümüş USD', 'Çeyrek', 
      'Yarım', 'Tam', 'Ata'
    ];
    
    const state = {};
    products.forEach(product => {
      state[product] = { alis: '---', satis: '---' };
    });
    
    return state;
  };

  // State tanımları
  const [priceData, setPriceData] = useState(createEmptyPriceState());
  const [haremData, setHaremData] = useState(createEmptyPriceState());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [receivedRealData, setReceivedRealData] = useState(false);
  const lastRawData = useRef(null);

  // API-Tablo kod eşleştirmeleri
  const codeMapping = useRef({
    'ALTIN': 'HAS/TRY',
    'ONS': 'ONS',
    'KULCEALTIN': 'Gramaltın',
    'USDKG': 'USD/KG',
    'EURKG': 'EUR/KG',
    'GUMUSTRY': 'Gümüş TL',
    'XAGUSD': 'Gümüş Ons',
    'GUMUSUSD': 'Gümüş USD',
    'CEYREK_YENI': 'Çeyrek',
    'YARIM_YENI': 'Yarım',
    'TEK_YENI': 'Tam',
    'ATA_YENI': 'Ata'
  });

  // Firma logoları
  const companyLogos = [
    { id: 1, logo: `${process.env.PUBLIC_URL}/images/companies/demas.png`, name: 'demas a.s.' },
    { id: 2, logo: `${process.env.PUBLIC_URL}/images/companies/harem.png`, name: 'harem a.s.' },
    { id: 3, logo: `${process.env.PUBLIC_URL}/images/companies/big-saglamoglu.svg`, name: 'sağlamoğlu' },
    { id: 4, logo: `${process.env.PUBLIC_URL}/images/companies/hakan.png`, name: 'hakan a.s.' },
    { id: 5, logo: `${process.env.PUBLIC_URL}/images/companies/ahlatcı.png`, name: 'ahlatcı a.s.' },
    { id: 6, logo: `${process.env.PUBLIC_URL}/images/companies/rona.png`, name: 'rona a.s.' }
  ];

  // Fiyat değerlerini formatlama (Kullanılmayan fonksiyon)
  const formatPrice = (price) => {
    if (!price && price !== 0) return '---';
    
    try {
      if (typeof price === 'string' && /^\d{1,3}(\.\d{3})*,\d{2}$/.test(price.trim())) {
        return price;
      }
      
      let numValue;
      if (typeof price === 'string') {
        numValue = price.replace(/\./g, '#')
                      .replace(',', '.')
                      .replace(/#/g, '');
        numValue = parseFloat(numValue);
      } else {
        numValue = parseFloat(price);
      }
      
      if (isNaN(numValue)) return price.toString();
      
      const formattedPrice = numValue.toFixed(2)
                              .replace('.', ',')
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      return formattedPrice;
    } catch (error) {
      return String(price);
    }
  };

  // Ürün tipine göre fiyat formatlamayı yapar
  const formatWithCustomDigits = (value, key) => {
    if (value === undefined || value === null) return '---';
    
    try {
      const valueStr = String(value);
      
      let numValue;
      if (typeof value === 'string') {
        if (valueStr.includes(',')) {
          numValue = parseFloat(valueStr.replace(',', '.'));
        } else {
          numValue = parseFloat(valueStr);
        }
      } else {
        numValue = parseFloat(value);
      }
      
      if (isNaN(numValue)) return '---';
      
      if (key === 'Gümüş TL') {
        let numStr = numValue.toFixed(3);
        const parts = numStr.split('.');
        
        if (parts[0].length > 3) {
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        
        return parts[0] + '.' + parts[1];
      } else {
        let numStr = numValue.toFixed(2);
        const parts = numStr.split('.');
        
        if (parts[0].length > 3) {
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        
        return parts[0] + ',' + parts[1];
      }
    } catch (error) {
      return String(value);
    }
  };

  // Socket veri değişimini işler
  const handleReceivedData = (data, eventType) => {
    setLoading(false);
    setLastUpdate(new Date());
    lastRawData.current = data;
    
    if (eventType === 'price_changed') {
      try {
        if (data && data.data) {
          setReceivedRealData(true);
          
          const newHaremData = { ...haremData };
          
          Object.keys(data.data).forEach(apiCode => {
            const priceInfo = data.data[apiCode];
            const tableKey = codeMapping.current[apiCode];
            
            if (tableKey && newHaremData[tableKey]) {
              newHaremData[tableKey] = {
                alis: formatWithCustomDigits(priceInfo.alis, tableKey),
                satis: formatWithCustomDigits(priceInfo.satis, tableKey)
              };
            }
          });
          
          setHaremData(newHaremData);
        }
      } catch (error) {
        console.error('price_changed verisi işlenirken hata:', error);
      }
    }
  };

  // Demo veri oluşturur (gerçek veri yoksa)
  useEffect(() => {
    if (receivedRealData) return;
    
    const interval = setInterval(() => {
      const newPriceData = { ...priceData };
      
      Object.keys(newPriceData).forEach(key => {
        let baseValue;
        
        switch(key) {
          case 'HAS/TRY':
            baseValue = 4250 + Math.random() * 50;
            break;
          case 'ONS':
            baseValue = 3350 + Math.random() * 100;
            break;
          case 'Gramaltın':
            baseValue = 4200 + Math.random() * 50;
            break;
          case 'Gümüş TL':
            baseValue = 39 + Math.random() * 2;
            break;
          default:
            baseValue = 3500 + Math.random() * 500;
        }
        
        newPriceData[key].alis = formatWithCustomDigits(baseValue, key);
        newPriceData[key].satis = formatWithCustomDigits(baseValue * 1.01, key);
      });
      
      setPriceData(newPriceData);
      setLastUpdate(new Date());
    }, 15000);
    
    return () => clearInterval(interval);
  }, [receivedRealData, priceData]);

  // Son alınan veriyi gösterir
  const showLastReceivedData = () => {
    if (lastRawData.current) {
      alert('Son veri alındı.');
    } else {
      alert('Henüz veri alınmadı.');
    }
  };

  return (
    <div className="live-price-container">
      <HaremAltinSocket onDataReceived={handleReceivedData} />
      
      <div className="price-table-container">
        <div className="price-table-content">
          <div className="price-table-columns">
            <div className="product-column">
              <div className="column-header product-header">
                <button className="fiyat-alarm-button" onClick={showLastReceivedData}>
                  <FontAwesomeIcon icon={faSync} className="sync-icon" /> Veri Kontrol
                </button>
              </div>
              {Object.keys(priceData).map((key, index) => (
                <div key={index} className="row-item row-title">{key}</div>
              ))}
            </div>
            
            <div className="company-columns-container">
              {companyLogos.map((company, index) => {
                const isHarem = company.name.toLowerCase().includes('harem');
                
                return (
                  <div key={company.id} className={`company-price-column ${index % 2 === 0 ? 'column-odd' : 'column-even'} ${isHarem ? 'harem-column' : ''}`}>
                    <div className="column-header company-logo-header">
                      <img src={company.logo} alt={company.name} className="table-company-logo" />
                    </div>
                    
                    {Object.keys(priceData).map((key, rowIndex) => {
                      const displayData = isHarem ? haremData[key] : priceData[key];
                      
                      return (
                        <div key={rowIndex} className={`row-item price-row ${isHarem ? 'harem-data-row' : ''}`}>
                          <div className="price-cell">
                            <div className="price-label">Alış</div>
                            <div className={`price-value price-alis ${isHarem ? 'harem-price' : ''}`}>
                              {displayData.alis}
                            </div>
                          </div>
                          <div className="price-cell">
                            <div className="price-label">Satış</div>
                            <div className={`price-value price-satis ${isHarem ? 'harem-price' : ''}`}>
                              {displayData.satis}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePriceTable; 