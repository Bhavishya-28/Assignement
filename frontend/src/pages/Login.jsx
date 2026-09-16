import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';

    // DEMO MODE: no real Supabase URL configured yet
    const isDemo = !supabaseUrl || supabaseUrl.includes('placeholder') || supabaseUrl.includes('YOUR_SUPABASE');
    if (isDemo) {
      navigate('/onboarding/language');
      return;
    }

    // PRODUCTION: Real Google OAuth via Supabase
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });
    if (error) {
      console.error('Auth error:', error.message);
      alert('Authentication error: ' + error.message);
    }
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding: '32px 28px', background: '#050505',
      position: 'relative', overflow: 'hidden', minHeight: '100%'
    }}>
      {/* Top gradient glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '60px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <WaveIcon />
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
            Nuzio<span style={{ color: '#7c3aed' }}>AI</span>
          </span>
        </div>
      </div>

      {/* Hero Text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: '44px', fontFamily: 'Georgia, serif', fontWeight: '700',
          lineHeight: 1.15, color: '#fff', margin: '0 0 20px 0'
        }}>
          Good morning.<br />
          <span style={{ color: '#a855f7', fontStyle: 'italic' }}>News on go.</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.6, maxWidth: '280px', margin: 0 }}>
          Personalised audio news for Indian professionals — curated every morning.
        </p>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '32px' }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            background: '#0f0f0f',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontWeight: '500',
            fontSize: '15px',
            padding: '16px',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'background 0.2s, border-color 0.2s',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.background = '#0f0f0f'}
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#4b5563', marginTop: '16px' }}>
          By continuing you agree to our{' '}
          <a href="#" style={{ color: '#7c3aed', textDecoration: 'none' }}>Terms</a>{' '}
          &{' '}
          <a href="#" style={{ color: '#7c3aed', textDecoration: 'none' }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

function WaveIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 28 20" fill="none">
      <rect x="0" y="7" width="3" height="6" rx="1.5" fill="#7c3aed" />
      <rect x="5" y="3" width="3" height="14" rx="1.5" fill="#7c3aed" />
      <rect x="10" y="0" width="3" height="20" rx="1.5" fill="#a855f7" />
      <rect x="15" y="3" width="3" height="14" rx="1.5" fill="#7c3aed" />
      <rect x="20" y="7" width="3" height="6" rx="1.5" fill="#7c3aed" />
      <rect x="25" y="5" width="3" height="10" rx="1.5" fill="#7c3aed" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
