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
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-sage-200 px-1 pt-2 pb-4 shadow-spa-xl z-40">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-1 flex-col items-center py-1.5 px-1 rounded-spa transition-all duration-300 ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-sage-500 hover:text-sage-900 hover:bg-sage-50'
              }`}
            >
              <Icon size={20} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[11px] font-semibold leading-none ${isActive ? 'text-primary-600' : ''}`}>
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
