#!/usr/bin/env python3
"""
HTML-based PDF Generator for Houston 2025 Travel Guide
This script creates a PDF by combining existing HTML files.
"""

import os
import re
from weasyprint import HTML, CSS

# Configuration
OUTPUT_DIR = "./output"
PDF_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"

# Create output directory if it doesn't exist
os.makedirs(PDF_DIR, exist_ok=True)

def generate_html_pdf():
    """Generate a PDF from existing HTML files."""
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

    # Create combined HTML file
    combined_html = os.path.join(PDF_DIR, 'print_version.html')
    with open(combined_html, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n')
        f.write(f'<title>{TITLE}</title>\n')
        f.write('<meta charset="UTF-8">\n')

        # Include print-specific CSS
        f.write('<style>\n')

        # First, include the main CSS file
        with open(os.path.join('assets', 'style.css'), 'r', encoding='utf-8') as css_file:
            f.write(css_file.read())

        # Then add print-specific overrides
        f.write("""
        /* Print-specific overrides */
        @page {
            size: A4;
            margin: 2cm;
            @bottom-center {
                content: "Page " counter(page);
                font-family: var(--font-main);
                font-size: 10pt;
            }
        }

        @page :first {
            @bottom-center {
                content: normal;
            }
        }

        body {
            font-size: 11pt;
            line-height: 1.4;
            color: black;
            background: white;
            margin: 0;
            padding: 0;
            max-width: none;
        }

        h1 {
            page-break-before: always;
            font-size: 18pt;
            text-align: center;
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

        table, figure, img, .checklist, .important-info, .alert, .kids-section, .personal-notes, blockquote {
            page-break-inside: avoid;
        }

        /* Hide navigation elements */
        .nav-container, .section-nav, .back-to-top, footer {
            display: none;
        }

        /* Links */
        a {
            color: var(--primary-color);
            text-decoration: none;
        }

        a[href^="http"]::after {
            content: " (" attr(href) ")";
            font-size: 90%;
            color: #666;
        }

        a[href^="#"]::after {
            content: "";
        }

        /* Cover page */
        .cover-page {
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            page-break-after: always;
        }

        .cover-page h1 {
            font-size: 24pt;
            border: none;
            margin-bottom: 2cm;
        }

        .cover-page img {
            max-width: 80%;
            margin: 2em auto;
        }

        .cover-page .subtitle {
            font-size: 14pt;
            margin: 1em 0;
        }

        .cover-page .date {
            font-size: 12pt;
            margin-top: 2em;
        }

        /* Table of contents */
        .toc {
            page-break-after: always;
        }

        /* Ensure special sections maintain their styling */
        .checklist, .important-info, .alert, .kids-section, .personal-notes {
            margin: 1em 0;
            padding: 0.5em 1em;
        }

        /* Ensure activity labels maintain their styling */
        .activity-label {
            display: inline-block;
            padding: 2pt 5pt;
            border-radius: 5pt;
            margin: 2pt 0;
        }

        /* Ensure images are properly sized */
        img {
            max-width: 100%;
            height: auto;
        }

        .small-image {
            max-width: 300px;
        }

        .medium-image {
            max-width: 500px;
        }

        .large-image {
            max-width: 700px;
        }

        /* Thematic index */
        .thematic-index {
            column-count: 1;
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

        # Create a mapping of file paths to IDs for internal links
        file_ids = {}

        # Separate sections and annexes for TOC
        main_toc_items = []
        annexe_toc_items = []

        # Extract titles and create IDs
        for i, html_file in enumerate(html_files):
            with open(html_file, 'r', encoding='utf-8') as hf:
                content = hf.read()

                # Extract title
                title_match = re.search(r'<title>(.*?)</title>', content)
                if title_match:
                    title = title_match.group(1).replace(f"{TITLE} - ", "")

                    # Create a unique ID for this file
                    file_id = f"section-{i}"
                    file_ids[html_file] = file_id

                    # Add to appropriate TOC section
                    toc_item = f'<li><a href="#{file_id}">{title}</a></li>'

                    if os.path.basename(html_file).startswith(('A_', 'B_', 'C_', 'D_', 'E_')):
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
                    body_content = re.sub(r'<h1>', f'<h1 id="{file_ids[html_file]}">', body_content, count=1)

                    # Fix internal links to point to the correct sections in the combined document
                    for target_file, target_id in file_ids.items():
                        target_filename = os.path.basename(target_file)
                        body_content = re.sub(f'href="{target_filename}"', f'href="#{target_id}"', body_content)

                    f.write(body_content)

        f.write('</body>\n</html>')

    # Convert to PDF
    pdf_file = os.path.join(PDF_DIR, 'Guide_Voyage_Houston_2025.pdf')
    HTML(combined_html).write_pdf(pdf_file)

    print(f"PDF generated from HTML: {pdf_file}")

if __name__ == "__main__":
    generate_html_pdf()
