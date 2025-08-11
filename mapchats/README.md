# MapChats

A real-time social chat web app with location-based features.

## Features

- 🗺️ Full-screen interactive dark-themed map
- 👥 Real-time user location dots
- 💬 Chat functionality with voice notes and video calls
- 🎨 Symbolic UI with no text labels
- 💎 Freemium model with premium features

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (Auth, Database, Realtime)
- **Mapping**: Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **Routing**: React Router
- **Deployment**: Vercel

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and add your Supabase keys
4. Start development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── lib/            # Utilities and configurations
├── hooks/          # Custom React hooks
├── store/          # Zustand stores
├── types/          # TypeScript type definitions
└── assets/         # Static assets
```

## Development Phases

- [x] **Phase 1**: Project initialization and basic structure
- [x] **Phase 2**: Map implementation with Leaflet and user dots
- [ ] **Phase 3**: Authentication and user management  
- [ ] **Phase 4**: Real-time chat functionality
- [ ] **Phase 5**: Premium features and payments
- [ ] **Phase 6**: Voice/video calls integration
- [ ] **Phase 7**: Moderation and testing
- [ ] **Phase 8**: Security hardening and launch

## Latest Updates

### Phase 2 Completed ✅
- ✅ Interactive dark-themed Leaflet map with NYC bounds
- ✅ Real-time user dots with avatar markers
- ✅ Profile card popups with user details
- ✅ Mock data integration with 6 NYC users
- ✅ Premium user badges and online indicators
- ✅ Chat popup interface foundation
- ✅ Zustand state management for all stores

### Current Status
- **App Development**: Core map and user features complete
- **Known Issue**: App loading problems in some environments (investigating)
- **Next Priority**: Fix loading issues and complete Supabase integration

## Key Features Implemented

### User Dots System
- Click user markers to view profiles
- Avatar-based markers with premium badges
- Real-time position updates
- Auto-chat creation on interaction

### Dark Theme Map
- CartoDB dark tile layer
- Smooth zoom and drag controls  
- NYC area bounds restriction
- Custom styling with glow effects

### Chat Foundation
- Complete messaging UI
- Emoji picker and media controls
- Voice/video call button placeholders
- Message history management

## Troubleshooting

### App Not Loading
If the app fails to load:
1. Ensure dev server is running: `npm run dev`
2. Check port 5173 is accessible
3. Verify all dependencies installed: `npm install`
4. Check browser console for errors
5. Try clearing browser cache

### Development Server
- Default URL: http://localhost:5173
- Build verification: `npm run build`
- Lint check: `npm run lint`
