import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_STORIES } from '../data/mockData';

// Mock brief data for instant demo (used while backend or Supabase are not configured)
const MOCK_BRIEF = {
  greeting: 'Good morning, Aarav',
  storyCount: MOCK_STORIES.length,
  voice: 'Aria',
  duration: '18:30',
  stories: MOCK_STORIES
};

function getDayInfo() {
  const now = new Date();
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const part = now.getHours() < 12 ? 'MORNING' : now.getHours() < 17 ? 'AFTERNOON' : 'EVENING';
  return `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]} · ${part} BRIEF`;
}

export default function MorningBrief() {
  const { user } = useAuth();
  const [briefData] = useState(MOCK_BRIEF);
  const [activeFilter, setActiveFilter] = useState('All');

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Aarav';
  const firstName = fullName.split(' ')[0];
  const initial = firstName.charAt(0).toUpperCase();

  const filters = ['All', ...new Set(briefData.stories.map(s => s.category.split(' ')[0]))];

  const filtered = activeFilter === 'All'
    ? briefData.stories
    : briefData.stories.filter(s => s.category.includes(activeFilter));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050505', height: '100%', minHeight: 0, position: 'relative' }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(12px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 20,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '-0.3px', color: '#fff' }}>
          <span style={{ color: '#7c3aed' }}>|||</span> Nuzio<span style={{ opacity: 0.4 }}>AI</span>
        </span>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <SearchIcon />
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #00B4D8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700',
          }}>{initial}</div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 160px 24px', WebkitOverflowScrolling: 'touch' }}>
        {/* Filter Chips */}
        <div style={{ padding: '12px 24px', display: 'flex', gap: '8px', overflowX: 'auto', flexShrink: 0 }} className="hide-scrollbar">
          {filters.slice(0, 6).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? '#7c3aed' : '#0f0f0f',
                border: `1px solid ${activeFilter === f ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
                color: activeFilter === f ? '#fff' : '#9ca3af',
                padding: '6px 16px', borderRadius: '40px',
                fontSize: '12px', fontWeight: activeFilter === f ? '600' : '400',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Greeting */}
        <div style={{ padding: '16px 24px 24px' }}>
          <p style={{ fontSize: '10px', color: '#7c3aed', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '10px' }}>
            {getDayInfo()}
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'Georgia, serif', lineHeight: 1.15, color: '#fff', margin: '0 0 14px 0' }}>
            Good morning, {firstName} —<br />
            <span style={{ fontStyle: 'italic', opacity: 0.85 }}>{briefData.storyCount} things.</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10B981' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
              Audio live
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Voice: {briefData.voice}</span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{briefData.storyCount} stories · {briefData.duration}</span>
          </div>
        </div>

        {/* Stories */}
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function StoryCard({ story, index }) {
  const categoryColors = {
    'AI & Technology': '#a855f7',
    'Financial Markets': '#00B4D8',
    'Indian Business': '#f59e0b',
    'Climate & Energy': '#10B981',
    'Startups': '#f97316',
  };
  const color = categoryColors[story.category] || '#7c3aed';

  return (
    <div style={{
      background: '#0f0f0f',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Accent line */}
      <div style={{ position: 'absolute', left: 0, top: '20px', bottom: '20px', width: '3px', borderRadius: '2px', background: color, opacity: 0.7 }} />

      <div style={{ paddingLeft: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{
            fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
            fontWeight: '700', color: color,
            background: `${color}18`, padding: '3px 10px', borderRadius: '20px',
          }}>
            {story.category}
          </span>
          <span style={{ fontSize: '11px', color: '#374151', fontWeight: '600' }}>0{index + 1}</span>
        </div>
        <h3 style={{
          fontSize: '16px', fontWeight: '700', fontFamily: 'Georgia, serif',
          color: '#f3f4f6', lineHeight: 1.35, margin: '0 0 10px 0'
        }}>
          {story.title}
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: '0 0 14px 0',
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
        }}>
          {story.description}
        </p>
        <div style={{ fontSize: '10px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
          {story.source} · 2 min read
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
