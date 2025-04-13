#!/usr/bin/env python3
"""
Image Optimizer for Houston 2025 Travel Guide
This script optimizes all images in the assets/images directory
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageOps
import concurrent.futures
import argparse

# Default settings
DEFAULT_QUALITY = 80
DEFAULT_WIDTH = 800
THUMBNAIL_WIDTH = 300
FORMATS = ["webp", "jpg"]
MAX_WORKERS = 4

def optimize_image(image_path, output_dir=None, width=DEFAULT_WIDTH, quality=DEFAULT_QUALITY, formats=FORMATS):
    """
    Optimize a single image
    
    Args:
        image_path: Path to the image file
        output_dir: Directory to save optimized images (if None, use same directory)
        width: Maximum width for the image
        quality: Quality setting (0-100)
        formats: List of formats to save (e.g., ["webp", "jpg"])
        
    Returns:
        dict: Statistics about the optimization
    """
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert RGBA to RGB if needed (for JPEG compatibility)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        # Get original size
        original_size = os.path.getsize(image_path)
        
        # Resize if needed
        if img.width > width:
            # Calculate height to maintain aspect ratio
            height = int(img.height * (width / img.width))
            img = ImageOps.contain(img, (width, height))
        
        # Determine output directory
        if output_dir is None:
            output_dir = os.path.dirname(image_path)
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Get filename without extension
        filename = Path(image_path).stem
        
        # Save in each format
        saved_files = []
        total_saved_size = 0
        
        for fmt in formats:
            # Determine output path
            output_path = os.path.join(output_dir, f"{filename}.{fmt}")
            
            # Save the image
            img.save(output_path, quality=quality, optimize=True)
            
            # Get new size
            new_size = os.path.getsize(output_path)
            
            # Calculate savings
            saved_size = original_size - new_size
            saved_percentage = (saved_size / original_size) * 100 if original_size > 0 else 0
            
            saved_files.append({
                "path": output_path,
                "format": fmt,
                "original_size": original_size,
                "new_size": new_size,
                "saved_size": saved_size,
                "saved_percentage": saved_percentage
            })
            
            total_saved_size += saved_size
        
        return {
            "original_path": image_path,
            "saved_files": saved_files,
            "total_saved_size": total_saved_size
        }
    
    except Exception as e:
        print(f"Error optimizing {image_path}: {e}")
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
    parser = argparse.ArgumentParser(description="Optimize images for Houston 2025 Travel Guide")
    parser.add_argument("--directory", "-d", default="assets/images", help="Directory containing images to optimize")
    parser.add_argument("--output", "-o", help="Output directory for optimized images")
    parser.add_argument("--width", "-w", type=int, default=DEFAULT_WIDTH, help=f"Maximum width for images (default: {DEFAULT_WIDTH}px)")
    parser.add_argument("--quality", "-q", type=int, default=DEFAULT_QUALITY, help=f"Quality setting (0-100, default: {DEFAULT_QUALITY})")
    parser.add_argument("--formats", "-f", nargs="+", default=FORMATS, help=f"Output formats (default: {' '.join(FORMATS)})")
    parser.add_argument("--workers", type=int, default=MAX_WORKERS, help=f"Number of worker processes (default: {MAX_WORKERS})")
    
    args = parser.parse_args()
    
    # Find all images
    print(f"Searching for images in {args.directory}...")
    images = find_images(args.directory)
    print(f"Found {len(images)} images to optimize")
    
    if not images:
        print("No images found. Exiting.")
        return
    
    # Optimize images in parallel
    print(f"Optimizing images with {args.workers} worker processes...")
    results = []
    
    with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        futures = [executor.submit(optimize_image, 
                                  image_path=img, 
                                  output_dir=args.output,
                                  width=args.width,
                                  quality=args.quality,
                                  formats=args.formats) for img in images]
        
        for i, future in enumerate(concurrent.futures.as_completed(futures)):
            result = future.result()
            results.append(result)
            
            # Print progress
            print(f"Progress: {i+1}/{len(images)} images processed", end="\r")
    
    print("\nOptimization complete!")
    
    # Calculate statistics
    total_original_size = 0
    total_new_size = 0
    total_saved_size = 0
    error_count = 0
    
    for result in results:
        if "error" in result:
            error_count += 1
            continue
        
        for saved_file in result["saved_files"]:
            total_original_size += saved_file["original_size"]
            total_new_size += saved_file["new_size"]
            total_saved_size += saved_file["saved_size"]
    
    # Print summary
    print("\n--- Optimization Summary ---")
    print(f"Total images processed: {len(images)}")
    print(f"Successful: {len(images) - error_count}")
    print(f"Failed: {error_count}")
    print(f"Original size: {format_size(total_original_size)}")
    print(f"New size: {format_size(total_new_size)}")
    print(f"Space saved: {format_size(total_saved_size)} ({(total_saved_size / total_original_size) * 100:.2f}%)")
    print("---------------------------")

if __name__ == "__main__":
    main()
