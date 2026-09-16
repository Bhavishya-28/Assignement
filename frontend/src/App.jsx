import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import MobileShell from './components/MobileShell';
import MainLayout from './components/MainLayout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import LanguageLocation from './pages/LanguageLocation';
import Profession from './pages/Profession';
import Interests from './pages/Interests';
import VoiceSelection from './pages/VoiceSelection';
import BriefTime from './pages/BriefTime';
import NotificationsSetup from './pages/NotificationsSetup';
import AllSet from './pages/AllSet';
import MorningBrief from './pages/MorningBrief';
import AuthCallback from './pages/AuthCallback';
import Discover from './pages/Discover';
import Settings from './pages/Settings';
import Billing from './pages/Billing';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/splash" />} />
        <Route path="/splash" element={
          <PageTransition><Splash /></PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition><Login /></PageTransition>
        } />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Onboarding Flow */}
        <Route path="/onboarding/language" element={
          <ProtectedRoute><PageTransition><LanguageLocation /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/profession" element={
          <ProtectedRoute><PageTransition><Profession /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/interests" element={
          <ProtectedRoute><PageTransition><Interests /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/voice" element={
          <ProtectedRoute><PageTransition><VoiceSelection /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/time" element={
          <ProtectedRoute><PageTransition><BriefTime /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/notifications" element={
          <ProtectedRoute><PageTransition><NotificationsSetup /></PageTransition></ProtectedRoute>
        } />
        <Route path="/onboarding/complete" element={
          <ProtectedRoute><PageTransition><AllSet /></PageTransition></ProtectedRoute>
        } />

        {/* Main Application */}
        <Route path="/brief" element={
          <ProtectedRoute>
            <MainLayout><PageTransition><MorningBrief /></PageTransition></MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/discover" element={
          <ProtectedRoute>
            <MainLayout><PageTransition><Discover /></PageTransition></MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout><PageTransition><Settings /></PageTransition></MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/billing" element={
          <ProtectedRoute>
            <MainLayout><PageTransition><Billing /></PageTransition></MainLayout>
          </ProtectedRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <MobileShell>
          <AnimatedRoutes />
        </MobileShell>
      </Router>
    </AuthProvider>
  );
}

export default App;
