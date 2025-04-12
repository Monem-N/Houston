# Houston Travel Guide 2025

This repository contains the Houston Travel Guide for FIRST Championship 2025, a comprehensive guide with information about:

- Transportation in Houston
- Dining and shopping options
- Attractions and activities
- FIRST Championship information
- Museum District
- Hermann Park & Zoo
- And more!

## Website

This guide is hosted on Netlify and can be accessed at: [https://houston2025.netlify.app/](https://houston2025.netlify.app/)

## Configuration

To configure the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Monem-N/Houston.git
   cd Houston
   ```

2. Create a configuration file:
   ```
   cp assets/js/config.example.js assets/js/config.js
   ```

3. Modify the `assets/js/config.js` file to add your Google Maps API key:
   ```javascript
   const CONFIG = {
     GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",
     // ...
   };
   ```

   To get a Google Maps API key, follow the instructions on [this page](https://developers.google.com/maps/documentation/javascript/get-api-key).

4. Open the `index.html` file in your browser to view the guide.

## Structure

The website is organized into main sections and annexes, with a responsive design for both desktop and mobile viewing.

## Security

The `assets/js/config.js` file contains sensitive information such as the Google Maps API key. This file is excluded from the Git repository via the `.gitignore` file.

For production deployments, use environment variables from your hosting platform (like Netlify) to store API keys and other sensitive information.

### GitHub Secrets

To securely store your API keys, we use GitHub Secrets and GitHub Actions to inject them during deployment:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key
   - `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

#### How to get Netlify credentials

1. **For the Netlify authentication token**:
   - Log in to your Netlify account
   - Go to User settings > Applications > Personal access tokens
   - Click on "New access token", give it a name, and click on "Generate token"
   - Copy the generated token

2. **For the Netlify site ID**:
   - Go to your site in the Netlify dashboard
   - Go to Site settings > General > Site details
   - Copy the API ID

### How it works

When you push to the main branch, GitHub Actions will:

1. Create a `config.js` file with your API key from GitHub Secrets
2. Deploy the site to Netlify

This way, your API key is never stored in the repository and is only injected during deployment.

## Local Development

To run this website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Monem-N/Houston.git
   cd Houston
   ```

2. Create a configuration file:
   ```bash
   cp assets/js/config.example.js assets/js/config.js
   ```

3. Edit the `config.js` file to add your Google Maps API key:
   ```javascript
   const CONFIG = {
     GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",
     // ...
   };
   ```

4. Open the `index.html` file in your browser or use a local server:
   ```bash
   # Using Python's built-in server
   python -m http.server
   # Or using Node.js with http-server
   npx http-server
   ```

## Updates

The content is regularly updated with the latest information about Houston and the FIRST Championship 2025.
