#!/usr/bin/env python3
"""
Simple HTML Combiner for Houston 2025 Travel Guide
This script combines HTML files into one with print CSS.
"""

import os
import re

# Configuration
OUTPUT_DIR = "./output"
PDF_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"

# Create output directory if it doesn't exist
os.makedirs(PDF_DIR, exist_ok=True)

def simple_combine():
    """
    Combine HTML files into one with print CSS.
    """
    print("Étape 1: Combinaison des fichiers HTML...")
    
    # Create a list of HTML files in the correct order
    html_files = []
    
    # Add index
    html_files.append(os.path.join(OUTPUT_DIR, 'index.html'))
    
    # Add main sections
    main_sections = []
    for filename in os.listdir(OUTPUT_DIR):
        if filename.startswith('0') and filename.endswith('.html'):
            main_sections.append(filename)
    
    for filename in sorted(main_sections):
        html_files.append(os.path.join(OUTPUT_DIR, filename))
    
    # Add annexes
    annexes = []
    for filename in os.listdir(OUTPUT_DIR):
        if (filename.startswith('A_') or filename.startswith('B_') or 
            filename.startswith('C_') or filename.startswith('D_') or 
            filename.startswith('E_')) and filename.endswith('.html'):
            annexes.append(filename)
    
    for filename in sorted(annexes):
        html_files.append(os.path.join(OUTPUT_DIR, filename))
    
    # Create a mapping of file paths to IDs for internal links
    file_ids = {}
    
    # Extract titles and create IDs
    for i, html_file in enumerate(html_files):
        basename = os.path.basename(html_file)
        file_ids[basename] = f"section-{i}"
    
    # Create combined HTML file
    combined_html = os.path.join(PDF_DIR, 'combined.html')
    with open(combined_html, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n')
        f.write(f'<title>{TITLE}</title>\n')
        f.write('<meta charset="UTF-8">\n')
        f.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
        
        print("Étape 2: Ajout du CSS pour l'impression...")
        
        # Add simplified CSS that avoids flexbox
        f.write('<style>\n')
        f.write("""
        /* Base styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 20px;
            background-color: white;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #0066cc;
            margin-top: 1em;
            margin-bottom: 0.5em;
        }
        
        h1 {
            font-size: 2em;
            text-align: center;
            border-bottom: 1px solid #0066cc;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        
        h2 {
            font-size: 1.5em;
            border-bottom: 1px solid #dddddd;
            padding-bottom: 5px;
        }
        
        h3 {
            font-size: 1.2em;
        }
        
        p {
            margin-bottom: 1em;
        }
        
        a {
            color: #0066cc;
            text-decoration: none;
        }
        
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1em auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            padding: 8px;
            border: 1px solid #dddddd;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        
        ul, ol {
            margin-bottom: 1em;
            padding-left: 20px;
        }
        
        li {
            margin-bottom: 0.5em;
        }
        
        blockquote {
            border-left: 4px solid #0066cc;
            padding-left: 1em;
            margin-left: 0;
            color: #555;
            font-style: italic;
        }
        
        /* Special sections */
        .checklist {
            background-color: #f8f9fa;
            border-left: 4px solid #28a745;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .important-info {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .alert {
            background-color: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .kids-section {
            background-color: #d1ecf1;
            border: 1px solid #17a2b8;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        /* Hide navigation elements */
        .nav-container, .section-nav, .back-to-top, footer {
            display: none;
        }
        
        /* Cover page */
        .cover-page {
            text-align: center;
            margin: 40% 0 50px 0;
        }
        
        .cover-page h1 {
            font-size: 24pt;
            border: none;
        }
        
        .cover-page img {
            max-width: 80%;
            margin: 2em auto;
        }
        
        .subtitle {
            font-size: 14pt;
            margin: 1em 0;
        }
        
        .date {
            font-size: 12pt;
            margin-top: 2em;
        }
        
        /* Table of contents */
        .toc {
            margin: 20px 0 50px 0;
        }
        
        /* Print-specific styles */
        @media print {
            @page {
                size: A4;
                margin: 2cm;
            }
            
            body {
                font-size: 11pt;
                line-height: 1.4;
            }
            
            h1 {
                page-break-before: always;
            }
            
            h1:first-of-type {
                page-break-before: avoid;
            }
            
            h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            
            p, h2, h3 {
                orphans: 3;
                widows: 3;
            }
            
            table, figure, img, .checklist, .important-info, .alert, .kids-section, blockquote {
                page-break-inside: avoid;
            }
            
            a[href^="http"]::after {
                content: " (" attr(href) ")";
                font-size: 90%;
                color: #666;
            }
            
            a[href^="#"]::after {
                content: "";
            }
        }
        """)
        f.write('</style>\n')
        
        f.write('</head>\n<body>\n')
        
        # Add cover page
        f.write('<div class="cover-page">\n')
        f.write(f'<h1>{TITLE}</h1>\n')
        f.write('<img src="../output/assets/front_page.png" alt="Houston Skyline">\n')
        f.write('<div class="subtitle">Préparé pour votre famille</div>\n')
        f.write('<div class="date">14-24 avril 2025</div>\n')
        f.write('</div>\n')
        
        # Add table of contents
        f.write('<h1>Table des Matières</h1>\n')
        f.write('<div class="toc">\n')
        
        # Separate sections and annexes for TOC
        main_toc_items = []
        annexe_toc_items = []
        
        # Extract titles for TOC
        for i, html_file in enumerate(html_files):
            with open(html_file, 'r', encoding='utf-8') as hf:
                content = hf.read()
                
                # Extract title
                title_match = re.search(r'<title>(.*?)</title>', content)
                if title_match:
                    title = title_match.group(1).replace(f"{TITLE} - ", "")
                    
                    # Add to appropriate TOC section
                    basename = os.path.basename(html_file)
                    toc_item = f'<li><a href="#{file_ids[basename]}">{title}</a></li>'
                    
                    if basename.startswith(('A_', 'B_', 'C_', 'D_', 'E_')):
                        annexe_toc_items.append(toc_item)
                    else:
                        main_toc_items.append(toc_item)
        
        # Write main sections
        f.write('<h2>Sections Principales</h2>\n<ul>\n')
        for item in main_toc_items:
            f.write(item + '\n')
        f.write('</ul>\n')
        
        # Write annexes if any
        if annexe_toc_items:
            f.write('<h2>Annexes</h2>\n<ul>\n')
            for item in annexe_toc_items:
                f.write(item + '\n')
            f.write('</ul>\n')
        
        f.write('</div>\n')
        
        # Add content from each file
        for html_file in html_files:
            basename = os.path.basename(html_file)
            with open(html_file, 'r', encoding='utf-8') as hf:
                content = hf.read()
                
                # Extract the body content
                body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL)
                if body_match:
                    body_content = body_match.group(1)
                    
                    # Remove navigation and footer
                    body_content = re.sub(r'<div class="nav-container">.*?</div>', '', body_content, flags=re.DOTALL)
                    body_content = re.sub(r'<footer>.*?</footer>', '', body_content, flags=re.DOTALL)
                    
                    # Add ID to first h1
                    body_content = re.sub(r'<h1>', f'<h1 id="{file_ids[basename]}">', body_content, count=1)
                    
                    # Fix internal links
                    for link_basename, link_id in file_ids.items():
                        body_content = re.sub(f'href="{link_basename}"', f'href="#{link_id}"', body_content)
                    
                    f.write(body_content)
        
        f.write('</body>\n</html>')
    
    print(f"Fichier HTML combiné créé: {combined_html}")
    print("Pour générer un PDF, ouvrez ce fichier dans un navigateur et utilisez la fonction d'impression.")
    print("Assurez-vous de sélectionner 'Enregistrer au format PDF' comme destination d'impression.")

if __name__ == "__main__":
    simple_combine()
