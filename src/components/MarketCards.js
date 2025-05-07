import React from 'react';
import './MarketCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSync, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function MarketCards({ selectedCategory }) {
  // Tüm marketler
  const allMarkets = [
    {
      id: 1,
      title: 'GRAM ALTIN',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/gold.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/big-saglamoglu.svg`,
      category: 1 // Kapalı Çarşı
    },
    {
      id: 2,
      title: 'GÜMÜŞ',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/silver.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/ahlatcı.png`,
      category: 1 // Kapalı Çarşı
    },
    {
      id: 3,
      title: 'DOLAR',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/dolar.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/harem.png`,
      category: 4 // Döviz Büroları
    },
    {
      id: 4,
      title: 'EURO',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/euro.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/demas.png`,
      category: 4 // Döviz Büroları
    },
    {
      id: 5,
      title: 'ÇEYREK ALTIN',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/ziynet.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/rona.png`,
      category: 1 // Kapalı Çarşı
    },
    {
      id: 6,
      title: 'BTC USDT',
      timeInfo: '15 : 00 / Dün',
      alis: '3.035,46',
      satis: '3.035,46',
      icon: `${process.env.PUBLIC_URL}/images/prices/coin.png`,
      logo: `${process.env.PUBLIC_URL}/images/companies/hakan.png`,
      category: 2 // E-Ticaret
    }
  ];

  // Tablo satırları için ekstra veriler
  const tableRowsData = [
    { id: 1, title: 'HAS/TRY', alis: '3.035,46', satis: '3.035,46' },
    { id: 2, title: 'ALTIN/USD', alis: '3.035,46', satis: '3.035,46' },
    { id: 3, title: 'ONS', alis: '2.639,19', satis: '3.035,46' },
    { id: 4, title: 'Gramaltın', alis: '33.637', satis: '3.035,46' },
    { id: 5, title: 'USD/KG', alis: '3.035,46', satis: '3.035,46' },
    { id: 6, title: 'EUR/KG', alis: '3.035,46', satis: '3.035,46' },
    { id: 7, title: 'Gümüş TL', alis: '3.035,46', satis: '3.035,46' },
    { id: 8, title: 'Gümüş Ons', alis: '0.952', satis: '3.035,46' },
    { id: 9, title: 'Gümüş USD', alis: '3.035,46', satis: '3.035,46' },
    { id: 10, title: 'Çeyrek', alis: '3.035,46', satis: '3.035,46' },
    { id: 11, title: 'Yarım', alis: '3.035,46', satis: '3.035,46' },
    { id: 12, title: 'Tam', alis: '3.035,46', satis: '3.035,46' },
    { id: 13, title: 'Ata', alis: '3.035,46', satis: '3.035,46' }
  ];

  // Firma logoları
  const companyLogos = [
    { id: 1, logo: `${process.env.PUBLIC_URL}/images/companies/demas.png`, name: 'demas a.s.' },
    { id: 2, logo: `${process.env.PUBLIC_URL}/images/companies/harem.png`, name: 'harem a.s.' },
    { id: 3, logo: `${process.env.PUBLIC_URL}/images/companies/big-saglamoglu.svg`, name: 'sağlamoğlu' },
    { id: 4, logo: `${process.env.PUBLIC_URL}/images/companies/hakan.png`, name: 'hakan a.s.' },
    { id: 5, logo: `${process.env.PUBLIC_URL}/images/companies/ahlatcı.png`, name: 'ahlatcı a.s.' },
    { id: 6, logo: `${process.env.PUBLIC_URL}/images/companies/rona.png`, name: 'rona a.s.' }
  ];

  // Seçilen kategoriye göre marketleri filtreleme
  const filteredMarkets = selectedCategory 
    ? allMarkets.filter(market => market.category === selectedCategory) 
    : allMarkets;

  // Sonuç yoksa veya kategori seçilmediyse tüm marketleri göster
  const marketsToDisplay = filteredMarkets.length > 0 ? filteredMarkets : allMarkets;

  // Kapalı Çarşı kategorisi seçilmişse özel sınıf ekle
  const containerClassName = selectedCategory === 1 ? 'market-cards kapali-carsi' : 'market-cards';

  // Kapalı Çarşı kategorisi için tablo formatında, diğerleri için kart formatında göster
  if (selectedCategory === 1) {
    return (
      <div className="price-table-container">
        <div className="price-table-content">
          <div className="price-table-columns">
            {/* Ürün isimleri kolonu */}
            <div className="product-column">
              <div className="column-header product-header">
                <button className="fiyat-alarm-button">
                  <FontAwesomeIcon icon={faSync} className="sync-icon" /> Fiyat Alarm
                </button>
              </div>
              {tableRowsData.map(row => (
                <div key={row.id} className="row-item row-title">{row.title}</div>
              ))}
            </div>
            
            <div className="company-columns-container">
              {/* Şirket kolonları */}
              {companyLogos.map((company, index) => (
                <div key={company.id} className={`company-price-column ${index % 2 === 0 ? 'column-odd' : 'column-even'}`}>
                  <div className="column-header company-logo-header">
                    <img src={company.logo} alt={company.name} className="table-company-logo" />
                  </div>
                  
                  {tableRowsData.map(row => (
                    <div key={row.id} className="row-item price-row">
                      <div className="price-cell">
                        <div className="price-label">Alış</div>
                        <div className="price-value price-alis">{row.alis}</div>
                      </div>
                      <div className="price-cell">
                        <div className="price-label">Satış</div>
                        <div className="price-value price-satis">{row.satis}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {marketsToDisplay.map(market => (
        <div key={market.id} className="market-card">
          <div className="market-header">
            <img src={market.icon} alt={market.title} className="market-icon" />
            <div className="market-title-info">
              <div className="market-title">{market.title}</div>
              <div className="market-analyst">
                <FontAwesomeIcon icon={faChartLine} className="chart-icon" />
                <div className="analyst-time">Güncel Fiyatlar</div>
              </div>
            </div>
          </div>
          
          <div className="market-info-box">
            <div className="market-button-container">
              <button className="en-uygun-fiyat">EN UYGUN FİYAT</button>
            </div>
            
            <div className="price-table">
              <div className="company-logo-container">
                <img src={market.logo} alt="Logo" className="company-logo" />
              </div>
              <div className="price-columns">
                <div className="price-column-label">
                  <div className="price-label">Alış</div>
                  <div className="price-value alis">{market.alis}</div>
                </div>
                <div className="price-column-label">
                  <div className="price-label">Satış</div>
                  <div className="price-value satis">{market.satis}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketCards; 