#!/usr/bin/env python3
"""
Asset Minifier for Houston 2025 Travel Guide
This script minifies CSS and JavaScript files
"""

import os
import glob
import re
import argparse
import concurrent.futures
import subprocess
import shutil

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        # Check for Node.js
        subprocess.run(['node', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        
        # Check for npm
        subprocess.run(['npm', '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        
        # Install required packages if not already installed
        packages = ['uglify-js', 'clean-css-cli']
        for package in packages:
            try:
                subprocess.run(['npx', package, '--version'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            except subprocess.CalledProcessError:
                print(f"Installing {package}...")
                subprocess.run(['npm', 'install', '-g', package], check=True)
        
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: Node.js and npm are required for minification.")
        print("Please install Node.js from https://nodejs.org/")
        return False

def minify_css(css_file, output_dir=None):
    """
    Minify a CSS file
    
    Args:
        css_file: Path to the CSS file
        output_dir: Directory to save minified file (if None, use same directory)
        
    Returns:
        dict: Information about the minification
    """
    try:
        # Determine output path
        if output_dir is None:
            output_dir = os.path.dirname(css_file)
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Get filename
        filename = os.path.basename(css_file)
        base_name, ext = os.path.splitext(filename)
        
        # Determine output path
        output_path = os.path.join(output_dir, f"{base_name}.min{ext}")
        
        # Get original size
        original_size = os.path.getsize(css_file)
        
        # Minify CSS using clean-css
        subprocess.run(['npx', 'cleancss', '-o', output_path, css_file], check=True)
        
        # Get minified size
        minified_size = os.path.getsize(output_path)
        
        # Calculate savings
        saved_size = original_size - minified_size
        saved_percentage = (saved_size / original_size) * 100 if original_size > 0 else 0
        
        return {
            "original_path": css_file,
            "minified_path": output_path,
            "original_size": original_size,
            "minified_size": minified_size,
            "saved_size": saved_size,
            "saved_percentage": saved_percentage
        }
    
    except Exception as e:
        print(f"Error minifying {css_file}: {e}")
        return {
            "original_path": css_file,
            "error": str(e)
        }

def minify_js(js_file, output_dir=None):
    """
    Minify a JavaScript file
    
    Args:
        js_file: Path to the JavaScript file
        output_dir: Directory to save minified file (if None, use same directory)
        
    Returns:
        dict: Information about the minification
    """
    try:
        # Determine output path
        if output_dir is None:
            output_dir = os.path.dirname(js_file)
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Get filename
        filename = os.path.basename(js_file)
        base_name, ext = os.path.splitext(filename)
        
        # Determine output path
        output_path = os.path.join(output_dir, f"{base_name}.min{ext}")
        
        # Get original size
        original_size = os.path.getsize(js_file)
        
        # Minify JavaScript using uglify-js
        subprocess.run(['npx', 'uglifyjs', js_file, '-o', output_path, '--compress', '--mangle'], check=True)
        
        # Get minified size
        minified_size = os.path.getsize(output_path)
        
        # Calculate savings
        saved_size = original_size - minified_size
        saved_percentage = (saved_size / original_size) * 100 if original_size > 0 else 0
        
        return {
            "original_path": js_file,
            "minified_path": output_path,
            "original_size": original_size,
            "minified_size": minified_size,
            "saved_size": saved_size,
            "saved_percentage": saved_percentage
        }
    
    except Exception as e:
        print(f"Error minifying {js_file}: {e}")
        return {
            "original_path": js_file,
            "error": str(e)
        }

def format_size(size_bytes):
    """Format size in bytes to human-readable format"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"

def update_html_references(html_files, minified_files):
    """
    Update HTML files to reference minified assets
    
    Args:
        html_files: List of HTML files
        minified_files: Dictionary mapping original paths to minified paths
    
    Returns:
        int: Number of files updated
    """
    updated_count = 0
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        
        # Update CSS references
        for original_path, minified_path in minified_files.items():
            if original_path.endswith('.css'):
                original_filename = os.path.basename(original_path)
                minified_filename = os.path.basename(minified_path)
                
                # Update link tags
                pattern = rf'<link[^>]*href="[^"]*{re.escape(original_filename)}"[^>]*>'
                replacement = lambda m: m.group(0).replace(original_filename, minified_filename)
                new_content = re.sub(pattern, replacement, content)
                
                if new_content != content:
                    content = new_content
                    modified = True
        
        # Update JS references
        for original_path, minified_path in minified_files.items():
            if original_path.endswith('.js'):
                original_filename = os.path.basename(original_path)
                minified_filename = os.path.basename(minified_path)
                
                # Update script tags
                pattern = rf'<script[^>]*src="[^"]*{re.escape(original_filename)}"[^>]*>'
                replacement = lambda m: m.group(0).replace(original_filename, minified_filename)
                new_content = re.sub(pattern, replacement, content)
                
                if new_content != content:
                    content = new_content
                    modified = True
        
        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
    
    return updated_count

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Minify CSS and JavaScript files for Houston 2025 Travel Guide")
    parser.add_argument("--css-dir", default="assets/css", help="Directory containing CSS files")
    parser.add_argument("--js-dir", default="assets/js", help="Directory containing JavaScript files")
    parser.add_argument("--html-dir", default=".", help="Directory containing HTML files")
    parser.add_argument("--output-dir", help="Output directory for minified files (if not specified, use same directories)")
    parser.add_argument("--update-html", action="store_true", help="Update HTML files to reference minified assets")
    parser.add_argument("--workers", type=int, default=4, help="Number of worker processes (default: 4)")
    
    args = parser.parse_args()
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Find CSS files
    css_files = glob.glob(os.path.join(args.css_dir, "*.css"))
    css_files = [f for f in css_files if not f.endswith('.min.css')]
    print(f"Found {len(css_files)} CSS files to minify")
    
    # Find JavaScript files
    js_files = glob.glob(os.path.join(args.js_dir, "*.js"))
    js_files = [f for f in js_files if not f.endswith('.min.js')]
    print(f"Found {len(js_files)} JavaScript files to minify")
    
    if not css_files and not js_files:
        print("No files found to minify. Exiting.")
        return
    
    # Determine output directories
    css_output_dir = os.path.join(args.output_dir, "css") if args.output_dir else None
    js_output_dir = os.path.join(args.output_dir, "js") if args.output_dir else None
    
    # Minify files in parallel
    print(f"Minifying files with {args.workers} worker processes...")
    css_results = []
    js_results = []
    
    with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as executor:
        # Minify CSS files
        css_futures = [executor.submit(minify_css, css_file, css_output_dir) for css_file in css_files]
        
        # Minify JavaScript files
        js_futures = [executor.submit(minify_js, js_file, js_output_dir) for js_file in js_files]
        
        # Collect CSS results
        for future in concurrent.futures.as_completed(css_futures):
            result = future.result()
            css_results.append(result)
        
        # Collect JS results
        for future in concurrent.futures.as_completed(js_futures):
            result = future.result()
            js_results.append(result)
    
    print("Minification complete!")
    
    # Calculate statistics
    css_original_size = sum(result.get("original_size", 0) for result in css_results if "error" not in result)
    css_minified_size = sum(result.get("minified_size", 0) for result in css_results if "error" not in result)
    css_saved_size = css_original_size - css_minified_size
    
    js_original_size = sum(result.get("original_size", 0) for result in js_results if "error" not in result)
    js_minified_size = sum(result.get("minified_size", 0) for result in js_results if "error" not in result)
    js_saved_size = js_original_size - js_minified_size
    
    total_original_size = css_original_size + js_original_size
    total_minified_size = css_minified_size + js_minified_size
    total_saved_size = css_saved_size + js_saved_size
    
    # Print summary
    print("\n--- Minification Summary ---")
    print(f"CSS files:")
    print(f"  Original size: {format_size(css_original_size)}")
    print(f"  Minified size: {format_size(css_minified_size)}")
    print(f"  Space saved: {format_size(css_saved_size)} ({(css_saved_size / css_original_size) * 100:.2f}% reduction)")
    
    print(f"\nJavaScript files:")
    print(f"  Original size: {format_size(js_original_size)}")
    print(f"  Minified size: {format_size(js_minified_size)}")
    print(f"  Space saved: {format_size(js_saved_size)} ({(js_saved_size / js_original_size) * 100:.2f}% reduction)")
    
    print(f"\nTotal:")
    print(f"  Original size: {format_size(total_original_size)}")
    print(f"  Minified size: {format_size(total_minified_size)}")
    print(f"  Space saved: {format_size(total_saved_size)} ({(total_saved_size / total_original_size) * 100:.2f}% reduction)")
    print("----------------------------")
    
    # Update HTML references if requested
    if args.update_html:
        print("\nUpdating HTML files to reference minified assets...")
        
        # Find HTML files
        html_files = glob.glob(os.path.join(args.html_dir, "*.html"))
        print(f"Found {len(html_files)} HTML files")
        
        # Create mapping of original to minified paths
        minified_files = {}
        
        for result in css_results + js_results:
            if "error" not in result:
                minified_files[result["original_path"]] = result["minified_path"]
        
        # Update HTML files
        updated_count = update_html_references(html_files, minified_files)
        print(f"Updated {updated_count} HTML files")

if __name__ == "__main__":
    main()
