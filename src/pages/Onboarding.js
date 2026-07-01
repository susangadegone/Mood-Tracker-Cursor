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
                      ? 'bg-primary-500 ring-8 ring-primary-200'
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
                <Leaf className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-sage-900 mb-3 tracking-tight">
                  Welcome to <span className="text-primary-600">MoodFlow</span>
                </h1>
                <p className="text-base text-sage-600 max-w-md mx-auto leading-relaxed">
                  A simple, private space to track how you feel
                </p>
              </div>
            </div>

            {/* Welcome details */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-sm text-sage-700 leading-relaxed">
                  <span className="font-semibold text-sage-900">Private by design. </span>
                  Everything you log stays on your device - no account, no servers.
                </p>
              </div>

              <div className="h-px bg-sage-200" />

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  { Icon: Edit3, label: 'Daily check-ins' },
                  { Icon: TrendingUp, label: 'Mood patterns' },
                  { Icon: Heart, label: 'Crisis support' },
                  { Icon: Lock, label: 'Private & local' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary-600 flex-shrink-0" strokeWidth={2} />
                    <p className="text-sm text-sage-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Purpose */}
        {step === 2 && (
          <div className="space-y-8 slide-up">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-sage-900 tracking-tight">
                What you can do
              </h2>
              <p className="text-base text-sage-600 max-w-md mx-auto">
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
                    <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-spa flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-sage-900 tracking-tight">
                Set things up
              </h2>
              <p className="text-base text-sage-600 max-w-md mx-auto">
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
                <div className="pt-6 border-t border-sage-200">
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
                    <div className="pt-4">
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

                <p className="text-sm text-sage-500 pt-4 border-t border-sage-200">
                  <span className="font-medium text-sage-700">Privacy first:</span> all your data is stored only on your device.
                </p>
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
