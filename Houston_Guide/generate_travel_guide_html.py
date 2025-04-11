#!/usr/bin/env python3
"""
Script pour générer un guide HTML du voyage à Houston
Inclut une page de couverture, table des matières et contenu avec emojis
"""

import os
import markdown
from bs4 import BeautifulSoup

class TravelGuideHTML:
    def __init__(self):
        self.html_content = []
        self.toc_entries = []
        self.current_section = 0

    def add_cover(self, cover_image):
        """Add cover page with image or text fallback"""
        cover_html = '<div id="cover" style="text-align:center;padding:50px;background:#f0f0f0;">'
        
        if os.path.exists(cover_image):
            cover_html += f'<img src="{cover_image}" style="max-width:100%;height:auto;">'
        else:
            cover_html += ('<h1>GUIDE DE VOYAGE</h1>'
                         '<h2>HOUSTON</h2>'
                         '<h3>FIRST CHAMPIONSHIP 2025</h3>')
        
        cover_html += '</div>'
        self.html_content.append(cover_html)

    def add_toc(self):
        """Add table of contents with links"""
        toc_html = '<div id="toc"><h2>TABLE DES MATIÈRES</h2><ul>'
        for title, section_id in self.toc_entries:
            toc_html += f'<li><a href="#section{section_id}">{title}</a></li>'
        toc_html += '</ul></div>'
        self.html_content.insert(1, toc_html)  # Insert after cover

    def add_markdown_file(self, md_file):
        """Convert markdown file to HTML and add to content"""
        if not os.path.exists(md_file):
            print(f"Warning: File {md_file} not found. Skipping.")
            return

        # Process markdown content
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # Convert markdown to HTML with emoji support
        html = markdown.markdown(md_content, extensions=['md_in_html'])
        soup = BeautifulSoup(html, 'html.parser')

        # Create section container
        section_id = f"section{self.current_section}"
        section_html = f'<div id="{section_id}" class="content-section">'

        # Process headings and add anchors
        for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            level = int(heading.name[1])
            title = heading.text.strip()
            anchor = f"{section_id}-{title.lower().replace(' ', '-')}"
            heading['id'] = anchor
            heading_style = f"font-size: {24 - (level-1)*2}px; margin: 20px 0;"
            heading['style'] = heading_style
            # Add to TOC
            self.toc_entries.append((title, section_id))

        # Preserve emojis by ensuring UTF-8 encoding [[8]][[10]]
        section_html += str(soup)
        section_html += '</div>'
        self.html_content.append(section_html)
        self.current_section += 1

    def generate_html(self, output_file):
        """Generate final HTML document"""
        # Basic HTML template with UTF-8 encoding for emojis [[10]]
        html_template = f'''<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Guide de Voyage Houston 2025</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                .content-section {{ margin: 20px; }}
                #toc {{ margin: 20px; background: #f8f9fa; padding: 15px; }}
                #toc ul {{ list-style: none; padding-left: 0; }}
                #toc li {{ margin: 5px 0; }}
            </style>
        </head>
        <body>
        {''.join(self.html_content)}
        </body>
        </html>'''

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_template)

def main():
    document_order = [
        "Introduction et Sommaire.md",
        "Journée 14 avril 2025 Guide Départ – Arrivée à Houston.md",
        "Journées 16 avr 2025- 19 avr 2025.md",
        "Journée 20 avril 2025_Space Center Houston.md",
        "Journée 21 avr 2025 Aventure Shopping à Houston.md",
        "Journée 22 avril 2025 scientifique à Houston_.md",
        "Journée 23 avril 2025 Itinéraire familial à Houston_.md",
        "Transport Local pour le FIRST Championship 2025.md",
        "Guide Gastronomique et Shopping - Houston Authentique.md",
        "Guide Local Houston _ Manger, Acheter_.md",
        "Annexe - Downtown Houston à Explorer.md",
        "Guide Pratique Touristanbul.md",
        "Touristanbul.md",
        "Guide Activités Enfants - Houston pour les 10 ans.md"
    ]

    html_guide = TravelGuideHTML()
    html_guide.add_cover("front_page.png")

    for doc in document_order:
        html_guide.add_markdown_file(doc)

    html_guide.add_toc()  # Generate TOC after all content
    html_guide.generate_html("Guide_Voyage_Houston_2025.html")
    print("HTML guide generated successfully")

if __name__ == "__main__":
    main()