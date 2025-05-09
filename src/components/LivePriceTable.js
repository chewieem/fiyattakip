import React, { useState, useEffect, useRef } from 'react';
import './MarketCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faSearch } from '@fortawesome/free-solid-svg-icons';

const LivePriceTable = ({ selectedCategory }) => {
  // E-Ticaret ürünleri
  const eCommerceProducts = [
    '1 gr külçe altın',
    '2 gr külçe altın',
    '2.5 gr külçe altın',
    '5 gr külçe altın',
    '10 gr külçe altın',
    '20 gr külçe altın',
    '25 gr külçe altın',
    '1 ons külçe',
    '50 gr külçe altın',
    'Çeyrek',
    'Yarım',
    'Tam',
    'Ata'
  ];
  
  // Bankalar ürünleri
  const bankProducts = [
    'USD',
    'EUR',
    'GBP',
    'CHF',
    'CAD',
    'AUD',
    'DKK',
    'SEK',
    'NOK',
    'JPY',
    'SAR',
    'AED'
  ];

  // Firma logoları
  const companyLogos = [
    { id: 1, name: 'Demas Kuyumculuk', logo: `${process.env.PUBLIC_URL}/images/companies/demas.png` },
    { id: 2, name: 'Harem Altın', logo: `${process.env.PUBLIC_URL}/images/companies/harem.png` },
    { id: 3, name: 'Rona Döviz', logo: `${process.env.PUBLIC_URL}/images/companies/rona.png` },
    { id: 4, name: 'Sağlamoğlu Kuyumculuk', logo: `${process.env.PUBLIC_URL}/images/companies/big-saglamoglu.svg` },
    { id: 5, name: 'Hakan Kuyumculuk', logo: `${process.env.PUBLIC_URL}/images/companies/hakan.png` },
    { id: 6, name: 'Ahlatcı Kuyumculuk', logo: `${process.env.PUBLIC_URL}/images/companies/ahlatcı.png` },
    
    // Banka logoları - İş Bankası ve Ziraat Bankası PNG, diğerleri SVG
    { id: 7, name: 'İş Bankası', logo: `${process.env.PUBLIC_URL}/images/banks/isbank.png`, logoClass: 'bank-logo-png' },
    { id: 8, name: 'Garanti Bankası', logo: `${process.env.PUBLIC_URL}/images/banks/garanti.svg`, logoClass: 'bank-logo-svg' },
    { id: 9, name: 'Yapı Kredi', logo: `${process.env.PUBLIC_URL}/images/banks/yapikredi.svg`, logoClass: 'bank-logo-svg' },
    { id: 10, name: 'Akbank', logo: `${process.env.PUBLIC_URL}/images/banks/akbank.svg`, logoClass: 'bank-logo-svg' },
    { id: 11, name: 'Ziraat Bankası', logo: `${process.env.PUBLIC_URL}/images/banks/ziraat.png`, logoClass: 'bank-logo-png' },
    { id: 12, name: 'Halkbank', logo: `${process.env.PUBLIC_URL}/images/banks/halkbank.svg`, logoClass: 'bank-logo-svg' },
  ];

  // Helper fonksiyon: Boş fiyat tablosu durumu oluşturur
  const createEmptyPriceState = () => {
    try {
      let products;
      
      if (selectedCategory === 2) {
        products = eCommerceProducts;
      } else if (selectedCategory === 3) {
        products = bankProducts;
      } else {
        products = [
          'HAS/TRY', 'ONS', 'Gramaltın', 'USD/KG', 'EUR/KG', 
          'Gümüş TL', 'Gümüş Ons', 'Gümüş USD', 'Çeyrek', 
          'Yarım', 'Tam', 'Ata'
        ];
      }
      
      const state = {};
      products.forEach(product => {
        state[product] = { alis: '---', satis: '---' };
      });
      
      return state;
    } catch (error) {
      console.error("createEmptyPriceState hatası:", error);
      // En azından boş bir obje döndür
      return {};
    }
  };

  // State tanımları
  const [priceData, setPriceData] = useState(createEmptyPriceState());
  const [haremData, setHaremData] = useState(createEmptyPriceState());
  const [ronaData, setRonaData] = useState(createEmptyPriceState());
  const [demasData, setDemasData] = useState(createEmptyPriceState());
  const [saglamogluData, setSaglamogluData] = useState(createEmptyPriceState());
  const [hakanData, setHakanData] = useState(createEmptyPriceState());
  const [ahlatciData, setAhlatciData] = useState(createEmptyPriceState());
  
  // Banka verileri
  const [isBankData, setIsBankData] = useState(createEmptyPriceState());
  const [garantiData, setGarantiData] = useState(createEmptyPriceState());
  const [yapikrediData, setYapikrediData] = useState(createEmptyPriceState());
  const [akbankData, setAkbankData] = useState(createEmptyPriceState());
  const [ziraatData, setZiraatData] = useState(createEmptyPriceState());
  const [halkbankData, setHalkbankData] = useState(createEmptyPriceState());
  
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const lastRawData = useRef(null);
  
  // Filtreleme state'leri
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  // Demo taban fiyatlar - firmalar için başlangıç değerleri
  const baseValues = useRef({
    demasBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4265,
      'ONS': 3375,
      'Gramaltın': 4230,
      'USD/KG': 110,
      'EUR/KG': 97,
      'Gümüş TL': 40.5,
      'Gümüş Ons': 29.5,
      'Gümüş USD': 1.15,
      'Çeyrek': 1380,
      'Yarım': 2760,
      'Tam': 5510,
      'Ata': 5530,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4235,
      '2 gr külçe altın': 8490,
      '2.5 gr külçe altın': 10620,
      '5 gr külçe altın': 21150,
      '10 gr külçe altın': 42320,
      '20 gr külçe altın': 84600,
      '25 gr külçe altın': 105900,
      '1 ons külçe': 105000,
      '50 gr külçe altın': 211800,
    },
    haremBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4255,
      'ONS': 3360,
      'Gramaltın': 4210,
      'USD/KG': 109,
      'EUR/KG': 96,
      'Gümüş TL': 40.2,
      'Gümüş Ons': 29.2,
      'Gümüş USD': 1.12,
      'Çeyrek': 1370,
      'Yarım': 2740,
      'Tam': 5480,
      'Ata': 5490,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4215,
      '2 gr külçe altın': 8450,
      '2.5 gr külçe altın': 10580,
      '5 gr külçe altın': 21090,
      '10 gr külçe altın': 42230,
      '20 gr külçe altın': 84420,
      '25 gr külçe altın': 105650,
      '1 ons külçe': 104800,
      '50 gr külçe altın': 211300,
    },
    saglamogluBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4270,
      'ONS': 3380,
      'Gramaltın': 4240,
      'USD/KG': 110.5,
      'EUR/KG': 97.5,
      'Gümüş TL': 41,
      'Gümüş Ons': 30,
      'Gümüş USD': 1.18,
      'Çeyrek': 1385,
      'Yarım': 2775,
      'Tam': 5525,
      'Ata': 5545,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4245,
      '2 gr külçe altın': 8510,
      '2.5 gr külçe altın': 10640,
      '5 gr külçe altın': 21220,
      '10 gr külçe altın': 42380,
      '20 gr külçe altın': 84780,
      '25 gr külçe altın': 106050,
      '1 ons külçe': 105200,
      '50 gr külçe altın': 212100,
    },
    hakanBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4262,
      'ONS': 3372,
      'Gramaltın': 4225,
      'USD/KG': 109.8,
      'EUR/KG': 96.8,
      'Gümüş TL': 40.8,
      'Gümüş Ons': 29.8,
      'Gümüş USD': 1.17,
      'Çeyrek': 1375,
      'Yarım': 2755,
      'Tam': 5505,
      'Ata': 5520,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4230,
      '2 gr külçe altın': 8480,
      '2.5 gr külçe altın': 10605,
      '5 gr külçe altın': 21125,
      '10 gr külçe altın': 42300,
      '20 gr külçe altın': 84550,
      '25 gr külçe altın': 105850,
      '1 ons külçe': 104950,
      '50 gr külçe altın': 211700,
    },
    ahlatciBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4258,
      'ONS': 3365,
      'Gramaltın': 4218,
      'USD/KG': 109.5,
      'EUR/KG': 96.5,
      'Gümüş TL': 40.3,
      'Gümüş Ons': 29.3,
      'Gümüş USD': 1.13,
      'Çeyrek': 1373,
      'Yarım': 2745,
      'Tam': 5485,
      'Ata': 5495,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4220,
      '2 gr külçe altın': 8460,
      '2.5 gr külçe altın': 10590,
      '5 gr külçe altın': 21100,
      '10 gr külçe altın': 42250,
      '20 gr külçe altın': 84500,
      '25 gr külçe altın': 105700,
      '1 ons külçe': 104850,
      '50 gr külçe altın': 211450,
    },
    ronaBase: {
      // Kapalı Çarşı Ürünleri
      'HAS/TRY': 4260,
      'ONS': 3370,
      'Gramaltın': 4220,
      'USD/KG': 109.7,
      'EUR/KG': 96.7,
      'Gümüş TL': 40.6,
      'Gümüş Ons': 29.7,
      'Gümüş USD': 1.16,
      'Çeyrek': 1377,
      'Yarım': 2750,
      'Tam': 5500,
      'Ata': 5515,
      
      // E-Ticaret Ürünleri
      '1 gr külçe altın': 4225,
      '2 gr külçe altın': 8470,
      '2.5 gr külçe altın': 10595,
      '5 gr külçe altın': 21110,
      '10 gr külçe altın': 42270,
      '20 gr külçe altın': 84530,
      '25 gr külçe altın': 105750,
      '1 ons külçe': 104900,
      '50 gr külçe altın': 211580,
    },
    // Banka kurları için taban değerler - İsim düzeltmesi
    isbankBase: {  // isBankBase -> isbankBase
      'USD': 31.45,
      'EUR': 33.85,
      'GBP': 39.75,
      'CHF': 35.25,
      'CAD': 23.15,
      'AUD': 20.85,
      'DKK': 4.55,
      'SEK': 3.05,
      'NOK': 2.95,
      'JPY': 0.21,
      'SAR': 8.35,
      'AED': 8.55
    },
    garantiBase: {
      'USD': 31.50,
      'EUR': 33.90,
      'GBP': 39.80,
      'CHF': 35.30,
      'CAD': 23.20,
      'AUD': 20.90,
      'DKK': 4.58,
      'SEK': 3.07,
      'NOK': 2.97,
      'JPY': 0.22,
      'SAR': 8.38,
      'AED': 8.58
    },
    yapikrediBase: {
      'USD': 31.48,
      'EUR': 33.87,
      'GBP': 39.77,
      'CHF': 35.27,
      'CAD': 23.17,
      'AUD': 20.87,
      'DKK': 4.56,
      'SEK': 3.06,
      'NOK': 2.96,
      'JPY': 0.215,
      'SAR': 8.36,
      'AED': 8.56
    },
    akbankBase: {
      'USD': 31.47,
      'EUR': 33.86,
      'GBP': 39.76,
      'CHF': 35.26,
      'CAD': 23.16,
      'AUD': 20.86,
      'DKK': 4.56,
      'SEK': 3.06,
      'NOK': 2.96,
      'JPY': 0.214,
      'SAR': 8.36,
      'AED': 8.56
    },
    ziraatBase: {
      'USD': 31.43,
      'EUR': 33.83,
      'GBP': 39.73,
      'CHF': 35.23,
      'CAD': 23.13,
      'AUD': 20.83,
      'DKK': 4.54,
      'SEK': 3.04,
      'NOK': 2.94,
      'JPY': 0.208,
      'SAR': 8.34,
      'AED': 8.54
    },
    halkbankBase: {
      'USD': 31.44,
      'EUR': 33.84,
      'GBP': 39.74,
      'CHF': 35.24,
      'CAD': 23.14,
      'AUD': 20.84,
      'DKK': 4.54,
      'SEK': 3.04,
      'NOK': 2.94,
      'JPY': 0.209,
      'SAR': 8.34,
      'AED': 8.54
    }
  });

  // Kategori değişince ve ilk yüklemede çalışacak efekt
  useEffect(() => {
    try {
      console.log("Kategori değişim efekti başladı:", selectedCategory);
      
      // Sayfa başa kaydırılır
      window.scrollTo(0, 0);
      
      // Kategori seçimine göre doğru firma ve ürün seti gösterilir
      let allCompanies = [];
      
      if (selectedCategory === 3) {
        // Bankalar kategorisi seçildiğinde, banka IDlerini göster (7-12)
        allCompanies = companyLogos.filter(company => company.id >= 7 && company.id <= 12).map(c => c.id);
      } else {
        // Diğer kategorilerde kuyumcu IDlerini göster (1-6)
        allCompanies = companyLogos.filter(company => company.id >= 1 && company.id <= 6).map(c => c.id);
      }
      
      // Varsayılan olarak hiçbir firma seçili olmasın (hepsini göster)
      setSelectedCompanies([]);
      
      // Filterlanmış ürünleri de güncelle
      setFilteredProducts(Object.keys(createEmptyPriceState()));
      
      // Kategori değişikliğinde varsayılan sırlamaya dön
      setSortOrder('default');
      
      // Arama kutusunu temizle
      setFilterText('');
      
      // Tüm firmaların verilerini güncelle
      updateAllData();
      
      console.log("Kategori değişim efekti tamamlandı");
    } catch (error) {
      console.error("Kategori değişim efekti hatası:", error);
    }
  }, [selectedCategory]);

  // Demo verileri oluşturan fonksiyon
  const updateAllData = () => {
    try {
      console.log("updateAllData başlatıldı");
      
      // Kuyumcu verilerini güncelle
      updateDemoData(baseValues, 'demas', setDemasData);
      updateDemoData(baseValues, 'harem', setHaremData);
      updateDemoData(baseValues, 'rona', setRonaData);
      updateDemoData(baseValues, 'saglamoglu', setSaglamogluData);
      updateDemoData(baseValues, 'hakan', setHakanData);
      updateDemoData(baseValues, 'ahlatci', setAhlatciData);
      
      // Banka verilerini güncelle
      updateDemoData(baseValues, 'isbank', setIsBankData);
      updateDemoData(baseValues, 'garanti', setGarantiData);
      updateDemoData(baseValues, 'yapikredi', setYapikrediData);
      updateDemoData(baseValues, 'akbank', setAkbankData);
      updateDemoData(baseValues, 'ziraat', setZiraatData);
      updateDemoData(baseValues, 'halkbank', setHalkbankData);
      
      // Varsayılan fiyat verisi olarak kullanılacak veriyi seç
      setPriceData(selectedCategory === 3 ? isBankData : demasData);
      
      // Son güncelleme zamanını güncelle
      setLastUpdate(new Date());
      
      console.log("updateAllData tamamlandı");
    } catch (error) {
      console.error("updateAllData hatası:", error);
    }
  };

  // Periyodik veri güncellemesi
  useEffect(() => {
    try {
      console.log("Periyodik güncelleme başlatılıyor");
      
      // İlk yükleme için tüm verileri güncelle
      updateAllData();
      setLoading(false);
      
      // Her 3 saniyede bir rastgele veri güncellemesi
      const interval = setInterval(() => {
        try {
          if (selectedCategory === 3) {
            // Bankalar için rastgele güncelleme
            const bankIndex = Math.floor(Math.random() * 6);
            const banks = ['isbank', 'garanti', 'yapikredi', 'akbank', 'ziraat', 'halkbank'];
            const setters = [setIsBankData, setGarantiData, setYapikrediData, setAkbankData, setZiraatData, setHalkbankData];
            
            updateDemoData(baseValues, banks[bankIndex], setters[bankIndex]);
          } else {
            // Kuyumcular için rastgele güncelleme
            const firmIndex = Math.floor(Math.random() * 6);
            const firms = ['demas', 'harem', 'saglamoglu', 'hakan', 'ahlatci', 'rona'];
            const setters = [setDemasData, setHaremData, setSaglamogluData, setHakanData, setAhlatciData, setRonaData];
            
            updateDemoData(baseValues, firms[firmIndex], setters[firmIndex]);
          }
          
          setLastUpdate(new Date());
        } catch (error) {
          console.error("Periyodik güncelleme hatası:", error);
        }
      }, 3000);
      
      return () => {
        console.log("Periyodik güncelleme durduruluyor");
        clearInterval(interval);
      };
    } catch (error) {
      console.error("Periyodik güncelleme başlatma hatası:", error);
    }
  }, [selectedCategory]);

  // Rastgele varyasyon üreten yardımcı fonksiyon - değişim miktarını kontrol eder
  const generateVariation = (maxChange = 0.05) => {
    // -maxChange ile +maxChange arasında rastgele bir değer (yüzde olarak)
    return (Math.random() * maxChange * 2 - maxChange) / 100;
  };
  
  // Veri güncelleyici - firmaya özel değerleri hesaplar
  const updateDemoData = (baseValuesRef, firmName, setter) => {
    try {
      const newData = { ...createEmptyPriceState() };
      const firmBaseName = `${firmName}Base`;
      
      // baseValues referansını doğru şekilde al
      const baseValueObj = baseValuesRef.current || baseValuesRef;
      
      if (!baseValueObj) {
        console.error("Base değer objesi bulunamadı");
        return;
      }
      
      const bases = baseValueObj[firmBaseName];
      
      if (!bases) {
        console.error(`Base değeri bulunamadı: ${firmBaseName}`);
        return;
      }
      
      // Tüm ürünleri işle
      Object.keys(newData).forEach(key => {
        if (bases[key]) {
          // Mevcut değere rastgele bir varyasyon ekle (±%0.05 arası)
          const variation = generateVariation();
          const baseValue = bases[key] * (1 + variation);
          
          // Alış ve satış fiyatlarını hesapla ve formatla
          newData[key].alis = formatWithCustomDigits(baseValue, key);
          // Satış fiyatı her zaman alıştan biraz daha yüksek
          newData[key].satis = formatWithCustomDigits(baseValue * (1 + 0.002 + Math.random() * 0.003), key);
        }
      });
      
      // State'i güncelle
      setter(newData);
    } catch (error) {
      console.error(`updateDemoData hatası (${firmName}):`, error);
    }
  };

  // Ürün tipine göre fiyat formatlamayı yapar
  const formatWithCustomDigits = (value, key) => {
    if (value === undefined || value === null || value === '') return '---';
    
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
      return '---';
    }
  };

  // Son alınan veriyi gösterir
  const showLastReceivedData = () => {
    alert('Güncel fiyatlar gösteriliyor.');
  };

  // Filtre fonksiyonları
  const toggleCompanyFilter = (companyId) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyId)) {
        return prev.filter(id => id !== companyId);
      } else {
        return [...prev, companyId];
      }
    });
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  const changeSortOrder = (order) => {
    setSortOrder(order);
  };

  // Filtrelenmiş ve sıralanmış ürünleri hesapla
  useEffect(() => {
    let filtered = Object.keys(priceData);
    
    // Metin filtreleme
    if (filterText) {
      const searchTerm = filterText.toLowerCase();
      filtered = filtered.filter(product => 
        product.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sıralama
    if (sortOrder === 'asc') {
      filtered.sort();
    } else if (sortOrder === 'desc') {
      filtered.sort().reverse();
    } else if (sortOrder === 'priceAsc') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(demasData[a].alis.replace('.', '').replace(',', '.'));
        const priceB = parseFloat(demasData[b].alis.replace('.', '').replace(',', '.'));
        return !isNaN(priceA) && !isNaN(priceB) ? priceA - priceB : 0;
      });
    } else if (sortOrder === 'priceDesc') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(demasData[a].alis.replace('.', '').replace(',', '.'));
        const priceB = parseFloat(demasData[b].alis.replace('.', '').replace(',', '.'));
        return !isNaN(priceA) && !isNaN(priceB) ? priceB - priceA : 0;
      });
    }
    
    setFilteredProducts(filtered);
  }, [filterText, sortOrder, priceData, demasData]);

  // İlk yükleme için tüm filtreleri temizle
  useEffect(() => {
    setFilteredProducts(Object.keys(priceData));
    setSelectedCompanies([]);
  }, [priceData]);

  return (
    <div className="live-price-container animated-content">
      {/* Filtre Paneli */}
      <div className="price-filter-panel">
        <div className="filter-controls">
          <div className="filter-row">
            <div className="filter-group">
              <div className="filter-label">Ürün Ara:</div>
              <div className="search-box">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Ürün adı ile ara..." 
                  value={filterText}
                  onChange={handleFilterTextChange}
                  className="filter-input"
                />
              </div>
            </div>
            
            <div className="filter-group">
              <div className="filter-label">Sırala:</div>
              <select 
                className="sort-select" 
                value={sortOrder}
                onChange={(e) => changeSortOrder(e.target.value)}
              >
                <option value="default">Varsayılan</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="priceAsc">Fiyat (Düşükten Yükseğe)</option>
                <option value="priceDesc">Fiyat (Yüksekten Düşüğe)</option>
              </select>
            </div>
            
            <div className="filter-actions">
              <button 
                className="filter-clear-button"
                onClick={() => {
                  setFilterText('');
                  setSelectedCompanies([]);
                  setSortOrder('default');
                }}
              >
                Filtreleri Temizle
              </button>
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group company-filter-group">
              <div className="filter-label">Firmalar:</div>
              <div className="company-filters">
                {/* Kategori tipine göre ilgili firmaları göster */}
                {companyLogos
                  .filter(company => {
                    if (selectedCategory === 3) {
                      // Bankalar kategorisinde sadece banka logolarını göster (id 7-12)
                      return company.id >= 7 && company.id <= 12;
                    } else {
                      // Diğer kategorilerde sadece kuyumcu/döviz bürosu logolarını göster (id 1-6)
                      return company.id >= 1 && company.id <= 6;
                    }
                  })
                  .map(company => (
                    <div 
                      key={company.id} 
                      className={`company-filter-item ${selectedCompanies.includes(company.id) ? 'selected' : ''}`}
                      onClick={() => toggleCompanyFilter(company.id)}
                    >
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className={`company-filter-logo ${company.logoClass || ''}`} 
                      />
                      <div className="company-filter-name">{company.name}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="price-table-container">
        <div className="price-table-content">
          <div className="price-table-columns">
            <div className="product-column">
              <div className="column-header product-header">
                <button className="fiyat-alarm-button" onClick={showLastReceivedData}>
                  <FontAwesomeIcon icon={faSync} className="sync-icon" /> Veri Kontrol
                </button>
              </div>
              {filteredProducts.map((key, index) => (
                <div key={index} className="row-item row-title">{key}</div>
              ))}
            </div>
            
            <div className="company-columns-container">
              {/* Eğer hiçbir firma seçilmediyse, kategori tipine göre ilgili firmaları göster */}
              {(selectedCompanies.length === 0 
                ? companyLogos.filter(company => {
                    if (selectedCategory === 3) {
                      return company.id >= 7 && company.id <= 12;
                    } else {
                      return company.id >= 1 && company.id <= 6;
                    }
                  }) 
                : companyLogos.filter(company => selectedCompanies.includes(company.id)))
                .map((company, index) => {
                  const isDemas = company.name.toLowerCase().includes('demas');
                  const isHarem = company.name.toLowerCase().includes('harem');
                  const isRona = company.name.toLowerCase().includes('rona');
                  const isSaglamoglu = company.name.toLowerCase().includes('sağlamoğlu');
                  const isHakan = company.name.toLowerCase().includes('hakan');
                  const isAhlatci = company.name.toLowerCase().includes('ahlatcı');
                  
                  // E-ticaret için daha dar kolonlar kullan
                  const columnClass = selectedCategory === 2 ? 'eticaret-column' : '';
                  
                  // Firma tipine göre özel sınıf ekle
                  const bankClass = company.id >= 7 ? `bank-column ${company.logoClass || ''}` : '';
                  
                  // Firmaları eşit genişlikte göstermek için stil hesaplaması
                  const colCount = (selectedCompanies.length === 0 
                    ? (selectedCategory === 3 ? 6 : 6) // Kategori bazında firma sayısı
                    : selectedCompanies.length);
                  const flexStyle = { flex: `1 1 ${100 / colCount}%` };
                  
                  return (
                    <div 
                      key={company.id} 
                      style={flexStyle}
                      className={`company-price-column ${columnClass} ${bankClass} ${index % 2 === 0 ? 'column-odd' : 'column-even'} ${isHarem ? 'harem-column' : ''} ${isRona ? 'rona-column' : ''} ${isDemas ? 'demas-column' : ''} ${isSaglamoglu ? 'saglamoglu-column' : ''}`}
                    >
                      <div className="column-header company-logo-header">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className={`table-company-logo ${company.logoClass || ''}`} 
                        />
                      </div>
                      
                      {filteredProducts.map((key, rowIndex) => {
                        // Firma tipine göre doğru veri kaynağını seç
                        let displayData;
                        
                        try {
                          if (selectedCategory === 3) {
                            // Banka verilerini seç
                            const isIsBank = company.name.toLowerCase().includes('iş bank');
                            const isGaranti = company.name.toLowerCase().includes('garanti');
                            const isYapikredi = company.name.toLowerCase().includes('yapı kredi');
                            const isAkbank = company.name.toLowerCase().includes('akbank');
                            const isZiraat = company.name.toLowerCase().includes('ziraat');
                            const isHalkbank = company.name.toLowerCase().includes('halkbank');
                            
                            if (isIsBank && isBankData && isBankData[key]) {
                              displayData = isBankData[key];
                            } else if (isGaranti && garantiData && garantiData[key]) {
                              displayData = garantiData[key];
                            } else if (isYapikredi && yapikrediData && yapikrediData[key]) {
                              displayData = yapikrediData[key];
                            } else if (isAkbank && akbankData && akbankData[key]) {
                              displayData = akbankData[key];
                            } else if (isZiraat && ziraatData && ziraatData[key]) {
                              displayData = ziraatData[key];
                            } else if (isHalkbank && halkbankData && halkbankData[key]) {
                              displayData = halkbankData[key];
                            }
                          } else {
                            // Kuyumcu verilerini seç
                            const isDemas = company.name.toLowerCase().includes('demas');
                            const isHarem = company.name.toLowerCase().includes('harem');
                            const isRona = company.name.toLowerCase().includes('rona');
                            const isSaglamoglu = company.name.toLowerCase().includes('sağlamoğlu');
                            const isHakan = company.name.toLowerCase().includes('hakan');
                            const isAhlatci = company.name.toLowerCase().includes('ahlatcı');
                            
                            if (isDemas && demasData && demasData[key]) {
                              displayData = demasData[key];
                            } else if (isHarem && haremData && haremData[key]) {
                              displayData = haremData[key];
                            } else if (isRona && ronaData && ronaData[key]) {
                              displayData = ronaData[key];
                            } else if (isSaglamoglu && saglamogluData && saglamogluData[key]) {
                              displayData = saglamogluData[key];
                            } else if (isHakan && hakanData && hakanData[key]) {
                              displayData = hakanData[key];
                            } else if (isAhlatci && ahlatciData && ahlatciData[key]) {
                              displayData = ahlatciData[key];
                            }
                          }
                        } catch (error) {
                          console.error("Veri seçme hatası:", error);
                        }
                        
                        if (!displayData) {
                          displayData = { alis: '---', satis: '---' };
                        }
                        
                        return (
                          <div key={rowIndex} className={`row-item price-row ${rowIndex % 2 === 0 ? 'row-even' : 'row-odd'}`}>
                            <div className="price-cell">
                              <div className="price-label">Alış</div>
                              <div className="price-value price-alis">
                                {displayData.alis}
                              </div>
                            </div>
                            <div className="price-cell">
                              <div className="price-label">Satış</div>
                              <div className="price-value price-satis">
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