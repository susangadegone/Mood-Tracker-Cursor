import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/storage';
import { Leaf, Bell, TrendingUp, Heart, Lock, Edit3, Music } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    notifications: false,
    checkInTime: '09:00',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const userData = {
        name: formData.name || 'Friend',
        notifications: formData.notifications,
        checkInTime: formData.checkInTime,
        onboardedAt: new Date().toISOString(),
      };
      saveUserData(userData);
      navigate('/');
    }
  };

  const handleSkip = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const userData = {
        name: 'Friend',
        notifications: false,
        checkInTime: '09:00',
        onboardedAt: new Date().toISOString(),
      };
      saveUserData(userData);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen gradient-overlay px-4 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mint-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-lg mx-auto relative z-10">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12 fade-in">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`relative transition-all duration-500 ${
                  i <= step ? 'scale-100' : 'scale-75'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    i < step 
                      ? 'bg-primary-600 ring-4 ring-primary-200' 
                      : i === step
                      ? 'bg-primary-500 ring-8 ring-primary-200 animate-pulse'
                      : 'bg-sage-300'
                  }`}></div>
                </div>
                {i < 3 && (
                  <div className={`h-0.5 w-12 transition-all duration-500 ${
                    i < step ? 'bg-primary-500' : 'bg-sage-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-400 to-mint-400 rounded-full shadow-spa-xl mb-6 float">
                <Leaf className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              
              <div>
                <h1 className="text-5xl font-serif font-bold text-sage-900 mb-4 tracking-tight">
                  Welcome to
                  <span className="block bg-gradient-to-r from-primary-600 to-mint-600 bg-clip-text text-transparent">
                    MoodFlow
                  </span>
                </h1>
                <p className="text-xl text-sage-600 font-light max-w-md mx-auto leading-relaxed">
                  A simple, private space to track how you feel
                </p>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="card">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary-50 to-mint-50 rounded-spa">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900 mb-1">Private by design</h3>
                    <p className="text-sm text-sage-600 leading-relaxed">
                      Everything you log stays on your device. No account, no servers.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: Edit3, label: 'Daily check-ins' },
                    { Icon: TrendingUp, label: 'Mood patterns' },
                    { Icon: Heart, label: 'Crisis support' },
                    { Icon: Lock, label: 'Private & local' },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="text-center p-4 bg-white rounded-spa border border-sage-100">
                      <Icon className="w-6 h-6 text-primary-600 mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-xs text-sage-600 font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose */}
        {step === 2 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-mint-400 to-primary-400 rounded-full shadow-spa-lg mb-4">
                <Leaf className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight">
                What you can do
              </h2>
              <p className="text-lg text-sage-600 max-w-md mx-auto">
                A few simple tools for keeping track of how you feel
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  Icon: Edit3,
                  title: 'Track your emotions',
                  description: 'Log how you feel with intensity and a bit of context.'
                },
                {
                  Icon: TrendingUp,
                  title: 'Spot patterns',
                  description: 'See how your mood changes over days and weeks.'
                },
                {
                  Icon: Music,
                  title: 'Wind down',
                  description: 'Save calming videos and run a quick breathing exercise.'
                },
                {
                  Icon: Heart,
                  title: 'Get support',
                  description: 'Crisis lines and resources, always one tap away.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="card group hover:border-primary-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-100 to-mint-100 rounded-spa flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.Icon className="w-6 h-6 text-primary-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sage-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-sage-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Personalization */}
        {step === 3 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-mint-500 rounded-full shadow-spa-lg mb-4">
                <Bell className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight">
                Set things up
              </h2>
              <p className="text-lg text-sage-600 max-w-md mx-auto">
                A couple of optional preferences
              </p>
            </div>

            <div className="card">
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-sage-800 mb-3">
                    What should we call you? (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    placeholder="Your name or nickname"
                  />
                  <p className="text-xs text-sage-500 mt-2">Only used to greet you. You can leave it blank.</p>
                </div>

                {/* Notifications Toggle */}
                <div className="p-5 bg-gradient-to-br from-primary-50 to-mint-50 rounded-spa border border-primary-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="w-5 h-5 text-primary-600" />
                        <h3 className="font-semibold text-sage-900">Daily Check-in Reminders</h3>
                      </div>
                      <p className="text-sm text-sage-600">A daily reminder to check in</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) => handleInputChange('notifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-sage-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-500 shadow-inner"></div>
                    </label>
                  </div>

                  {/* Time Picker (only if notifications enabled) */}
                  {formData.notifications && (
                    <div className="pt-4 border-t border-primary-200">
                      <label className="block text-sm font-medium text-sage-800 mb-2">
                        Preferred check-in time
                      </label>
                      <input
                        type="time"
                        value={formData.checkInTime}
                        onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-sage-50 rounded-spa border border-sage-200">
                  <p className="text-sm text-sage-700 text-center">
                    <span className="font-medium">Privacy first:</span> all your data is stored only on your device
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={handleNext}
            className="w-full btn-primary text-lg"
          >
            <span>{step === 3 ? 'Finish' : step === 1 ? 'Get started' : 'Continue'}</span>
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full text-sage-600 hover:text-sage-900 text-sm font-medium transition-colors duration-200 py-2"
          >
            {step === 3 ? 'Skip personalization' : 'Skip'}
          </button>
        </div>

        {/* Progress Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-sage-500">
            Step {step} of 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
