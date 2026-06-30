import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/onboarding';

  return (
    // Soft backdrop that only shows around the phone on larger screens
    <div className="min-h-screen w-full bg-sage-100 flex items-center justify-center sm:p-6">
      {/* Phone mockup: full screen on phones, a centered device frame on desktop */}
      <div className="relative w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-sage-50 via-cream-50 to-primary-50 sm:w-[420px] sm:h-[860px] sm:max-h-[calc(100vh-3rem)] sm:rounded-[2.75rem] sm:border-[12px] sm:border-neutral-900 sm:shadow-2xl">
        <main className="h-full overflow-y-auto">
          {children}
        </main>
        {!hideNavigation && <BottomNavigation />}
      </div>
    </div>
  );
};

export default Layout;
