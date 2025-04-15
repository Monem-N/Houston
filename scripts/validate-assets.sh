#!/bin/bash
# Script to validate image references in the project

# Extract referenced images from the source code
grep -Pohr "(/assets/.*?\.(png|jpg|svg))" src/ | sort | uniq > referenced-images.txt

# List all existing images in the assets directory
find public/assets/ -type f | sed 's|public||' | sort > existing-images.txt

# Identify missing images
comm -23 referenced-images.txt existing-images.txt > missing-images.txt

# Output results
echo "Validation complete."
echo "Missing images are listed in missing-images.txt."
