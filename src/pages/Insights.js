import React, { useState, useEffect } from 'react';
import { getMoodEntries } from '../utils/storage';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Clock } from 'lucide-react';

const Insights = () => {
  const [entries, setEntries] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); // week, month, all

  useEffect(() => {
    const allEntries = getMoodEntries();
    setEntries(allEntries);
  }, []);

  const getFilteredEntries = () => {
    const now = new Date();
    const filtered = entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      if (timeRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      } else if (timeRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return entryDate >= monthAgo;
      }
      return true;
    });
    return filtered;
  };

  const getEmotionCounts = () => {
    const filtered = getFilteredEntries();
    const counts = {};
    filtered.forEach(entry => {
      const emotion = entry.emotion || entry.mood || 'Unknown';
      counts[emotion] = (counts[emotion] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getQuadrantCounts = () => {
    const filtered = getFilteredEntries();
    const counts = {
      'High Energy + Pleasant': 0,
      'High Energy + Unpleasant': 0,
      'Low Energy + Pleasant': 0,
      'Low Energy + Unpleasant': 0,
    };
    
    filtered.forEach(entry => {
      if (entry.quadrant) {
        const quadrantLabels = {
          'high-pleasant': 'High Energy + Pleasant',
          'high-unpleasant': 'High Energy + Unpleasant',
          'low-pleasant': 'Low Energy + Pleasant',
          'low-unpleasant': 'Low Energy + Unpleasant',
        };
        const label = quadrantLabels[entry.quadrant];
        if (label) counts[label]++;
      }
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const getAverageMetrics = () => {
    const filtered = getFilteredEntries().filter(e => e.intensity);
    if (filtered.length === 0) return { intensity: 0, clarity: 0, control: 0 };
    
    const totals = filtered.reduce((acc, entry) => ({
      intensity: acc.intensity + (entry.intensity || 0),
      clarity: acc.clarity + (entry.clarity || 0),
      control: acc.control + (entry.control || 0),
    }), { intensity: 0, clarity: 0, control: 0 });
    
    return {
      intensity: (totals.intensity / filtered.length).toFixed(1),
      clarity: (totals.clarity / filtered.length).toFixed(1),
      control: (totals.control / filtered.length).toFixed(1),
    };
  };

  const getTopTags = () => {
    const filtered = getFilteredEntries();
    const tagCounts = {};
    filtered.forEach(entry => {
      (entry.tags || entry.activities || []).forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  };

  const emotionData = getEmotionCounts();
  const quadrantData = getQuadrantCounts();
  const averages = getAverageMetrics();
  const topTags = getTopTags();

  const COLORS = ['#3498DB', '#27AE60', '#E67E22', '#E74C3C', '#9b59b6', '#34495e'];

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sage-900 tracking-tight">Insights</h1>
            <p className="text-sm text-sage-600">Your mood patterns over time</p>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'week', label: 'Last 7 Days' },
            { id: 'month', label: 'Last 30 Days' },
            { id: 'all', label: 'All Time' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-6 py-3 rounded-spa text-sm font-semibold transition-all duration-300 ${
                timeRange === range.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-sage-600 hover:bg-sage-50 border-2 border-sage-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <div className="card text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No data yet</h3>
            <p className="text-text-secondary">Start tracking your moods to see insights and patterns</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-3xl font-semibold text-text-primary">{getFilteredEntries().length}</p>
                <p className="text-sm text-text-secondary">Check-ins</p>
              </div>
              <div className="card text-center">
                <Clock className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-3xl font-semibold text-text-primary">{Math.ceil(entries.length / 7)}</p>
                <p className="text-sm text-text-secondary">Weeks Tracking</p>
              </div>
              <div className="card text-center">
                <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="text-3xl font-semibold text-text-primary">{(entries.length / Math.max(1, Math.ceil(entries.length / 7))).toFixed(1)}</p>
                <p className="text-sm text-text-secondary">Avg per Week</p>
              </div>
            </div>

            {/* Average Metrics */}
            {getFilteredEntries().some(e => e.intensity) && (
              <div className="card">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Average Metrics</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Intensity</span>
                      <span className="text-sm font-semibold text-primary-600">{averages.intensity}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 rounded-full transition-all duration-500"
                        style={{ width: `${(averages.intensity / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Clarity</span>
                      <span className="text-sm font-semibold text-success">{averages.clarity}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-success rounded-full transition-all duration-500"
                        style={{ width: `${(averages.clarity / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">Control</span>
                      <span className="text-sm font-semibold text-warning">{averages.control}/10</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warning rounded-full transition-all duration-500"
                        style={{ width: `${(averages.control / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Emotion Distribution */}
            {emotionData.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Emotion Distribution</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Bar dataKey="value" fill="#3498DB" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Quadrant Distribution */}
            {quadrantData.some(d => d.value > 0) && (
              <div className="card">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Energy & Valence Patterns</h2>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={quadrantData.filter(d => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {quadrantData.filter(d => d.value > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Top Context Tags */}
            {topTags.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Most Common Contexts</h2>
                <div className="space-y-3">
                  {topTags.map((tag, index) => (
                    <div key={tag.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-semibold text-primary-600">#{index + 1}</span>
                        <span className="font-medium text-text-primary capitalize">{tag.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-600 rounded-full"
                            style={{ width: `${(tag.count / getFilteredEntries().length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-secondary">{tag.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Insights;

