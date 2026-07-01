import React, { useState } from 'react';
import { Puzzle, BookOpen, Wind, ArrowLeft, Gamepad2, Target, Zap } from 'lucide-react';

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('recommended'); // recommended or puzzles

  // Recommended activities
  const recommendedActivities = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Calm your mind with guided breathing',
      icon: Wind,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      id: 'journal-prompt',
      title: 'Journal Prompts',
      description: 'Creative and engaging writing prompts',
      icon: BookOpen,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
  ];

  // Puzzle library
  const puzzleActivities = [
    {
      id: 'puzzle',
      title: 'Daily Riddles',
      description: 'Challenge your mind with brain teasers',
      icon: Puzzle,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      id: 'hangman',
      title: 'Hangman Game',
      description: 'Guess the wellness-themed words',
      icon: Gamepad2,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      id: 'word-game',
      title: 'Word Association',
      description: 'Connect words and boost creativity',
      icon: Target,
      color: 'bg-pink-100',
      textColor: 'text-pink-600',
    },
    {
      id: 'quick-games',
      title: 'Quick Mind Games',
      description: 'Fast games to boost your mood',
      icon: Zap,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
  ];

  const journalPrompts = [
    "If you could have dinner with any fictional character, who would it be and why?",
    "Write about your dream vacation using only emojis, then translate it into words.",
    "What superpower would you choose and how would you use it to help others?",
    "Describe your perfect day using all five senses.",
    "If your life was a movie, what would be the soundtrack for today?",
    "Write a letter to your future self 5 years from now.",
    "What would you do if you had an extra hour in every day?",
    "Create a recipe for happiness using ingredients from your life.",
    "If you could time travel, would you go to the past or future? Why?",
    "Write about a small moment today that made you smile.",
  ];

  const puzzles = [
    {
      question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
      answer: "Fire",
      hint: "Think about something that needs oxygen to survive but isn't living."
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      answer: "Footsteps",
      hint: "Think about walking and what you create as you move."
    },
    {
      question: "What gets wetter the more it dries?",
      answer: "A towel",
      hint: "Think about something you use after a shower."
    },
    {
      question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
      answer: "A map",
      hint: "Think about something that shows places but doesn't contain them."
    },
    {
      question: "What can travel around the world while staying in a corner?",
      answer: "A stamp",
      hint: "Think about something small that goes on mail."
    },
  ];

  const hangmanWords = [
    { word: 'HAPPINESS', hint: 'A positive emotion' },
    { word: 'GRATITUDE', hint: 'Being thankful' },
    { word: 'MINDFULNESS', hint: 'Being present in the moment' },
    { word: 'WELLNESS', hint: 'State of being healthy' },
    { word: 'SERENITY', hint: 'Peaceful calmness' },
    { word: 'BALANCE', hint: 'Harmony in life' },
    { word: 'COURAGE', hint: 'Bravery in facing challenges' },
    { word: 'COMPASSION', hint: 'Caring for others' },
    { word: 'RESILIENCE', hint: 'Bouncing back from difficulties' },
    { word: 'OPTIMISM', hint: 'Looking on the bright side' },
  ];

  const wordAssociations = [
    { start: 'CALM', associations: ['PEACE', 'QUIET', 'OCEAN', 'BREATH'] },
    { start: 'JOY', associations: ['LAUGHTER', 'SUNSHINE', 'CELEBRATION', 'SMILE'] },
    { start: 'GROWTH', associations: ['LEARNING', 'CHANGE', 'PROGRESS', 'FLOWER'] },
    { start: 'STRENGTH', associations: ['COURAGE', 'POWER', 'RESILIENCE', 'MOUNTAIN'] },
    { start: 'HOPE', associations: ['FUTURE', 'LIGHT', 'DREAMS', 'RAINBOW'] },
  ];

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  const getRandomPuzzle = () => {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  };

  const renderActivityDetail = () => {
    switch (selectedActivity) {
      case 'puzzle':
        return <PuzzleActivity puzzle={getRandomPuzzle()} />;
      case 'hangman':
        return <HangmanGame word={getRandomHangmanWord()} />;
      case 'word-game':
        return <WordAssociationGame game={getRandomWordAssociation()} />;
      case 'journal-prompt':
        return <JournalPromptActivity prompt={getRandomPrompt()} />;
      case 'breathing':
        return <BreathingActivity />;
      case 'quick-games':
        return <QuickGamesActivity />;
      default:
        return null;
    }
  };

  const getRandomHangmanWord = () => {
    return hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
  };

  const getRandomWordAssociation = () => {
    return wordAssociations[Math.floor(Math.random() * wordAssociations.length)];
  };

  if (selectedActivity) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setSelectedActivity(null)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Activities</span>
          </button>
          {renderActivityDetail()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <Puzzle className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sage-900 tracking-tight">Wellness Activities</h1>
            <p className="text-sm text-sage-600">Tools for your mindful journey</p>
          </div>
        </div>

        {/* Tab Menu */}
        <div className="flex gap-2 bg-white rounded-spa-lg p-1.5 border border-sage-200">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex-1 py-4 px-4 rounded-spa text-sm font-semibold transition-all duration-300 ${
              activeTab === 'recommended'
                ? 'bg-primary-600 text-white'
                : 'text-sage-600 hover:text-sage-900 hover:bg-sage-50'
            }`}
          >
            Recommended for You
          </button>
          <button
            onClick={() => setActiveTab('puzzles')}
            className={`flex-1 py-4 px-4 rounded-spa text-sm font-semibold transition-all duration-300 ${
              activeTab === 'puzzles'
                ? 'bg-primary-600 text-white'
                : 'text-sage-600 hover:text-sage-900 hover:bg-sage-50'
            }`}
          >
            Puzzle Library
          </button>
        </div>

        {/* Activity cards */}
        <div className="space-y-4">
          {(activeTab === 'recommended' ? recommendedActivities : puzzleActivities).map((activity, index) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity.id)}
                className="w-full card hover:border-primary-300 transition-colors duration-200 text-left group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-4 rounded-spa ${activity.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className={activity.textColor} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sage-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-sage-600">{activity.description}</p>
                  </div>
                  <div className="text-sage-400 group-hover:text-primary-600 transition-colors">
                    <ArrowLeft size={20} className="rotate-180" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Context-specific tips */}
        {activeTab === 'recommended' ? (
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="text-xl font-semibold text-sage-900 mb-3">Recommended for you</h3>
            <ul className="text-sm text-sage-600 space-y-2 leading-relaxed">
              <li>• These activities help reduce stress and anxiety</li>
              <li>• Practice regularly for best results</li>
              <li>• Find a quiet, comfortable space</li>
              <li>• Use when you need emotional grounding</li>
            </ul>
          </div>
        ) : (
          <div className="card bg-mint-50 border-mint-200">
            <h3 className="text-xl font-semibold text-sage-900 mb-3">Puzzle tips</h3>
            <ul className="text-sm text-sage-600 space-y-2 leading-relaxed">
              <li>• Games help distract from anxious thoughts</li>
              <li>• Take your time - there's no rush</li>
              <li>• Try different puzzles to find your favorites</li>
              <li>• Perfect for a mental break</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const PuzzleActivity = ({ puzzle }) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4">
          <Puzzle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Daily Puzzle</h2>
        <p className="text-gray-600 mt-1">Exercise your mind with this riddle</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Riddle</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{puzzle.question}</p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            className="input-field"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-secondary flex-1"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="btn-primary flex-1"
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>
        </div>

        {showHint && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800"><strong>Hint:</strong> {puzzle.hint}</p>
          </div>
        )}

        {showAnswer && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800"><strong>Answer:</strong> {puzzle.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const JournalPromptActivity = ({ prompt }) => {
  const [response, setResponse] = useState('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Guided Journal</h2>
        <p className="text-gray-600 mt-1">Reflect on today's prompt</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Today's Prompt</h3>
        <p className="text-gray-700 leading-relaxed mb-6 italic">"{prompt}"</p>
        
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Take your time to reflect and write your thoughts..."
          className="input-field h-40 resize-none"
        />
        
        <div className="mt-4 text-sm text-gray-500">
          <p>There are no right or wrong answers. Write whatever comes to mind.</p>
        </div>
      </div>
    </div>
  );
};

const HangmanGame = ({ word }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!word.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const getDisplayWord = () => {
    return word.word.split('').map(letter => 
      guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
  };

  const isGameWon = () => {
    return word.word.split('').every(letter => guessedLetters.includes(letter));
  };

  const isGameLost = () => {
    return wrongGuesses >= maxWrongGuesses;
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
          <Gamepad2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Hangman Game</h2>
        <p className="text-gray-600 mt-1">Guess the wellness word!</p>
      </div>

      <div className="card text-center">
        <div className="mb-6">
          <div className="text-3xl font-mono font-bold text-gray-900 mb-4 tracking-wider">
            {getDisplayWord()}
          </div>
          <p className="text-gray-600">Wrong guesses: {wrongGuesses}/{maxWrongGuesses}</p>
        </div>

        {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="mb-4 btn-secondary text-sm"
          >
            Show Hint
          </button>
        )}

        {showHint && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800"><strong>Hint:</strong> {word.hint}</p>
          </div>
        )}

        {isGameWon() && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">Congratulations! You guessed it!</p>
          </div>
        )}

        {isGameLost() && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">Game over. The word was: <strong>{word.word}</strong></p>
          </div>
        )}

        <div className="grid grid-cols-6 gap-2">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || isGameWon() || isGameLost()}
              className={`p-2 rounded text-sm font-medium transition-colors ${
                guessedLetters.includes(letter)
                  ? word.word.includes(letter)
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } ${(isGameWon() || isGameLost()) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const WordAssociationGame = ({ game }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleGuess = (guess) => {
    if (guess.trim()) {
      setUserGuesses([...userGuesses, guess.trim().toUpperCase()]);
    }
  };

  // const nextWord = () => {
  //   if (currentIndex < game.associations.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //     setShowAnswer(false);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-2xl mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Word Association</h2>
        <p className="text-gray-600 mt-1">What words come to mind?</p>
      </div>

      <div className="card">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-primary-600 mb-4">
            {game.start}
          </div>
          <p className="text-gray-600">What words do you associate with this?</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Type a word that comes to mind..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleGuess(e.target.value);
                e.target.value = '';
              }
            }}
          />

          {userGuesses.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Your associations:</h4>
              <div className="flex flex-wrap gap-2">
                {userGuesses.map((guess, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {guess}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="w-full btn-secondary"
          >
            {showAnswer ? 'Hide' : 'Show'} Common Associations
          </button>

          {showAnswer && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Common associations:</h4>
              <div className="flex flex-wrap gap-2">
                {game.associations.map((word, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickGamesActivity = () => {
  const [currentGame, setCurrentGame] = useState('color');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const games = [
    { id: 'color', name: 'Color Match', description: 'Match the color name with its color' },
    { id: 'memory', name: 'Memory Sequence', description: 'Remember the sequence of numbers' },
    { id: 'word', name: 'Quick Words', description: 'Type words that start with the given letter' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-2xl mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Quick Mind Games</h2>
        <p className="text-gray-600 mt-1">Fast games to boost your mood</p>
      </div>

      <div className="card">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-yellow-600 mb-2">Score: {score}</div>
          <p className="text-gray-600">Choose a game to play!</p>
        </div>

        <div className="space-y-3">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                currentGame === game.id
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{game.name}</h3>
              <p className="text-sm text-gray-600">{game.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-center">
          <p className="text-yellow-800 mb-3">Ready to play <strong>{games.find(g => g.id === currentGame)?.name}</strong>?</p>
          <button
            onClick={() => setGameActive(true)}
            className="btn-primary"
          >
            Start Game
          </button>
        </div>

        {gameActive && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-700 mb-2">Game in progress...</p>
            <button
              onClick={() => {
                setGameActive(false);
                setScore(score + Math.floor(Math.random() * 10) + 1);
              }}
              className="btn-secondary"
            >
              Finish Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BreathingActivity = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);

  React.useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev === 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else {
              setPhase('inhale');
              setCycle(c => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe In';
    }
  };

  const getColor = () => {
    switch (phase) {
      case 'inhale':
        return 'bg-blue-500';
      case 'hold':
        return 'bg-yellow-500';
      case 'exhale':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4">
          <Wind className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Breathing Exercise</h2>
        <p className="text-gray-600 mt-1">4-4-4 breathing technique</p>
      </div>

      <div className="card text-center">
        <div className={`w-32 h-32 mx-auto rounded-full ${getColor()} flex items-center justify-center mb-6 transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}>
          <div className="text-white">
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm">{getInstruction()}</div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">{getInstruction()}</p>
          <p className="text-gray-600">Cycle {cycle + 1}</p>
        </div>

        <button
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) {
              setPhase('inhale');
              setCount(4);
              setCycle(0);
            }
          }}
          className={`w-full ${isActive ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isActive ? 'Stop' : 'Start Breathing Exercise'}
        </button>

        {cycle >= 5 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">Great job. You've completed 5 breathing cycles.</p>
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-medium text-green-800 mb-2">How it works</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Inhale for 4 seconds</li>
          <li>• Hold your breath for 4 seconds</li>
          <li>• Exhale for 4 seconds</li>
          <li>• Repeat for 5-10 cycles</li>
        </ul>
      </div>
    </div>
  );
};

export default Activities;
