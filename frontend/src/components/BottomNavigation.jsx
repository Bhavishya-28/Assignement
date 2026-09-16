import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      id: 'brief',
      path: '/brief',
      label: 'Brief',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      )
    },
    {
      id: 'discover',
      path: '/discover',
      label: 'Discover',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: 'settings',
      path: '/settings',
      label: 'Settings',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '12px 24px 28px',
      background: 'rgba(5,5,5,0.85)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      flexShrink: 0
    }}>
      {navItems.map((item) => {
        const isActive = currentPath.startsWith(item.path);
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? '#fff' : '#6b7280',
              transition: 'all 0.2s ease',
              padding: '8px'
            }}
          >
            <div style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Active indicator glow */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  width: '32px', height: '32px',
                  background: 'rgba(124, 58, 237, 0.4)',
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  zIndex: 0
                }} />
              )}
              <div style={{
                position: 'relative', zIndex: 1,
                color: isActive ? '#7c3aed' : '#6b7280'
              }}>
                {item.icon}
              </div>
            </div>
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? '700' : '500',
              letterSpacing: '0.05em'
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
