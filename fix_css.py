#!/usr/bin/env python3
"""
CSS Fixer for Houston Guide GitHub Pages
This script ensures all CSS files are properly copied to the assets/css directory.
"""

import os
import shutil
from pathlib import Path

# Configuration
SOURCE_DIR = "./Houston_Guide/Restructured_Guide"
SOURCE_CSS_DIRS = [
    f"{SOURCE_DIR}/assets/css",
    f"{SOURCE_DIR}/output/assets/css",
    "./Houston_Guide/assets/css",
    "./Houston_Guide/css"
]
DEST_CSS_DIR = "./assets/css"

def main():
    """Main function to fix CSS files"""
    print("Starting CSS fix for GitHub Pages...")
    
    # Create destination directory if it doesn't exist
    os.makedirs(DEST_CSS_DIR, exist_ok=True)
    
    # Track how many files we've copied
    copied_files = 0
    
    # Check each potential source directory
    for source_dir in SOURCE_CSS_DIRS:
        if os.path.exists(source_dir):
            print(f"Checking source directory: {source_dir}")
            
            # Copy all CSS files from this directory
            for file in os.listdir(source_dir):
                if file.endswith('.css'):
                    source_file = os.path.join(source_dir, file)
                    dest_file = os.path.join(DEST_CSS_DIR, file)
                    
                    # Copy the file
                    shutil.copy2(source_file, dest_file)
                    print(f"Copied {file} to {DEST_CSS_DIR}")
                    copied_files += 1
    
    # Check if we have the main CSS files
    essential_files = ['style.css', '_base.css', '_typography.css', '_layout.css']
    missing_files = []
    
    for file in essential_files:
        if not os.path.exists(os.path.join(DEST_CSS_DIR, file)):
            missing_files.append(file)
    
    # If we're missing essential files, create basic versions
    if missing_files:
        print(f"Missing essential CSS files: {', '.join(missing_files)}")
        print("Creating basic versions...")
        
        if 'style.css' in missing_files:
            with open(os.path.join(DEST_CSS_DIR, 'style.css'), 'w') as f:
                f.write("""/* Houston 2025 Travel Guide - Main Style Sheet */

/* Import modular CSS files */
@import url('_base.css');
@import url('_typography.css');
@import url('_layout.css');
@import url('_tables.css');
@import url('_images.css');
@import url('_special.css');

/* Print styles are imported with media query in the HTML */
/* @import url('_print.css') print; */
""")
            print("Created style.css")
            copied_files += 1
        
        if '_base.css' in missing_files:
            with open(os.path.join(DEST_CSS_DIR, '_base.css'), 'w') as f:
                f.write("""/* Base styles for Houston 2025 Travel Guide */

:root {
  --primary-color: #0066cc;
  --secondary-color: #ff9900;
  --accent-color: #e63946;
  --text-color: #333333;
  --light-bg: #f5f5f5;
  --border-color: #dddddd;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --info-color: #17a2b8;
  --font-main: 'Helvetica Neue', Arial, sans-serif;
  --font-headings: 'Georgia', serif;
  --box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  --border-radius: 5px;
}

/* Reset and global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  color: var(--text-color);
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  font-size: 16px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem 0;
}

/* Skip to content link for accessibility */
.skip-to-content {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.skip-to-content:focus {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  padding: 10px;
  background: var(--primary-color);
  color: white;
  z-index: 9999;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  body {
    padding: 10px;
  }
}
""")
            print("Created _base.css")
            copied_files += 1
        
        if '_typography.css' in missing_files:
            with open(os.path.join(DEST_CSS_DIR, '_typography.css'), 'w') as f:
                f.write("""/* Typography styles for Houston 2025 Travel Guide */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-headings);
  margin: 1.5rem 0 1rem;
  line-height: 1.2;
  color: var(--text-color);
}

h1 {
  font-size: 2.2rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.3rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.3rem;
}

h5 {
  font-size: 1.1rem;
}

h6 {
  font-size: 1rem;
  font-style: italic;
}

p {
  margin-bottom: 1rem;
}

ul, ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
}

blockquote {
  border-left: 4px solid var(--primary-color);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--text-secondary);
  font-style: italic;
}

code {
  font-family: monospace;
  background-color: var(--light-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

pre {
  background-color: var(--light-bg);
  padding: 1rem;
  border-radius: var(--border-radius);
  overflow-x: auto;
  margin: 1rem 0;
}

pre code {
  padding: 0;
  background-color: transparent;
}

hr {
  border: 0;
  border-top: 1px solid var(--border-color);
  margin: 2rem 0;
}

/* Task lists */
.task-list-item {
  list-style-type: none;
  margin-left: -1.5rem;
}

.task-list-item-checkbox {
  margin-right: 0.5rem;
}

/* Emphasis */
strong {
  font-weight: bold;
}

em {
  font-style: italic;
}

/* Links */
a:visited {
  color: #551a8b;
}

a:active {
  color: #ee0000;
}
""")
            print("Created _typography.css")
            copied_files += 1
        
        if '_layout.css' in missing_files:
            with open(os.path.join(DEST_CSS_DIR, '_layout.css'), 'w') as f:
                f.write("""/* Layout styles for Houston 2025 Travel Guide */

/* Navigation */
.nav-container {
  background-color: var(--primary-color);
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-container a {
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: background-color 0.3s;
}

.nav-container a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

/* Main content */
main {
  min-height: 70vh;
  background-color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/* Sections */
.section {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.section:last-child {
  border-bottom: none;
}

/* Cards */
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  box-shadow: var(--box-shadow);
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

/* Alerts */
.alert {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: var(--border-radius);
  border-left: 4px solid;
}

.alert-info {
  background-color: #e8f4f8;
  border-left-color: var(--info-color);
}

.alert-warning {
  background-color: #fff8e6;
  border-left-color: var(--warning-color);
}

.alert-danger {
  background-color: #f8e8e8;
  border-left-color: var(--danger-color);
}

.alert-success {
  background-color: #e8f8e8;
  border-left-color: var(--success-color);
}

/* Footer */
footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Responsive layout */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-container a {
    display: block;
    text-align: center;
  }
}
""")
            print("Created _layout.css")
            copied_files += 1
        
        # Create additional CSS files if needed
        if not os.path.exists(os.path.join(DEST_CSS_DIR, '_tables.css')):
            with open(os.path.join(DEST_CSS_DIR, '_tables.css'), 'w') as f:
                f.write("""/* Table styles for Houston 2025 Travel Guide */

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  overflow-x: auto;
  display: block;
}

@media (min-width: 768px) {
  table {
    display: table;
  }
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid var(--border-color);
}

th {
  background-color: var(--light-bg);
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

/* Responsive tables */
.table-responsive {
  overflow-x: auto;
  margin-bottom: 1rem;
}
""")
            print("Created _tables.css")
            copied_files += 1
        
        if not os.path.exists(os.path.join(DEST_CSS_DIR, '_images.css')):
            with open(os.path.join(DEST_CSS_DIR, '_images.css'), 'w') as f:
                f.write("""/* Image styles for Houston 2025 Travel Guide */

.image-container {
  margin: 1.5rem 0;
}

.image-caption {
  text-align: center;
  font-style: italic;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.image-small {
  max-width: 300px;
  margin: 0 auto;
}

.image-medium {
  max-width: 500px;
  margin: 0 auto;
}

.image-large {
  max-width: 800px;
  margin: 0 auto;
}

.image-full {
  width: 100%;
}

.image-left {
  float: left;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  max-width: 40%;
}

.image-right {
  float: right;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  max-width: 40%;
}

.image-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.image-gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius);
  transition: transform 0.3s;
}

.image-gallery img:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .image-left, .image-right {
    float: none;
    margin: 1rem auto;
    max-width: 100%;
  }
  
  .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
""")
            print("Created _images.css")
            copied_files += 1
        
        if not os.path.exists(os.path.join(DEST_CSS_DIR, '_special.css')):
            with open(os.path.join(DEST_CSS_DIR, '_special.css'), 'w') as f:
                f.write("""/* Special styles for Houston 2025 Travel Guide */

/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
}

.back-to-top:hover {
  background-color: var(--primary-dark);
}

/* Print button */
.print-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.print-button:hover {
  background-color: var(--primary-dark);
}

/* Highlight sections */
.highlight {
  background-color: #fffde7;
  padding: 1rem;
  border-left: 4px solid var(--accent-color);
  margin: 1rem 0;
}

/* Important notes */
.important-note {
  background-color: #fff8e1;
  border: 1px solid #ffecb3;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
}

.important-note::before {
  content: "⚠️ Important";
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: #f57c00;
}

/* Tips */
.tip {
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
}

.tip::before {
  content: "💡 Tip";
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: #388e3c;
}

/* Language indicators */
.lang-indicator {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-left: 0.5rem;
}

/* Map container */
.map-container {
  height: 400px;
  margin: 1rem 0;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

/* Collapsible sections */
.collapsible {
  background-color: var(--light-bg);
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 0.5rem;
  position: relative;
}

.collapsible:after {
  content: '+';
  font-weight: bold;
  float: right;
}

.active:after {
  content: '-';
}

.collapsible-content {
  padding: 0 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: white;
}

.active + .collapsible-content {
  max-height: 1000px;
}
""")
            print("Created _special.css")
            copied_files += 1
        
        if not os.path.exists(os.path.join(DEST_CSS_DIR, '_print.css')):
            with open(os.path.join(DEST_CSS_DIR, '_print.css'), 'w') as f:
                f.write("""/* Print styles for Houston 2025 Travel Guide */

@media print {
  body {
    font-size: 12pt;
    line-height: 1.4;
    color: #000;
    background: #fff;
    margin: 0;
    padding: 0;
  }
  
  .nav-container, .back-to-top, .print-button, .skip-to-content {
    display: none !important;
  }
  
  a {
    color: #000;
    text-decoration: underline;
  }
  
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 90%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  img {
    max-width: 100% !important;
    page-break-inside: avoid;
  }
  
  table, figure {
    page-break-inside: avoid;
  }
  
  @page {
    margin: 2cm;
  }
  
  main {
    box-shadow: none;
  }
  
  .card {
    border: 1px solid #ddd;
    box-shadow: none;
  }
  
  .collapsible-content {
    max-height: none !important;
    display: block !important;
  }
  
  .collapsible:after {
    display: none;
  }
  
  /* Add page breaks before major sections */
  h1 {
    page-break-before: always;
  }
  
  /* First h1 should not have a page break */
  h1:first-of-type {
    page-break-before: avoid;
  }
}
""")
            print("Created _print.css")
            copied_files += 1
    
    # Summary
    if copied_files > 0:
        print(f"\nSuccessfully copied/created {copied_files} CSS files.")
        print("Now commit and push these changes to GitHub:")
        print("git add assets/")
        print('git commit -m "Fix CSS files for GitHub Pages"')
        print("git push")
    else:
        print("\nNo CSS files were copied or created. Please check your directory structure.")

if __name__ == "__main__":
    main()
