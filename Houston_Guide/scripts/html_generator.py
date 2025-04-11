#!/usr/bin/env python3
"""
Générateur HTML pour le guide de voyage
"""

import os
import sys
from datetime import datetime

# Ajouter le répertoire courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import COLORS, METADATA
from style_generator import generate_css
from markdown_processor import process_markdown_file
from toc_generator import generate_toc, generate_floating_nav

class TravelGuideHTML:
    def __init__(self):
        self.html_content = []
        self.toc_entries = []
        self.current_section = 0

    def add_cover(self, cover_image):
        """
        Ajoute une page de couverture avec image ou texte de secours
        """
        cover_html = f'<div id="cover" style="background:{COLORS["cover_bg"]};">'

        if os.path.exists(cover_image):
            cover_html += f'<img src="{cover_image}" alt="Couverture du Guide de Voyage Houston 2025">'
        else:
            cover_html += f'''
            <h1>GUIDE DE VOYAGE</h1>
            <h2>HOUSTON</h2>
            <h3>FIRST CHAMPIONSHIP 2025</h3>
            '''

        cover_html += '</div>'
        self.html_content.append(cover_html)

    def add_markdown_file(self, md_file):
        """
        Convertit un fichier Markdown en HTML et l'ajoute au contenu
        """
        # Créer un ID de section basé sur le nom du fichier
        section_id = os.path.basename(md_file).replace('.md', '')

        # Traiter le fichier Markdown
        section_html, section_toc_entries = process_markdown_file(md_file, section_id)

        if section_html:
            self.html_content.append(section_html)
            self.toc_entries.extend(section_toc_entries)
            self.current_section += 1

    def add_toc(self):
        """
        Ajoute la table des matières avec liens
        """
        toc_html = generate_toc(self.toc_entries)
        self.html_content.insert(1, toc_html)  # Insérer après la couverture

    def add_floating_nav(self):
        """
        Ajoute une navigation flottante
        """
        nav_html = generate_floating_nav(self.toc_entries)
        self.html_content.append(nav_html)

    def add_footer(self):
        """
        Ajoute un pied de page
        """
        current_year = datetime.now().year
        footer_html = f'''
        <footer>
            <p>{METADATA["title"]} &copy; {current_year} {METADATA["author"]}</p>
            <p>Généré le {datetime.now().strftime('%d/%m/%Y à %H:%M')}</p>
        </footer>
        '''
        self.html_content.append(footer_html)

    def generate_html(self, output_file):
        """
        Génère le document HTML final
        """
        # Ajouter la navigation flottante et le pied de page
        self.add_floating_nav()
        self.add_footer()

        # Générer le CSS
        css = generate_css()

        # Modèle HTML de base avec encodage UTF-8 pour les emojis
        html_template = f'''<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="{METADATA["description"]}">
            <meta name="author" content="{METADATA["author"]}">
            <meta name="keywords" content="{METADATA["keywords"]}">
            <title>{METADATA["title"]}</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
            <style>
            {css}
            </style>
        </head>
        <body>
        {''.join(self.html_content)}
        </body>
        </html>'''

        # Écrire le HTML dans le fichier de sortie
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_template)
