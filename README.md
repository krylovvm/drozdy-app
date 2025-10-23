# Drozdy App

Drozdy is a microblogging platform.

Demo: https://drozdy-app-web.onrender.com/ (slow to start on free hosting due to cold starts; frontend wakes up first, then backend, so initial requests may be slow for up to 30 seconds)

## Running the Project Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Create a `.env` file in the `server` directory:
     ```
     DATABASE_URL="postgresql://username:password@hostname/database"
     JWT_SECRET=your-secret-key
     PORT=4000
     CLIENT_URL=http://localhost:3000
     ```
   - Create a `.env.local` file in the `web` directory:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:4000
     ```

3. **Set up the database**:
   ```bash
   cd server
   npx prisma migrate dev
   ```

4. **Start the development server**:
   ```bash
   cd ..
   npm run dev
   ```

6. **Start the production server**:
   ```bash
   npm run prod
   ```

## Architecture Overview

### Frontend (Next.js)

The frontend uses Next.js with App Router and follows the Feature-Sliced Design pattern:

- **Next.js App Router**: Provides file-based routing and server components
- **React Query**: Manages server state with caching
- **Material UI**: Component library for consistent design
- **FSD Architecture**: Organizes code by business domains

The codebase is organized into the following layers (from lowest to highest):

1. **Shared Layer** (`/web/src/shared/`) - Reusable utilities, UI components, and configurations
2. **Entities Layer** (`/web/src/entities/`) - Business entities with their data models and UI representations
3. **Features Layer** (`/web/src/features/`) - User interactions and business logic
4. **Widgets Layer** (`/web/src/widgets/`) - Complex UI blocks composed of multiple entities and features
5. **Pages Layer** (`/web/src/_pages/`) - Compositions of widgets, features, and entities for specific routes. Named with underscore prefix (`_pages` instead of `pages`) to avoid conflicts with Next.js routing system
6. **App Layer** (`/web/src/app/`) - Application initialization, global providers (Auth, Query, Theme), routing setup with Next.js App Router

### Key FSD Principles Applied

- **Unidirectional Dependencies**: Each layer can only import from layers below it. This rule prevents circular dependencies and keeps the architecture clean and maintainable.
- **Public API**: Each slice exposes a public API via index.ts files
- **Encapsulation**: Implementation details are hidden within each slice
- **Isolation**: Slices are independent and can be developed in parallel
- **Business-Oriented**: The structure prioritizes the application's domains and features, which simplifies navigation and onboarding for new developers.

### Data Flow

1. **API Client**: Centralized in `/web/src/shared/api/client.ts`
2. **Data Fetching**: React Query hooks in entity models
3. **UI Components**: Consume data from entity models
4. **User Interactions**: Trigger mutations via feature models

### Backend (Express + Prisma)

The backend follows a simple, modular architecture:

- **Express.js**: Handles HTTP requests and routing
- **Prisma ORM**: Provides type-safe database access
- **JWT Authentication**: Secures protected endpoints
- **Middleware**: Handles authentication, validation, and error handling

Key components:
- Routes: Organized by domain (auth, posts)
- Middleware: Authentication, validation
- Utils: JWT handling, error formatting

## Design Decisions and Assumptions

1. **Authentication Strategy**:
   - JWT tokens for authentication
   - Token stored in HTTP-only cookies for security
   - Simple username/password authentication

2. **Database Design**:
   - Normalized schema with proper relationships
   - Indexes on frequently queried fields

3. **Performance Considerations**:
   - Cursor-based pagination for efficient data loading
   - Caching with React Query to reduce API calls
   - Memoization of frequently re-rendered components (e.g., PostCard)

4. **Security Measures**:
   - Input validation on both client and server
   - Rate limiting for sensitive endpoints
   - Password hashing with bcrypt
   - CORS configuration to restrict API access
   - Rate limiting to prevent abuse (3-second cooldown between posts)

5. **Scalability Approach**:
   - Modular architecture allows for easy extension
   - Feature-Sliced Design enables parallel development
   - Clear separation of concerns for maintainability

6. **Accessibility (A11Y)**:
   - Material UI components with built-in accessibility features
   - Semantic HTML structure
   - Form inputs with associated labels for screen reader compatibility
   - Color contrast
   - Keyboard navigation for interactive elements

8. **Future work**:
   - Image upload for avatars, ability to view other users' feeds, likes
   - Infinite scroll optimization with virtualized lists
   - Automated testing pipeline (unit, integration, E2E)
   - SSR for faster time-to-interactive
   - RSC implementation for improved performance
   - Service worker for offline capabilities
   - PWA implementation
   - Swagger
