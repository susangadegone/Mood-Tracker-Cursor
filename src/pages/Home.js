import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getMoodEntries } from '../utils/storage';
import { Edit3, TrendingUp, Music, Heart, Calendar, Flame, AlertCircle, Phone, Leaf, Check } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const user = getUserData();
    const entries = getMoodEntries();
    setUserData(user);
    setMoodEntries(entries);
    
    // Calculate streak
    const today = new Date().toDateString();
    let currentStreak = 0;
    const sortedEntries = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (sortedEntries.length > 0 && new Date(sortedEntries[0].timestamp).toDateString() === today) {
      currentStreak = 1;
      for (let i = 1; i < sortedEntries.length; i++) {
        const prevDate = new Date(sortedEntries[i-1].timestamp);
        const currDate = new Date(sortedEntries[i].timestamp);
        const diffDays = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak++;
        } else if (diffDays > 1) {
          break;
        }
      }
    }
    setStreak(currentStreak);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTodaysMood = () => {
    const today = new Date().toDateString();
    return moodEntries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    );
  };

  const todaysMood = getTodaysMood();

  const quickActions = [
    {
      title: 'Track Mood',
      description: 'Log your feelings',
      icon: Edit3,
      bg: 'bg-primary-600',
      path: '/track'
    },
    {
      title: 'View Insights',
      description: 'See your patterns',
      icon: TrendingUp,
      bg: 'bg-mint-600',
      path: '/insights'
    },
    {
      title: 'Sanctuary',
      description: 'Comfort content',
      icon: Music,
      bg: 'bg-sage-600',
      path: '/sanctuary'
    },
    {
      title: 'Support',
      description: 'Get resources',
      icon: Heart,
      bg: 'bg-primary-700',
      path: '/support'
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      {/* Decorative Background Elements */}
      
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Welcome Header */}
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sage-900 tracking-tight">
              {getGreeting()}{userData?.name && userData.name !== 'Friend' ? `, ${userData.name}` : ''}
            </h1>
            <p className="text-sm text-sage-600">How are you feeling today?</p>
          </div>
        </div>

        {/* Crisis Resources - Elegant Banner */}
        <div className="card border-red-200 bg-red-50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-danger rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sage-900 mb-2">Need immediate support?</h3>
              <p className="text-sm text-sage-600 mb-4">Crisis support available 24/7. You're not alone.</p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="tel:988" 
                  className="inline-flex items-center space-x-2 bg-danger hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-spa transition-colors duration-200"
                >
                  <Phone size={16} />
                  <span>Call 988</span>
                </a>
                <a 
                  href="sms:988" 
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-danger border-2 border-danger text-sm font-medium py-2 px-4 rounded-spa transition-all duration-300"
                >
                  <span>Text 988</span>
                </a>
                <button
                  onClick={() => navigate('/support')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-sage-50 text-sage-700 border-2 border-sage-300 text-sm font-medium py-2 px-4 rounded-spa transition-all duration-300"
                >
                  <Heart size={16} />
                  <span>More Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Check-in Status */}
        <div className="card hover:border-primary-300">
          {todaysMood ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center">
                  <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-900 mb-1">Today's mood logged</h3>
                  <p className="text-sm text-sage-600 capitalize">
                    Feeling {todaysMood.emotion || todaysMood.mood} at {new Date(todaysMood.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/track')}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Edit3 className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold text-sage-900 mb-2">Ready to check in?</h3>
              <p className="text-sage-600 mb-6">Log how you're feeling right now</p>
              <button
                onClick={() => navigate('/track')}
                className="btn-primary"
              >
                Log Your Mood
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center group hover:border-primary-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-500 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <p className="text-4xl font-bold text-sage-900 mb-1">{streak}</p>
            <p className="text-sm text-sage-600">Day Streak</p>
          </div>
          <div className="card text-center group hover:border-primary-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <p className="text-4xl font-bold text-sage-900 mb-1">{moodEntries.length}</p>
            <p className="text-sm text-sage-600">Total Entries</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-sage-900 mb-6 text-center">Quick actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="card text-center group hover:border-primary-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${action.bg} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-sage-900 mb-1">{action.title}</h3>
                  <p className="text-xs text-sage-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Entries */}
        {moodEntries.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-sage-900">Recent Check-ins</h2>
              <button
                onClick={() => navigate('/insights')}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {moodEntries.slice(-3).reverse().map((entry) => (
                <div key={entry.id} className="card-minimal hover:border-primary-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-sage-900 capitalize text-sm">
                        {entry.emotion || entry.mood || 'Mood logged'}
                      </p>
                      <p className="text-xs text-sage-600 mt-1">
                        {new Date(entry.timestamp).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} · {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {entry.intensity && (
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            entry.intensity >= 8 ? 'bg-red-500' : 
                            entry.intensity >= 5 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}></div>
                          <span className="text-sm font-semibold text-sage-900">{entry.intensity}/10</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
