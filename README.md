# Grimdarkly Frontend

A modern React frontend for the Grimdarkly Warhammer 40K database API.

## Features

- **Unit Search**: Search and filter Warhammer 40K units by name, faction, type, keywords, and combat stats
- **Weapon Search**: Browse weapons with detailed stats, abilities, and compatibility information
- **Faction Browser**: Explore all major factions organized by category
- **Responsive Design**: Modern dark theme optimized for Warhammer 40K aesthetics
- **Type Safety**: Full TypeScript support with API type definitions

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **CSS Custom Properties** for theming

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Grimdarkly backend API (port 5001)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The frontend will be available at `http://localhost:3001` and will automatically proxy API requests to the backend at `http://localhost:5001`.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── UnitCard.tsx    # Unit display component
│   ├── WeaponCard.tsx  # Weapon display component
│   ├── FactionCard.tsx # Faction display component
│   ├── SearchFilters.tsx # Search and filter interface
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
├── types/             # TypeScript type definitions
│   └── index.ts       # API and component types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and theme
```

## API Integration

The frontend communicates with the Grimdarkly backend API through:

- **Faction API**: `/api/factions` - Get all factions
- **Unit API**: `/api/units/search` - Search units with filters
- **Weapon API**: `/api/weapons/search` - Search weapons with filters

All API calls are type-safe and include proper error handling.

## Styling

The app uses a custom CSS theme inspired by Warhammer 40K aesthetics:

- **Dark color scheme** with gold accents
- **Responsive grid layouts** for cards and content
- **Custom CSS properties** for consistent theming
- **Mobile-first design** with responsive breakpoints

## Development Notes

- The app automatically proxies API requests to `localhost:5001` during development
- All components are fully typed with TypeScript
- Error handling is implemented throughout the application
- Loading states and user feedback are provided for all async operations

## License

UNLICENSED - Private/Proprietary Code
