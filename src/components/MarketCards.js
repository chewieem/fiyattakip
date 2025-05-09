import React, { useState, useEffect } from 'react';
import './MarketCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faSync, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function MarketCards({ selectedCategory }) {
  const [bestPrices, setBestPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  // Demo taban fiyatlar - firmalar için başlangıç değerleri
  const initialData = {
    demas: {
      'Gramaltın': { alis: '4.230,00', satis: '4.250,00' },
      'Gümüş TL': { alis: '40.500', satis: '41.200' },
      'USD': { alis: '31,45', satis: '31,60' },
      'EUR': { alis: '33,85', satis: '34,00' },
      'Çeyrek': { alis: '1.380,00', satis: '1.400,00' },
      'TAM': { alis: '5.510,00', satis: '5.550,00' }
    },
    harem: {
      'Gramaltın': { alis: '4.210,00', satis: '4.230,00' },
      'Gümüş TL': { alis: '40.200', satis: '40.900' },
      'USD': { alis: '31,43', satis: '31,58' },
      'EUR': { alis: '33,80', satis: '33,95' },
      'Çeyrek': { alis: '1.370,00', satis: '1.390,00' },
      'TAM': { alis: '5.480,00', satis: '5.520,00' }
    },
    saglamoglu: {
      'Gramaltın': { alis: '4.240,00', satis: '4.260,00' },
      'Gümüş TL': { alis: '41.000', satis: '41.700' },
      'USD': { alis: '31,48', satis: '31,63' },
      'EUR': { alis: '33,91', satis: '34,06' },
      'Çeyrek': { alis: '1.385,00', satis: '1.405,00' },
      'TAM': { alis: '5.525,00', satis: '5.565,00' }
    },
    hakan: {
      'Gramaltın': { alis: '4.225,00', satis: '4.245,00' },
      'Gümüş TL': { alis: '40.800', satis: '41.500' },
      'USD': { alis: '31,44', satis: '31,59' },
      'EUR': { alis: '33,82', satis: '33,97' },
      'Çeyrek': { alis: '1.375,00', satis: '1.395,00' },
      'TAM': { alis: '5.505,00', satis: '5.545,00' }
    },
    ahlatci: {
      'Gramaltın': { alis: '4.218,00', satis: '4.238,00' },
      'Gümüş TL': { alis: '40.300', satis: '41.000' },
      'USD': { alis: '31,42', satis: '31,57' },
      'EUR': { alis: '33,78', satis: '33,93' },
      'Çeyrek': { alis: '1.373,00', satis: '1.393,00' },
      'TAM': { alis: '5.485,00', satis: '5.525,00' }
    },
    rona: {
      'Gramaltın': { alis: '4.220,00', satis: '4.240,00' },
      'Gümüş TL': { alis: '40.600', satis: '41.300' },
      'USD': { alis: '31,46', satis: '31,61' },
      'EUR': { alis: '33,86', satis: '34,01' },
      'Çeyrek': { alis: '1.377,00', satis: '1.397,00' },
      'TAM': { alis: '5.500,00', satis: '5.540,00' }
    }
  };

  const [firmaVerileri, setFirmaVerileri] = useState(initialData);

  // Fiyat karşılaştırma için string'i sayıya dönüştür
  const parsePrice = (priceStr) => {
    try {
      return parseFloat(priceStr.replace('.', '').replace(',', '.'));
    } catch (error) {
      console.error('Fiyat ayrıştırma hatası:', error);
      return Infinity;
    }
  };

  // En iyi fiyatları hesapla
  const calculateBestPrices = () => {
    try {
      console.log("En iyi fiyatlar hesaplanıyor...");
      
      const enIyiFiyatlar = {};
      // Kartlarda kullanılan ürün kodları
      const urunler = ['Gramaltın', 'Gümüş TL', 'USD', 'EUR', 'Çeyrek', 'TAM'];
      
      urunler.forEach(urun => {
        let enIyiFiyat = Infinity;
        let enIyiFirma = '';
        let enIyiFiyatObj = null;
        
        // Tüm firmaları dön ve en iyi fiyatı bul
        Object.keys(firmaVerileri).forEach(firma => {
          const firmaVeri = firmaVerileri[firma];
          if (firmaVeri && firmaVeri[urun]) {
            const fiyat = parsePrice(firmaVeri[urun].alis);
            console.log(`${firma} - ${urun}: ${fiyat}`);
            
            if (!isNaN(fiyat) && fiyat < enIyiFiyat) {
              enIyiFiyat = fiyat;
              enIyiFirma = firma;
              enIyiFiyatObj = firmaVeri[urun];
              console.log(`Yeni en iyi fiyat: ${firma} - ${fiyat}`);
            }
          }
        });
        
        // Önceki en iyi fiyat ile karşılaştır
        const oncekiEnIyiFiyat = bestPrices[urun] ? bestPrices[urun] : null;
        
        if (enIyiFirma && enIyiFiyatObj) {
          const yeniFiyat = {
            firma: enIyiFirma,
            alis: enIyiFiyatObj.alis,
            satis: enIyiFiyatObj.satis,
            degisim: 'sabit' // default değer
          };
          
          if (oncekiEnIyiFiyat) {
            // Fiyat değişimini karşılaştır
            const oncekiFiyat = parsePrice(oncekiEnIyiFiyat.alis);
            
            if (enIyiFiyat < oncekiFiyat) {
              yeniFiyat.degisim = 'dustu';
            } else if (enIyiFiyat > oncekiFiyat) {
              yeniFiyat.degisim = 'artti';
            }
            
            // Firma değişimi olduysa bildir
            if (oncekiEnIyiFiyat.firma !== enIyiFirma) {
              yeniFiyat.firmaDeğişti = true;
            }
          }
          
          enIyiFiyatlar[urun] = yeniFiyat;
          console.log(`En iyi fiyat kaydedildi: ${urun} - ${enIyiFirma}`);
        } else {
          console.log(`${urun} için en iyi fiyat bulunamadı`);
        }
      });
      
      console.log("Hesaplanan en iyi fiyatlar:", enIyiFiyatlar);
      setBestPrices(enIyiFiyatlar);
      setLoading(false);
    } catch (error) {
      console.error("En iyi fiyat hesaplama hatası:", error);
    }
  };

  // Rastgele fiyat değişimi oluştur
  const generatePriceVariation = (basePrice, percentRange = 0.05) => {
    // %0.05 civarında rastgele değişim
    const variation = (Math.random() * percentRange * 2 - percentRange) / 100;
    const newPrice = basePrice * (1 + variation);
    return newPrice;
  };

  // Fiyatları güncelle
  const updatePrices = () => {
    setUpdateCount(prev => prev + 1);
    
    const updatedData = { ...firmaVerileri };
    
    // Rastgele bir firma seç
    const firms = Object.keys(firmaVerileri);
    const randomFirm = firms[Math.floor(Math.random() * firms.length)];
    
    console.log(`Fiyat güncellemesi yapılıyor: ${randomFirm}`);
    
    // Seçilen firmanın fiyatlarını güncelle
    const firmData = { ...updatedData[randomFirm] };
    
    Object.keys(firmData).forEach(urun => {
      const currentAlisPrice = parsePrice(firmData[urun].alis);
      const currentSatisPrice = parsePrice(firmData[urun].satis);
      
      if (!isNaN(currentAlisPrice) && !isNaN(currentSatisPrice)) {
        const newAlisPrice = generatePriceVariation(currentAlisPrice);
        const newSatisPrice = newAlisPrice * 1.005; // %0.5 alış-satış farkı
        
        // Fiyat formatını doğru şekilde ayarla
        let alisFormat, satisFormat;
        
        if (urun === 'Gümüş TL') {
          alisFormat = newAlisPrice.toFixed(3).replace('.', ',');
          satisFormat = newSatisPrice.toFixed(3).replace('.', ',');
        } else if (urun === 'USD' || urun === 'EUR') {
          alisFormat = newAlisPrice.toFixed(2).replace('.', ',');
          satisFormat = newSatisPrice.toFixed(2).replace('.', ',');
        } else {
          // Binlik ayırıcı ekle
          alisFormat = newAlisPrice.toFixed(2)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            
          satisFormat = newSatisPrice.toFixed(2)
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        
        firmData[urun] = {
          alis: alisFormat,
          satis: satisFormat
        };
      }
    });
    
    updatedData[randomFirm] = firmData;
    setFirmaVerileri(updatedData);
  };

  // İlk yükleme ve periyodik güncelleme
  useEffect(() => {
    // İlk kez en iyi fiyatları hesapla
    calculateBestPrices();
    
    // Her 5 saniyede bir fiyatları güncelle
    const interval = setInterval(() => {
      updatePrices();
      // Fiyat güncellemesinden sonra en iyi fiyatları yeniden hesapla
      setTimeout(() => {
        calculateBestPrices();
      }, 100);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Firma verileri değiştiğinde en iyi fiyatları yeniden hesapla
  useEffect(() => {
    calculateBestPrices();
  }, [firmaVerileri]);

  // Firma logoları
  const companyLogos = {
    'demas': `${process.env.PUBLIC_URL}/images/companies/demas.png`,
    'harem': `${process.env.PUBLIC_URL}/images/companies/harem.png`,
    'saglamoglu': `${process.env.PUBLIC_URL}/images/companies/big-saglamoglu.svg`,
    'hakan': `${process.env.PUBLIC_URL}/images/companies/hakan.png`,
    'ahlatci': `${process.env.PUBLIC_URL}/images/companies/ahlatcı.png`,
    'rona': `${process.env.PUBLIC_URL}/images/companies/rona.png`
  };

  // Tüm marketler - dinamik olarak en iyi fiyatlarla güncellenir
  const allMarkets = [
    {
      id: 1,
      title: 'GRAM ALTIN',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/gold.png`,
      product: 'Gramaltın'
    },
    {
      id: 2,
      title: 'GÜMÜŞ',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/silver.png`,
      product: 'Gümüş TL'
    },
    {
      id: 3,
      title: 'DOLAR',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/dolar.png`,
      product: 'USD'
    },
    {
      id: 4,
      title: 'EURO',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/euro.png`,
      product: 'EUR'
    },
    {
      id: 5,
      title: 'ÇEYREK ALTIN',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/ziynet.png`,
      product: 'Çeyrek'
    },
    {
      id: 6,
      title: 'TAM ALTIN',
      timeInfo: 'Güncel',
      icon: `${process.env.PUBLIC_URL}/images/prices/tam.png`,
      product: 'TAM'
    }
  ];

  // Firma isimlerini daha güzel formatla
  const formatCompanyName = (name) => {
    const nameMap = {
      'demas': 'Demas Kuyumculuk',
      'harem': 'Harem Altın',
      'saglamoglu': 'Sağlamoğlu',
      'hakan': 'Hakan Kuyumculuk',
      'ahlatci': 'Ahlatcı Kuyumculuk',
      'rona': 'Rona Döviz'
    };
    
    return nameMap[name] || name;
  };

  console.log("Render edilecek bestPrices:", bestPrices);

  return (
    <div className="market-cards animated-content">
      {allMarkets.map(market => {
        const bestPrice = bestPrices[market.product];
        console.log(`Kart ${market.title} için bestPrice:`, bestPrice);
        
        return (
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
            
              {loading ? (
                <div className="price-table loading">
                  <div className="loading-message">Fiyatlar Yükleniyor...</div>
                </div>
              ) : bestPrice ? (
                <div className="price-table" key={`best-${market.product}-${updateCount}`}>
                  <div className="company-info">
                    <img src={companyLogos[bestPrice.firma]} alt={formatCompanyName(bestPrice.firma)} className="company-logo" />
                    <div className="company-name">{formatCompanyName(bestPrice.firma)}</div>
              </div>
              <div className="price-columns">
                <div className="price-column-label">
                  <div className="price-label">Alış</div>
                      <div 
                        className={`price-value alis ${bestPrice.degisim === 'dustu' ? 'price-decreased' : 
                                                 bestPrice.degisim === 'artti' ? 'price-increased' : ''}`}
                      >
                        {bestPrice.alis}
                        {bestPrice.degisim === 'dustu' && <FontAwesomeIcon icon={faArrowDown} className="price-change-icon down" />}
                        {bestPrice.degisim === 'artti' && <FontAwesomeIcon icon={faArrowUp} className="price-change-icon up" />}
                      </div>
                    </div>
                    <div className="price-column-label">
                      <div className="price-label">Satış</div>
                      <div className="price-value satis">
                        {bestPrice.satis}
                      </div>
                    </div>
                  </div>
                  {bestPrice.firmaDeğişti && (
                    <div className="company-changed-badge">
                      En Uygun Firma Değişti
                    </div>
                  )}
                </div>
              ) : (
                <div className="price-table">
                  <div className="company-info">
                    <div className="loading-message">Veri Bulunamadı</div>
                  </div>
                  <div className="price-columns">
                    <div className="price-column-label">
                      <div className="price-label">Alış</div>
                      <div className="price-value alis">---</div>
                </div>
                <div className="price-column-label">
                  <div className="price-label">Satış</div>
                      <div className="price-value satis">---</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default MarketCards; 