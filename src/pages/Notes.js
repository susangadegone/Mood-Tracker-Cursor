import React, { useState, useEffect } from 'react';
import { StickyNote, Plus, Search, Tag, Calendar, Trash2 } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('moodflow_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }
  }, []);

  const saveNote = () => {
    if (newNoteText.trim()) {
      const note = {
        id: Date.now().toString(),
        title: newNoteTitle.trim() || 'Quick Note',
        content: newNoteText.trim(),
        tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag),
        timestamp: new Date().toISOString(),
        color: getRandomColor()
      };
      
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem('moodflow_notes', JSON.stringify(updatedNotes));
      
      setNewNoteText('');
      setNewNoteTitle('');
      setNewNoteTags('');
      setShowNewNote(false);
    }
  };

  const deleteNote = (noteId) => {
    if (window.confirm('Delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      localStorage.setItem('moodflow_notes', JSON.stringify(updatedNotes));
    }
  };

  const getRandomColor = () => {
    const colors = [
      'bg-yellow-100 border-yellow-200',
      'bg-pink-100 border-pink-200',
      'bg-blue-100 border-blue-200',
      'bg-green-100 border-green-200',
      'bg-purple-100 border-purple-200',
      'bg-orange-100 border-orange-200'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getAllTags = () => {
    const allTags = notes.flatMap(note => note.tags);
    return [...new Set(allTags)];
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-2xl mb-4">
            <StickyNote className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Quick Notes</h1>
          <p className="text-gray-600 mt-1">Capture thoughts, ideas, and reminders</p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          
          {getAllTags().length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  !selectedTag ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {getAllTags().map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTag === tag ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* New Note Button */}
        <button
          onClick={() => setShowNewNote(!showNewNote)}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>New Note</span>
        </button>

        {/* New Note Form */}
        {showNewNote && (
          <div className="card border-2 border-yellow-200 bg-yellow-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Note</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title (optional)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 h-32 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              />
              <input
                type="text"
                value={newNoteTags}
                onChange={(e) => setNewNoteTags(e.target.value)}
                placeholder="Tags (comma separated): work, personal, ideas"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <div className="flex space-x-3">
                <button
                  onClick={saveNote}
                  disabled={!newNoteText.trim()}
                  className={`flex-1 ${
                    newNoteText.trim()
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed py-3 px-6 rounded-xl'
                  }`}
                >
                  Save Note
                </button>
                <button
                  onClick={() => {
                    setShowNewNote(false);
                    setNewNoteText('');
                    setNewNoteTitle('');
                    setNewNoteTags('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="card text-center py-8">
              <StickyNote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedTag ? 'No matching notes' : 'No notes yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search or filter'
                  : 'Start capturing your thoughts and ideas'
                }
              </p>
              {!searchTerm && !selectedTag && (
                <button
                  onClick={() => setShowNewNote(true)}
                  className="btn-primary"
                >
                  Create your first note
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredNotes.map((note) => (
                <div key={note.id} className={`card ${note.color} border-2 relative group`}>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 pr-8">{note.title}</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{formatDate(note.timestamp)}</span>
                    </div>
                    {note.tags.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Tag size={14} />
                        <div className="flex flex-wrap gap-1">
                          {note.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Note Tips */}
        {notes.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Note-taking tips</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use tags to organize your thoughts</li>
              <li>• Write down ideas as soon as they come</li>
              <li>• Review your notes regularly for insights</li>
              <li>• Use different colors to categorize topics</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
