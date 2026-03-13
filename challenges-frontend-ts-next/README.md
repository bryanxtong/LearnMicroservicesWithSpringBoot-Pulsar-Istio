# Challenges Frontend - Next.js TypeScript

Production-ready Next.js TypeScript implementation of the multiplication challenge game.

## Features

- **Next.js 15** with App Router
- **TypeScript** with strict type checking
- **React 19** with modern hooks
- **Server-Side Rendering (SSR)** for better performance
- **API Proxy** configuration for backend services
- **Production-ready Docker** multi-stage build
- **Type-safe** API clients and domain models

## Project Structure

```
challenges-frontend-ts-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ChallengeComponent.tsx
│   │   ├── LeaderBoardComponent.tsx
│   │   └── LastAttemptsComponent.tsx
│   ├── services/
│   │   ├── ChallengeApiClient.ts
│   │   └── GameApiClient.ts
│   └── types/
│       └── domain.types.ts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json
└── Dockerfile                  # Production Docker build
```

## Prerequisites

- Node.js 20+
- npm or yarn

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Backend Services

The application expects the following backend services:

- **Multiplication Service**: http://localhost:8080
  - `/challenges/random` - Get random challenge
  - `/attempts` - Submit attempt
  - `/users/{ids}` - Get user aliases

- **Gamification Service**: http://localhost:9001
  - `/leaders` - Get leaderboard

API proxying is configured in `next.config.ts` to avoid CORS issues during development.

## Production Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Docker

Build Docker image:

```bash
docker build -t challenges-frontend-next .
```

Run container:

```bash
docker run -p 3000:3000 challenges-frontend-next
```

## Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## Linting

Run ESLint:

```bash
npm run lint
```

## Key Differences from Vite Version

1. **App Router**: Uses Next.js App Router instead of React Router
2. **SSR Support**: Server-side rendering capabilities
3. **API Routes**: Can add API routes if needed
4. **File-based Routing**: Automatic routing based on file structure
5. **Built-in Optimization**: Image optimization, code splitting, etc.
6. **Production Ready**: Optimized for production deployment

## Environment Variables

For production, you may want to configure backend URLs via environment variables:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url
```

## Deployment

This application can be deployed to:

- Vercel (recommended for Next.js)
- Docker containers
- Any Node.js hosting platform
- Static hosting (with `output: 'export'` in next.config.ts)

## Performance Features

- Automatic code splitting
- Image optimization
- Font optimization
- Static generation where possible
- Incremental Static Regeneration (ISR)
- Edge runtime support

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
