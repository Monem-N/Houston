# Houston Travel Guide - React, Material UI & Vite

A comprehensive travel guide for the FIRST Championship 2025 in Houston, Texas, built with React, Material UI, and Vite.

## Features

- Modern, responsive UI built with Material UI
- Interactive maps with points of interest
- Comprehensive information about attractions, dining, and events
- FIRST Championship 2025 specific information
- Dark/light mode toggle
- Offline support with PWA capabilities

## Tech Stack

- React 18
- TypeScript
- Material UI 5
- React Router 6
- Vite
- Vitest for testing
- PWA support

## Getting Started

### Prerequisites

- Node.js (v18 recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/houston-guide.git
   cd houston-guide
   ```

1. Install dependencies

   ```bash
   npm install
   ```

1. Start the development server

   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm test` - Runs the test suite
- `npm run test:watch` - Runs the test suite in watch mode
- `npm run test:coverage` - Runs the test suite with coverage
- `npm run lint` - Lints the codebase
- `npm run format` - Formats the codebase with Prettier

## Project Structure

```plaintext
houston-guide/
├── public/                  # Static files
├── src/                     # Source code
│   ├── assets/              # Images, fonts, and other assets
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React contexts
│   ├── layouts/             # Layout components
│   ├── utils/               # Utility functions
│   ├── theme/               # Material UI theme configuration
│   ├── routes.tsx           # Route configuration
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
└── ...                      # Config files
```

## Asset Management

### Naming Convention
- `{category}-{context}-{name}-{size}.{ext}` (e.g., `attractions-space-center-desktop.jpg`).

### Directory Structure
```
public/
  assets/
    images/
      {category}/
        {context}-{name}-{size}.{ext}
```

### Missing Images
The following images are referenced in the code but are missing in the `public/assets/` directory:

| Component           | Referenced Path                                   | Missing File                  |
|---------------------|---------------------------------------------------|-------------------------------|
| `HomePage.tsx`      | `/assets/images/attractions/space-center.jpg`     | `space-center-1.jpg`          |
| `TouristanbulPage.tsx` | `/assets/images/attractions/mosquee-bleue.jpg` | _missing_                     |
| `AttractionsPage.tsx` | `/assets/images/attractions/museum-natural-science.jpg` | _missing_                     |

### Validation Script
Run the following script to validate image references:
```bash
bash scripts/validate-assets.sh
```

## Deployment

The application is configured for deployment on Netlify. The production build can be created with:

```bash
npm run build
```

This will generate optimized files in the `dist` directory that can be deployed to any static hosting service.

### Asset Management
- Image downloads use a separate Unsplash API key passed as script argument
- Run download script with: `bash scripts/download-images.sh YOUR_UNSPLASH_KEY`

### Environment Variables

The application uses the following environment variables:

- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `VITE_SENTRY_DSN` - Sentry DSN for error tracking
- `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics ID (optional)
- `VITE_GOOGLE_MAPS_MAP_ID` - Google Maps Map ID (optional)

Ensure these variables are set in a `.env` file in the root directory.

**Security Note**:
- Never commit `.env` files to version control
- Keep credentials secure - only share with authorized team members
- Rotate keys immediately if compromised
- Use environment-specific variables for production deployments

## License

This project is licensed under the MIT License - see the LICENSE file for details.
