import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMoodEntry } from '../utils/storage';
import { Check, Phone, Heart, Edit3, Briefcase, Users, HeartHandshake, Activity, BookOpen, Home as HomeIcon, DollarSign, Target } from 'lucide-react';

const Track = () => {
  const navigate = useNavigate();
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [control, setControl] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCrisisResources, setShowCrisisResources] = useState(false);

  const quadrants = {
    'high-pleasant': {
      label: 'High Energy + Pleasant',
      color: 'bg-yellow-50 border-yellow-300',
      emotions: ['Excited', 'Joyful', 'Energized', 'Motivated', 'Inspired']
    },
    'high-unpleasant': {
      label: 'High Energy + Unpleasant',
      color: 'bg-red-50 border-red-300',
      emotions: ['Anxious', 'Stressed', 'Angry', 'Frustrated', 'Overwhelmed']
    },
    'low-pleasant': {
      label: 'Low Energy + Pleasant',
      color: 'bg-green-50 border-green-300',
      emotions: ['Calm', 'Content', 'Peaceful', 'Relaxed', 'Satisfied']
    },
    'low-unpleasant': {
      label: 'Low Energy + Unpleasant',
      color: 'bg-blue-50 border-blue-300',
      emotions: ['Sad', 'Tired', 'Lonely', 'Numb', 'Hopeless']
    }
  };

  const contextTags = [
    { id: 'work', label: 'Work', Icon: Briefcase },
    { id: 'social', label: 'Social', Icon: Users },
    { id: 'relationship', label: 'Relationship', Icon: HeartHandshake },
    { id: 'health', label: 'Health', Icon: Activity },
    { id: 'study', label: 'Study', Icon: BookOpen },
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'financial', label: 'Financial', Icon: DollarSign },
    { id: 'personal', label: 'Personal', Icon: Target },
  ];

  const handleSave = () => {
    if (!selectedEmotion) return;

    const entry = {
      quadrant: selectedQuadrant,
      emotion: selectedEmotion,
      intensity,
      clarity,
      control,
      tags: selectedTags,
      note,
      // Keep backwards compatibility
      mood: selectedEmotion.toLowerCase(),
      activities: selectedTags
    };

    saveMoodEntry(entry);
    
    // Check if user needs crisis support (high intensity difficult emotions)
    if ((selectedQuadrant === 'high-unpleasant' || selectedQuadrant === 'low-unpleasant') && intensity >= 8) {
      setShowCrisisResources(true);
    }
    
    // Reset form
    setSelectedQuadrant(null);
    setSelectedEmotion(null);
    setIntensity(5);
    setClarity(5);
    setControl(5);
    setSelectedTags([]);
    setNote('');
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sage-900 tracking-tight">Track Your Mood</h1>
            <p className="text-sm text-sage-600">How are you feeling right now?</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && !showCrisisResources && (
          <div className="card bg-primary-50 border-primary-300 text-center slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
              <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-semibold text-sage-900 mb-2">Mood logged</h3>
            <p className="text-sage-600">Your entry has been saved.</p>
          </div>
        )}

        {/* Crisis Resources Message */}
        {showCrisisResources && (
          <div className="crisis-banner slide-up">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-danger mb-2 flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>We're here for you</span>
                </h3>
                <p className="text-sm text-text-primary mb-3">
                  Thank you for tracking your feelings. If you're struggling right now, please know that help is available 24/7.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="tel:988" 
                  className="inline-flex items-center space-x-2 bg-danger hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-spa transition-all duration-200"
                >
                  <Phone size={16} />
                  <span>Call 988 Now</span>
                </a>
                <a 
                  href="sms:988" 
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-danger border border-danger text-sm font-medium py-2 px-4 rounded-spa transition-all duration-200"
                >
                  <span>Text 988</span>
                </a>
                <button
                  onClick={() => navigate('/support')}
                  className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-text-primary border border-border text-sm font-medium py-2 px-4 rounded-spa transition-all duration-200"
                >
                  <span>View All Resources</span>
                </button>
              </div>
              <button
                onClick={() => setShowCrisisResources(false)}
                className="text-sm text-text-secondary hover:text-text-primary underline"
              >
                I'm okay, continue
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Quadrant Selection */}
        <div className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Step 1: Choose Your Quadrant</h2>
          <p className="text-sm text-text-secondary mb-4">Select the area that best describes your current state</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(quadrants).map(([key, quad]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedQuadrant(key);
                  setSelectedEmotion(null);
                }}
                className={`p-4 rounded-spa border-2 transition-all duration-200 text-left ${
                  selectedQuadrant === key 
                    ? quad.color + ' border-opacity-100' 
                    : 'bg-white border-border hover:border-primary-600'
                }`}
              >
                <p className="font-medium text-text-primary text-sm mb-2">{quad.label}</p>
                <div className="flex flex-wrap gap-1">
                  {quad.emotions.slice(0, 3).map((emotion, idx) => (
                    <span key={idx} className="text-xs text-text-secondary">
                      {emotion}{idx < 2 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Specific Emotion */}
        {selectedQuadrant && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Step 2: Select Specific Emotion</h2>
            <div className="flex flex-wrap gap-2">
              {quadrants[selectedQuadrant].emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`px-4 py-2 rounded-spa font-medium transition-all duration-200 ${
                    selectedEmotion === emotion
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-border text-text-primary hover:border-primary-600'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Intensity Sliders */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-6">Step 3: Describe the Feeling</h2>
            
            <div className="space-y-6">
              {/* Intensity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Intensity</label>
                  <span className="text-sm font-semibold text-primary-600">{intensity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-spa appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Mild</span>
                  <span>Strong</span>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Clarity</label>
                  <span className="text-sm font-semibold text-primary-600">{clarity}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={clarity}
                  onChange={(e) => setClarity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-spa appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Confused</span>
                  <span>Clear</span>
                </div>
              </div>

              {/* Control */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary">Control</label>
                  <span className="text-sm font-semibold text-primary-600">{control}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={control}
                  onChange={(e) => setControl(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-spa appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Overwhelming</span>
                  <span>Manageable</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Context Tags */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Step 4: Context (Optional)</h2>
            <p className="text-sm text-text-secondary mb-4">Select up to 3 tags</p>
            
            <div className="flex flex-wrap gap-2">
              {contextTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  disabled={!selectedTags.includes(tag.id) && selectedTags.length >= 3}
                  className={`px-4 py-2 rounded-spa font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedTags.includes(tag.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border border-border text-text-primary hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <tag.Icon size={16} />
                  <span className="text-sm">{tag.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Note */}
        {selectedEmotion && (
          <div className="card slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Step 5: Add a Note (Optional)</h2>
            <p className="text-sm text-text-secondary mb-4">What's on your mind?</p>
            
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field h-32 resize-none"
              placeholder="Express your thoughts here..."
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-text-secondary">Your note is private and saved locally</p>
              <span className="text-xs text-text-secondary">{note.length}/500</span>
            </div>
          </div>
        )}

        {/* Save Button */}
        {selectedEmotion && (
          <div className="sticky bottom-20 slide-up">
            <button
              onClick={handleSave}
              className="w-full btn-primary py-4 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Check size={20} />
              <span className="text-lg font-semibold">Save Mood Entry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;

