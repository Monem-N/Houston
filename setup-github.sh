#!/bin/bash
# Script to set up GitHub repository for Houston Guide

# Add remote repository
git remote add origin https://github.com/Monem-N/houston-guide.git

# Push to GitHub
git push -u origin main

echo "Repository connected and pushed to GitHub!"
echo "Your website will be available at: https://Monem-N.github.io/houston-guide/"
echo ""
echo "To enable GitHub Pages:"
echo "1. Go to your repository on GitHub"
echo "2. Click on 'Settings'"
echo "3. Scroll down to 'GitHub Pages'"
echo "4. Under 'Source', select 'main' branch and '/ (root)' folder"
echo "5. Click 'Save'"
