#!/usr/bin/env python3
"""
CSS Analyzer for Houston 2025 Travel Guide
This script analyzes CSS files and identifies unused CSS rules
"""

import os
import re
import glob
from bs4 import BeautifulSoup
import argparse
import json

def extract_css_selectors(css_content):
    """
    Extract CSS selectors from CSS content
    
    Args:
        css_content: CSS content as string
        
    Returns:
        list: List of CSS selectors
    """
    # Remove comments
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    
    # Find all selectors
    selectors = []
    
    # Match selectors followed by opening brace
    matches = re.finditer(r'([^{]+)(?=\s*{)', css_content)
    
    for match in matches:
        selector = match.group(1).strip()
        
        # Skip @media, @keyframes, etc.
        if selector.startswith('@'):
            continue
        
        # Split multiple selectors (comma-separated)
        for s in selector.split(','):
            s = s.strip()
            if s:
                selectors.append(s)
    
    return selectors

def extract_html_classes_ids(html_content):
    """
    Extract classes and IDs from HTML content
    
    Args:
        html_content: HTML content as string
        
    Returns:
        tuple: (classes, ids)
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract classes
    classes = set()
    for element in soup.find_all(class_=True):
        for cls in element['class']:
            classes.add(cls)
    
    # Extract IDs
    ids = set()
    for element in soup.find_all(id=True):
        ids.add(element['id'])
    
    return classes, ids

def is_selector_used(selector, classes, ids, tags):
    """
    Check if a CSS selector is used in HTML
    
    Args:
        selector: CSS selector
        classes: Set of HTML classes
        ids: Set of HTML IDs
        tags: Set of HTML tags
        
    Returns:
        bool: True if selector is used, False otherwise
    """
    # Simplify selector for basic matching
    # This is a simplified approach and won't catch all cases
    
    # Class selectors
    class_match = re.search(r'\.([a-zA-Z0-9_-]+)', selector)
    if class_match and class_match.group(1) not in classes:
        return False
    
    # ID selectors
    id_match = re.search(r'#([a-zA-Z0-9_-]+)', selector)
    if id_match and id_match.group(1) not in ids:
        return False
    
    # Tag selectors
    tag_match = re.search(r'^([a-zA-Z0-9_-]+)', selector)
    if tag_match and tag_match.group(1) not in tags and tag_match.group(1) != '*':
        return False
    
    # If we can't determine, assume it's used
    return True

def analyze_css(css_files, html_files):
    """
    Analyze CSS files and identify unused selectors
    
    Args:
        css_files: List of CSS files
        html_files: List of HTML files
        
    Returns:
        dict: Analysis results
    """
    # Extract HTML classes, IDs, and tags
    all_classes = set()
    all_ids = set()
    all_tags = set()
    
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        classes, ids = extract_html_classes_ids(html_content)
        all_classes.update(classes)
        all_ids.update(ids)
        
        # Extract tags
        soup = BeautifulSoup(html_content, 'html.parser')
        for tag in soup.find_all():
            all_tags.add(tag.name)
    
    # Analyze CSS files
    results = {}
    
    for css_file in css_files:
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content = f.read()
        
        selectors = extract_css_selectors(css_content)
        
        used_selectors = []
        unused_selectors = []
        
        for selector in selectors:
            if is_selector_used(selector, all_classes, all_ids, all_tags):
                used_selectors.append(selector)
            else:
                unused_selectors.append(selector)
        
        results[css_file] = {
            'total_selectors': len(selectors),
            'used_selectors': len(used_selectors),
            'unused_selectors': len(unused_selectors),
            'unused_percentage': (len(unused_selectors) / len(selectors)) * 100 if selectors else 0,
            'unused_selector_list': unused_selectors
        }
    
    return results

def generate_optimized_css(css_file, unused_selectors):
    """
    Generate optimized CSS by removing unused selectors
    
    Args:
        css_file: CSS file path
        unused_selectors: List of unused selectors
        
    Returns:
        str: Optimized CSS content
    """
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # Remove unused selectors
    for selector in unused_selectors:
        # Escape special characters for regex
        escaped_selector = re.escape(selector)
        
        # Remove the selector and its rules
        pattern = rf'{escaped_selector}\s*{{[^}}]*}}'
        css_content = re.sub(pattern, '', css_content)
    
    # Clean up empty media queries
    css_content = re.sub(r'@media[^{]*{\s*}', '', css_content)
    
    # Remove multiple empty lines
    css_content = re.sub(r'\n\s*\n', '\n\n', css_content)
    
    return css_content

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Analyze CSS files and identify unused CSS rules")
    parser.add_argument("--css-dir", default="assets/css", help="Directory containing CSS files")
    parser.add_argument("--html-dir", default=".", help="Directory containing HTML files")
    parser.add_argument("--output", "-o", help="Output JSON file for analysis results")
    parser.add_argument("--optimize", action="store_true", help="Generate optimized CSS files")
    parser.add_argument("--optimize-dir", default="assets/css/optimized", help="Directory for optimized CSS files")
    
    args = parser.parse_args()
    
    # Find CSS files
    css_files = glob.glob(os.path.join(args.css_dir, "*.css"))
    print(f"Found {len(css_files)} CSS files")
    
    # Find HTML files
    html_files = glob.glob(os.path.join(args.html_dir, "*.html"))
    print(f"Found {len(html_files)} HTML files")
    
    if not css_files:
        print("No CSS files found. Exiting.")
        return
    
    if not html_files:
        print("No HTML files found. Exiting.")
        return
    
    # Analyze CSS
    print("Analyzing CSS files...")
    results = analyze_css(css_files, html_files)
    
    # Print summary
    print("\n--- Analysis Summary ---")
    total_selectors = sum(result['total_selectors'] for result in results.values())
    total_unused = sum(result['unused_selectors'] for result in results.values())
    
    print(f"Total CSS selectors: {total_selectors}")
    print(f"Unused CSS selectors: {total_unused} ({(total_unused / total_selectors) * 100:.2f}%)")
    
    for css_file, result in results.items():
        print(f"\n{os.path.basename(css_file)}:")
        print(f"  Total selectors: {result['total_selectors']}")
        print(f"  Unused selectors: {result['unused_selectors']} ({result['unused_percentage']:.2f}%)")
    
    # Save results to JSON
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        print(f"\nAnalysis results saved to {args.output}")
    
    # Generate optimized CSS
    if args.optimize:
        print("\nGenerating optimized CSS files...")
        os.makedirs(args.optimize_dir, exist_ok=True)
        
        for css_file, result in results.items():
            if result['unused_selectors'] > 0:
                optimized_css = generate_optimized_css(css_file, result['unused_selector_list'])
                
                output_file = os.path.join(args.optimize_dir, os.path.basename(css_file))
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(optimized_css)
                
                original_size = os.path.getsize(css_file)
                optimized_size = len(optimized_css.encode('utf-8'))
                saved_percentage = ((original_size - optimized_size) / original_size) * 100
                
                print(f"  {os.path.basename(css_file)}: {saved_percentage:.2f}% smaller")
        
        print(f"\nOptimized CSS files saved to {args.optimize_dir}")

if __name__ == "__main__":
    main()
