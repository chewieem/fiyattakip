import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Harem Altın API ile socket bağlantısı yönetimi
const HaremAltinSocket = ({ onDataReceived }) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Socket bağlantısı
    const socket = io('wss://api.haremaltin.com', {
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 10000,
      autoConnect: true,
      forceNew: true,
      withCredentials: false,
    });

    // Bağlantı durumu
    socket.on('connect', () => {
      setConnected(true);
      setError(null);
    });

    socket.on('disconnect', (reason) => {
      setConnected(false);
    });

    socket.on('connect_error', (err) => {
      setError('Bağlantı hatası oluştu: ' + err.message);
    });

    socket.on('error', (err) => {
    });

    // Fiyat değişimlerini dinle
    socket.on('price_changed', (data) => {
      onDataReceived(data, 'price_changed');
    });

    // Orijinal event handler
    const socketOriginalOnevent = socket.onevent;
    socket.onevent = function(packet) {
      const event = packet.data[0];
      const data = packet.data[1];
      socketOriginalOnevent.call(this, packet);
    };

    // Temizleme
    return () => {
      socket.disconnect();
    };
  }, [onDataReceived]);

  return (
    <div className="harem-altin-status" style={{ display: 'none' }}>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default HaremAltinSocket; 