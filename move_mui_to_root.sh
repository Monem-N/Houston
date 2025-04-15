#!/bin/bash

# Create necessary directories in the root folder
mkdir -p src/assets src/components src/contexts src/hooks src/layouts src/pages src/routes src/theme src/utils public

# Copy src directory contents
cp -r houston-mui/src/* src/

# Copy public directory contents
cp -r houston-mui/public/* public/

# Copy configuration files (we'll modify these for Vite later)
cp houston-mui/.prettierrc .
cp houston-mui/.gitignore .
cp houston-mui/README.md .

echo "Files moved successfully from houston-mui to root directory!"
echo "Next steps: Configure Vite and update import paths if necessary."
