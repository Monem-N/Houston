#!/usr/bin/env python3
"""
Asset Copier for Houston 2025 Travel Guide
This script copies CSS and other assets to the output directory.
"""

import os
import shutil

# Configuration
OUTPUT_DIR = "./output"
ASSETS_DIR = "./assets"
CSS_DIR = "./assets/css"

def copy_assets():
    """
    Copy assets to the output directory.
    """
    print("Copying assets to output directory...")
    
    # Create output assets directory if it doesn't exist
    output_assets_dir = os.path.join(OUTPUT_DIR, "assets")
    os.makedirs(output_assets_dir, exist_ok=True)
    
    # Create output CSS directory if it doesn't exist
    output_css_dir = os.path.join(output_assets_dir, "css")
    os.makedirs(output_css_dir, exist_ok=True)
    
    # Copy CSS files
    for filename in os.listdir(CSS_DIR):
        if filename.endswith('.css'):
            src = os.path.join(CSS_DIR, filename)
            dst = os.path.join(output_css_dir, filename)
            shutil.copy2(src, dst)
            print(f"Copied {src} to {dst}")
    
    # Copy other assets (images, scripts, etc.)
    for item in os.listdir(ASSETS_DIR):
        if item != "css":  # Skip the CSS directory as we've already copied it
            src = os.path.join(ASSETS_DIR, item)
            dst = os.path.join(output_assets_dir, item)
            
            if os.path.isfile(src):
                shutil.copy2(src, dst)
                print(f"Copied {src} to {dst}")
            elif os.path.isdir(src):
                if os.path.exists(dst):
                    shutil.rmtree(dst)
                shutil.copytree(src, dst)
                print(f"Copied directory {src} to {dst}")
    
    print("Assets copied successfully.")

if __name__ == "__main__":
    copy_assets()
