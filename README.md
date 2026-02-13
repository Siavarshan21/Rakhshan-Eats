# Rakhshan Eats

A production-ready 3D grocery e-commerce application built with React, TypeScript, Three.js, and modern web technologies.

## Features

- **3D Grocery Store** - Immersive 3D shopping experience with navigable aisles and interactive shelves
- **2D Grid View** - Traditional product grid with filtering and sorting
- **Smart Search** - Fuzzy search across products with instant results
- **Category Navigation** - Browse by category with visual cards
- **Shopping Cart** - Full cart management with persistent state
- **Checkout Flow** - Multi-step checkout with form validation
- **Dark Mode** - System-aware dark/light theme toggle
- **Responsive Design** - Mobile-first approach with adaptive 3D quality
- **Promo Codes** - Discount code system (try: SAVE10, FLAT5, WELCOME20)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 + TypeScript (strict) |
| Build Tool | Vite |
| 3D Engine | Three.js + React Three Fiber + Drei |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Server State | TanStack React Query |
| Routing | React Router v6 |
| Validation | Zod |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Testing | Vitest + React Testing Library + MSW |
| Linting | ESLint + Prettier |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Siavarshan21/Rakhshan-Eats.git
cd Rakhshan-Eats

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy the example env file and configure:

```bash
cp .env.example .env.development
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | API base URL | `http://localhost:8080/api/v1` |
| `VITE_ENABLE_3D` | Enable 3D view | `true` |
| `VITE_ENABLE_MOCK_API` | Use mock data | `true` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run type-check` | TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## Project Structure

```
src/
├── app/          # App shell (providers, layouts, router, errors)
├── features/     # Business domains (grocery, checkout)
├── three/        # 3D infrastructure (canvas, scenes, materials)
├── components/   # Shared UI components
├── store/        # Global Zustand stores
├── services/     # API, storage, logging, analytics
├── hooks/        # Shared React hooks
├── styles/       # Global CSS and Tailwind
├── constants/    # App-wide constants
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
├── config/       # Configuration files
├── lib/          # Third-party library wrappers
├── pages/        # Page components
└── main.tsx      # Entry point
```

## Architecture

- **Feature-based structure** - Code organized by business domain
- **Clean separation** - Business logic in hooks, UI in components
- **Type-safe** - Strict TypeScript with Zod runtime validation
- **Performance optimized** - Code splitting, lazy loading, adaptive 3D quality
- **Responsive** - Mobile-first with fallback to 2D on low-end devices

## Deployment

### Vercel

```bash
npm run build
# Deploy dist/ to Vercel - vercel.json included
```

### Netlify

```bash
npm run build
# Deploy dist/ to Netlify - netlify.toml included
```

## License

MIT License - see [LICENSE](LICENSE) for details.
