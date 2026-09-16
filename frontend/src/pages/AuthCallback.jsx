import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function checkOnboardingStatus() {
      if (!user) return; // Wait for auth context to catch up

      try {
        const { data, error } = await supabase
          .from('user_interests')
          .select('interest')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // User already has interests, meaning they completed onboarding before
          navigate('/brief', { replace: true });
        } else {
          // New user, needs onboarding
          navigate('/onboarding/language', { replace: true });
        }
      } catch (err) {
        console.error('Error checking user profile:', err);
        navigate('/onboarding/language', { replace: true }); // Fallback to onboarding
      }
    }

    checkOnboardingStatus();
  }, [user, navigate]);

  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', height: '100%' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid rgba(124,58,237,0.3)', borderTopColor: '#7c3aed', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
