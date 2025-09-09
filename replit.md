# Overview

This is a modern full-stack web application built with React, TypeScript, and Express.js featuring a space-themed cockpit interface. The application serves as a personal portfolio/showcase with navigation between different sections (About, Projects, Skills, Contact) through an immersive "spaceship cockpit" UI. The frontend uses a sophisticated component architecture with custom hooks for sound management and animations, while the backend provides a minimal API foundation with database integration capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query for server state, React hooks for local state
- **Animation Strategy**: CSS-based animations with custom starfield effects and sliding door transitions

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Hot reload via Vite integration in development mode
- **Static Serving**: Express serves the built React application in production
- **Error Handling**: Centralized error middleware with proper HTTP status codes

## Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle migrations in TypeScript
- **Development Storage**: In-memory storage class for rapid prototyping
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

## Component Design Patterns
- **Layout System**: CockpitLayout component wraps all pages with consistent theming
- **Custom Hooks**: useSound for audio management, useToast for notifications
- **UI Components**: Comprehensive shadcn/ui component library with custom extensions
- **Animation Components**: Starfield background, SlidingDoors transitions, AudioControls

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL store
- **User Schema**: Basic user model with username/password fields
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

# External Dependencies

## Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite bundler
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router alternative

## UI and Design Dependencies
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for styling
- **clsx**: Conditional className utility

## Database and Validation
- **drizzle-orm**: TypeScript ORM with excellent PostgreSQL support
- **drizzle-zod**: Zod schema integration for runtime validation
- **connect-pg-simple**: PostgreSQL session store for Express

## Development Tools
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development enhancements