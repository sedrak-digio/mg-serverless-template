# Azure Static Web Apps Deployment Guide

This guide walks you through deploying this template to Azure Static Web Apps using Visual Studio Code.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js 20.19+](https://nodejs.org/) (required for Vite 7 and Mantine 8)
- [Azure account](https://azure.microsoft.com/free/)
- [GitHub account](https://github.com/)
- Git installed locally

## Setup Instructions

### 1. Install Required VS Code Extensions

Install the following extensions in Visual Studio Code:

1. **Azure Static Web Apps** - Search for "Azure Static Web Apps" in the Extensions marketplace
2. **Azure Functions** - Search for "Azure Functions" (required for API support)

### 2. Prepare Your Repository

1. Create a new repository from this template on GitHub
2. Clone the repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### 3. Deploy to Azure Static Web Apps

#### Using VS Code Extension (Recommended)

1. Open the project in Visual Studio Code
2. Sign in to Azure:
   - Click the Azure icon in the sidebar
   - Click "Sign in to Azure"
   - Follow the authentication flow

3. Create a new Static Web App:
   - Open Command Palette (`F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type "Azure Static Web Apps: Create Static Web App..."
   - Follow the prompts:
     - Select your Azure subscription
     - Enter a name for your app
     - Choose the closest region
     - Select build preset: **Custom**
     - Configure build settings:
       - **App location**: `/` (root)
       - **API location**: `api`
       - **Output location**: `dist`

4. The extension will:
   - Create a GitHub Actions workflow file
   - Create the Azure Static Web App resource
   - Trigger the first deployment

5. Monitor deployment:
   - Check the GitHub Actions tab in your repository
   - Or watch the Output panel in VS Code

6. View your deployed site:
   - Right-click your app in the Azure Static Web Apps extension
   - Select "Browse Site"

## Important Configuration Notes

### Node.js Version

This template requires **Node.js 20.19+** due to:
- Vite 7.x requirements
- Mantine 8.x compatibility

The Azure Static Web Apps workflow will be configured to use Node.js 22.

### Build Configuration

The GitHub Actions workflow created by the extension should include:

```yaml
app_location: "/"
api_location: "api"
output_location: "dist"
```

### Known Issues and Workarounds

#### Rollup Optional Dependencies

If you encounter an error about missing `@rollup/rollup-linux-x64-gnu`, the GitHub Actions workflow should include:

```yaml
- name: Install dependencies
  run: |
    npm ci
    npm install @rollup/rollup-linux-x64-gnu --force
```

This is a known npm issue with optional dependencies on Linux build agents.

#### File Count Limit

If deployment fails with "too many static files", ensure you're building the app in the workflow and only deploying the `dist` folder, not the entire workspace including `node_modules`.

## API Functions

This template includes Azure Functions in the `/api` folder. The functions use:
- **Node.js v4 programming model**
- **HTTP triggers**
- **Anonymous authentication** (configure as needed)

### Local Development with API

1. Install Azure Static Web Apps CLI:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. Run locally:
   ```bash
   swa start dist --api-location api
   ```

   Or for development with hot reload:
   ```bash
   npm run dev  # In one terminal for Vite
   swa start http://localhost:5173 --api-location api  # In another for API proxy
   ```

## Updating the Deployed App

After the initial deployment, any push to your main branch will automatically trigger a new deployment via GitHub Actions.

To make changes:
1. Make your code changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. GitHub Actions will automatically build and deploy

## Monitoring and Management

### View Logs
- Go to the GitHub Actions tab in your repository
- Click on the latest workflow run
- Expand the build/deploy steps to see detailed logs

### Delete the App
1. In VS Code, open the Azure extension
2. Find your Static Web App
3. Right-click and select "Delete"

### Custom Domains and Configuration

For advanced configuration (custom domains, authentication, routing), create a `staticwebapp.config.json` file in the root of your project. See [Azure Static Web Apps configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration) for details.

## Troubleshooting

### Build Fails with Node.js Version Error
Ensure the GitHub Actions workflow specifies Node.js 22:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
```

### API Functions Not Working
- Verify the `api` folder exists and contains your functions
- Check that `api_location: "api"` is set in the workflow
- Ensure functions use the v4 programming model

### Deployment Hangs or Times Out
- Check your build output size
- Verify all dependencies install correctly
- Review GitHub Actions logs for specific errors

## Additional Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Mantine 8 Documentation](https://mantine.dev/)
- [Vite Documentation](https://vite.dev/)
- [Azure Functions Node.js Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node)
