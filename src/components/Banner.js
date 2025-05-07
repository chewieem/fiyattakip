import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="banner-container">
      <img src={`${process.env.PUBLIC_URL}/images/isbankasi.png`} alt="İş Bankası" className="isbankasi-banner" />
    </div>
  );
}

export default Banner; 