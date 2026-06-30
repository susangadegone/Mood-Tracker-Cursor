import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Edit3, Music, TrendingUp, Heart } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/track', icon: Edit3, label: 'Track' },
    { path: '/sanctuary', icon: Music, label: 'Sanctuary' },
    { path: '/insights', icon: TrendingUp, label: 'Insights' },
    { path: '/support', icon: Heart, label: 'Support' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sage-200 px-2 py-3 shadow-spa-xl z-40">
      <div className="flex justify-around items-center max-w-3xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center py-2 px-4 rounded-spa transition-all duration-300 ${
                isActive
                  ? 'text-primary-600 bg-gradient-to-br from-primary-50 to-mint-50'
                  : 'text-sage-500 hover:text-sage-900 hover:bg-sage-50'
              }`}
            >
              <Icon size={22} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs font-semibold ${isActive ? 'text-primary-600' : ''}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
