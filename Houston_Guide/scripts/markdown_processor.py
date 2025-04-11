#!/usr/bin/env python3
"""
Traitement des fichiers Markdown pour le guide de voyage
"""

import os
import re
import sys

# Ajouter le répertoire courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import markdown
from bs4 import BeautifulSoup
from config import SECTION_EMOJIS

def get_section_emoji(filename):
    """
    Détermine l'emoji à utiliser pour une section en fonction du nom de fichier
    """
    filename_lower = filename.lower()

    if "introduction" in filename_lower:
        return SECTION_EMOJIS["introduction"]
    elif "arrivée" in filename_lower or "depart" in filename_lower:
        return SECTION_EMOJIS["arrivée"]
    elif "championship" in filename_lower or "first" in filename_lower:
        return SECTION_EMOJIS["championship"]
    elif "space" in filename_lower:
        return SECTION_EMOJIS["space"]
    elif "shopping" in filename_lower:
        return SECTION_EMOJIS["shopping"]
    elif "museum" in filename_lower:
        return SECTION_EMOJIS["museum"]
    elif "zoo" in filename_lower or "hermann" in filename_lower:
        return SECTION_EMOJIS["zoo"]
    elif "transport" in filename_lower:
        return SECTION_EMOJIS["transport"]
    elif "gastronomique" in filename_lower:
        return SECTION_EMOJIS["gastronomie"]
    elif "local" in filename_lower:
        return SECTION_EMOJIS["local"]
    elif "downtown" in filename_lower:
        return SECTION_EMOJIS["downtown"]
    elif "touristanbul" in filename_lower:
        return SECTION_EMOJIS["touristanbul"]
    elif "enfants" in filename_lower:
        return SECTION_EMOJIS["enfants"]
    else:
        return "📄"  # Emoji par défaut

def process_markdown_file(md_file, section_id):
    """
    Traite un fichier Markdown et le convertit en HTML
    """
    if not os.path.exists(md_file):
        print(f"Attention: Fichier {md_file} non trouvé. Ignoré.")
        return None, []

    # Lire le contenu Markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convertir Markdown en HTML avec support des emojis et des tableaux
    html = markdown.markdown(
        md_content,
        extensions=[
            'md_in_html',
            'tables',
            'fenced_code',
            'nl2br',
            'sane_lists'
        ]
    )

    # Analyser le HTML avec BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Obtenir l'emoji pour cette section
    section_emoji = get_section_emoji(os.path.basename(md_file))

    # Traiter les titres et ajouter des ancres
    toc_entries = []
    for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        level = int(heading.name[1])
        title = heading.text.strip()

        # Créer un ID unique pour l'ancre
        # Remplacer les caractères non alphanumériques par des tirets
        safe_title = ''
        for char in title.lower():
            if char.isalnum() or char == '-' or char == '_':
                safe_title += char
            else:
                safe_title += '-'
        anchor_id = f"{section_id}-{safe_title}"
        heading['id'] = anchor_id

        # Ajouter l'emoji au titre de niveau 1
        if level == 1 and not title.startswith(section_emoji):
            heading.string = f"{section_emoji} {title}"

        # Ajouter au TOC seulement les titres de niveau 1, 2 et 3
        if level <= 3:
            toc_entries.append((title, level, anchor_id, section_id))

    # Traiter les liens internes
    for link in soup.find_all('a'):
        href = link.get('href', '')
        if href.endswith('.md'):
            # Convertir les liens .md en liens #section
            md_filename = os.path.basename(href)
            link['href'] = f"#{md_filename.replace('.md', '')}"
            link['class'] = link.get('class', []) + ['internal-link']

    # Traiter les images
    for img in soup.find_all('img'):
        img['class'] = img.get('class', []) + ['responsive-img']
        img['loading'] = 'lazy'

        # Ajouter un titre si l'image n'en a pas
        if not img.get('title'):
            img['title'] = img.get('alt', 'Image')

    # Créer le conteneur de section
    section_html = f'<div id="{section_id}" class="content-section">'
    section_html += str(soup)
    section_html += '</div>'

    return section_html, toc_entries
