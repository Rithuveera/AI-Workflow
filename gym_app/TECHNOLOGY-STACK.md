# Fit2Fit Gym Application - Technology Stack Documentation

## Overview
Fit2Fit is a comprehensive gym management web application built with modern web technologies, featuring member management, class scheduling, gamification, analytics, and automated meal reminder systems.

---

## Frontend Technologies

### Core Framework & Libraries
- **React** (v19.2.0) - Modern UI library for building component-based interfaces
- **React Router DOM** (v7.9.6) - Client-side routing and navigation
- **Vite** (v7.2.2) - Next-generation frontend build tool for fast development

### 3D Graphics & Animation
- **Three.js** (v0.181.2) - 3D graphics library for WebGL rendering
- **@react-three/fiber** (v9.4.0) - React renderer for Three.js
- **@react-three/drei** (v10.7.7) - Useful helpers and abstractions for react-three-fiber
- **Framer Motion** (v12.23.24) - Production-ready animation library for React

### UI & Styling
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **PostCSS** (v8.5.6) - CSS transformation tool
- **Autoprefixer** (v10.4.22) - PostCSS plugin for vendor prefixes

### Data Visualization
- **Recharts** (v3.5.0) - Composable charting library built on React components
- **React Calendar Heatmap** (v1.10.0) - Calendar heatmap component for activity visualization

### HTTP Client
- **Axios** (v1.13.2) - Promise-based HTTP client for API requests

---

## Backend Technologies

### Runtime & Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** (v5.1.0) - Fast, unopinionated web framework for Node.js

### Database
- **PostgreSQL** - Primary production database (via `pg` v8.16.3)
- **SQLite3** (v5.1.7) - Local development database option
- **node-postgres (pg)** - PostgreSQL client for Node.js

### Email & Messaging Services
- **Nodemailer** (v7.0.10) - Email sending library
  - Configured with Mailtrap for development/testing
  - Supports HTML email templates with responsive design
- **Twilio** (v5.10.6) - WhatsApp messaging integration
  - SMS and WhatsApp notification capabilities
  - Sandbox mode for testing

### Scheduled Tasks
- **node-cron** (v4.2.1) - Task scheduler for automated meal reminders
  - Timezone-aware scheduling (Asia/Kolkata)
  - Multiple daily schedules per class type

### Middleware & Utilities
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing middleware
- **Body Parser** (v2.2.0) - Request body parsing middleware
- **dotenv** (v17.2.3) - Environment variable management

---

## Development Tools

### Code Quality
- **ESLint** (v9.39.1) - JavaScript linting utility
- **@eslint/js** (v9.39.1) - ESLint JavaScript configuration
- **eslint-plugin-react-hooks** (v7.0.1) - React Hooks linting rules
- **eslint-plugin-react-refresh** (v0.4.24) - React Refresh linting

### TypeScript Support
- **@types/react** (v19.2.2) - TypeScript definitions for React
- **@types/react-dom** (v19.2.2) - TypeScript definitions for React DOM

### Development Utilities
- **Concurrently** (v9.2.1) - Run multiple commands concurrently
- **ngrok** (v5.0.0-beta.2) - Secure tunneling for local development
- **globals** (v16.5.0) - Global identifiers from different JavaScript environments

---

## Deployment & Infrastructure

### Platform
- **Render.com** - Cloud platform for deployment
  - Web Service deployment
  - PostgreSQL database hosting
  - Automatic SSL/TLS certificates
  - Environment variable management

### Build Configuration
- **Vite Build** - Production build optimization
- **Express Static Serving** - Serves built frontend from `/dist` directory

---

## Architecture Patterns

### Frontend Architecture
- **Component-Based Architecture** - Modular, reusable React components
- **Client-Side Routing** - SPA with React Router
- **Context API** - Theme management (Dark/Light mode)
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Backend Architecture
- **RESTful API** - Standard REST endpoints for all operations
- **MVC Pattern** - Separation of concerns (routes, controllers, models)
- **Middleware Chain** - CORS, body parsing, static file serving
- **Database Abstraction** - Query helper functions for database operations

### Design Patterns
- **Repository Pattern** - Database access through abstraction layer
- **Service Layer** - Business logic separated from routes (email, WhatsApp services)
- **Scheduler Pattern** - Automated task execution with node-cron
- **Keep-Alive Pattern** - Self-ping mechanism to prevent server sleep

---

## API Communication

### Request/Response Format
- **JSON** - All API requests and responses use JSON format
- **Standard Response Structure**:
  ```json
  {
    "message": "success",
    "data": { ... }
  }
  ```

### Error Handling
- HTTP status codes (400, 404, 500)
- Structured error responses with error messages

---

## Security & Authentication

### Environment Variables
- Sensitive credentials stored in `.env` file
- Separate `.env.example` for documentation
- Environment-specific configurations (development/production)

### Database Security
- SSL/TLS for production PostgreSQL connections
- Parameterized queries to prevent SQL injection
- Unique constraints on sensitive fields

### API Security
- CORS configuration for cross-origin requests
- Input validation on all endpoints
- Error message sanitization

---

## Performance Optimizations

### Frontend
- Code splitting with Vite
- Lazy loading of routes
- Optimized 3D rendering with Three.js
- Debounced animations with Framer Motion

### Backend
- Connection pooling for database
- Keep-alive mechanism to reduce cold starts
- Static file caching
- Efficient database queries with indexes

---

## Browser Compatibility

### Supported Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- ES6+ JavaScript support
- WebGL support for 3D graphics
- CSS Grid and Flexbox
- LocalStorage API

---

## Version Control & CI/CD

### Version Control
- **Git** - Source code management
- **GitHub** - Remote repository hosting

### Deployment Pipeline
- Push to main branch triggers Render deployment
- Automatic build and deployment
- Health check endpoint for monitoring

---

## Third-Party Integrations

### Email Service
- **Mailtrap** - Email testing and delivery
- SMTP configuration for production

### Messaging Service
- **Twilio** - WhatsApp Business API
- Sandbox mode for development
- Production WhatsApp number support

### Database Hosting
- **Render PostgreSQL** - Managed database service
- Automatic backups
- Connection pooling

---

## Development vs Production

### Development Environment
- Local Vite dev server (port 5173)
- Local Express server (port 3000)
- SQLite or PostgreSQL database
- Mailtrap for email testing
- Twilio Sandbox for WhatsApp

### Production Environment
- Render Web Service
- Render PostgreSQL database
- Production email service
- Production Twilio WhatsApp number
- SSL/TLS encryption
- Environment-based configuration

---

## Package Management

### Package Manager
- **npm** - Node Package Manager
- `package.json` for dependency management
- `package-lock.json` for version locking

### Scripts
```json
{
  "dev": "vite",                    // Start frontend dev server
  "build": "vite build",            // Build frontend for production
  "server": "node server.js",       // Start backend server
  "start": "node server.js",        // Production start command
  "render-build": "npm install && npm run build"  // Render deployment build
}
```

---

## Technology Versions Summary

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | Frontend framework |
| Node.js | Latest LTS | Backend runtime |
| Express | 5.1.0 | Web framework |
| PostgreSQL | Latest | Production database |
| Vite | 7.2.2 | Build tool |
| Tailwind CSS | 3.4.1 | Styling |
| Three.js | 0.181.2 | 3D graphics |
| Framer Motion | 12.23.24 | Animations |
| Recharts | 3.5.0 | Charts |
| Nodemailer | 7.0.10 | Email |
| Twilio | 5.10.6 | WhatsApp |
| node-cron | 4.2.1 | Scheduling |

---

## Future Technology Considerations

### Potential Additions
- **Redis** - Caching layer for improved performance
- **WebSockets** - Real-time notifications
- **JWT** - Token-based authentication
- **Docker** - Containerization for consistent deployments
- **TypeScript** - Type safety across the application
- **GraphQL** - Alternative to REST API
- **PWA** - Progressive Web App capabilities
- **Service Workers** - Offline functionality

---

*Last Updated: November 28, 2025*
*Version: 1.0.0*
