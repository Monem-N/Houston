#!/usr/bin/env python3
"""
Generate icons for PWA
This script creates icons of different sizes for the PWA.
"""

import os
from PIL import Image, ImageDraw, ImageFont

# Configuration
OUTPUT_DIR = "./output/assets/icons"
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
BACKGROUND_COLOR = (0, 102, 204)  # Blue
TEXT_COLOR = (255, 255, 255)  # White

def generate_icons():
    """
    Generate icons of different sizes for the PWA.
    """
    print("Generating icons for PWA...")
    
    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Generate icons for each size
    for size in SIZES:
        # Create a new image with blue background
        icon = Image.new('RGB', (size, size), BACKGROUND_COLOR)
        draw = ImageDraw.Draw(icon)
        
        # Try to load a font, use default if not available
        try:
            # Adjust font size based on icon size
            font_size = size // 3
            font = ImageFont.truetype("Arial.ttf", font_size)
        except IOError:
            font = ImageFont.load_default()
        
        # Add text "HOU" to the icon
        text = "HOU"
        text_width, text_height = draw.textsize(text, font=font) if hasattr(draw, 'textsize') else (size//2, size//2)
        position = ((size - text_width) // 2, (size - text_height) // 2)
        draw.text(position, text, font=font, fill=TEXT_COLOR)
        
        # Save the icon
        icon_path = os.path.join(OUTPUT_DIR, f"icon-{size}x{size}.png")
        icon.save(icon_path)
        print(f"Generated {icon_path}")
    
    print("All icons generated successfully.")

if __name__ == "__main__":
    generate_icons()
