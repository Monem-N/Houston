#!/usr/bin/env python3
"""
Update HTML files for PWA support
This script adds manifest and service worker references to all HTML files.
"""

import os
import re

# Configuration
OUTPUT_DIR = "./output"

def update_html_files():
    """
    Update all HTML files to include manifest and service worker references.
    """
    print("Updating HTML files for PWA support...")
    
    # Get all HTML files
    html_files = []
    for filename in os.listdir(OUTPUT_DIR):
        if filename.endswith('.html'):
            html_files.append(os.path.join(OUTPUT_DIR, filename))
    
    # Update each HTML file
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add manifest link if not already present
        if '<link rel="manifest"' not in content:
            content = content.replace('</head>', 
                '    <link rel="manifest" href="manifest.json">\n    <meta name="theme-color" content="#0066cc">\n</head>')
        
        # Add service worker registration if not already present
        if 'serviceWorker' not in content:
            service_worker_script = """
    <script>
        // Register service worker for offline support
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    </script>
</body>
"""
            content = content.replace('</body>', service_worker_script)
        
        # Write updated content back to file
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated {html_file}")
    
    print("All HTML files updated successfully.")

if __name__ == "__main__":
    update_html_files()
