# Implementation Guide

## Architecture Overview

This Next.js application follows a clean architecture pattern:

```
User Interface (Components)
    ↓
Services (API Clients)
    ↓
Backend APIs
```

## Key Components

### 1. ChallengeComponent (Main Component)
- Manages the challenge game state
- Handles form submission
- Coordinates between challenge and attempts
- Uses React hooks for state management

### 2. LeaderBoardComponent
- Displays real-time leaderboard
- Auto-refreshes every 5 seconds
- Combines data from two services (leaderboard + user aliases)
- Handles server errors gracefully

### 3. LastAttemptsComponent
- Displays user's recent attempts
- Shows correct/incorrect status with color coding
- Pure presentational component

## Services Layer

### ChallengeApiClient
Handles all multiplication service API calls:
- `challenge()` - Fetch random challenge
- `sendGuess()` - Submit user's answer
- `getAttempts()` - Get user's attempt history
- `getUsers()` - Get user aliases by IDs

### GameApiClient
Handles gamification service API calls:
- `leaderBoard()` - Fetch current leaderboard

## Type System

All domain models are defined in `domain.types.ts`:
- `Challenge` - Multiplication challenge
- `ChallengeAttempt` - User's attempt record
- `AttemptResult` - Result of submission
- `User` - User information
- `LeaderBoardRow` - Leaderboard entry

## Next.js Specific Features

### App Router
- Uses the new App Router (not Pages Router)
- File-based routing in `src/app/`
- `layout.tsx` for shared layout
- `page.tsx` for route pages

### Client Components
Components using hooks must be marked with `'use client'`:
- ChallengeComponent
- LeaderBoardComponent

### API Proxying
Configured in `next.config.ts` to proxy API requests:
- `/challenges/*` → `http://localhost:8080/challenges/*`
- `/attempts/*` → `http://localhost:8080/attempts/*`
- `/users/*` → `http://localhost:8080/users/*`
- `/leaders/*` → `http://localhost:9001/leaders/*`

This avoids CORS issues during development.

## State Management

Uses React hooks for state management:
- `useState` - Local component state
- `useEffect` - Side effects (data fetching, intervals)
- `useCallback` - Memoized callbacks to prevent unnecessary re-renders

## Error Handling

- Try-catch blocks for async operations
- User-friendly error messages
- Console logging for debugging
- Graceful degradation (e.g., leaderboard shows error message)

## Styling

- Global styles in `globals.css`
- CSS classes for layout and components
- Inline styles for dynamic styling (correct/incorrect colors)

## Production Optimizations

### Docker Multi-stage Build
1. **deps stage**: Install dependencies
2. **builder stage**: Build the application
3. **runner stage**: Run production server

### Next.js Optimizations
- Automatic code splitting
- Tree shaking
- Minification
- Image optimization (if images added)
- Font optimization

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev`
3. **Type check**: `npm run type-check`
4. **Lint**: `npm run lint`
5. **Build**: `npm run build`
6. **Test production**: `npm start`

## Testing Checklist

- [ ] npm install completes without errors
- [ ] npm run type-check passes
- [ ] npm run lint passes
- [ ] npm run dev starts on port 3000
- [ ] Challenge loads and displays two numbers
- [ ] Form accepts user input
- [ ] Form submission works correctly
- [ ] Success/failure messages display
- [ ] Last attempts table appears after submission
- [ ] Leaderboard loads and displays
- [ ] Leaderboard auto-refreshes every 5 seconds
- [ ] npm run build succeeds
- [ ] npm start runs production build
- [ ] Docker build succeeds
- [ ] Docker container runs correctly

## Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Docker
```bash
docker build -t challenges-frontend-next .
docker run -p 3000:3000 challenges-frontend-next
```

### 3. Node.js Server
```bash
npm run build
npm start
```

### 4. Static Export (if no SSR needed)
Add to `next.config.ts`:
```typescript
output: 'export'
```

## Environment Configuration

For production, create `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

Update API clients to use:
```typescript
private static readonly SERVER_URL = process.env.NEXT_PUBLIC_API_URL || '';
```

## Performance Considerations

1. **Leaderboard Refresh**: 5-second interval may be adjusted based on load
2. **API Calls**: Consider adding loading states
3. **Error Retry**: Could add retry logic for failed requests
4. **Caching**: Next.js automatically caches where possible

## Security Considerations

1. **Input Validation**: Form inputs are validated (maxLength, min)
2. **XSS Prevention**: React automatically escapes content
3. **CORS**: Handled via Next.js proxy in development
4. **Environment Variables**: Use NEXT_PUBLIC_ prefix for client-side vars

## Future Enhancements

- Add loading spinners
- Implement error boundaries
- Add unit tests (Jest + React Testing Library)
- Add E2E tests (Playwright)
- Implement authentication
- Add animations/transitions
- Implement PWA features
- Add analytics tracking
