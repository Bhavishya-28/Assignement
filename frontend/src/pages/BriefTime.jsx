import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TIMES = ['06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM'];

export default function BriefTime() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('07:00 AM');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', padding: '28px 24px', minHeight: '100%' }}>
      <ProgressBar step={5} total={6} />

      <div style={{ marginBottom: '32px', marginTop: '20px' }}>
        <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
          Step 5 of 6
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', lineHeight: 1.15, margin: '0 0 10px 0' }}>
          When do you<br />
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#a855f7' }}>wake up?</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          We'll have your brief ready right when you need it.
        </p>
      </div>

      {/* Selected Time Display */}
      <div style={{ textAlign: 'center', padding: '32px 0', flex: 1 }}>
        <div style={{
          fontSize: '56px', fontFamily: 'Georgia, serif', fontWeight: '700',
          color: '#fff', letterSpacing: '-1px'
        }}>
          {selected.split(' ')[0]}
          <span style={{ fontSize: '24px', color: '#7c3aed', marginLeft: '12px' }}>{selected.split(' ')[1]}</span>
        </div>
        <div style={{ height: '2px', width: '160px', margin: '24px auto', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)' }} />
        <p style={{ fontSize: '14px', color: '#6b7280' }}>Your brief will be ready by this time daily.</p>
      </div>

      {/* Time picker grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {TIMES.map(t => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            style={{
              background: selected === t ? 'rgba(124,58,237,0.18)' : '#0f0f0f',
              border: `1px solid ${selected === t ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
              color: selected === t ? '#c084fc' : '#9ca3af',
              padding: '12px 8px', borderRadius: '12px', fontSize: '14px',
              fontWeight: selected === t ? '700' : '400', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={() => navigate('/onboarding/notifications')}
          style={{
            width: '100%', background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
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
