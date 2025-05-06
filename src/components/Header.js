import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUser, faFolderOpen, faEnvelope, faAd } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <a href="/">
            <span className="logo-icon">
              <div className="blue-square">
                <FontAwesomeIcon icon={faChartLine} className="chart-icon-logo" />
              </div>
            </span>
            <span className="logo-text">Fiyatborsasi.com</span>
          </a>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/giris"><FontAwesomeIcon icon={faUser} className="nav-icon" /> Kullanıcı Girişi</a></li>
            <li><a href="/portfoy"><FontAwesomeIcon icon={faFolderOpen} className="nav-icon" /> Portföy Yönetimi</a></li>
            <li><a href="/iletisim"><FontAwesomeIcon icon={faEnvelope} className="nav-icon" /> İletişim</a></li>
            <li><a href="/reklam"><FontAwesomeIcon icon={faAd} className="nav-icon" /> Reklam Ver</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;