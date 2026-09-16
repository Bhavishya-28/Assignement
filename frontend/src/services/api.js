import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getBrief() {
  const { data: { session } } = await supabase.auth.getSession();
  
  // If no real session, we can send a mock token for local dev
  const token = session?.access_token || 'mock_dev_token';

  const response = await fetch(`${API_URL}/brief`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch brief');
  }

  return response.json();
}
