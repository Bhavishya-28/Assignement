import React from 'react';

export default function MobileShell({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: '430px',
        height: '100vh',
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
        className="sm-shell"
      >
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sm-shell {
            height: 95vh !important;
            border-radius: 40px !important;
            border: 8px solid #1a1a1a !important;
            box-shadow: 0 25px 80px rgba(0,0,0,0.8), 0 0 60px rgba(124,58,237,0.1) !important;
          }
        }
      `}</style>
    </div>
  );
}
