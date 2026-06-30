import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavigation = location.pathname === '/onboarding';

  return (
    // Soft backdrop that only shows around the phone on larger screens
    <div className="min-h-screen w-full bg-sage-100 flex items-center justify-center sm:p-8">
      {/* Phone mockup: full screen on phones, a true phone-sized device frame on desktop */}
      <div className="relative w-full h-[100dvh] overflow-hidden bg-gradient-to-br from-sage-50 via-cream-50 to-primary-50 sm:w-[375px] sm:h-[812px] sm:max-h-[calc(100vh-4rem)] sm:rounded-[2.25rem] sm:border-[10px] sm:border-neutral-900 sm:shadow-2xl">
        {/* Notch */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-b-2xl z-50"></div>

        {/* Reserve a chrome strip for the home indicator so it never sits over page content */}
        <main className="h-full sm:h-[calc(100%-1.5rem)] overflow-y-auto">
          {children}
        </main>
        {!hideNavigation && <BottomNavigation />}

        {/* Home indicator strip */}
        <div className="hidden sm:flex absolute bottom-0 left-0 right-0 h-6 items-center justify-center pointer-events-none">
          <div className="w-32 h-1 bg-neutral-900/80 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
