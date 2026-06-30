import React, { useState, useEffect } from 'react';
import { getUserData, getProfileData, saveProfileData, resetApp } from '../utils/storage';
import { Plus, X, Edit3, Save, User, RotateCcw } from 'lucide-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState({ helpWhenBad: [], helpWhenGood: [] });
  const [editingSection, setEditingSection] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const user = getUserData();
    const profile = getProfileData();
    setUserData(user);
    setProfileData(profile);
  }, []);

  const handleAddItem = (section) => {
    if (newItem.trim()) {
      const updatedData = {
        ...profileData,
        [section]: [...profileData[section], newItem.trim()]
      };
      setProfileData(updatedData);
      saveProfileData(updatedData);
      setNewItem('');
      setEditingSection(null);
    }
  };

  const handleRemoveItem = (section, index) => {
    const updatedData = {
      ...profileData,
      [section]: profileData[section].filter((_, i) => i !== index)
    };
    setProfileData(updatedData);
    saveProfileData(updatedData);
  };

  const handleEditItem = (section, index, newText) => {
    if (newText.trim()) {
      const updatedData = {
        ...profileData,
        [section]: profileData[section].map((item, i) => i === index ? newText.trim() : item)
      };
      setProfileData(updatedData);
      saveProfileData(updatedData);
    }
    setEditingItem(null);
    setEditingText('');
  };

  const startEditing = (section, index, currentText) => {
    setEditingItem(`${section}-${index}`);
    setEditingText(currentText);
  };

  const renderSection = (section, title, description, color) => (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button
          onClick={() => setEditingSection(editingSection === section ? null : section)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            editingSection === section
              ? `bg-${color}-100 text-${color}-600`
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Add new item */}
      {editingSection === section && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem(section)}
            />
            <button
              onClick={() => handleAddItem(section)}
              className="btn-primary px-4 py-2"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      <div className="space-y-2">
        {profileData[section].length === 0 ? (
          <p className="text-gray-500 text-center py-4 italic">
            No items added yet. Click the + button to add some!
          </p>
        ) : (
          profileData[section].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 bg-${color}-50 border border-${color}-100 rounded-lg`}
            >
              {editingItem === `${section}-${index}` ? (
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleEditItem(section, index, editingText)}
                  />
                  <button
                    onClick={() => handleEditItem(section, index, editingText)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-gray-800">{item}</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => startEditing(section, index, item)}
                      className="p-1 text-gray-600 hover:bg-white hover:bg-opacity-50 rounded"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(section, index)}
                      className="p-1 text-red-600 hover:bg-white hover:bg-opacity-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal wellness toolkit</p>
        </div>

        {/* User info */}
        {userData && (
          <div className="card text-center">
            <h2 className="text-xl font-semibold text-gray-900">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            {userData.usage && (
              <p className="text-sm text-gray-500 mt-2 italic">"{userData.usage}"</p>
            )}
          </div>
        )}

        {/* Help sections */}
        {renderSection(
          'helpWhenBad',
          'What helps when I feel bad',
          'Activities, thoughts, or strategies that lift your mood',
          'red'
        )}

        {renderSection(
          'helpWhenGood',
          'What helps when I feel good',
          'Ways to maintain and enhance positive feelings',
          'green'
        )}

        {/* Tips */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <h3 className="font-medium text-primary-800 mb-2">Tips</h3>
          <ul className="text-sm text-primary-700 space-y-1">
            <li>• Be specific: "10-minute walk" vs "exercise"</li>
            <li>• Include quick wins: "Deep breathing for 2 minutes"</li>
            <li>• Add social activities: "Call a friend"</li>
            <li>• Remember self-care: "Take a warm bath"</li>
          </ul>
        </div>

        {/* Reset App Button for Testing */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <h3 className="font-medium text-red-800 mb-3">Testing & Development</h3>
          <p className="text-sm text-red-700 mb-4">
            Use this button to reset the app and clear all stored data. This will take you back to the onboarding screen.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset the app? This will clear all your data and take you back to onboarding.')) {
                resetApp();
                window.location.reload();
              }
            }}
            className="btn-secondary text-red-700 border-red-300 hover:bg-red-50 flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset App (Clear All Data)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
