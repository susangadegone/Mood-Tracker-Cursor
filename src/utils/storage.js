// Local storage utilities for MoodFlow app

export const STORAGE_KEYS = {
  USER_DATA: 'moodflow_user_data',
  MOOD_ENTRIES: 'moodflow_mood_entries',
  JOURNAL_ENTRIES: 'moodflow_journal_entries',
  PROFILE_DATA: 'moodflow_profile_data',
  MEDIA_LIBRARY: 'moodflow_media_library',
  SUPPORT_CONTACTS: 'moodflow_support_contacts',
};

// User data functions
export const saveUserData = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  // Dispatch custom event to notify components of user data update
  window.dispatchEvent(new CustomEvent('userDataUpdated'));
};

export const getUserData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

// Mood entries functions
export const saveMoodEntry = (moodEntry) => {
  const entries = getMoodEntries();
  const newEntry = {
    ...moodEntry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const getMoodEntries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
  return data ? JSON.parse(data) : [];
};

// Journal entries functions
export const saveJournalEntry = (journalEntry) => {
  const entries = getJournalEntries();
  const newEntry = {
    ...journalEntry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const getJournalEntries = () => {
  const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
  return data ? JSON.parse(data) : [];
};

export const deleteJournalEntry = (entryId) => {
  const entries = getJournalEntries();
  const filteredEntries = entries.filter(entry => entry.id !== entryId);
  localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(filteredEntries));
};

// Profile data functions
export const saveProfileData = (profileData) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE_DATA, JSON.stringify(profileData));
};

export const getProfileData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
  return data ? JSON.parse(data) : {
    helpWhenBad: [],
    helpWhenGood: [],
  };
};

// Utility functions
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

export const isUserOnboarded = () => {
  const userData = getUserData();
  return userData && userData.onboardedAt;
};

// Clear all data when app starts (for fresh start each time)
export const clearDataOnStart = () => {
  clearAllData();
  console.log('App started fresh - all previous data cleared');
};

// Development/Testing helper functions
export const resetApp = () => {
  clearAllData();
  window.dispatchEvent(new CustomEvent('userDataUpdated'));
  console.log('App reset - all data cleared. Refresh the page to see onboarding.');
};

// Make resetApp available globally for easy testing
if (typeof window !== 'undefined') {
  window.resetApp = resetApp;
}

// Media Library functions
export const saveVideo = (video) => {
  const library = getMediaLibrary();
  const newVideo = {
    ...video,
    id: Date.now().toString(),
    addedDate: new Date().toISOString(),
    playCount: 0,
  };
  library.videos.push(newVideo);
  localStorage.setItem(STORAGE_KEYS.MEDIA_LIBRARY, JSON.stringify(library));
  return newVideo;
};

export const getMediaLibrary = () => {
  const data = localStorage.getItem(STORAGE_KEYS.MEDIA_LIBRARY);
  return data ? JSON.parse(data) : {
    videos: [],
    categories: [
      { id: 'focus', name: 'Focus & Productivity' },
      { id: 'meditation', name: 'Meditation & Calm' },
      { id: 'comfort', name: 'Comfort Content' },
      { id: 'motivation', name: 'Motivation' },
      { id: 'sleep', name: 'Sleep Sounds' },
    ]
  };
};

export const deleteVideo = (videoId) => {
  const library = getMediaLibrary();
  library.videos = library.videos.filter(v => v.id !== videoId);
  localStorage.setItem(STORAGE_KEYS.MEDIA_LIBRARY, JSON.stringify(library));
};

export const updateVideoPlayCount = (videoId) => {
  const library = getMediaLibrary();
  const video = library.videos.find(v => v.id === videoId);
  if (video) {
    video.playCount = (video.playCount || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.MEDIA_LIBRARY, JSON.stringify(library));
  }
};

// Support Contacts functions
export const saveSupportContact = (contact) => {
  const contacts = getSupportContacts();
  const newContact = {
    ...contact,
    id: Date.now().toString(),
  };
  contacts.personalContacts.push(newContact);
  localStorage.setItem(STORAGE_KEYS.SUPPORT_CONTACTS, JSON.stringify(contacts));
  return newContact;
};

export const getSupportContacts = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SUPPORT_CONTACTS);
  return data ? JSON.parse(data) : {
    personalContacts: [],
    favoriteResources: []
  };
};

export const deleteSupportContact = (contactId) => {
  const contacts = getSupportContacts();
  contacts.personalContacts = contacts.personalContacts.filter(c => c.id !== contactId);
  localStorage.setItem(STORAGE_KEYS.SUPPORT_CONTACTS, JSON.stringify(contacts));
};

export const toggleFavoriteResource = (resourceId) => {
  const contacts = getSupportContacts();
  if (contacts.favoriteResources.includes(resourceId)) {
    contacts.favoriteResources = contacts.favoriteResources.filter(id => id !== resourceId);
  } else {
    contacts.favoriteResources.push(resourceId);
  }
  localStorage.setItem(STORAGE_KEYS.SUPPORT_CONTACTS, JSON.stringify(contacts));
  return contacts.favoriteResources;
};
