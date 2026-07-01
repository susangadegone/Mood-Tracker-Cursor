import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ExternalLink, Plus, Trash2, X, Heart, Shield, Users, Wind, Sprout, FileText } from 'lucide-react';
import { getSupportContacts, saveSupportContact, deleteSupportContact } from '../utils/storage';

const Support = () => {
  const [activeTab, setActiveTab] = useState('crisis');
  const [personalContacts, setPersonalContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showQuickExit, setShowQuickExit] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    available: '',
    notes: ''
  });

  useEffect(() => {
    const contacts = getSupportContacts();
    setPersonalContacts(contacts.personalContacts);
  }, []);

  const handleAddContact = () => {
    const saved = saveSupportContact(newContact);
    setPersonalContacts(prev => [...prev, saved]);
    setNewContact({ name: '', relationship: '', phone: '', available: '', notes: '' });
    setShowAddContact(false);
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Remove this contact?')) {
      deleteSupportContact(contactId);
      setPersonalContacts(prev => prev.filter(c => c.id !== contactId));
    }
  };

  const handleQuickExit = () => {
    window.location.href = 'https://www.weather.com';
  };

  const crisisResources = [
    {
      id: 'suicide-lifeline',
      name: '988 - Suicide & Crisis Lifeline',
      phone: '988',
      description: '24/7 free and confidential support',
      canCall: true,
      canText: true,
      canChat: true,
      chatUrl: 'https://988lifeline.org/chat/'
    },
    {
      id: 'crisis-text',
      name: 'Crisis Text Line',
      phone: '741741',
      description: 'Text HOME to 741741',
      canCall: false,
      canText: true,
      canChat: false
    },
    {
      id: 'samhsa',
      name: 'SAMHSA Helpline',
      phone: '1-800-662-4357',
      description: 'Treatment referral and information',
      canCall: true,
      canText: false,
      canChat: false
    }
  ];

  const hotlines = [
    { name: 'National Suicide Prevention Lifeline', phone: '1-800-273-8255', description: '24/7 crisis support' },
    { name: 'Domestic Violence Hotline', phone: '1-800-799-7233', description: 'Support for domestic violence' },
    { name: 'Trevor Project (LGBTQ+ Youth)', phone: '1-866-488-7386', description: 'Crisis intervention for LGBTQ+ youth' },
    { name: 'Trans Lifeline', phone: '1-877-565-8860', description: 'Support for transgender people' },
    { name: 'NAMI Helpline', phone: '1-800-950-6264', description: 'Mental health information and support' },
    { name: 'Veterans Crisis Line', phone: '1-800-931-2237', description: 'Support for veterans and families' },
  ];

  const onlineResources = [
    { name: 'BetterHelp', url: 'https://www.betterhelp.com', description: 'Online therapy platform' },
    { name: '7 Cups', url: 'https://www.7cups.com', description: 'Free emotional support' },
    { name: 'NAMI', url: 'https://www.nami.org', description: 'Mental health education and advocacy' },
    { name: 'MentalHealth.gov', url: 'https://www.mentalhealth.gov', description: 'Resources and information' },
    { name: 'Psychology Today', url: 'https://www.psychologytoday.com/us/therapists', description: 'Find a therapist' },
  ];

  const selfHelpTools = [
    { name: 'Breathing Exercises', description: '4-4-4 technique and more', Icon: Wind },
    { name: 'Grounding Techniques', description: '5-4-3-2-1 method', Icon: Sprout },
    { name: 'Journaling Prompts', description: 'Express your thoughts', Icon: FileText },
    { name: 'Safety Plan Builder', description: 'Create your personal safety plan', Icon: Shield },
  ];

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        {/* Header with Quick Exit */}
        <div className="flex items-start justify-between gap-3 fade-in">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sage-900 tracking-tight">Support & Resources</h1>
              <p className="text-sm text-sage-600">You're not alone</p>
            </div>
          </div>
          <button
            onClick={() => setShowQuickExit(true)}
            className="flex-shrink-0 px-4 py-2 bg-white hover:bg-sage-50 text-sage-700 text-sm font-semibold rounded-spa border border-sage-300 transition-colors duration-200"
          >
            Quick Exit
          </button>
        </div>

        {/* Crisis Banner - Always Visible */}
        <div className="crisis-banner">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-danger flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="font-semibold text-danger mb-2">Crisis Support - Available 24/7</h2>
              <div className="space-y-3">
                <div className="bg-white rounded-spa p-3">
                  <p className="font-medium text-text-primary mb-2">988 - Suicide & Crisis Lifeline</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="tel:988" className="btn-danger text-xs py-2 px-4 inline-flex items-center space-x-1">
                      <Phone size={14} />
                      <span>Call</span>
                    </a>
                    <a href="sms:988" className="btn-danger text-xs py-2 px-4 inline-flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>Text</span>
                    </a>
                    <a 
                      href="https://988lifeline.org/chat/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-danger text-xs py-2 px-4 inline-flex items-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
                <div className="bg-white rounded-spa p-3">
                  <p className="font-medium text-text-primary mb-2">Crisis Text Line: Text HOME to 741741</p>
                  <a href="sms:741741?body=HOME" className="btn-danger text-xs py-2 px-4 inline-flex items-center space-x-1">
                    <MessageCircle size={14} />
                    <span>Text Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-2">
          {[
            { id: 'crisis', label: 'Crisis', icon: Shield },
            { id: 'hotlines', label: 'Hotlines', icon: Phone },
            { id: 'online', label: 'Online', icon: ExternalLink },
            { id: 'tools', label: 'Tools', icon: Heart },
            { id: 'local', label: 'Personal', icon: Users },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-spa text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-border text-text-primary hover:border-primary-600'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'crisis' && (
          <div className="space-y-4">
            <p className="text-text-secondary">If you're in crisis or need immediate help, these resources are available 24/7:</p>
            {crisisResources.map((resource) => (
              <div key={resource.id} className="card">
                <h3 className="font-semibold text-text-primary mb-2">{resource.name}</h3>
                <p className="text-sm text-text-secondary mb-3">{resource.description}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.canCall && (
                    <a href={`tel:${resource.phone}`} className="btn-primary text-sm py-2 px-4 inline-flex items-center space-x-1">
                      <Phone size={14} />
                      <span>Call {resource.phone}</span>
                    </a>
                  )}
                  {resource.canText && (
                    <a href={`sms:${resource.phone}`} className="btn-secondary text-sm py-2 px-4 inline-flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>Text</span>
                    </a>
                  )}
                  {resource.canChat && (
                    <a 
                      href={resource.chatUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-4 inline-flex items-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>Chat Online</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hotlines' && (
          <div className="space-y-4">
            <p className="text-text-secondary">Specialized helplines for various needs:</p>
            {hotlines.map((hotline, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-text-primary mb-1">{hotline.name}</h3>
                <p className="text-sm text-text-secondary mb-3">{hotline.description}</p>
                <a 
                  href={`tel:${hotline.phone.replace(/\D/g, '')}`} 
                  className="btn-primary text-sm py-2 px-4 inline-flex items-center space-x-2"
                >
                  <Phone size={14} />
                  <span>{hotline.phone}</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'online' && (
          <div className="space-y-4">
            <p className="text-text-secondary">Online resources and therapy platforms:</p>
            {onlineResources.map((resource, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">{resource.name}</h3>
                    <p className="text-sm text-text-secondary mb-3">{resource.description}</p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary text-sm py-2 px-4 inline-flex items-center space-x-2"
                    >
                      <ExternalLink size={14} />
                      <span>Visit Website</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-4">
            <p className="text-text-secondary">Self-help tools and techniques:</p>
            {selfHelpTools.map((tool, index) => (
              <button key={index} className="card w-full text-left hover:border-primary-300 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <tool.Icon className="w-6 h-6 text-primary-600 flex-shrink-0" strokeWidth={1.75} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">{tool.name}</h3>
                    <p className="text-sm text-text-secondary">{tool.description}</p>
                  </div>
                  <ExternalLink size={18} className="text-text-secondary" />
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'local' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary">Your personal support contacts:</p>
              <button
                onClick={() => setShowAddContact(true)}
                className="btn-primary text-sm py-2 px-4 inline-flex items-center space-x-1"
              >
                <Plus size={14} />
                <span>Add Contact</span>
              </button>
            </div>

            {personalContacts.length === 0 ? (
              <div className="card text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No personal contacts yet</h3>
                <p className="text-text-secondary mb-6">Add trusted friends, family, or your therapist for quick access</p>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Your First Contact</span>
                </button>
              </div>
            ) : (
              personalContacts.map((contact) => (
                <div key={contact.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary">{contact.name}</h3>
                      <p className="text-sm text-text-secondary">{contact.relationship}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-text-secondary hover:text-danger transition-colors duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {contact.phone && (
                    <a 
                      href={`tel:${contact.phone}`}
                      className="btn-primary text-sm py-2 px-4 inline-flex items-center space-x-2 mb-2"
                    >
                      <Phone size={14} />
                      <span>{contact.phone}</span>
                    </a>
                  )}
                  {contact.available && (
                    <p className="text-xs text-text-secondary mt-2">Available: {contact.available}</p>
                  )}
                  {contact.notes && (
                    <p className="text-sm text-text-primary mt-2 p-2 bg-gray-50 rounded-spa">{contact.notes}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Add Contact Modal */}
        {showAddContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-spa-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Add Personal Contact</h2>
                <button onClick={() => setShowAddContact(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Dr. Smith, Mom, Best Friend"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Relationship</label>
                  <input
                    type="text"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Therapist, Family, Friend"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Available When</label>
                  <input
                    type="text"
                    value={newContact.available}
                    onChange={(e) => setNewContact({...newContact, available: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Weekdays 9-5, Anytime"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Notes (Optional)</label>
                  <textarea
                    value={newContact.notes}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    className="input-field h-20 resize-none"
                    placeholder="Any additional information..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddContact}
                    disabled={!newContact.name || !newContact.phone}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Contact
                  </button>
                  <button
                    onClick={() => setShowAddContact(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Exit Confirmation */}
        {showQuickExit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-spa-lg p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Exit</h2>
              <p className="text-text-secondary mb-6">
                This will immediately redirect you to Weather.com and clear this screen.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleQuickExit}
                  className="flex-1 btn-danger"
                >
                  Exit Now
                </button>
                <button
                  onClick={() => setShowQuickExit(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;

