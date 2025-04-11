#!/bin/bash
# Script to deploy Houston Travel Guide to GitHub Pages

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Houston Travel Guide - GitHub Pages Deployment Script${NC}"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo -e "${YELLOW}Initializing Git repository...${NC}"
  git init
  echo "Git repository initialized."
else
  echo "Git repository already initialized."
fi

# Check if remote is set up
if ! git remote -v | grep -q "origin"; then
  echo -e "${YELLOW}No remote repository found.${NC}"
  echo "Please create a repository on GitHub and then run:"
  echo -e "${GREEN}git remote add origin https://github.com/[your-username]/houston-guide.git${NC}"
  echo "Replace [your-username] with your GitHub username."
else
  echo "Remote repository already configured."
fi

# Add all files
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Update Houston Travel Guide"

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo "If this is your first push, run:"
echo -e "${GREEN}git push -u origin main${NC}"
echo "For subsequent pushes, simply run:"
echo -e "${GREEN}git push${NC}"

echo ""
echo -e "${YELLOW}After pushing to GitHub:${NC}"
echo "1. Go to your repository on GitHub"
echo "2. Click on 'Settings'"
echo "3. Scroll down to 'GitHub Pages'"
echo "4. Under 'Source', select 'main' branch and '/ (root)' folder"
echo "5. Click 'Save'"
echo ""
echo "Your website will be available at: https://[your-username].github.io/houston-guide/"
echo "=================================================="
