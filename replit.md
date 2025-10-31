# Aperte o Play FM - Radio Station Website

## Overview

Aperte o Play FM is a modern, single-page application (SPA) for an 87.9 FM radio station. The website provides live streaming, program schedules, news, supporter information, and donation capabilities. Built with React, TypeScript, and TailwindCSS, it features a persistent audio player that maintains playback across page navigation, delivering a seamless radio listening experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TailwindCSS for styling with custom design system
- Shadcn/UI component library built on Radix UI primitives
- Framer Motion for animations

**Design System:**
- Custom color scheme based on radio station branding (cyan #00D4FF, magenta #FF00FF)
- Dark/light theme support via ThemeProvider context
- Consistent spacing system using Tailwind's standard units
- Material Design-inspired components with rounded corners and subtle shadows
- Responsive-first approach with mobile breakpoints

**State Management:**
- React Context API for global state (audio player, theme)
- TanStack Query (React Query) for server state management and caching
- Local component state using React hooks

**Key Features:**
- Fixed navigation header with logo and menu
- Persistent bottom audio player that maintains state across routes
- SPA navigation without page reloads
- Responsive design with hamburger menu for mobile

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- HTTP server created via Node's native http module
- Vite middleware integration for development hot-reloading

**Data Layer:**
- In-memory storage implementation (MemStorage class) for development
- Database-ready interface (IStorage) designed for future PostgreSQL integration via Drizzle ORM
- Seeded with sample data for programs, news, and supporters

**Database Schema (Drizzle ORM):**
- `users` - Authentication and user management
- `programs` - Radio show schedules organized by day/time
- `news` - News articles with content, images, and dates
- `supporters` - Radio station sponsors/partners

**API Design:**
- RESTful API structure with `/api` prefix
- Session-based authentication ready (connect-pg-simple for session storage)
- Request/response logging middleware for development

### External Dependencies

**Third-Party Services:**
- **Shoutcast Streaming**: Audio streaming service (https://streaming.shoutcast.com/radiopm) for live radio broadcast
- **Neon Database**: PostgreSQL serverless database provider (@neondatabase/serverless package configured)
- **Google Fonts**: Typography system loading Inter, Poppins, DM Sans, and other font families

**Key NPM Packages:**
- **Radix UI**: Headless component primitives for accessible UI components (@radix-ui/*)
- **Drizzle ORM**: TypeScript ORM for PostgreSQL with schema migrations (drizzle-orm, drizzle-kit)
- **TanStack Query**: Server state management and data fetching (@tanstack/react-query)
- **React Hook Form**: Form validation with Zod schema integration (@hookform/resolvers)
- **Sharp**: Image processing for logo conversion utilities
- **Embla Carousel**: Carousel/slider component for supporter logos

**Development Tools:**
- **Replit Plugins**: Custom Vite plugins for error overlays, cartographer, and dev banner
- **ESBuild**: Production build bundler for server code
- **TSX**: TypeScript execution for development server

**Asset Management:**
- Static images stored in `attached_assets` and `client/public` directories
- Generated placeholder images for programs, news, and supporters
- Vite alias configuration for `@assets` path resolution