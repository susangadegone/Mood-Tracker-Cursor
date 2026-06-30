import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isUserOnboarded } from './utils/storage';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Track from './pages/Track';
import Sanctuary from './pages/Sanctuary';
import Insights from './pages/Insights';
import Support from './pages/Support';
import Journal from './pages/Journal';
import Activities from './pages/Activities';

function App() {
  const [userOnboarded, setUserOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check onboarding status on mount and whenever storage changes
    const checkOnboardingStatus = () => {
      setUserOnboarded(isUserOnboarded());
      setIsLoading(false);
    };

    checkOnboardingStatus();

    // Listen for storage changes (e.g. onboarding completed in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'moodflow_user_data') {
        checkOnboardingStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Same-tab updates dispatch a custom event after writing storage
    const handleUserDataUpdate = () => {
      checkOnboardingStatus();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  // Show a loading spinner while checking onboarding status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const requireOnboarding = (element) =>
    userOnboarded ? element : <Navigate to="/onboarding" replace />;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/onboarding"
            element={userOnboarded ? <Navigate to="/" replace /> : <Onboarding />}
          />
          <Route path="/" element={requireOnboarding(<Home />)} />
          <Route path="/track" element={requireOnboarding(<Track />)} />
          <Route path="/sanctuary" element={requireOnboarding(<Sanctuary />)} />
          <Route path="/insights" element={requireOnboarding(<Insights />)} />
          <Route path="/support" element={requireOnboarding(<Support />)} />
          <Route path="/journal" element={requireOnboarding(<Journal />)} />
          <Route path="/activities" element={requireOnboarding(<Activities />)} />
          <Route
            path="*"
            element={<Navigate to={userOnboarded ? '/' : '/onboarding'} replace />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
