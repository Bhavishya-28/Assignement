import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VOICES = [
  { id: 'aria', name: 'Aria', desc: 'British, warm and articulate', tag: 'RECOMMENDED' },
  { id: 'vikram', name: 'Vikram', desc: 'Indian, deep and authoritative', tag: null },
  { id: 'maya', name: 'Maya', desc: 'American, clear and energetic', tag: null },
];

export default function VoiceSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('aria');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', padding: '28px 24px', minHeight: '100%' }}>
      <ProgressBar step={4} total={6} />

      <div style={{ marginBottom: '32px', marginTop: '20px' }}>
        <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
          Step 4 of 6
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', lineHeight: 1.15, margin: '0 0 10px 0' }}>
          Choose your<br />
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#a855f7' }}>voice</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Select the voice that will read your daily brief.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {VOICES.map(v => {
          const isSelected = selected === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setSelected(v.id)}
              style={{
                background: isSelected ? 'rgba(124,58,237,0.12)' : '#0f0f0f',
                border: `1px solid ${isSelected ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '20px',
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{v.name}</span>
                  {v.tag && (
                    <span style={{
                      fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                      background: 'rgba(16,185,129,0.15)', color: '#10B981',
                      border: '1px solid rgba(16,185,129,0.3)',
                      padding: '2px 8px', borderRadius: '20px', fontWeight: '700'
                    }}>{v.tag}</span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{v.desc}</p>
              </div>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                border: `2px solid ${isSelected ? '#7c3aed' : 'rgba(255,255,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginLeft: '16px'
              }}>
                {isSelected && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7c3aed' }} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => navigate('/onboarding/time')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff', fontWeight: '600', fontSize: '15px',
            padding: '16px', borderRadius: '16px', border: 'none',
            cursor: 'pointer', boxShadow: '0 0 30px rgba(124,58,237,0.35)',
            letterSpacing: '0.02em',
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: '3px', borderRadius: '2px',
          background: i < step ? 'linear-gradient(90deg, #7c3aed, #a855f7)' : 'rgba(255,255,255,0.08)',
        }} />
      ))}
    </div>
  );
}
