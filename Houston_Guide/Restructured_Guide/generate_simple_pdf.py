#!/usr/bin/env python3
"""
Simple PDF Generator for Houston 2025 Travel Guide
This script creates a simplified PDF version of the guide.
"""

import os
import re
import markdown
from weasyprint import HTML, CSS

# Configuration
INPUT_DIR = "./Main_Sections"
ANNEXES_DIR = "./Annexes"
OUTPUT_DIR = "./pdf"
TITLE = "Guide de Voyage Houston 2025"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_pdf():
    """Generate a simplified PDF from markdown files."""
    # Collect all markdown files
    markdown_files = []

    # Add index.md
    markdown_files.append("index.md")

    # Add main sections
    for filename in sorted(os.listdir(INPUT_DIR)):
        if filename.endswith('.md'):
            markdown_files.append(os.path.join(INPUT_DIR, filename))

    # Add annexes
    for filename in sorted(os.listdir(ANNEXES_DIR)):
        if filename.endswith('.md'):
            markdown_files.append(os.path.join(ANNEXES_DIR, filename))

    # Combine all markdown content
    combined_markdown = ""

    # Add cover page
    combined_markdown += f"<div style='text-align: center; margin-top: 40%;'>\n\n"
    combined_markdown += f"# {TITLE}\n\n"
    combined_markdown += "![Couverture](output/assets/front_page.png)\n\n"
    combined_markdown += "**Préparé pour votre famille**\n\n"
    combined_markdown += "*14-24 avril 2025*\n\n"
    combined_markdown += "</div>\n\n"
    combined_markdown += "<div style='page-break-after: always;'></div>\n\n"

    # Add table of contents
    combined_markdown += "# Table des Matières\n\n"

    # Process each file
    for file_path in markdown_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

            # Extract title
            title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if title_match:
                title = title_match.group(1)
                # Clean up emojis from title for TOC
                title = re.sub(r'[^\w\s]', '', title).strip()
                combined_markdown += f"- [{title}](#{title.lower().replace(' ', '-')})\n"

    combined_markdown += "\n---\n\n"

    # Add content from each file
    for file_path in markdown_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

            # Fix internal links
            content = re.sub(r'\]\(([^)]+)\.md\)', r'](#\1)', content)
            content = re.sub(r'\]\(Main_Sections/([^)]+)\.md\)', r'](#\1)', content)
            content = re.sub(r'\]\(Annexes/([^)]+)\.md\)', r'](#\1)', content)
            content = re.sub(r'\]\(\.\.\/Main_Sections/([^)]+)\.md\)', r'](#\1)', content)
            content = re.sub(r'\]\(\.\.\/Annexes/([^)]+)\.md\)', r'](#\1)', content)
            content = re.sub(r'\]\(\.\.\/index\.md\)', r'(#index)', content)

            # Add page break before each main section
            combined_markdown += "<div style='page-break-before: always;'></div>\n\n"
            combined_markdown += content + "\n\n"

    # Convert markdown to HTML
    html = markdown.markdown(combined_markdown, extensions=['tables', 'fenced_code', 'nl2br'])

    # Add basic CSS
    css = """
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 2cm;
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
    }
    h2 {
        font-size: 1.5em;
        border-bottom: 1px solid #dddddd;
        padding-bottom: 5px;
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
    a {
        color: #0066cc;
        text-decoration: none;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    @page {
        size: A4;
        margin: 2cm;
        @bottom-center {
            content: "Page " counter(page);
        }
    }
    @page :first {
        @bottom-center {
            content: normal;
        }
    }
    """

    # Create HTML file
    html_file = os.path.join(OUTPUT_DIR, 'complete.html')
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n<head>\n')
        f.write(f'<title>{TITLE}</title>\n')
        f.write('<meta charset="UTF-8">\n')
        f.write('<style>\n')
        f.write(css)
        f.write('</style>\n')
        f.write('</head>\n<body>\n')
        f.write(html)
        f.write('</body>\n</html>')

    # Convert to PDF
    pdf_file = os.path.join(OUTPUT_DIR, 'Guide_Voyage_Houston_2025.pdf')
    HTML(html_file).write_pdf(pdf_file)

    print(f"PDF generated successfully: {pdf_file}")

if __name__ == "__main__":
    generate_pdf()
