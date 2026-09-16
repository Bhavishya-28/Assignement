import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INTERESTS = [
  { label: 'AI & Technology', icon: '🤖' },
  { label: 'Financial Markets', icon: '📊' },
  { label: 'Indian Business', icon: '🇮🇳' },
  { label: 'Global Politics', icon: '🌍' },
  { label: 'Startups', icon: '🚀' },
  { label: 'Science', icon: '🔬' },
  { label: 'Geopolitics', icon: '🗺️' },
  { label: 'Health & Medicine', icon: '💊' },
  { label: 'Climate & Energy', icon: '⚡' },
  { label: 'Sports', icon: '🏆' },
  { label: 'Culture & Arts', icon: '🎭' },
  { label: 'Legal & Policy', icon: '⚖️' },
];

const MAX = 7;

export default function Interests() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(['AI & Technology', 'Indian Business', 'Startups']);

  const toggle = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter(s => s !== label));
    } else if (selected.length < MAX) {
      setSelected([...selected, label]);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', padding: '28px 24px', minHeight: '100%' }}>
      <ProgressBar step={3} total={6} />

      <div style={{ marginBottom: '28px', marginTop: '20px' }}>
        <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
          Step 3 of 6
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', lineHeight: 1.15, margin: '0 0 10px 0', flex: 1 }}>
            What moves<br />
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#a855f7' }}>your world?</span>
          </h1>
          <div style={{
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '20px', padding: '4px 12px',
            fontSize: '12px', color: '#a855f7', fontWeight: '700', flexShrink: 0, marginTop: '4px'
          }}>
            {selected.length}/{MAX}
          </div>
        </div>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Pick up to {MAX} niches. We'll tailor every brief to these.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1 }}>
        {INTERESTS.map(interest => {
          const isSelected = selected.includes(interest.label);
          const isDisabled = !isSelected && selected.length >= MAX;
          return (
            <button
              key={interest.label}
              onClick={() => toggle(interest.label)}
              disabled={isDisabled}
              style={{
                background: isSelected ? 'rgba(124,58,237,0.18)' : '#0f0f0f',
                border: `1px solid ${isSelected ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
                color: isSelected ? '#c084fc' : isDisabled ? '#374151' : '#d1d5db',
                padding: '11px 16px',
                borderRadius: '40px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s',
                opacity: isDisabled ? 0.4 : 1,
              }}
            >
              <span>{interest.icon}</span>
              {interest.label}
              {isSelected && <span style={{ marginLeft: '2px', fontSize: '12px' }}>✓</span>}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => {
            localStorage.setItem('nuzio_interests', JSON.stringify(selected));
            navigate('/onboarding/voice');
          }}
          disabled={selected.length === 0}
          style={{
            width: '100%',
            background: selected.length > 0 ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(124,58,237,0.3)',
            color: '#fff', fontWeight: '600', fontSize: '15px',
            padding: '16px', borderRadius: '16px', border: 'none',
            cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            boxShadow: selected.length > 0 ? '0 0 30px rgba(124,58,237,0.35)' : 'none',
            transition: 'all 0.2s', letterSpacing: '0.02em',
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
          background: i < step
            ? 'linear-gradient(90deg, #7c3aed, #a855f7)'
            : 'rgba(255,255,255,0.08)',
        }} />
      ))}
    </div>
  );
}
