import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AudioPlayer from '../components/AudioPlayer';

const MOCK_STORIES = [
  {
    id: '1',
    title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools',
    category: 'AI & Technology',
    description: 'Anthropic\'s new memory layer lets Claude hold entire codebases in mind while it works. The new model is available to all Pro users starting today.',
    source: 'The Verge',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Fed minutes hint at a September policy shift',
    category: 'Financial Markets',
    description: 'Officials flagged growing confidence that inflation is cooling toward target, sparking bond market rally and dollar weakness across emerging markets.',
    source: 'Bloomberg',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Indian startups see surge in early-stage funding',
    category: 'Indian Business',
    description: 'Q3 2026 shows a 40% rebound in seed-stage deal volume. Bangalore and Delhi NCR lead the charge with AI and fintech taking the top spots.',
    source: 'Economic Times',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'New climate report shows accelerating ice melt in Greenland',
    category: 'Climate & Energy',
    description: 'Scientists warn that polar ice is melting 30% faster than previously projected, threatening coastal cities across Asia and Europe by 2040.',
    source: 'Reuters',
    publishedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'OpenAI and Apple announce deep Siri integration for iOS 21',
    category: 'Startups',
    description: 'The partnership brings GPT-5 reasoning capabilities natively into iOS workflows, raising fresh antitrust questions in the EU and India.',
    source: 'TechCrunch',
    publishedAt: new Date().toISOString(),
  }
];

export default function Discover() {
  const { user } = useAuth();
  
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Aarav';
  const initial = fullName.charAt(0).toUpperCase();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['All', 'AI & Technology', 'Financial Markets', 'Startups', 'Science', 'Geopolitics'];

  const filteredStories = MOCK_STORIES.filter(story => {
    const matchesFilter = activeFilter === 'All' || story.category.includes(activeFilter);
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Georgia, serif', color: '#fff', margin: 0 }}>
            Discover
          </h1>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #00B4D8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '700', color: '#fff'
            }}>{initial}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: '16px'
        }}>
          <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text"
            placeholder="Search stories, sources, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? '#7c3aed' : '#0f0f0f',
                border: `1px solid ${activeFilter === f ? '#7c3aed' : 'rgba(255,255,255,0.07)'}`,
                color: activeFilter === f ? '#fff' : '#9ca3af',
                padding: '8px 16px', borderRadius: '40px',
                fontSize: '12px', fontWeight: activeFilter === f ? '600' : '400',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.15s', flexShrink: 0,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 160px', minHeight: 0 }} className="hide-scrollbar">
        {filteredStories.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#6b7280' }}>
            No stories found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredStories.map(story => (
              <DiscoverCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function DiscoverCard({ story }) {
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
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '20px',
      padding: '20px',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{
          fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
          fontWeight: '700', color: color,
        }}>
          {story.category}
        </span>
        <button style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
      
      <h3 style={{
        fontSize: '18px', fontWeight: '700', fontFamily: 'Georgia, serif',
        color: '#f3f4f6', lineHeight: 1.35, margin: '0 0 10px 0'
      }}>
        {story.title}
      </h3>
      
      <p style={{ 
        fontSize: '13px', color: '#9ca3af', lineHeight: 1.5, margin: '0 0 16px 0',
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {story.description}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#4b5563', fontWeight: '600' }}>
        <span>{story.source}</span>
        <span>2 min read</span>
      </div>
    </div>
  );
}
