import React, { useEffect, useState } from 'react';
import { trackEvent } from '../analytics';

// Simple cookie/consent banner informing users about anonymous analytics only.
// No personal data is collected nor stored anywhere.
// Stores acknowledgment in localStorage and does not block app usage.

const STORAGE_KEY = 'cookie_notice_ack_v1';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const ack = typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem(STORAGE_KEY);
      if (!ack) setVisible(true);
    } catch (_) {
      // If localStorage is inaccessible, still show the banner; it will reappear on next load.
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {
      // ignore
    }
    setVisible(false);
    trackEvent('cookie_notice_dismissed');
  };

  if (!visible) return null;

  // Inline styles kept minimal and CSP permits 'unsafe-inline' for styles in index.html
  const containerStyle = {
    position: 'fixed',
    left: 12,
    right: 12,
    bottom: 12,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.92)',
    color: '#243041',
    padding: '12px 14px',
    borderRadius: 18,
    border: '1px solid rgba(255, 255, 255, 0.65)',
    boxShadow: '0 10px 24px rgba(36, 48, 65, 0.16)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const textStyle = {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.4,
    flex: 1,
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(164, 221, 249, 0.95), rgba(197, 164, 247, 0.95))',
    color: '#243041',
    border: '1px solid rgba(255, 255, 255, 0.65)',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(36, 48, 65, 0.10)',
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie and analytics notice" style={containerStyle}>
      <p style={textStyle}>
        We only collect anonymous usage data to analyze how the app is used. No personal data is collected or stored anywhere.
      </p>
      <button onClick={dismiss} style={buttonStyle} aria-label="Dismiss notice">Got it</button>
    </div>
  );
}

export default CookieBanner;
