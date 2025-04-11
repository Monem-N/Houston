#!/usr/bin/env python3
"""
Print-optimized PDF Generator for Houston 2025 Travel Guide
This script creates a PDF from the existing HTML files with print-specific styling.
"""

import os
import re
from weasyprint import HTML, CSS

# Configuration
OUTPUT_DIR = "./output"
PDF_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"
PRINT_CSS = "./assets/print.css"

# Create output directory if it doesn't exist
os.makedirs(PDF_DIR, exist_ok=True)

def generate_print_pdf():
    """Generate a print-optimized PDF from the existing HTML files."""
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

        # Include print CSS
        f.write('<style>\n')
        with open(PRINT_CSS, 'r', encoding='utf-8') as css_file:
            f.write(css_file.read())
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
        f.write('<div class="toc">\n<ul>\n')

        # Extract titles from each file
        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as hf:
                content = hf.read()

                # Extract title
                title_match = re.search(r'<title>(.*?)</title>', content)
                if title_match:
                    title = title_match.group(1).replace(f"{TITLE} - ", "")

                    # For index page
                    if html_file.endswith('index.html'):
                        title = "Introduction"
                        title_id = "introduction"
                    # For section pages
                    elif re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file):
                        section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file)
                        title_id = section_match.group(2).lower().replace("_", "-")
                    # For annexe pages
                    elif re.match(r'.*?/([A-E])_([^/]+)\.html', html_file):
                        annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', html_file)
                        title_id = annexe_match.group(2).lower().replace("_", "-")
                    else:
                        # Create sanitized ID from title as fallback
                        title_id = title.lower().replace(" ", "-")
                        title_id = re.sub(r'[^a-z0-9-]', '', title_id)

                    f.write(f'<li><a href="#{title_id}">{title}</a></li>\n')

        f.write('</ul>\n</div>\n')

        # Add page break
        f.write('<div class="page-break"></div>\n')

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

                    # Extract title and filename to create consistent IDs
                    title_match = re.search(r'<title>(.*?)</title>', content)
                    if title_match:
                        title = title_match.group(1).replace(f"{TITLE} - ", "")

                        # For index page
                        if html_file.endswith('index.html'):
                            title = "Introduction"
                            title_id = "introduction"
                        # For section pages
                        elif re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file):
                            section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file)
                            title_id = section_match.group(2).lower().replace("_", "-")
                        # For annexe pages
                        elif re.match(r'.*?/([A-E])_([^/]+)\.html', html_file):
                            annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', html_file)
                            title_id = annexe_match.group(2).lower().replace("_", "-")
                        else:
                            # Create sanitized ID from title as fallback
                            title_id = title.lower().replace(" ", "-")
                            title_id = re.sub(r'[^a-z0-9-]', '', title_id)

                        # Add ID to first h1
                        body_content = re.sub(r'<h1>', f'<h1 id="{title_id}">', body_content, count=1)

                    # Fix internal links
                    # Convert section links (e.g., 01_Introduction.html) to anchor links (#introduction)
                    body_content = re.sub(r'href="([0-9]+)_([^"]+)\.html"',
                                         lambda m: f'href="#{m.group(2).lower().replace("_", "-")}"',
                                         body_content)

                    # Convert annexe links (e.g., A_Transport_Maps.html) to anchor links (#transport-maps)
                    body_content = re.sub(r'href="([A-E])_([^"]+)\.html"',
                                         lambda m: f'href="#{m.group(2).lower().replace("_", "-")}"',
                                         body_content)

                    # Fix index link
                    body_content = re.sub(r'href="index\.html"', r'href="#introduction"', body_content)

                    # Fix links to sections with underscores in their names
                    body_content = re.sub(r'id="([^"]+)_([^"]+)"', r'id="\1-\2"', body_content)

                    f.write(body_content)

        f.write('</body>\n</html>')

    # Convert to PDF
    pdf_file = os.path.join(PDF_DIR, 'Guide_Voyage_Houston_2025.pdf')
    HTML(combined_html).write_pdf(
        pdf_file,
        stylesheets=[CSS(PRINT_CSS)]
    )

    print(f"Print-optimized PDF generated: {pdf_file}")

if __name__ == "__main__":
    generate_print_pdf()
