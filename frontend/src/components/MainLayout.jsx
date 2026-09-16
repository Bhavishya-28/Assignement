import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import AudioPlayer from './AudioPlayer';
import { MOCK_STORIES } from '../data/mockData';

export default function MainLayout({ children }) {
  const location = useLocation();
  const showPlayer = location.pathname.startsWith('/brief');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, position: 'relative' }}>
      {/* Content Area - 90px padding at bottom to clear the nav bar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
      
      {/* Fixed Bottom Navigation */}
      <BottomNavigation />

      {/* Global Collapsible Audio Player - Only on Brief Page */}
      {showPlayer && <AudioPlayer playlist={MOCK_STORIES} />}
    </div>
  );
}
