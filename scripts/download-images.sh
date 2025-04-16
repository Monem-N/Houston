#!/bin/bash
# Stock image download script for Houston project

# Load environment
# Removed environment loading to prevent conflicts

# API configuration
UNSPLASH_API_KEY=${1:-your_unsplash_access_key}
BASE_URL="https://api.unsplash.com"

# Create directories from missing images list
awk -F/ '{print "public/" $1 "/" $2 "/" $3}' missing-images.txt | uniq | xargs -I{} mkdir -p "{}"

# Download function
download_image() {
 local path=$1
 local category=$(echo $path | cut -d'/' -f3)
 local filename=$(basename "$path")
 local query=$(echo $filename | sed 's/-/ /g' | sed 's/\..*//')

 echo "Downloading $category: $query"
 
 curl -s "$BASE_URL/photos/random?query=$query&client_id=$UNSPLASH_API_KEY" \
 | jq -r '.urls.regular' \
 | xargs curl -s -o "public/$path"
}

# Export function for parallel execution
export -f download_image

# Process missing images in parallel
cat missing-images.txt | parallel --jobs 4 download_image

echo "Download complete. Validate with:\nbash scripts/validate-assets.sh"