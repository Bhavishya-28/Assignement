import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LanguageLocation() {
  const [language, setLanguage] = useState('English');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    // Save to local storage for now (will be synced to Supabase after login)
    localStorage.setItem('nuzio_language', language);
    localStorage.setItem('nuzio_location_enabled', locationEnabled);
    
    // Go to profession step
    navigate('/onboarding/profession');
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      background: '#050505', color: '#fff', padding: '32px 24px',
      position: 'relative', overflowY: 'auto'
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', opacity: 0.6, marginBottom: '24px' }}>
          STEP 1 OF 6
        </h1>
        
        <h2 style={{ fontSize: '32px', fontWeight: '400', lineHeight: '1.2', marginBottom: '16px', fontFamily: 'serif' }}>
          Choose your<br/><i style={{ color: '#7c3aed' }}>language.</i>
        </h2>
        
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
          Select the language for your daily brief.
        </p>

        {/* Language Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          {['English', 'Hindi'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: language === lang ? 'rgba(124, 58, 237, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${language === lang ? 'rgba(124, 58, 237, 0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: '#fff',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {lang}
              {language === lang && (
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Location Toggle */}
        <div style={{
          padding: '24px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Enable Location</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Get hyperlocal news tailored to your city.</p>
          </div>
          
          <button 
            onClick={() => setLocationEnabled(!locationEnabled)}
            style={{
              width: '52px', height: '32px',
              borderRadius: '16px',
              background: locationEnabled ? '#7c3aed' : 'rgba(255,255,255,0.1)',
              position: 'relative',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{
              width: '24px', height: '24px',
              borderRadius: '50%', background: '#fff',
              position: 'absolute', top: '4px',
              left: locationEnabled ? '24px' : '4px',
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </button>
        </div>
      </div>

      <button
        onClick={handleContinue}
        style={{
          width: '100%', padding: '18px',
          borderRadius: '100px',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          color: '#fff', fontSize: '16px', fontWeight: '700',
          border: 'none', cursor: 'pointer',
          marginTop: '40px', flexShrink: 0,
          boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
        }}
      >
        Continue →
      </button>
    </div>
  );
}
