#!/bin/bash
# Script to connect your local repository to GitHub and push content

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Houston GitHub Connection Script${NC}"
echo "=================================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# Check if git user is configured
GIT_USER=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_USER" ] || [ -z "$GIT_EMAIL" ]; then
    echo -e "${YELLOW}Git user not fully configured. Let's set it up:${NC}"
    
    if [ -z "$GIT_USER" ]; then
        echo -n "Enter your name for Git: "
        read user_name
        git config --global user.name "$user_name"
    else
        echo -e "Git username: ${GREEN}$GIT_USER${NC}"
    fi
    
    if [ -z "$GIT_EMAIL" ]; then
        echo -n "Enter your email for Git: "
        read user_email
        git config --global user.email "$user_email"
    else
        echo -e "Git email: ${GREEN}$GIT_EMAIL${NC}"
    fi
else
    echo -e "Git configured for: ${GREEN}$GIT_USER${NC} <${GREEN}$GIT_EMAIL${NC}>"
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Not in a Git repository. Please run this script from your Houston project directory.${NC}"
    exit 1
fi

# Check if remote is already configured
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "Remote already configured: ${GREEN}$REMOTE_URL${NC}"
    echo -e "${YELLOW}Do you want to change it? (y/n)${NC}"
    read change_remote
    
    if [ "$change_remote" = "y" ] || [ "$change_remote" = "Y" ]; then
        git remote remove origin
        REMOTE_URL=""
    else
        echo "Keeping existing remote configuration."
    fi
fi

# Set up remote if needed
if [ -z "$REMOTE_URL" ]; then
    echo -e "${YELLOW}Setting up remote repository connection.${NC}"
    echo -n "Enter your GitHub username: "
    read github_username
    
    echo -n "Enter your repository name (default: Houston): "
    read repo_name
    
    if [ -z "$repo_name" ]; then
        repo_name="Houston"
    fi
    
    git remote add origin "https://github.com/$github_username/$repo_name.git"
    echo -e "Remote added: ${GREEN}https://github.com/$github_username/$repo_name.git${NC}"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Current branch: ${GREEN}$CURRENT_BRANCH${NC}"

# Push to GitHub
echo -e "${YELLOW}Ready to push to GitHub. This may prompt for your GitHub credentials.${NC}"
echo -e "${YELLOW}Note: GitHub now requires a personal access token instead of password.${NC}"
echo -e "Do you want to push now? (y/n)"
read do_push

if [ "$do_push" = "y" ] || [ "$do_push" = "Y" ]; then
    git push -u origin $CURRENT_BRANCH
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
        
        # Get the remote URL for the website
        REMOTE_URL=$(git remote get-url origin)
        GITHUB_USERNAME=$(echo $REMOTE_URL | sed -n 's/.*github.com\/\([^\/]*\)\/.*/\1/p')
        REPO_NAME=$(echo $REMOTE_URL | sed -n 's/.*github.com\/[^\/]*\/\([^\.]*\).*/\1/p')
        
        echo -e "${YELLOW}To enable GitHub Pages:${NC}"
        echo "1. Go to your repository on GitHub"
        echo "2. Click on 'Settings'"
        echo "3. Scroll down to 'Pages'"
        echo "4. Under 'Source', select '$CURRENT_BRANCH' branch and '/ (root)' folder"
        echo "5. Click 'Save'"
        echo ""
        echo -e "Your website will be available at: ${GREEN}https://$GITHUB_USERNAME.github.io/$REPO_NAME/${NC}"
    else
        echo -e "${RED}Failed to push to GitHub. Please check your credentials and try again.${NC}"
        echo -e "${YELLOW}If you're using a password, you need to create a personal access token:${NC}"
        echo "1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)"
        echo "2. Click 'Generate new token'"
        echo "3. Give it a name, set an expiration, and select the 'repo' scope"
        echo "4. Click 'Generate token' and copy the token"
        echo "5. Use this token as your password when prompted"
    fi
else
    echo -e "${YELLOW}Skipping push. You can push later with:${NC}"
    echo -e "${GREEN}git push -u origin $CURRENT_BRANCH${NC}"
fi

echo "=================================================="
