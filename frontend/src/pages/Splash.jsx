import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Splash() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate('/brief');
      } else {
        navigate('/login');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#050505', position: 'relative', overflow: 'hidden',
      minHeight: '100%'
    }}>
      {/* Purple background glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '320px', height: '320px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '80px' }}>
          <WaveIcon />
          <span style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff' }}>
            Nuzio<span style={{ color: '#7c3aed' }}>AI</span>
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '36px', fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontWeight: '700', color: '#fff', margin: '0 0 12px 0', lineHeight: 1.2
          }}>
            News on go
          </h2>
          <p style={{
            fontSize: '11px', letterSpacing: '0.2em', color: '#6b7280',
            textTransform: 'uppercase', margin: 0
          }}>
            Your audio brief. Every morning.
          </p>
        </div>
      </div>

      {/* Bottom indicator */}
      <div style={{
        position: 'absolute', bottom: '48px',
        display: 'flex', alignItems: 'center', gap: '8px',
        fontSize: '10px', letterSpacing: '0.15em', color: '#7c3aed', textTransform: 'uppercase'
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#7c3aed', animation: 'pulse 1.5s infinite'
        }} />
        Curating your brief...
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}

function WaveIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <rect x="0" y="7" width="3" height="6" rx="1.5" fill="#7c3aed" />
      <rect x="5" y="3" width="3" height="14" rx="1.5" fill="#7c3aed" />
      <rect x="10" y="0" width="3" height="20" rx="1.5" fill="#a855f7" />
      <rect x="15" y="3" width="3" height="14" rx="1.5" fill="#7c3aed" />
      <rect x="20" y="7" width="3" height="6" rx="1.5" fill="#7c3aed" />
      <rect x="25" y="5" width="3" height="10" rx="1.5" fill="#7c3aed" />
    </svg>
  );
}
