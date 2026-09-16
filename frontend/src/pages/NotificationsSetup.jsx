import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsSetup() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    morningBrief: true,
    breakingStory: true,
    weeklyDigest: false
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    // For now, save to localStorage
    localStorage.setItem('nuzio_notifications', JSON.stringify(notifications));
    
    // Check if browser supports notifications and request permission if they enabled any
    if ((notifications.morningBrief || notifications.breakingStory || notifications.weeklyDigest) && 'Notification' in window) {
      Notification.requestPermission().then(() => {
        navigate('/onboarding/complete');
      });
    } else {
      navigate('/onboarding/complete');
    }
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      background: '#050505', color: '#fff', padding: '32px 24px',
      position: 'relative', overflowY: 'auto'
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', opacity: 0.6, marginBottom: '24px' }}>
          STEP 5 OF 6
        </h1>
        
        <h2 style={{ fontSize: '32px', fontWeight: '400', lineHeight: '1.2', marginBottom: '16px', fontFamily: 'serif' }}>
          Stay in<br/><i style={{ color: '#7c3aed' }}>the loop.</i>
        </h2>
        
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', lineHeight: 1.5 }}>
          Turn on notifications so you never miss your brief or breaking stories.
        </p>

        {/* Notification Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          
          <div style={{
            padding: '20px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Morning brief</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Your daily brief is ready to play.</p>
            </div>
            <button onClick={() => toggleNotification('morningBrief')} style={{
                width: '52px', height: '32px', borderRadius: '16px',
                background: notifications.morningBrief ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s'
              }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                position: 'absolute', top: '4px', left: notifications.morningBrief ? '24px' : '4px',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </button>
          </div>

          <div style={{
            padding: '20px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Breaking story</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>A major story in your niches just dropped.</p>
            </div>
            <button onClick={() => toggleNotification('breakingStory')} style={{
                width: '52px', height: '32px', borderRadius: '16px',
                background: notifications.breakingStory ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s'
              }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                position: 'absolute', top: '4px', left: notifications.breakingStory ? '24px' : '4px',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </button>
          </div>

          <div style={{
            padding: '20px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>Weekly digest</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Top stories from this week.</p>
            </div>
            <button onClick={() => toggleNotification('weeklyDigest')} style={{
                width: '52px', height: '32px', borderRadius: '16px',
                background: notifications.weeklyDigest ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.3s'
              }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: '#fff',
                position: 'absolute', top: '4px', left: notifications.weeklyDigest ? '24px' : '4px',
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </button>
          </div>
          
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
        <button
          onClick={handleContinue}
          style={{
            width: '100%', padding: '18px', borderRadius: '100px',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontSize: '16px', fontWeight: '700',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
          }}
        >
          Allow notifications
        </button>
        <button
          onClick={() => navigate('/onboarding/complete')}
          style={{
            width: '100%', padding: '16px', borderRadius: '100px',
            background: 'transparent', color: 'rgba(255,255,255,0.5)',
            fontSize: '15px', fontWeight: '600', border: 'none', cursor: 'pointer',
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
