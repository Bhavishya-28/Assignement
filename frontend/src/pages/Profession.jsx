import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROFESSIONS = [
  { label: 'Finance & Trading', icon: '📈' },
  { label: 'Legal', icon: '⚖️' },
  { label: 'Technology', icon: '💻' },
  { label: 'Healthcare', icon: '🏥' },
  { label: 'Consulting', icon: '🎯' },
  { label: 'Marketing & Media', icon: '📣' },
  { label: 'Government & Policy', icon: '🏛️' },
  { label: 'Real Estate', icon: '🏢' },
  { label: 'Education', icon: '📚' },
  { label: 'Founder / Builder', icon: '🚀' },
];

export default function Profession() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', padding: '28px 24px', minHeight: '100%' }}>
      {/* Progress Bar */}
      <ProgressBar step={2} total={6} />

      <div style={{ marginBottom: '32px', marginTop: '20px' }}>
        <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
          Step 2 of 6
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', lineHeight: 1.15, margin: '0 0 10px 0' }}>
          What's your<br />
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#a855f7' }}>profession?</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          We'll tune every brief to what actually moves your day.
        </p>
      </div>

      {/* Profession chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flex: 1 }}>
        {PROFESSIONS.map(p => (
          <button
            key={p.label}
            onClick={() => setSelected(p.label)}
            style={{
              background: selected === p.label ? 'rgba(124,58,237,0.15)' : '#0f0f0f',
              border: `1px solid ${selected === p.label ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
              color: selected === p.label ? '#c084fc' : '#d1d5db',
              padding: '12px 18px',
              borderRadius: '40px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s',
            }}
          >
            <span>{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '24px' }}>
        <button
          onClick={() => navigate('/onboarding/interests')}
          style={{
            width: '100%',
            background: selected ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : 'rgba(124,58,237,0.3)',
            color: '#fff',
            fontWeight: '600',
            fontSize: '15px',
            padding: '16px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: selected ? '0 0 30px rgba(124,58,237,0.35)' : 'none',
            transition: 'all 0.2s',
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
          background: i < step
            ? 'linear-gradient(90deg, #7c3aed, #a855f7)'
            : i === step - 1
              ? 'linear-gradient(90deg, #7c3aed, #00B4D8)'
              : 'rgba(255,255,255,0.08)',
        }} />
      ))}
    </div>
  );
}
