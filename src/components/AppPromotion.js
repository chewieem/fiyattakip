import React from 'react';
import './AppPromotion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function AppPromotion() {
  return (
    <div className="promotion-container">
      {/* Sol taraf - Uygulama Tanıtımı */}
      <div className="app-promotion">
        <div className="app-left-content">
          <div className="app-info">
            <h2>Fiyat Borsası</h2>
            <div className="aninda-cebinde">Anında Cebinde!</div>
            
            <div className="app-badges">
              <a href="#" className="app-badge">
                <img src="/images/footer/google-play-white.png" alt="Google Play'den İndir" />
              </a>
              <a href="#" className="app-badge">
                <img src="/images/footer/app-store-white.png" alt="App Store'dan İndir" />
              </a>
            </div>
          </div>
          
          <div className="app-phone-container">
            <img src="/images/footer/telefon.png" alt="Mobil Uygulama" className="app-phone-image" />
          </div>
          
          <img src="/images/footer/grafik.png" alt="Grafik" className="app-graph-bg" />
        </div>
      </div>
      
      {/* Sağ taraf - Firma Bilgileri */}
      <div className="company-promotion">
        <div className="company-info">
          <div className="company-header">
            <img src="/images/footer/hendem.png" alt="Hendem" className="hendem-logo" />
          </div>
          
          <div className="address-info">
            <div className="info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
              <p>Yenibosna merkez mahallesi 29.Ekim caddesi Vizyonpark 1.Plaza 9.kat 98 Numara, Bahçelievler İstanbul</p>
            </div>
            
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} className="info-icon" />
              <p>0 (532) 350 29 29</p>
            </div>
            
            <div className="info-item">
              <span className="mail-icon">@</span>
              <p>info@hendem.com</p>
            </div>
          </div>
          
          <div className="social-icons">
            <a href="#" className="social-icon facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="social-icon twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-icon youtube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPromotion; 