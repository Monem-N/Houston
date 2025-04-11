#!/usr/bin/env python3
"""
HTML Generator for Houston 2025 Travel Guide - GitHub Pages Version
This script converts the Markdown files to HTML and creates a complete guide
with output directly to the repository root for GitHub Pages.
"""

import os
import re
import shutil
import markdown
from datetime import datetime

# Configuration
REPO_ROOT = "."  # Current directory (repository root)
SOURCE_DIR = "./Houston_Guide/Restructured_Guide"
MAIN_SECTIONS_DIR = f"{SOURCE_DIR}/Main_Sections"
ANNEXES_DIR = f"{SOURCE_DIR}/Annexes"
ASSETS_SOURCE_DIR = f"{SOURCE_DIR}/assets"
ASSETS_DIR = "./assets"  # Output to root assets directory
CSS_FILE = "assets/css/style.css"
PRINT_CSS_FILE = "assets/css/_print.css"
JS_FILE = "assets/script.js"
TITLE = "Guide de Voyage Houston 2025"

def setup_directories():
    """Create necessary directories in the repository root"""
    print("Setting up directories...")
    os.makedirs(f"{ASSETS_DIR}/css", exist_ok=True)
    os.makedirs(f"{ASSETS_DIR}/js", exist_ok=True)
    os.makedirs(f"{ASSETS_DIR}/icons", exist_ok=True)
    
    # Copy assets from source to destination
    print("Copying assets...")
    
    # Copy CSS files
    css_source_dir = f"{ASSETS_SOURCE_DIR}/css"
    css_dest_dir = f"{ASSETS_DIR}/css"
    if os.path.exists(css_source_dir):
        for file in os.listdir(css_source_dir):
            if file.endswith('.css'):
                shutil.copy(f"{css_source_dir}/{file}", f"{css_dest_dir}/{file}")
                print(f"Copied {file} to {css_dest_dir}")
    
    # Copy JavaScript files
    if os.path.exists(f"{ASSETS_SOURCE_DIR}/script.js"):
        shutil.copy(f"{ASSETS_SOURCE_DIR}/script.js", f"{ASSETS_DIR}/script.js")
        print(f"Copied script.js to {ASSETS_DIR}")
    
    # Copy front page image if it exists
    if os.path.exists(f"{ASSETS_SOURCE_DIR}/front_page.png"):
        shutil.copy(f"{ASSETS_SOURCE_DIR}/front_page.png", f"{ASSETS_DIR}/front_page.png")
        print(f"Copied front_page.png to {ASSETS_DIR}")
    
    # Copy icons if they exist
    icons_source_dir = f"{SOURCE_DIR}/output/assets/icons"
    icons_dest_dir = f"{ASSETS_DIR}/icons"
    if os.path.exists(icons_source_dir):
        for file in os.listdir(icons_source_dir):
            if file.endswith('.png'):
                shutil.copy(f"{icons_source_dir}/{file}", f"{icons_dest_dir}/{file}")
                print(f"Copied {file} to {icons_dest_dir}")

def convert_markdown_to_html(content):
    """Convert markdown content to HTML"""
    # Configure Markdown extensions
    md = markdown.Markdown(extensions=[
        'markdown.extensions.extra',
        'markdown.extensions.toc',
        'markdown.extensions.sane_lists',
        'markdown.extensions.nl2br'
    ])
    
    # Convert markdown to HTML
    html = md.convert(content)
    
    # Process checkboxes for interactive functionality
    html = html.replace('<li>[ ]', '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox">')
    html = html.replace('<li>[x]', '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked>')
    
    return html

def generate_nav_links():
    """Generate navigation links for all pages"""
    nav_links = ""
    
    # Add main sections
    for filename in sorted(os.listdir(MAIN_SECTIONS_DIR)):
        if filename.endswith('.md'):
            section_name = ' '.join(filename.split('_')[1:-1]) if '_' in filename else filename[:-3]
            output_filename = filename.replace('.md', '.html')
            nav_links += f'<a href="{output_filename}">{section_name}</a>\n'
    
    # Add annexes
    for filename in sorted(os.listdir(ANNEXES_DIR)):
        if filename.endswith('.md'):
            section_name = f"Annexe {filename.split('_')[0]}"
            output_filename = filename.replace('.md', '.html')
            nav_links += f'<a href="{output_filename}">{section_name}</a>\n'
    
    return nav_links

def create_html_file(output_filename, content, title_suffix=""):
    """Create an HTML file with the given content"""
    html_template = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE}{title_suffix}</title>
    <link rel="stylesheet" href="{CSS_FILE}">
    <link rel="stylesheet" href="{PRINT_CSS_FILE}" media="print">
    <script src="{JS_FILE}"></script>
</head>
<body>
    <a href="#main-content" class="skip-to-content">Aller au contenu principal</a>
    <div class="nav-container">
        <a href="index.html">Accueil</a>
        {generate_nav_links()}
    </div>

    <main id="main-content">
        {content}
    </main>

    <footer>
        <p>Guide de Voyage Houston 2025 | Généré le {datetime.now().strftime("%d/%m/%Y %H:%M")}</p>
    </footer>
</body>
</html>
"""
    
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"Created {output_filename}")

def create_manifest_file():
    """Create a manifest.json file for PWA support"""
    manifest = """{
  "name": "Guide de Voyage Houston 2025",
  "short_name": "Houston 2025",
  "description": "Guide complet pour le voyage à Houston et le FIRST Championship 2025",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0066cc",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}"""
    
    with open("manifest.json", 'w', encoding='utf-8') as f:
        f.write(manifest)
    
    print("Created manifest.json")

def create_service_worker():
    """Create a service worker for offline support"""
    service_worker = """// Service Worker for Houston 2025 Travel Guide

const CACHE_NAME = 'houston-guide-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/css/_base.css',
  '/assets/css/_typography.css',
  '/assets/css/_layout.css',
  '/assets/css/_tables.css',
  '/assets/css/_images.css',
  '/assets/css/_special.css',
  '/assets/css/_print.css',
  '/assets/script.js',
  '/assets/front_page.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
"""
    
    with open("service-worker.js", 'w', encoding='utf-8') as f:
        f.write(service_worker)
    
    print("Created service-worker.js")

def main():
    """Main function to generate HTML files"""
    print("Starting HTML generation for GitHub Pages...")
    
    # Set up directories and copy assets
    setup_directories()
    
    # Create index.html from index.md if it exists, otherwise create a simple index
    if os.path.exists(f"{SOURCE_DIR}/index.md"):
        with open(f"{SOURCE_DIR}/index.md", 'r', encoding='utf-8') as f:
            index_content = f.read()
        
        index_html = convert_markdown_to_html(index_content)
        create_html_file("index.html", index_html)
    else:
        # Create a simple index page
        index_html = f"""
        <h1>Guide de Voyage Houston 2025</h1>
        <p>Bienvenue dans le guide complet pour votre voyage à Houston et le FIRST Championship 2025.</p>
        
        <h2>Sections principales</h2>
        <ul>
            {''.join([f'<li><a href="{filename.replace(".md", ".html")}">{" ".join(filename.split("_")[1:-1])}</a></li>' 
                     for filename in sorted(os.listdir(MAIN_SECTIONS_DIR)) if filename.endswith('.md')])}
        </ul>
        
        <h2>Annexes</h2>
        <ul>
            {''.join([f'<li><a href="{filename.replace(".md", ".html")}">Annexe {filename.split("_")[0]}</a></li>' 
                     for filename in sorted(os.listdir(ANNEXES_DIR)) if filename.endswith('.md')])}
        </ul>
        """
        create_html_file("index.html", index_html)
    
    # Process main sections
    for filename in os.listdir(MAIN_SECTIONS_DIR):
        if filename.endswith('.md'):
            with open(os.path.join(MAIN_SECTIONS_DIR, filename), 'r', encoding='utf-8') as f:
                content = f.read()
            
            html_content = convert_markdown_to_html(content)
            output_filename = filename.replace('.md', '.html')
            title_suffix = f" - {' '.join(filename.split('_')[1:-1])}" if '_' in filename else f" - {filename[:-3]}"
            
            create_html_file(output_filename, html_content, title_suffix)
    
    # Process annexes
    for filename in os.listdir(ANNEXES_DIR):
        if filename.endswith('.md'):
            with open(os.path.join(ANNEXES_DIR, filename), 'r', encoding='utf-8') as f:
                content = f.read()
            
            html_content = convert_markdown_to_html(content)
            output_filename = filename.replace('.md', '.html')
            title_suffix = f" - Annexe {filename.split('_')[0]}"
            
            create_html_file(output_filename, html_content, title_suffix)
    
    # Create PWA files
    create_manifest_file()
    create_service_worker()
    
    print("HTML generation complete. Files saved to repository root.")
    print("Push these changes to GitHub to update your website.")

if __name__ == "__main__":
    main()
