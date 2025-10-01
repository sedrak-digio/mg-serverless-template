# Mantine 8 + Vite 7 + Azure Static Web Apps Template

A modern, minimal template for building React applications with:
- **Mantine 8.3** - UI component library
- **React 19** - Latest React with modern features
- **Vite 7** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Azure Functions API** - Serverless backend in `/api`

## Prerequisites

- Node.js 20.19+ (required for Vite 7)
- npm (package manager)

## Quick Start

### Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint

## Deploy to Azure Static Web Apps

See [AZURE_DEPLOYMENT_GUIDE.md](./AZURE_DEPLOYMENT_GUIDE.md) for complete deployment instructions using Visual Studio Code.

## API Functions

This template includes Azure Functions in the `/api` directory. The functions are automatically deployed with your static web app.

Example: The `/api/counter` endpoint increments a counter (see demo in App.tsx).

## Tech Stack Details

- **Mantine 8.3.2** - [Documentation](https://mantine.dev/)
- **Vite 7.1.5** - [Documentation](https://vite.dev/)
- **React 19.1.1** - [Documentation](https://react.dev/)
- **PostCSS** with Mantine preset for styling

## Project Structure

```
├── api/                    # Azure Functions (serverless API)
├── src/
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── theme.ts           # Mantine theme configuration
├── dist/                  # Production build output
└── package.json
```

## Notes

- This template uses npm with package overrides to resolve dependency conflicts
- Node.js 20.19+ is required due to Vite 7 requirements
- The template is optimized for Azure Static Web Apps deployment
