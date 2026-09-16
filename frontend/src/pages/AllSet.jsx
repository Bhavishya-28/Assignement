import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

export default function AllSet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(true);

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Aarav';
  const firstName = fullName.split(' ')[0];

  useEffect(() => {
    async function syncData() {
      if (!user) return;
      try {
        const profession = localStorage.getItem('nuzio_profession');
        const language = localStorage.getItem('nuzio_language');
        const voice = localStorage.getItem('nuzio_voice');
        const time = localStorage.getItem('nuzio_time');
        const interests = JSON.parse(localStorage.getItem('nuzio_interests') || '[]');

        // Update profile
        const updateData = {};
        if (profession) updateData.profession = profession;
        if (language) updateData.language = language;
        if (voice) updateData.voice = voice;
        if (time) updateData.brief_time = time;
        
        if (Object.keys(updateData).length > 0) {
          await supabase.from('profiles').update(updateData).eq('id', user.id);
        }

        // Insert interests (avoiding duplicates by deleting existing first)
        if (interests.length > 0) {
          await supabase.from('user_interests').delete().eq('user_id', user.id);
          const interestRows = interests.map(i => ({ user_id: user.id, interest: i }));
          await supabase.from('user_interests').insert(interestRows);
        }
      } catch (err) {
        console.error('Error syncing onboarding data:', err);
      } finally {
        setIsSyncing(false);
      }
    }
    syncData();
  }, [user]);

  const prof = localStorage.getItem('nuzio_profession') || 'Technology';
  const ints = JSON.parse(localStorage.getItem('nuzio_interests') || '["AI", "Markets"]');
  const voicePref = localStorage.getItem('nuzio_voice') || 'Aria';
  const timePref = localStorage.getItem('nuzio_time') || '07:00 AM';


  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', padding: '28px 24px', position: 'relative', overflow: 'hidden', minHeight: '100%' }}>
      {/* Green glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '280px', height: '280px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        All Set
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Check circle */}
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.3)',
          background: 'rgba(16,185,129,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '28px',
          boxShadow: '0 0 40px rgba(16,185,129,0.2)',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          You're ready,<br />
          <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#10B981' }}>{firstName}.</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '260px', lineHeight: 1.6 }}>
          Your first brief will be ready tomorrow at 7:00 AM. We're already curating.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div style={{
        background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px', padding: '20px', marginBottom: '20px', position: 'relative', zIndex: 1
      }}>
        <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '16px' }}>
          Your Brief Profile
        </p>
        {[
          { label: 'PROFESSION', value: prof },
          { label: 'NICHES', value: ints.join(', ') },
          { label: 'VOICE', value: voicePref },
          { label: 'DELIVERY', value: `Daily at ${timePref}` },
        ].map((item, i, arr) => (
          <div key={item.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: i < arr.length - 1 ? '14px' : 0,
            marginBottom: i < arr.length - 1 ? '14px' : 0,
            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ color: '#4b5563', minWidth: '80px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{item.label}</span>
              <span style={{ color: '#d1d5db' }}>{item.value}</span>
            </div>
            <span style={{ color: '#10B981', fontSize: '14px' }}>✓</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/brief')}
        disabled={isSyncing}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #059669, #00B4D8)',
          color: '#fff', fontWeight: '700', fontSize: '15px',
          padding: '16px', borderRadius: '16px', border: 'none',
          cursor: isSyncing ? 'not-allowed' : 'pointer',
          opacity: isSyncing ? 0.7 : 1,
          boxShadow: '0 0 30px rgba(16,185,129,0.25)',
          letterSpacing: '0.02em',
        }}
      >
        {isSyncing ? 'Syncing...' : 'Start listening →'}
      </button>
    </div>
  );
}
