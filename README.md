# Grimdark Grimoire Frontend

A modern React frontend for the Grimdark Grimoire Warhammer 40K database API.

🌐 **Live Site**: [grimdarkly-frontend.onrender.com](https://grimdarkly-frontend.onrender.com)

## Features

- **Advanced Unit Search**: Search and filter Warhammer 40K units by name, faction, type, keywords, and combat stats
- **Enhanced Faction Search**: Search by main factions (Space Marines, Orks) or sub-factions (Dark Angels, Blood Angels, Ultramarines)
- **Weapon Search**: Browse weapons with detailed stats, abilities, and compatibility information
- **Weapon Keyword Search**: Search weapons by abilities and keywords (e.g., "rapid fire", "lethal hits")
- **Faction Browser**: Explore all major factions organized by category
- **Legends Unit System**: Toggle display of Legends units with persistent preferences
- **Easter Egg Features**: Hidden surprises for curious users (try searching for "Bruce Dickinson" or "Cowbell"!)
- **Smooth Animations**: CSS transitions and animations for page navigation and content loading
- **Unified Tag System**: Consistent display of keywords, abilities, and weapons across all components
- **Responsive Design**: Mobile-optimized with abbreviated table headers and touch-friendly interface
- **Type Safety**: Full TypeScript support with API type definitions
- **Comprehensive Testing**: Full Playwright test suite with cross-browser compatibility

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **CSS Custom Properties** for theming
- **Playwright** for end-to-end testing
- **CSS Animations** for smooth transitions and effects

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Grimdark Grimoire backend API (port 3000)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The frontend will be available at `http://localhost:3001` (or 3002 if 3001 is in use) and will automatically proxy API requests to the backend at `http://localhost:3000`.

### Testing

```bash
# Run all tests
npm run test

# Run tests with UI
npx playwright test --ui

# Run tests for specific browser
npx playwright test --project=chromium
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment

The application is automatically deployed to Render when changes are pushed to the main branch:

- **Live Site**: [grimdarkly-frontend.onrender.com](https://grimdarkly-frontend.onrender.com)
- **Deployment**: Automatic via Render.com
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── PageTransition.tsx # Page transition wrapper
│   ├── UnitCard.tsx    # Unit display component
│   ├── WeaponCard.tsx  # Weapon display component
│   ├── FactionCard.tsx # Faction display component
│   ├── SearchFilters.tsx # Search and filter interface
│   ├── Tag.tsx         # Reusable tag component
│   ├── TagList.tsx     # Tag list with expand/collapse
│   ├── EasterEggModal.tsx # Easter egg modal component
│   └── LoadingSpinner.tsx # Loading indicator
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Units.tsx       # Units search page
│   ├── Weapons.tsx     # Weapons search page
│   ├── Factions.tsx    # Factions browser
│   ├── UnitDetail.tsx  # Unit detail view
│   └── WeaponDetail.tsx # Weapon detail view
├── services/           # API communication
│   └── api.ts         # API client and endpoints
├── styles/            # Shared styles
│   └── tags.css       # Unified tag system styles
├── types/             # TypeScript type definitions
│   └── index.ts       # API and component types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and theme
```

## API Integration

The frontend communicates with the Grimdarkly backend API through:

- **Faction API**: `/api/factions` - Get all factions
- **Unit API**: `/api/units/search` - Search units with filters (supports sub-factions)
- **Weapon API**: `/api/weapons/search` - Search weapons with filters and keyword support
- **Keywords API**: `/api/keywords/search` - Search keywords and sub-factions

### Enhanced Search Features
- **Sub-Faction Search**: "Dark Angels", "Blood Angels", "Ultramarines", "Space Wolves"
- **Weapon Keyword Search**: Search weapons by abilities like "rapid fire", "lethal hits", "sustained hits"
- **Advanced Filtering**: Multiple filter combinations with real-time results
- **Case Insensitive**: All searches work with any capitalization
- **Legends Support**: Toggle display of Legends units

All API calls are type-safe and include proper error handling.

## Styling

The app uses a custom CSS theme inspired by Warhammer 40K aesthetics:

- **Dark color scheme** with gold accents
- **Responsive grid layouts** for cards and content
- **Custom CSS properties** for consistent theming
- **Mobile-first design** with responsive breakpoints
- **Smooth animations** and transitions for enhanced user experience
- **Unified tag system** with consistent styling across all components

## Recent Features

### 🎭 Easter Egg System
Discover hidden surprises by searching for specific phrases in the Unit Name search box:
- **"Bruce Dickinson"** - The Iron Rockstar of Warhammer 40K
- **"Will Ferrell"** - The Comedic Champion of the Imperium
- **"Christopher Walken"** - The Master of Dramatic Pauses
- **"Cowbell"** - The Sacred Instrument of the Imperium
- **"More Cowbell"** - The Ultimate Sacred Instrument

Each easter egg displays a themed modal with unique content and a YouTube video player.

### 🏛️ Enhanced Faction Search
The faction search now supports both main factions and sub-factions:
- **Main Factions**: "Space Marines", "Chaos Space Marines", "Orks", "Necrons"
- **Sub-Factions**: "Dark Angels", "Blood Angels", "Ultramarines", "Space Wolves"
- **Smart Detection**: Automatically detects whether you're searching for a main faction or sub-faction
- **Comprehensive Results**: Find all units for specific chapters, legions, or warbands

### 📱 Mobile Optimization
Enhanced mobile experience with responsive design:
- **Abbreviated Headers**: Table headers use abbreviations on mobile (e.g., "Range" → "R", "Attacks" → "A")
- **Touch-Friendly**: Optimized for mobile interaction and touch navigation
- **Responsive Tables**: Horizontal scrolling with sticky headers for better mobile viewing
- **Adaptive Layout**: Seamlessly works across all screen sizes

### ⚔️ Legends Unit System
Toggle display of Legends units with persistent preferences:
- **Legends Toggle**: Show/hide Legends units in search results
- **Persistent Preference**: Your choice is remembered across sessions
- **Clear Labeling**: Legends units are clearly marked and distinguished
- **Official Data**: 30+ Legends units from official Warhammer Community PDFs

### 🎨 Enhanced UI & Animations
Modern, flashy interface with smooth transitions:
- **Page Transitions**: Smooth glow effects when navigating between pages
- **Content Animations**: Staggered fade-in effects for search results and cards
- **Detail Page Transitions**: Smooth entrance animations for unit and weapon detail pages
- **Hover Effects**: Enhanced hover states with transforms and color changes
- **Reduced Motion Support**: Respects user accessibility preferences

### 🏷️ Unified Tag System
Consistent display of keywords, abilities, and weapons:
- **Reusable Components**: `Tag` and `TagList` components for consistent styling
- **Expand/Collapse**: Smart truncation with "show more" functionality
- **Consistent Styling**: Unified appearance across unit cards, weapon cards, and detail pages
- **Accessibility**: Proper keyboard navigation and screen reader support

### 🔍 Enhanced Weapon Search
Advanced weapon search capabilities:
- **Keyword Search**: Search weapons by abilities like "rapid fire", "lethal hits", "sustained hits"
- **Comma-Separated Keywords**: Support for multiple keywords in a single search
- **Real-time Filtering**: Instant results as you type
- **Active Filter Display**: Clear indication of applied search filters

### 🧪 Comprehensive Testing
Full test coverage with Playwright:
- **185 Tests**: Complete test suite covering all functionality
- **Cross-Browser**: Tests run on Chromium, Firefox, WebKit, and mobile browsers
- **End-to-End**: Full user journey testing from search to detail pages
- **Accessibility**: Tests for keyboard navigation, screen readers, and reduced motion
- **Visual Testing**: Screenshot and video capture for failed tests

## Development Notes

- The app automatically proxies API requests to `localhost:3000` during development
- All components are fully typed with TypeScript
- Error handling is implemented throughout the application
- Loading states and user feedback are provided for all async operations
- Easter egg modals include YouTube video integration
- Mobile-first responsive design with CSS Grid and Flexbox
- Comprehensive Playwright test suite with 185 tests across 5 browsers
- Smooth CSS animations and transitions with accessibility support
- Unified tag system for consistent UI components
- Enhanced weapon search with keyword filtering capabilities

## Documentation

- **[User Guide](./USER_GUIDE.md)** - Comprehensive guide to all features and functionality
- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Technical guide for developers and maintainers
- **[AI Documentation](./ai-docs/)** - Technical documentation for developers
- **[API Integration](./ai-docs/API_ENDPOINTS.md)** - Complete API endpoint documentation

## License

UNLICENSED - Private/Proprietary Code
