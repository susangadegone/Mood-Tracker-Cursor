# MoodFlow - Mood Tracker App

A beautiful, mobile-friendly mood tracking web application built with React and TailwindCSS.

## Features

### 🌟 Core Features
- **Onboarding Flow**: Simple signup with personalized questions
- **Daily Mood Check-ins**: Track emotions with intuitive mood selection
- **Dashboard**: Visual mood trends and statistics
- **Journal**: Freeform notes with timestamps and prompts
- **Profile**: Customizable wellness toolkit lists
- **Activities**: Mindful activities including puzzles, breathing exercises, and guided journaling

### 🎨 Design
- Therapeutic color palette (calming blues, greens, lavender)
- Mobile-first responsive design
- Clean, modern UI with rounded corners and whitespace
- Smooth animations and transitions

### 💾 Data Storage
- Local storage for all user data (no backend required)
- Persistent mood entries and journal entries
- User preferences and profile data

## 🚀 Quick Start

### For Users (Try the App)
1. **Clone this repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/moodflow.git
   cd moodflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npm start
   ```

4. **Open your browser:** Visit [http://localhost:3000](http://localhost:3000)

### For Developers

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

#### Local Development
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/moodflow.git
cd moodflow

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Live Demo & Project Website

### 🚀 **Live Demo**: [Try MoodFlow Now!](https://susangadegone.github.io/Mood-Tracker-Cursor)
### 📖 **Project Website**: [Visit Project Page](https://susangadegone.github.io/Mood-Tracker-Cursor/docs)

## 🎬 Demo & Screenshots

![MoodFlow Demo](docs/assets/moodflow-demo.gif)

*Complete demo showing onboarding, mood tracking, journaling, and activities*

## 🌐 Deployment Options

### Deploy Your Own Instance

#### Option 1: Netlify (Recommended)
1. Fork this repository
2. Connect your GitHub account to [Netlify](https://netlify.com)
3. Create new site from Git
4. Select your forked repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Deploy!

#### Option 2: Vercel
1. Fork this repository
2. Visit [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Deploy with default settings

#### Option 3: GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Enable GitHub Actions for deployment
4. Push changes to trigger deployment

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the 'build' folder to any static hosting service
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   └── BottomNavigation.js
├── pages/              # Main application pages
│   ├── Onboarding.js   # User signup and initial questions
│   ├── Home.js         # Dashboard with mood check-ins
│   ├── Journal.js      # Notes and journal entries
│   ├── Activities.js   # Mindful activities
│   └── Profile.js      # User profile and wellness lists
├── utils/              # Utility functions
│   └── storage.js      # Local storage management
├── App.js              # Main app component with routing
├── index.js            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Technologies

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Recharts** - Charts for mood visualization
- **Local Storage** - Data persistence

## Features in Detail

### Mood Tracking
- 6 mood categories: Happy, Calm, Stressed, Sad, Angry, Excited
- Visual mood selection with emojis and colors
- Historical mood trends with charts
- Daily check-in reminders

### Journal System
- Freeform text entries with titles
- Timestamp tracking
- Entry management (create, delete)
- Guided journal prompts

### Profile Management
- Editable lists for "What helps when I feel bad/good"
- User information display
- Wellness toolkit customization

### Activities
- **Daily Puzzle**: Brain teasers and riddles
- **Guided Journal**: Thoughtful writing prompts
- **Breathing Exercise**: 4-4-4 breathing technique with visual guide

## Customization

The app uses a custom TailwindCSS configuration with therapeutic colors:
- Primary: Calming blues
- Secondary: Soothing greens  
- Accent: Gentle purples
- Mood colors: Specific colors for each emotion

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

This is a starter project. Feel free to:
- Add new mood categories
- Implement additional activities
- Enhance the UI/UX
- Add data export features
- Integrate with external APIs

## License

This project is open source and available under the MIT License.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Report bugs** - Open an issue with details
- 💡 **Suggest features** - Share your ideas for improvements
- 🔧 **Submit pull requests** - Fix bugs or add features
- 📖 **Improve documentation** - Help others understand the project
- 🎨 **Design improvements** - Enhance UI/UX

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Ideas for Contributions
- 📊 **Data Export** - Export mood data as CSV/JSON
- 🔔 **Reminders** - Daily check-in notifications
- 🎯 **Goals** - Set and track wellness goals
- 🌙 **Dark Mode** - Theme switching
- 📱 **PWA Features** - Offline support, app installation
- 🔒 **Data Sync** - Cloud backup options
- 🎨 **Themes** - Additional color schemes
- 📈 **Analytics** - Advanced mood insights
- 🧘 **More Activities** - Meditation, gratitude exercises
- 🌍 **Internationalization** - Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with ❤️ for mental health awareness
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Styling by [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/moodflow/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/moodflow/discussions)
- 📧 **Email**: your-email@example.com

## 🔄 Updates

Stay updated with the latest features:
- ⭐ **Star this repository** to show support
- 👀 **Watch** for notifications about updates
- 🍴 **Fork** to create your own version

---

**MoodFlow** - Your personal mood tracking companion 💙
