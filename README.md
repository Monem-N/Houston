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

### Netlify Environment Variables

To securely store your API keys, we use Netlify Environment Variables:

1. Go to your Netlify dashboard
2. Select your site
3. Go to "Site settings" > "Build & deploy" > "Environment"
4. Add the following environment variables:
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key
   - `GOOGLE_ANALYTICS_ID`: Your Google Analytics measurement ID (G-KHZ18QKRHG)

### How it works

When Netlify builds your site, it will:

1. Run the `build.js` script which generates the `config.js` file using the environment variables
2. Deploy the site with the generated `config.js` file

This way, your API keys are never stored in the repository and are only injected during the build process.

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
