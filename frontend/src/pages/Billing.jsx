import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Billing() {
  const navigate = useNavigate();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', height: '100%', minHeight: 0, position: 'relative' }}>
      
      {/* Header */}
      <div style={{
        padding: '24px',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'rgba(255,255,255,0.05)', border: 'none',
          width: '36px', height: '36px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>Plan & Billing</h1>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', minHeight: 0 }} className="hide-scrollbar">
        
        {/* Current Plan */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px', padding: '24px',
          marginBottom: '24px', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Georgia, serif', color: '#fff', margin: '0 0 4px 0' }}>Free</h2>
              <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Basic audio briefings</p>
            </div>
            <span style={{
              fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#9ca3af', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px'
            }}>Current</span>
          </div>
          
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
            ₹0<span style={{ fontSize: '16px', color: '#6b7280', fontWeight: '500' }}>/mo</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#d1d5db' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#10B981' }}>✓</span> 5 article summaries per niche daily
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#10B981' }}>✓</span> Standard TTS voice
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#10B981' }}>✓</span> Ad-supported
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.02))',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '24px', padding: '24px',
          marginBottom: '24px', position: 'relative'
        }}>
          {/* Glow effect */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Georgia, serif', color: '#fff', margin: '0 0 4px 0' }}>Pro</h2>
              <p style={{ fontSize: '14px', color: '#c4b5fd', margin: 0 }}>Unlimited intelligence</p>
            </div>
          </div>
          
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
            ₹79<span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: '500' }}>/mo</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#e5e7eb', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#7c3aed' }}>✦</span> Unlimited custom briefings
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#7c3aed' }}>✦</span> Premium human-like AI voices
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#7c3aed' }}>✦</span> Ad-free experience
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: '#7c3aed' }}>✦</span> Offline downloads
            </div>
          </div>

          <button style={{
            width: '100%', padding: '16px', borderRadius: '16px',
            background: '#7c3aed', color: '#fff', fontSize: '15px', fontWeight: '700',
            border: 'none', cursor: 'pointer', position: 'relative', zIndex: 1,
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
          }}>
            Upgrade to Pro
          </button>
        </div>

      </div>
    </div>
  );
}
