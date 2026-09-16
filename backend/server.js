import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

dotenv.config({ path: '../.env' }); // Load .env from root

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase admin client (bypass RLS for certain operations)
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

global.WebSocket = WebSocket;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nuzio AI Backend is running' });
});

// Mock News Data (Fallback when no API is available)
const mockNews = [
  { id: '1', title: 'Anthropic ships Claude 4.5 with 2M-token memory', category: 'AI & Tech', source: 'The Verge', publishedAt: new Date().toISOString(), description: 'Anthropic’s new memory layer lets Claude hold entire codebases in mind while it works.', content: 'Full content...', imageUrl: '' },
  { id: '2', title: 'Fed minutes hint at a September policy shift', category: 'Financial Markets', source: 'Bloomberg', publishedAt: new Date().toISOString(), description: 'Officials flagged growing confidence that inflation is cooling toward target.', content: 'Full content...', imageUrl: '' },
  { id: '3', title: 'New climate report shows accelerating ice melt', category: 'Climate & Energy', source: 'Reuters', publishedAt: new Date().toISOString(), description: 'Scientists warn that polar ice is melting faster than previously projected.', content: 'Full content...', imageUrl: '' },
  { id: '4', title: 'Indian startups see surge in seed funding', category: 'Startups', source: 'TechCrunch', publishedAt: new Date().toISOString(), description: 'Early-stage investments are bouncing back in the Indian tech ecosystem.', content: 'Full content...', imageUrl: '' },
  { id: '5', title: 'Breakthrough in solid-state battery tech', category: 'Science', source: 'Wired', publishedAt: new Date().toISOString(), description: 'A new material could double EV range and halve charging times.', content: 'Full content...', imageUrl: '' }
];

// Brief Generation Endpoint
app.get('/api/brief', async (req, res) => {
  try {
    // 1. Authenticate user from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      // For development, if we want to bypass real auth check when keys aren't set, we could mock a user.
      // But PRD says "Implement real Google OAuth". We'll enforce it unless it's a dev placeholder.
      if (supabaseUrl === 'https://placeholder.supabase.co') {
         // Mocking for completely offline dev without supabase setup yet
         user = { id: 'mock-user-id', user_metadata: { full_name: 'Aarav' } };
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    // 2. Fetch User Profile & Interests
    let profile = { name: user.user_metadata?.full_name || 'User', voice: 'Aria' };
    let interests = [];

    if (supabaseUrl !== 'https://placeholder.supabase.co') {
      const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (profileData) profile = profileData;

      const { data: interestsData } = await supabase.from('user_interests').select('interest').eq('user_id', user.id);
      if (interestsData) interests = interestsData.map(i => i.interest);
    } else {
      // Mock interests
      interests = ['AI & Tech', 'Startups'];
    }

    // 3. Filter News
    let filteredNews = mockNews;
    if (interests.length > 0) {
       filteredNews = mockNews.filter(n => interests.includes(n.category) || interests.includes('All'));
       if (filteredNews.length === 0) filteredNews = mockNews; // Fallback if no match
    }

    // 4. Return brief
    res.json({
      greeting: `Good morning, ${profile.name.split(' ')[0]}`,
      storyCount: filteredNews.length,
      voice: profile.voice || 'Aria',
      duration: '18:30', // Mock total duration
      stories: filteredNews.map(story => ({
        ...story,
        // Mock TTS audio URL - in a real app, we'd hit a TTS service here or pre-generate it
        audioUrl: `https://mock-audio-service.com/tts?text=${encodeURIComponent(story.title)}`
      }))
    });

  } catch (err) {
    console.error('Error generating brief:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
