import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/onboarding';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-primary-50">
      <main className={`${hideNavigation ? 'pb-0' : 'pb-24'}`}>
        {children}
      </main>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default Layout;
