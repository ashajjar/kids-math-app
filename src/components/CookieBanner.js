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
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    background: '#1f2937', // gray-800
    color: '#fff',
    padding: '12px 16px',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
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
    background: '#8A2BE2', // emerald-500
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
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
