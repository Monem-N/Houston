#!/usr/bin/env python3
"""
PDF Generator for Houston 2025 Travel Guide
This script converts the HTML files to PDF and creates a complete guide.
Requires: weasyprint
"""

import os
import re
from weasyprint import HTML, CSS
from datetime import datetime

# Configuration
INPUT_DIR = "./output"
OUTPUT_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"
AUTHOR = "Voyage Houston 2025"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Function to generate PDF from HTML file
def html_to_pdf(html_file, pdf_file):
    # Create PDF
    HTML(html_file).write_pdf(
        pdf_file,
        stylesheets=[CSS(os.path.join(INPUT_DIR, 'assets/style.css'))],
        presentational_hints=True
    )

# Generate individual PDFs
def generate_individual_pdfs():
    for filename in os.listdir(INPUT_DIR):
        if filename.endswith('.html') and filename != 'index.html':
            html_file = os.path.join(INPUT_DIR, filename)
            pdf_file = os.path.join(OUTPUT_DIR, filename.replace('.html', '.pdf'))
            html_to_pdf(html_file, pdf_file)
            print(f"Generated {pdf_file}")

# Generate complete PDF
def generate_complete_pdf():
    # Create a list of HTML files in the correct order
    html_files = []

    # Add index
    html_files.append(os.path.join(INPUT_DIR, 'index.html'))

    # Add main sections
    main_sections = []
    for filename in os.listdir(INPUT_DIR):
        if filename.startswith('0') and filename.endswith('.html'):
            main_sections.append(filename)

    for filename in sorted(main_sections):
        html_files.append(os.path.join(INPUT_DIR, filename))

    # Add annexes
    annexes = []
    for filename in os.listdir(INPUT_DIR):
        if filename.startswith('A_') or filename.startswith('B_') or \
           filename.startswith('C_') or filename.startswith('D_') or \
           filename.startswith('E_'):
            annexes.append(filename)

    for filename in sorted(annexes):
        html_files.append(os.path.join(INPUT_DIR, filename))

    # Create complete HTML file
    complete_html = os.path.join(OUTPUT_DIR, 'complete.html')
    with open(complete_html, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n')
        f.write(f'<title>{TITLE}</title>\n')
        f.write('<meta charset="UTF-8">\n')
        f.write('<style>\n')

        # Add page breaks between sections
        f.write('@page { size: A4; margin: 2cm; }\n')
        f.write('h1 { page-break-before: always; }\n')
        f.write('h1:first-of-type { page-break-before: avoid; }\n')
        f.write('table { page-break-inside: avoid; }\n')
        f.write('.image-container { page-break-inside: avoid; }\n')
        f.write('blockquote { page-break-inside: avoid; }\n')
        f.write('.checklist, .important-info, .alert, .kids-section { page-break-inside: avoid; }\n')

        # Optimize for print
        f.write('@page { @bottom-center { content: "Page " counter(page); } }\n')
        f.write('@page :first { @bottom-center { content: normal; } }\n')
        f.write('a { color: #0066cc; text-decoration: none; }\n')
        f.write('a[href^="#"] { color: #ff9900; }\n')

        # Include CSS
        with open(os.path.join(INPUT_DIR, 'assets/style.css'), 'r', encoding='utf-8') as css_file:
            f.write(css_file.read())

        f.write('</style>\n')
        f.write('</head>\n<body>\n')

        # Add cover page
        f.write(f'<div style="text-align: center; margin-top: 40%;">\n')
        f.write(f'<h1 style="font-size: 3em; border: none;">{TITLE}</h1>\n')
        f.write(f'<p style="font-size: 1.5em; margin-top: 2em;">Préparé pour votre famille</p>\n')
        f.write(f'<p style="font-size: 1.2em; margin-top: 1em;">14-24 avril 2025</p>\n')
        f.write(f'<p style="font-size: 1em; margin-top: 5em;">Généré le {datetime.now().strftime("%d/%m/%Y")}</p>\n')
        f.write('</div>\n')

        # Add table of contents
        f.write('<h1 style="page-break-before: always;">Table des Matières</h1>\n')
        f.write('<div class="toc">\n<ul>\n')

        # Extract headings from each file
        toc_entries = []

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
                        toc_entries.append(f'<li><a href="#introduction">{title}</a></li>\n')
                    # For section pages
                    elif re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file):
                        section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file)
                        section_id = section_match.group(2).lower().replace("_", "-")
                        toc_entries.append(f'<li><a href="#{section_id}">{title}</a></li>\n')
                    # For annexe pages
                    elif re.match(r'.*?/([A-E])_([^/]+)\.html', html_file):
                        annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', html_file)
                        annexe_id = annexe_match.group(2).lower().replace("_", "-")
                        toc_entries.append(f'<li><a href="#{annexe_id}">{title}</a></li>\n')
                    else:
                        toc_entries.append(f'<li><a href="#{title.lower().replace(" ", "-")}">{title}</a></li>\n')

                    # Extract subheadings (h2)
                    h2_matches = re.findall(r'<h2>(.*?)</h2>', content)
                    for h2 in h2_matches:
                        # Clean up any HTML tags in the heading
                        h2_clean = re.sub(r'<.*?>', '', h2)
                        toc_entries.append(f'<li style="margin-left: 20px;"><a href="#{h2_clean.lower().replace(" ", "-")}">{h2_clean}</a></li>\n')

        f.write(''.join(toc_entries))
        f.write('</ul>\n</div>\n')

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

                    # Fix internal links
                    # Convert section links (e.g., 01_Introduction.html) to anchor links (#introduction)
                    body_content = re.sub(r'href="([0-9]+)_([^"]+)\.html"',
                                         lambda m: f'href="#{m.group(2).lower().replace("_", "-")}"',
                                         body_content)

                    # Convert annexe links (e.g., A_Transport_Maps.html) to anchor links (#transport-maps)
                    body_content = re.sub(r'href="([A-E])_([^"]+)\.html"',
                                         lambda m: f'href="#{m.group(2).lower().replace("_", "-")}"',
                                         body_content)

                    # Add id to h1 for TOC links
                    title_match = re.search(r'<title>(.*?)</title>', content)
                    if title_match:
                        title = title_match.group(1).replace(f"{TITLE} - ", "")

                        # For index page
                        if html_file.endswith('index.html'):
                            title = "Introduction"
                            h1_id = "introduction"
                        # For section pages
                        elif re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file):
                            section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', html_file)
                            h1_id = section_match.group(2).lower().replace("_", "-")
                        # For annexe pages
                        elif re.match(r'.*?/([A-E])_([^/]+)\.html', html_file):
                            annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', html_file)
                            h1_id = annexe_match.group(2).lower().replace("_", "-")
                        else:
                            h1_id = title.lower().replace(" ", "-")

                        # Add id to first h1
                        body_content = re.sub(r'<h1>', f'<h1 id="{h1_id}">', body_content, count=1)

                    # Add ids to h2 for TOC links
                    def add_id_to_h2(match):
                        h2_text = match.group(1)
                        h2_clean = re.sub(r'<.*?>', '', h2_text)
                        h2_id = h2_clean.lower().replace(" ", "-")
                        return f'<h2 id="{h2_id}">{h2_text}</h2>'

                    body_content = re.sub(r'<h2>(.*?)</h2>', add_id_to_h2, body_content)

                    # Add IDs to h3 headings as well
                    def add_id_to_h3(match):
                        h3_text = match.group(1)
                        h3_clean = re.sub(r'<.*?>', '', h3_text)
                        h3_id = h3_clean.lower().replace(" ", "-")
                        return f'<h3 id="{h3_id}">{h3_text}</h3>'

                    body_content = re.sub(r'<h3>(.*?)</h3>', add_id_to_h3, body_content)

                    # Add section navigation
                    if not html_file.endswith('index.html'):
                        # Find previous and next files
                        current_index = html_files.index(html_file)
                        prev_file = html_files[current_index - 1] if current_index > 0 else None
                        next_file = html_files[current_index + 1] if current_index < len(html_files) - 1 else None

                        nav_html = '<div class="section-nav">'

                        if prev_file:
                            prev_title = ''
                            with open(prev_file, 'r', encoding='utf-8') as pf:
                                prev_content = pf.read()
                                prev_title_match = re.search(r'<title>(.*?)</title>', prev_content)
                                if prev_title_match:
                                    prev_title = prev_title_match.group(1).replace(f"{TITLE} - ", "")

                            prev_id = os.path.basename(prev_file).replace('.html', '').lower()
                            if prev_file.endswith('index.html'):
                                prev_id = 'introduction'
                            elif re.match(r'.*?/([0-9]+)_([^/]+)\.html', prev_file):
                                section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', prev_file)
                                prev_id = section_match.group(2).lower().replace("_", "-")
                            elif re.match(r'.*?/([A-E])_([^/]+)\.html', prev_file):
                                annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', prev_file)
                                prev_id = annexe_match.group(2).lower().replace("_", "-")

                            nav_html += f'<a href="#{prev_id}" class="prev">{prev_title}</a>'
                        else:
                            nav_html += '<span></span>'

                        nav_html += '<a href="#introduction" class="home">Accueil</a>'

                        if next_file:
                            next_title = ''
                            with open(next_file, 'r', encoding='utf-8') as nf:
                                next_content = nf.read()
                                next_title_match = re.search(r'<title>(.*?)</title>', next_content)
                                if next_title_match:
                                    next_title = next_title_match.group(1).replace(f"{TITLE} - ", "")

                            next_id = os.path.basename(next_file).replace('.html', '').lower()
                            if re.match(r'.*?/([0-9]+)_([^/]+)\.html', next_file):
                                section_match = re.match(r'.*?/([0-9]+)_([^/]+)\.html', next_file)
                                next_id = section_match.group(2).lower().replace("_", "-")
                            elif re.match(r'.*?/([A-E])_([^/]+)\.html', next_file):
                                annexe_match = re.match(r'.*?/([A-E])_([^/]+)\.html', next_file)
                                next_id = annexe_match.group(2).lower().replace("_", "-")

                            nav_html += f'<a href="#{next_id}" class="next">{next_title}</a>'
                        else:
                            nav_html += '<span></span>'

                        nav_html += '</div>'

                        # Add navigation at the end of the content
                        body_content += nav_html

                    f.write(body_content)

        f.write('</body>\n</html>')

    # Convert to PDF
    complete_pdf = os.path.join(OUTPUT_DIR, 'Guide_Voyage_Houston_2025.pdf')
    HTML(complete_html).write_pdf(
        complete_pdf,
        presentational_hints=True
    )

    print(f"Generated complete PDF: {complete_pdf}")

# Main execution
if __name__ == "__main__":
    print("Generating complete PDF...")
    generate_complete_pdf()

    print("\nPDF generation complete. File saved to", os.path.join(OUTPUT_DIR, 'Guide_Voyage_Houston_2025.pdf'))
