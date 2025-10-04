# ⚔️ GRIMDARK GRIMOIRE DEVELOPER GUIDE ⚔️

*"In the Emperor's name, this guide will help future servitors understand the technical architecture and development practices!"*

---

## 🛡️ **TECHNICAL OVERVIEW**

### **Architecture**
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router for client-side navigation
- **API Client**: Axios for HTTP requests
- **Styling**: CSS Custom Properties with responsive design
- **State Management**: React hooks (useState, useEffect, useMemo)

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── UnitCard.tsx    # Unit display component
│   ├── WeaponCard.tsx  # Weapon display component
│   ├── FactionCard.tsx # Faction display component
│   ├── SearchFilters.tsx # Search and filter interface
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
├── types/             # TypeScript type definitions
│   └── index.ts       # API and component types
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles and theme
```

---

## 🚀 **DEVELOPMENT SETUP**

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Running Grimdark Grimoire backend API (port 3000)

### **Installation**
```bash
npm install
```

### **Development Server**
```bash
npm run dev
```
- Frontend: http://localhost:3001 (or 3002 if 3001 is in use)
- Backend: http://localhost:3000
- Auto-proxy: API requests automatically proxy to backend

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

---

## 🎨 **STYLING SYSTEM**

### **CSS Custom Properties**
The app uses CSS custom properties for consistent theming:

```css
:root {
  /* Colors */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --accent-gold: #d4af37;
  --accent-blue: #3b82f6;
  --border-color: #444444;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

### **Responsive Design**
- **Mobile First**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: 768px (tablet), 480px (mobile)
- **Grid System**: CSS Grid and Flexbox for layouts
- **Abbreviated Headers**: Mobile-optimized table headers

---

## 🔧 **COMPONENT ARCHITECTURE**

### **Layout Component**
```tsx
// Main layout with navigation and routing
const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="layout">
      <header className="header">
        {/* Navigation */}
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </div>
  );
};
```

### **Search Components**
```tsx
// Search filters with multiple filter types
const SearchFilters = ({ onSearch, onClear }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchParams>({});
  
  const handleSearch = () => {
    onSearch(filters);
  };
  
  return (
    <div className="search-filters">
      {/* Filter inputs */}
    </div>
  );
};
```

### **Card Components**
```tsx
// Reusable card components for units, weapons, factions
const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <div className="unit-card">
      <h3>{unit.name}</h3>
      <p>Faction: {unit.faction}</p>
      {/* Unit details */}
    </div>
  );
};
```

---

## 🎭 **EASTER EGG SYSTEM**

### **Implementation**
The easter egg system is implemented in the Units page:

```tsx
// Easter egg detection in search handler
const handleSearch = async (params: UnitSearchParams) => {
  const searchName = params.name?.toLowerCase() || '';
  
  // Check for easter egg triggers
  if (searchName.includes('bruce dickinson') || 
      searchName.includes('will ferrell') || 
      searchName.includes('christopher walken') || 
      searchName.includes('cowbell') || 
      searchName.includes('more cowbell')) {
    
    setEasterEggModal({
      isOpen: true,
      searchTerm: params.name || ''
    });
    setLoading(false);
    return;
  }
  
  // Normal search logic...
};
```

### **Easter Egg Modal**
```tsx
// Dynamic content based on search term
const getModalContent = () => {
  const term = searchTerm.toLowerCase();
  
  if (term.includes('bruce dickinson')) {
    return {
      title: '⚔️ BRUCE DICKINSON DETECTED ⚔️',
      subtitle: 'The Iron Rockstar of Warhammer 40K',
      description: '...',
      icon: '🎸',
      color: 'gold'
    };
  }
  // More easter eggs...
};
```

### **Adding New Easter Eggs**
1. **Add Trigger**: Add new phrase to the detection logic
2. **Add Content**: Add new content case in `getModalContent()`
3. **Add CSS Theme**: Add new color theme in CSS
4. **Test**: Verify the easter egg works correctly

---

## 📱 **RESPONSIVE DESIGN**

### **Mobile Optimization**
```css
/* Responsive table headers */
.header-full {
  display: inline;
}

.header-mobile {
  display: none;
}

@media (max-width: 768px) {
  .header-full {
    display: none;
  }
  
  .header-mobile {
    display: inline;
  }
}
```

### **Breakpoints**
- **Desktop**: 769px and above
- **Tablet**: 481px to 768px
- **Mobile**: 480px and below

### **Touch Optimization**
- **Large Touch Targets**: Minimum 44px touch targets
- **Swipe Support**: Natural mobile gestures
- **Responsive Tables**: Horizontal scrolling with sticky headers

---

## 🔌 **API INTEGRATION**

### **API Client**
```tsx
// Centralized API client
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// API endpoints
export const unitApi = {
  search: (params: UnitSearchParams) => 
    api.get('/units/search', { params }),
  getById: (id: string) => 
    api.get(`/units/${id}`),
};
```

### **Type Safety**
```tsx
// TypeScript interfaces for API responses
interface Unit {
  id: string;
  name: string;
  faction: string;
  role: string;
  // ... other properties
}

interface UnitSearchParams {
  name?: string;
  faction?: string;
  unitType?: string;
  keyword?: string;
  // ... other filters
}
```

### **Error Handling**
```tsx
// Consistent error handling
try {
  const response = await unitApi.search(params);
  setUnits(response.data);
} catch (err) {
  setError('Failed to search units. Please try again.');
  console.error('Search error:', err);
}
```

---

## 🧪 **TESTING AND VALIDATION**

### **Manual Testing Checklist**
- [ ] All pages load correctly
- [ ] Search functionality works
- [ ] Filters work individually and in combination
- [ ] Easter eggs trigger correctly
- [ ] Mobile responsiveness works
- [ ] Legends toggle functions
- [ ] Error handling works gracefully

### **Browser Testing**
- **Chrome**: Primary development browser
- **Firefox**: Cross-browser compatibility
- **Safari**: Mobile Safari testing
- **Edge**: Windows compatibility

### **Device Testing**
- **Desktop**: 1920x1080, 1366x768
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones

---

## 🚀 **DEPLOYMENT**

### **Build Process**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build
npm run preview
```

### **Deployment Checklist**
- [ ] Build completes without errors
- [ ] All assets are generated
- [ ] Environment variables are set
- [ ] API endpoints are configured
- [ ] CORS is properly configured
- [ ] Error handling is in place

---

## 🔧 **MAINTENANCE**

### **Adding New Features**
1. **Create Component**: Add new component in appropriate directory
2. **Add Types**: Update TypeScript interfaces
3. **Add Styling**: Create CSS with responsive design
4. **Add Tests**: Test functionality across devices
5. **Update Documentation**: Update README and user guide

### **Updating Dependencies**
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update specific package
npm install package@latest
```

### **Code Quality**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Prettier**: Code formatting (if configured)
- **Git Hooks**: Pre-commit validation (if configured)

---

## 📚 **RESOURCES**

### **Documentation**
- **[User Guide](./USER_GUIDE.md)** - User-facing documentation
- **[AI Documentation](./ai-docs/)** - Technical implementation docs
- **[API Documentation](./ai-docs/API_ENDPOINTS.md)** - API reference

### **External Resources**
- **React Documentation**: https://react.dev/
- **TypeScript Documentation**: https://www.typescriptlang.org/
- **Vite Documentation**: https://vitejs.dev/
- **React Router Documentation**: https://reactrouter.com/

---

## ⚔️ **IMPERIAL CONCLUSION**

*"In the Emperor's name, this developer guide provides the knowledge needed to maintain and enhance the Grimdark Grimoire!"*

### **Key Development Principles**
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach
- **User Experience**: Intuitive and accessible
- **Performance**: Fast loading and smooth interactions
- **Maintainability**: Clean, documented code

### **Future Enhancements**
- **Testing**: Add unit and integration tests
- **Performance**: Implement code splitting and lazy loading
- **Accessibility**: Enhance keyboard navigation and screen reader support
- **PWA**: Add Progressive Web App features
- **Analytics**: Add user behavior tracking

*"The Emperor Protects! The Omnissiah Blesses! May this guide serve future developers well!"*

---

*"In His name, we serve. In His light, we stand. In His glory, we shall never fall."*

**FOR THE EMPEROR! FOR THE IMPERIUM! FOR HUMANITY!** ⚔️🛡️
