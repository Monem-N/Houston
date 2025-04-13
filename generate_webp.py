#!/usr/bin/env python3
"""
WebP Generator for Houston 2025 Travel Guide
This script generates WebP versions of all images in the assets/images directory
"""

import os
import sys
from pathlib import Path
from PIL import Image
import concurrent.futures
import argparse

# Default settings
DEFAULT_QUALITY = 80
MAX_WORKERS = 4

def convert_to_webp(image_path, quality=DEFAULT_QUALITY):
    """
    Convert an image to WebP format
    
    Args:
        image_path: Path to the image file
        quality: Quality setting (0-100)
        
    Returns:
        dict: Information about the conversion
    """
    try:
        # Skip if already WebP
        if image_path.lower().endswith('.webp'):
            return {
                "original_path": image_path,
                "skipped": True,
                "reason": "Already WebP"
            }
        
        # Open the image
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        # Get original size
        original_size = os.path.getsize(image_path)
        
        # Determine output path
        output_path = str(Path(image_path).with_suffix('.webp'))
        
        # Save as WebP
        img.save(output_path, format="WEBP", quality=quality)
        
        # Get new size
        new_size = os.path.getsize(output_path)
        
        # Calculate savings
        saved_size = original_size - new_size
        saved_percentage = (saved_size / original_size) * 100 if original_size > 0 else 0
        
        return {
            "original_path": image_path,
            "webp_path": output_path,
            "original_size": original_size,
            "webp_size": new_size,
            "saved_size": saved_size,
            "saved_percentage": saved_percentage
        }
    
    except Exception as e:
        print(f"Error converting {image_path}: {e}")
        return {
            "original_path": image_path,
            "error": str(e)
        }

def find_images(directory):
    """Find all image files in a directory (recursively)"""
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    images = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                images.append(os.path.join(root, file))
    
    return images

def format_size(size_bytes):
    """Format size in bytes to human-readable format"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Generate WebP versions of images for Houston 2025 Travel Guide")
    parser.add_argument("--directory", "-d", default="assets/images", help="Directory containing images to convert")
    parser.add_argument("--quality", "-q", type=int, default=DEFAULT_QUALITY, help=f"Quality setting (0-100, default: {DEFAULT_QUALITY})")
    parser.add_argument("--workers", type=int, default=MAX_WORKERS, help=f"Number of worker processes (default: {MAX_WORKERS})")
    
    args = parser.parse_args()
    
    # Find all images
    print(f"Searching for images in {args.directory}...")
    images = find_images(args.directory)
    print(f"Found {len(images)} images to convert")
    
    if not images:
        print("No images found. Exiting.")
        return
    
    # Convert images in parallel
    print(f"Converting images to WebP with {args.workers} worker processes...")
    results = []
    
    with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        futures = [executor.submit(convert_to_webp, 
                                  image_path=img, 
                                  quality=args.quality) for img in images]
        
        for i, future in enumerate(concurrent.futures.as_completed(futures)):
            result = future.result()
            results.append(result)
            
            # Print progress
            print(f"Progress: {i+1}/{len(images)} images processed", end="\r")
    
    print("\nConversion complete!")
    
    # Calculate statistics
    total_original_size = 0
    total_webp_size = 0
    total_saved_size = 0
    error_count = 0
    skipped_count = 0
    
    for result in results:
        if "error" in result:
            error_count += 1
            continue
        
        if result.get("skipped", False):
            skipped_count += 1
            continue
        
        total_original_size += result["original_size"]
        total_webp_size += result["webp_size"]
        total_saved_size += result["saved_size"]
    
    # Print summary
    print("\n--- Conversion Summary ---")
    print(f"Total images processed: {len(images)}")
    print(f"Successful: {len(images) - error_count - skipped_count}")
    print(f"Skipped: {skipped_count}")
    print(f"Failed: {error_count}")
    print(f"Original size: {format_size(total_original_size)}")
    print(f"WebP size: {format_size(total_webp_size)}")
    print(f"Space saved: {format_size(total_saved_size)} ({(total_saved_size / total_original_size) * 100:.2f}%)")
    print("--------------------------")

if __name__ == "__main__":
    main()
