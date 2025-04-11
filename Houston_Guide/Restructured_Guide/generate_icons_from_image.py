#!/usr/bin/env python3
"""
Generate icons for PWA
This script creates icons of different sizes for the PWA using an existing image.
"""

import os
from PIL import Image

# Configuration
SOURCE_IMAGE = "./output/assets/icons/carte.png"
OUTPUT_DIR = "./output/assets/icons"
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

def generate_icons():
    """
    Generate icons of different sizes for the PWA using an existing image.
    """
    print("Generating icons for PWA...")
    
    # Check if source image exists
    if not os.path.exists(SOURCE_IMAGE):
        print(f"Error: Source image {SOURCE_IMAGE} not found.")
        return
    
    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Open the source image
    try:
        source_img = Image.open(SOURCE_IMAGE)
        print(f"Source image loaded: {SOURCE_IMAGE}")
    except Exception as e:
        print(f"Error opening source image: {e}")
        return
    
    # Generate icons for each size
    for size in SIZES:
        try:
            # Resize the image
            icon = source_img.resize((size, size), Image.LANCZOS)
            
            # Save the icon
            icon_path = os.path.join(OUTPUT_DIR, f"icon-{size}x{size}.png")
            icon.save(icon_path)
            print(f"Generated {icon_path}")
        except Exception as e:
            print(f"Error generating icon of size {size}x{size}: {e}")
    
    print("All icons generated successfully.")

if __name__ == "__main__":
    generate_icons()
