# Tech Daily - Mobile News App

A React Native app built with Expo that delivers daily tech/AI news in swipeable card format with multi-language support.

## Features

- 🔄 **Swipeable Cards**: Tinder-style interface for consuming news
- 🌍 **Multi-language Support**: English, Telugu, and Hindi
- 📱 **Cross-platform**: iOS and Android support via Expo
- 💾 **Local Storage**: Save articles for offline reading
- 🚀 **No Authentication**: Instant access to content
- 📊 **RESTful Backend**: Express.js API with MongoDB

## Tech Stack

### Frontend
- React Native with Expo
- TypeScript
- React Native Reanimated (for animations)
- React Native Gesture Handler (for swipe gestures)
- Expo Linear Gradient
- AsyncStorage (for local data persistence)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- CORS enabled for cross-origin requests
- RESTful API architecture

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen with swipeable cards
│   │   ├── saved.tsx      # Saved articles screen
│   │   └── settings.tsx   # Settings and preferences
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── NewsCard.tsx       # Individual news card component
│   └── LanguageSelector.tsx # Language selection component
├── services/              # API and storage services
│   ├── newsService.ts     # News API integration
│   └── storageService.ts  # Local storage management
├── types/                 # TypeScript type definitions
│   └── news.ts           # News-related types
└── server/               # Backend API
    ├── app.js            # Express server setup
    └── package.json      # Server dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)
- Expo CLI
- iOS Simulator / Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-daily-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

6. **Start the Expo development server**
   ```bash
   npm run dev
   ```

### API Endpoints

- `GET /api/news` - Fetch all news articles
  - Query params: `language` (en, te, hi)
- `GET /api/news/:id` - Fetch specific news article
  - Query params: `language` (en, te, hi)
- `GET /api/languages` - Get available languages
- `GET /health` - Health check endpoint

### Sample News Data

The app includes sample news cards covering:
- AI updates (ChatGPT, Claude, etc.)
- Development tools (GitHub Copilot, VS Code features)
- Mobile technology (iOS, Android updates)
- Productivity tools and techniques

## Development

### Adding New Languages

1. Update the language constants in `components/LanguageSelector.tsx`
2. Add translations to the MongoDB schema
3. Update the mock data in `services/newsService.ts`

### Adding New News Categories

1. Update the `category` field in news items
2. Add category-specific styling in `NewsCard.tsx`
3. Consider adding category filters in the future

### Customizing Animations

The swipe animations are handled in `app/(tabs)/index.tsx` using:
- `react-native-reanimated` for smooth animations
- `react-native-gesture-handler` for gesture recognition
- Custom spring animations for card movements

## Deployment

### Frontend (Expo)
```bash
expo build:android
expo build:ios
```

### Backend
Deploy to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

Update the `API_BASE_URL` in `services/newsService.ts` to point to your deployed backend.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the sample code

---

Built with ❤️ using React Native and Expo