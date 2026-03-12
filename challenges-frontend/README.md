# Challenges Frontend

A fast, modern React frontend for the multiplication challenges game, built with Vite and React Hooks.

## Overview

This is a React application that provides a user interface for solving multiplication challenges. It communicates with backend services for challenges and gamification features.

## Tech Stack

- **Vite** - Lightning-fast build tool and dev server
- **React 19.2.4** - Modern UI library with Hooks
- **React Hooks** - Functional components with state management
- **Nginx** - Production web server
- **Docker** - Containerization
- **Kubernetes** - Orchestration

## Features

- Fast development server (1-2s startup vs 30-60s with CRA)
- Instant hot module replacement (HMR)
- Modern React Hooks pattern
- Memory leak fixes (proper cleanup in useEffect)
- Responsive UI for solving math challenges
- Real-time leaderboard updates
- Attempt history tracking

## Available Scripts

### Development

```bash
npm install
npm run dev
```

Runs the app in development mode with Vite dev server on [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You'll see build errors and lint warnings in the console.

### Production Build

```bash
npm run build
```

Builds the app for production to the `dist` folder. The build is optimized and minified.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build.

## Project Structure

```
src/
├── components/
│   ├── ChallengeComponent.js      # Main challenge form
│   ├── LastAttemptsComponent.js   # Attempt history
│   └── LeaderBoardComponent.js    # Leaderboard with auto-refresh
├── services/
│   ├── ChallengeApiClient.js      # Challenge API calls
│   └── GameApiClient.js           # Gamification API calls
├── App.js                          # Root component
├── index.js                        # Entry point
└── index.css                       # Global styles
```

## API Integration

The frontend communicates with two backend services:

- **Challenges Service** (localhost:8080)
  - `/challenges/random` - Get random challenge
  - `/attempts` - Submit guess and get attempts
  - `/users` - Get user aliases

- **Gamification Service** (localhost:8081)
  - `/leaders` - Get leaderboard

## Docker Deployment

Build the Docker image:

```bash
docker build -t challenges-frontend:1.0 .
```

Run locally:

```bash
docker run -p 3000:80 challenges-frontend:1.0
```

## Kubernetes Deployment

Deploy to Kubernetes:

```bash
kubectl apply -f ../k8s/challenges-frontend-deployment.yaml
```

The deployment includes:
- ConfigMap for Nginx configuration
- Deployment with 1 replica
- Service for internal communication
- Istio sidecar injection

## Recent Changes (Vite Migration)

Migrated from Create React App to Vite:

- ✅ Faster dev server (30-60s → 1-2s)
- ✅ Instant HMR (<1s)
- ✅ Modern React Hooks pattern
- ✅ Fixed memory leak in LeaderBoardComponent
- ✅ Smaller bundle size
- ✅ Better build performance

## Component Details

### ChallengeComponent
Main component that displays a multiplication challenge and handles user input.

**State:**
- `a`, `b` - Challenge factors
- `formData` - User alias and guess
- `message` - Feedback message
- `lastAttempts` - User's attempt history

### LeaderBoardComponent
Displays top players with auto-refresh every 5 seconds.

**Features:**
- Auto-refresh with proper cleanup (no memory leaks)
- User alias mapping
- Badge display
- Error handling

### LastAttemptsComponent
Shows user's recent attempts with correct/incorrect indicators.

## Development Tips

- Use `npm run dev` for fast development
- Changes are reflected instantly with HMR
- Check browser console for errors
- Use React DevTools for component debugging

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
