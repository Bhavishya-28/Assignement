import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const AVAILABLE_INTERESTS = [
  'AI & Technology', 'Financial Markets', 'Indian Business', 
  'Global Politics', 'Startups', 'Science', 'Geopolitics', 
  'Health & Medicine', 'Climate & Energy', 'Sports', 
  'Culture & Arts', 'Legal & Policy'
];

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInterests() {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_interests')
        .select('interest')
        .eq('user_id', user.id);
      
      if (!error && data) {
        if (data.length === 0 && !localStorage.getItem('fixed_initial_interests')) {
          const defaults = ['AI & Technology', 'Indian Business', 'Startups'];
          setInterests(defaults);
          localStorage.setItem('fixed_initial_interests', 'true');
          const interestRows = defaults.map(i => ({ user_id: user.id, interest: i }));
          await supabase.from('user_interests').insert(interestRows);
        } else {
          setInterests(data.map(d => d.interest));
        }
      }
      setLoading(false);
    }
    fetchInterests();
  }, [user]);

  const handleAddInterest = async (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    const topic = newInterest.trim();
    
    // Optimistic update
    if (interests.includes(topic)) {
      setNewInterest('');
      return;
    }
    
    setInterests([...interests, topic]);
    setNewInterest('');

    await supabase.from('user_interests').insert({
      user_id: user.id,
      interest: topic
    });
  };

  const handleRemoveInterest = async (topic) => {
    // Optimistic update
    setInterests(interests.filter(i => i !== topic));

    await supabase.from('user_interests')
      .delete()
      .eq('user_id', user.id)
      .eq('interest', topic);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Aarav';
  const initial = fullName.charAt(0).toUpperCase();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', height: '100%', minHeight: 0, position: 'relative' }}>
      
      {/* Header */}
      <div style={{
        padding: '24px 24px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 20,
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Georgia, serif', color: '#fff', margin: 0 }}>
          Settings
        </h1>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 160px', minHeight: 0 }} className="hide-scrollbar">
        
        {/* Profile Card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '24px', padding: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #00B4D8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '700', color: '#fff'
          }}>
            {initial}
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '0 0 4px 0' }}>{fullName}</h2>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Technology · Free Plan</p>
          </div>
        </div>

        {/* Saved & Billing */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', marginLeft: '4px' }}>
            Account
          </p>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <button style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'transparent', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#f3f4f6', fontSize: '15px', cursor: 'pointer'
            }}>
              <span>Saved stories</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>12</span>
                <span style={{ color: '#4b5563' }}>›</span>
              </div>
            </button>
            <button onClick={() => navigate('/billing')} style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'transparent', border: 'none', color: '#f3f4f6', fontSize: '15px', cursor: 'pointer'
            }}>
              <span>Plan & billing</span>
              <span style={{ color: '#4b5563' }}>›</span>
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', marginLeft: '4px' }}>
            Manage Interests
          </p>
          <div style={{ 
            background: 'rgba(255,255,255,0.02)', borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.05)', padding: '20px' 
          }}>
            <form onSubmit={handleAddInterest} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <select
                value={newInterest}
                onChange={e => setNewInterest(e.target.value)}
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: '14px', outline: 'none', appearance: 'none'
                }}
              >
                <option value="" disabled style={{ color: '#000' }}>Select a niche...</option>
                {AVAILABLE_INTERESTS.filter(i => !interests.includes(i)).map(interest => (
                  <option key={interest} value={interest} style={{ color: '#000' }}>
                    {interest}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={!newInterest} style={{ 
                background: newInterest ? '#7c3aed' : 'rgba(124,58,237,0.3)', 
                color: '#fff', border: 'none', borderRadius: '12px', 
                padding: '0 16px', fontWeight: '600', cursor: newInterest ? 'pointer' : 'not-allowed'
              }}>
                Add
              </button>
            </form>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {loading ? (
                <span style={{ color: '#6b7280', fontSize: '13px' }}>Loading...</span>
              ) : interests.length === 0 ? (
                <span style={{ color: '#6b7280', fontSize: '13px' }}>No interests added yet.</span>
              ) : (
                interests.map(interest => (
                  <div key={interest} style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)',
                    padding: '6px 12px', borderRadius: '20px', color: '#d8b4fe', fontSize: '13px', fontWeight: '500'
                  }}>
                    {interest}
                    <button 
                      onClick={() => handleRemoveInterest(interest)}
                      style={{ 
                        background: 'none', border: 'none', color: '#a78bfa', fontSize: '14px', 
                        cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '12px', marginLeft: '4px' }}>
            Preferences
          </p>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#f3f4f6', fontSize: '15px'
            }}>
              <span>Auto-advance stories</span>
              <div style={{ width: '40px', height: '24px', borderRadius: '12px', background: '#7c3aed', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px' }} />
              </div>
            </div>
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#f3f4f6', fontSize: '15px'
            }}>
              <span>Offline mode</span>
              <div style={{ width: '40px', height: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: '2px' }} />
              </div>
            </div>
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px', background: 'transparent', color: '#f3f4f6', fontSize: '15px'
            }}>
              <span>Push notifications</span>
              <span style={{ color: '#4b5563' }}>›</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={{
          width: '100%', padding: '16px', borderRadius: '16px',
          background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontSize: '15px', fontWeight: '600', cursor: 'pointer',
          marginBottom: '20px'
        }}>
          Log out
        </button>

      </div>
    </div>
  );
}
