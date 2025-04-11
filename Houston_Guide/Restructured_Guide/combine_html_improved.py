#!/usr/bin/env python3
"""
HTML Combiner for Houston 2025 Travel Guide
This script combines HTML files into one and links to the print CSS.
"""

import os
import re

# Configuration
OUTPUT_DIR = "./output"
PDF_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"
PRINT_CSS = "./assets/css/_print.css"
STYLE_CSS = "./assets/css/style.css"

# Create output directory if it doesn't exist
os.makedirs(PDF_DIR, exist_ok=True)


def get_html_files(directory):
    """
    Collect and organize HTML files in the correct order.
    """
    html_files = []

    # Add index file first
    index_file = os.path.join(directory, 'index.html')
    if os.path.exists(index_file):
        html_files.append(index_file)

    # Add main sections (files starting with '0' and ending with '.html')
    main_sections = sorted(
        [f for f in os.listdir(directory) if f.startswith('0') and f.endswith('.html')],
        key=lambda x: int(x.split('_')[0]) if '_' in x else 0
    )
    html_files.extend([os.path.join(directory, f) for f in main_sections])

    # Add annexes (files starting with 'A_', 'B_', etc.)
    annexes = sorted(
        [f for f in os.listdir(directory) if f.startswith(('A_', 'B_', 'C_', 'D_', 'E_')) and f.endswith('.html')],
        key=lambda x: x.split('_')[1] if '_' in x else 0
    )
    html_files.extend([os.path.join(directory, f) for f in annexes])

    return html_files


def extract_title(html_content):
    """
    Extract the title from an HTML file's <title> tag.
    """
    match = re.search(r'<title>(.*?)</title>', html_content)
    return match.group(1).replace(f"{TITLE} - ", "") if match else "Untitled"


def create_id_mapping(html_files):
    """
    Create a mapping of file names to unique section IDs.
    """
    return {os.path.basename(f): f"section-{i}" for i, f in enumerate(html_files)}


def write_cover_page(output_file):
    """
    Write the cover page to the combined HTML file.
    """
    output_file.write('<div class="cover-page">\n')
    output_file.write(f'<h1>{TITLE}</h1>\n')
    output_file.write('<img src="../output/assets/front_page.png" alt="Houston Skyline">\n')
    output_file.write('<div class="subtitle">Préparé pour votre famille</div>\n')
    output_file.write('<div class="date">14-24 avril 2025</div>\n')
    output_file.write('</div>\n')


def write_table_of_contents(output_file, html_files, file_ids):
    """
    Write the table of contents to the combined HTML file.
    """
    output_file.write('<h1>Table des Matières</h1>\n<div class="toc">\n')

    main_toc_items = []
    annexe_toc_items = []

    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as hf:
            content = hf.read()
            title = extract_title(content)
            basename = os.path.basename(html_file)

            toc_item = f'<li><a href="#{file_ids[basename]}">{title}</a></li>'
            if basename.startswith(('A_', 'B_', 'C_', 'D_', 'E_')):
                annexe_toc_items.append(toc_item)
            else:
                main_toc_items.append(toc_item)

    # Write main sections
    output_file.write('<h2>Sections Principales</h2>\n<ul>\n')
    output_file.writelines(main_toc_items)
    output_file.write('</ul>\n')

    # Write annexes if any
    if annexe_toc_items:
        output_file.write('<h2>Annexes</h2>\n<ul>\n')
        output_file.writelines(annexe_toc_items)
        output_file.write('</ul>\n')

    output_file.write('</div>\n')


def combine_html():
    """
    Combine HTML files into one and link to the print CSS.
    """
    print("Étape 1: Combinaison des fichiers HTML...")

    # Get HTML files in the correct order
    html_files = get_html_files(OUTPUT_DIR)

    # Create ID mapping for internal links
    file_ids = create_id_mapping(html_files)

    # Create combined HTML file
    combined_html = os.path.join(PDF_DIR, 'combined.html')
    with open(combined_html, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n')
        f.write(f'<title>{TITLE}</title>\n')
        f.write('<meta charset="UTF-8">\n')
        f.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">\n')

        # Include the original CSS
        f.write(f'<link rel="stylesheet" href="../{STYLE_CSS}">\n')

        print("Étape 2: Ajout du CSS pour l'impression...")

        # Include the print CSS
        f.write(f'<link rel="stylesheet" href="../{PRINT_CSS}" media="print">\n')

        f.write('</head>\n<body>\n')

        # Add cover page
        write_cover_page(f)

        # Add table of contents
        write_table_of_contents(f, html_files, file_ids)

        # Add content from each file
        for html_file in html_files:
            basename = os.path.basename(html_file)
            with open(html_file, 'r', encoding='utf-8') as hf:
                content = hf.read()

                # Extract body content
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
    combine_html()
