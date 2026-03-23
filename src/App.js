import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isUserAuthenticated, isUserOnboarded } from './utils/storage';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Track from './pages/Track';
import Sanctuary from './pages/Sanctuary';
import Insights from './pages/Insights';
import Support from './pages/Support';
import Journal from './pages/Journal';
import Activities from './pages/Activities';

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userOnboarded, setUserOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth and onboarding status
    const checkAuthStatus = () => {
      setUserAuthenticated(isUserAuthenticated());
      setUserOnboarded(isUserOnboarded());
      setIsLoading(false);
    };

    checkAuthStatus();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'moodflow_auth' || e.key === 'moodflow_user_data') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleUserDataUpdate = () => {
      checkAuthStatus();
    };

    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-accent-600 rounded-full animate-spin"></div>
          <p className="text-text-secondary text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Splash Route - Always Entry Point */}
          <Route 
            path="/" 
            element={<Splash />} 
          />
          
          {/* Login Route */}
          <Route 
            path="/login" 
            element={userAuthenticated ? <Navigate to={userOnboarded ? "/home" : "/onboarding"} replace /> : <Login />} 
          />
          
          {/* Onboarding Route */}
          <Route 
            path="/onboarding" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              userOnboarded ? <Navigate to="/home" replace /> : 
              <Onboarding />
            } 
          />
          
          {/* Home Route */}
          <Route 
            path="/home" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Home />
            } 
          />
          <Route 
            path="/track" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Track />
            } 
          />
          <Route 
            path="/sanctuary" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Sanctuary />
            } 
          />
          <Route 
            path="/insights" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Insights />
            } 
          />
          <Route 
            path="/support" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Support />
            } 
          />
          <Route 
            path="/journal" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Journal />
            } 
          />
          <Route 
            path="/activities" 
            element={
              !userAuthenticated ? <Navigate to="/login" replace /> :
              !userOnboarded ? <Navigate to="/onboarding" replace /> : 
              <Activities />
            } 
          />
          
          {/* Catch All */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;