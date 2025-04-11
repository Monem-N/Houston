#!/usr/bin/env python3
"""
HTML Generator for Houston 2025 Travel Guide
This script converts the Markdown files to HTML and creates a complete guide.
"""

import os
import re
import markdown
import shutil
from datetime import datetime

# Configuration
INPUT_DIR = "."
OUTPUT_DIR = "./output"
ASSETS_DIR = "./assets"
MAIN_SECTIONS_DIR = "./Main_Sections"
ANNEXES_DIR = "./Annexes"
CSS_FILE = "assets/css/style.css"
PRINT_CSS_FILE = "assets/css/_print.css"
JS_FILE = "assets/script.js"
TITLE = "Guide de Voyage Houston 2025"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUTPUT_DIR, "assets"), exist_ok=True)

# Copy assets
for file in os.listdir(ASSETS_DIR):
    src = os.path.join(ASSETS_DIR, file)
    dst = os.path.join(OUTPUT_DIR, "assets", file)
    if os.path.isfile(src):
        shutil.copy2(src, dst)

# HTML template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="{css_path}">
    <link rel="stylesheet" href="{print_css_path}" media="print">
    <script src="{js_path}"></script>
</head>
<body>
    <a href="#main-content" class="skip-to-content">Aller au contenu principal</a>
    <div class="nav-container">
        <a href="index.html">Accueil</a>
        {nav_links}
    </div>

    <main id="main-content">
        {content}
    </main>

    <footer>
        <p>Guide de Voyage Houston 2025 | Généré le {date}</p>
    </footer>
</body>
</html>
"""

# Function to convert markdown to HTML
def convert_markdown_to_html(markdown_content):
    # Convert .md links to .html links
    markdown_content = re.sub(r'\]\(([^)]+)\.md\)', r'](\1.html)', markdown_content)

    # Fix relative paths in links
    markdown_content = re.sub(r'\]\(Main_Sections/([^)]+)\.html\)', r'](\1.html)', markdown_content)
    markdown_content = re.sub(r'\]\(Annexes/([^)]+)\.html\)', r'](\1.html)', markdown_content)

    # Fix relative paths from sections to annexes and vice versa
    markdown_content = re.sub(r'\]\(\.\./Annexes/([^)]+)\.html\)', r'](\1.html)', markdown_content)
    markdown_content = re.sub(r'\]\(\.\./Main_Sections/([^)]+)\.html\)', r'](\1.html)', markdown_content)

    # Fix index link
    markdown_content = re.sub(r'\]\(\.\./index\.html\)', r'](index.html)', markdown_content)

    # Enhance external links with descriptive text
    # Match [text](http://example.com) or [text](https://example.com)
    def enhance_external_link(match):
        text = match.group(1)
        url = match.group(2)

        # If the link text is just a URL, replace it with a more descriptive text
        if text.startswith('http://') or text.startswith('https://') or text == url:
            # Extract domain name
            domain = re.search(r'https?://(?:www\.)?([^/]+)', url)
            if domain:
                domain_name = domain.group(1)
                # Special cases for common sites
                if 'spacecenter.org' in domain_name:
                    return f'[Site officiel Space Center Houston]({url})'
                elif 'ridemetro.org' in domain_name:
                    return f'[METRO Trip Planner]({url})'
                elif 'visithoustontexas.com' in domain_name:
                    return f'[Visit Houston]({url})'
                elif 'simon.com' in domain_name:
                    return f'[Plan Katy Mills]({url})'
                elif 'houstonzoo.org' in domain_name:
                    return f'[Site officiel du Zoo de Houston]({url})'
                elif 'hermannpark.org' in domain_name:
                    return f'[Site officiel de Hermann Park]({url})'
                elif 'firstchampionship.org' in domain_name:
                    return f'[Site officiel FIRST Championship]({url})'
                elif 'houmuse.org' in domain_name:
                    return f'[Houston Museum District]({url})'
                elif 'hmns.org' in domain_name:
                    return f'[Museum of Natural Science]({url})'
                elif 'mfah.org' in domain_name:
                    return f'[Museum of Fine Arts Houston]({url})'
                elif 'cmhouston.org' in domain_name:
                    return f'[Children\'s Museum Houston]({url})'
                elif 'opentable.com' in domain_name:
                    return f'[Réservations OpenTable]({url})'
                else:
                    return f'[Site {domain_name}]({url})'

        return f'[{text}]({url})'

    markdown_content = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', enhance_external_link, markdown_content)

    # Add bilingual headers
    # Match # Title in English / Titre en Français
    def add_bilingual_header(match):
        level = len(match.group(1))
        title = match.group(2).strip()

        # Check if the title contains a slash (indicating bilingual)
        if '/' in title:
            en_title, fr_title = title.split('/', 1)
            return f'{match.group(1)} <div class="bilingual-header"><span class="fr">{fr_title.strip()}</span><span class="en">{en_title.strip()}</span></div>'

        return f'{match.group(1)} {title}'

    markdown_content = re.sub(r'^(#+)\s+(.+)$', add_bilingual_header, markdown_content, flags=re.MULTILINE)

    # Enhance image tags with captions and size classes
    # Match ![alt text](image.jpg "caption")
    def enhance_image(match):
        alt_text = match.group(1)
        image_url = match.group(2)
        title = match.group(3) if match.group(3) else ''

        size_class = 'medium-image'
        if 'small' in alt_text.lower() or 'icon' in alt_text.lower():
            size_class = 'small-image'
        elif 'large' in alt_text.lower() or 'panorama' in alt_text.lower():
            size_class = 'large-image'

        if title:
            return f'<div class="image-container">\n![{alt_text}]({image_url} "{title}"){{.{size_class} .print-optimized}}\n<div class="image-caption">{title}</div>\n</div>'
        else:
            return f'![{alt_text}]({image_url}){{.{size_class} .print-optimized}}'

    markdown_content = re.sub(r'!\[([^\]]+)\]\(([^)"]+)(?:\s+"([^"]+)")?\)', enhance_image, markdown_content)

    # Convert markdown to HTML
    html = markdown.markdown(markdown_content, extensions=['tables', 'fenced_code', 'nl2br', 'attr_list'])

    # Convert checkboxes
    html = re.sub(r'<li>\[ \]', r'<li><input type="checkbox">', html)
    html = re.sub(r'<li>\[x\]', r'<li><input type="checkbox" checked>', html)

    # Add IDs to checkboxes
    checkbox_count = 0
    def add_id_to_checkbox(match):
        nonlocal checkbox_count
        checkbox_count += 1
        return f'<input type="checkbox" id="checkbox_{checkbox_count}"'

    html = re.sub(r'<input type="checkbox"', add_id_to_checkbox, html)

    # Add emoji class
    html = re.sub(r'([\U00010000-\U0010ffff])', r'<span class="emoji">\1</span>', html)

    # Add classes to links
    html = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" class="external-link"', html)
    html = re.sub(r'<a href="([0-9]+_[^"]+\.html)"', r'<a href="\1" class="section-link"', html)
    html = re.sub(r'<a href="([A-E]_[^"]+\.html)"', r'<a href="\1" class="annexe-link"', html)

    # Add classes to tables
    if 'restaurant' in html.lower() or 'dining' in html.lower() or 'gastronomie' in html.lower():
        html = re.sub(r'<table>', r'<table class="restaurant-table">', html)
    elif 'transport' in html.lower() or 'metro' in html.lower() or 'bus' in html.lower():
        html = re.sub(r'<table>', r'<table class="transport-table">', html)

    # Enhance kids sections
    html = re.sub(r'<h2>([^<]*Pour les Enfants[^<]*)</h2>',
                 r'<div class="kids-section"><div class="kids-section-title">👨‍👩‍👧‍👦 Pour les Enfants</div><h2>\1</h2>', html)
    html = re.sub(r'<h3>([^<]*Pour les Enfants[^<]*)</h3>',
                 r'<div class="kids-section"><div class="kids-section-title">👨‍👩‍👧‍👦 Pour les Enfants</div><h3>\1</h3>', html)

    # Close kids sections before the next h2 or h3
    html = re.sub(r'(</div>\s*)<h[23]', r'\1</div>\n<h', html)

    # If there's no closing div before the next h2/h3, add one at the end
    if '<div class="kids-section">' in html and '</div></div>' not in html:
        html = re.sub(r'(</body>)', r'</div>\n\1', html)

    # Add activity icons
    activity_icons = {
        'Visit': '🏛️',
        'Visite': '🏛️',
        'Museum': '🏛️',
        'Musée': '🏛️',
        'Space Center': '🚀',
        'NASA': '🚀',
        'Zoo': '🦁',
        'Park': '🌳',
        'Parc': '🌳',
        'Garden': '🌸',
        'Jardin': '🌸',
        'Eat': '🍽️',
        'Manger': '🍽️',
        'Restaurant': '🍽️',
        'Café': '☕',
        'Dining': '🍽️',
        'Food': '🍽️',
        'Cuisine': '🍽️',
        'Breakfast': '🍳',
        'Petit-déjeuner': '🍳',
        'Lunch': '🥪',
        'Déjeuner': '🥪',
        'Dinner': '🍲',
        'Dîner': '🍲',
        'Shop': '🛍️',
        'Shopping': '🛍️',
        'Boutique': '🛍️',
        'Mall': '🏬',
        'Centre commercial': '🏬',
        'Outlet': '🏬',
        'Souvenir': '🎁',
        'Market': '🛒',
        'Marché': '🛒',
        'Play': '🎮',
        'Jouer': '🎮',
        'Activity': '🎯',
        'Activité': '🎯',
        'Game': '🎲',
        'Jeu': '🎲',
        'Attraction': '🎡',
        'Manège': '🎡',
        'Rest': '😴',
        'Repos': '😴',
        'Hotel': '🏨',
        'Hôtel': '🏨',
        'Sleep': '🛌',
        'Dormir': '🛌',
        'Transport': '🚌',
        'Bus': '🚌',
        'METRO': '🚇',
        'Tramway': '🚊',
        'Uber': '🚗',
        'Lyft': '🚗',
        'Taxi': '🚕',
        'Walk': '🚶',
        'Marche': '🚶',
        'Photo': '📸',
        'Picture': '📸',
        'Image': '📸',
        'Camera': '📸',
        'Appareil photo': '📸',
    }

    # Add activity labels to strong elements
    for keyword, icon in activity_icons.items():
        # Match <strong>Keyword: text</strong> or <strong>Keyword text</strong>
        pattern = r'<strong>(' + re.escape(keyword) + r'[^<]*)</strong>'

        # Determine activity class
        activity_class = 'activity-label'
        if keyword in ['Visit', 'Visite', 'Museum', 'Musée', 'Space Center', 'NASA', 'Zoo', 'Park', 'Parc', 'Garden', 'Jardin']:
            activity_class += ' activity-visit'
        elif keyword in ['Eat', 'Manger', 'Restaurant', 'Café', 'Dining', 'Food', 'Cuisine', 'Breakfast', 'Petit-déjeuner', 'Lunch', 'Déjeuner', 'Dinner', 'Dîner']:
            activity_class += ' activity-eat'
        elif keyword in ['Shop', 'Shopping', 'Boutique', 'Mall', 'Centre commercial', 'Outlet', 'Souvenir', 'Market', 'Marché']:
            activity_class += ' activity-shop'
        elif keyword in ['Play', 'Jouer', 'Activity', 'Activité', 'Game', 'Jeu', 'Attraction', 'Manège']:
            activity_class += ' activity-play'
        elif keyword in ['Rest', 'Repos', 'Hotel', 'Hôtel', 'Sleep', 'Dormir']:
            activity_class += ' activity-rest'
        elif keyword in ['Transport', 'Bus', 'METRO', 'Tramway', 'Uber', 'Lyft', 'Taxi', 'Walk', 'Marche']:
            activity_class += ' activity-transport'
        elif keyword in ['Photo', 'Picture', 'Image', 'Camera', 'Appareil photo']:
            activity_class += ' activity-photo'

        replacement = r'<span class="' + activity_class + '"><span class="activity-icon">' + icon + '</span><strong>\1</strong></span>'
        html = re.sub(pattern, replacement, html)

    return html

# Generate navigation links
def generate_nav_links():
    nav_links = []

    # Main sections
    for filename in sorted(os.listdir(MAIN_SECTIONS_DIR)):
        if filename.endswith('.md'):
            section_name = filename.replace('.md', '')
            section_number = section_name.split('_')[0]
            section_title = ' '.join(section_name.split('_')[1:])
            html_filename = f"{section_name}.html"
            nav_links.append(f'<a href="{html_filename}">{section_number}. {section_title}</a>')

    # Annexes
    for filename in sorted(os.listdir(ANNEXES_DIR)):
        if filename.endswith('.md'):
            annex_name = filename.replace('.md', '')
            annex_letter = annex_name.split('_')[0]
            annex_title = ' '.join(annex_name.split('_')[1:])
            html_filename = f"{annex_name}.html"
            nav_links.append(f'<a href="{html_filename}">Annexe {annex_letter}: {annex_title}</a>')

    return ' | '.join(nav_links)

# Process index file
with open('index.md', 'r', encoding='utf-8') as f:
    index_content = f.read()

index_html = convert_markdown_to_html(index_content)
nav_links = generate_nav_links()

with open(os.path.join(OUTPUT_DIR, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(HTML_TEMPLATE.format(
        title=TITLE,
        css_path=CSS_FILE,
        print_css_path=PRINT_CSS_FILE,
        js_path=JS_FILE,
        nav_links=nav_links,
        content=index_html,
        date=datetime.now().strftime("%d/%m/%Y %H:%M")
    ))

# Process main sections
for filename in os.listdir(MAIN_SECTIONS_DIR):
    if filename.endswith('.md'):
        with open(os.path.join(MAIN_SECTIONS_DIR, filename), 'r', encoding='utf-8') as f:
            content = f.read()

        html_content = convert_markdown_to_html(content)
        output_filename = filename.replace('.md', '.html')

        with open(os.path.join(OUTPUT_DIR, output_filename), 'w', encoding='utf-8') as f:
            f.write(HTML_TEMPLATE.format(
                title=f"{TITLE} - {' '.join(filename.split('_')[1:-1])}",
                css_path=CSS_FILE,
                print_css_path=PRINT_CSS_FILE,
                js_path=JS_FILE,
                nav_links=nav_links,
                content=html_content,
                date=datetime.now().strftime("%d/%m/%Y %H:%M")
            ))

# Process annexes
for filename in os.listdir(ANNEXES_DIR):
    if filename.endswith('.md'):
        with open(os.path.join(ANNEXES_DIR, filename), 'r', encoding='utf-8') as f:
            content = f.read()

        html_content = convert_markdown_to_html(content)
        output_filename = filename.replace('.md', '.html')

        with open(os.path.join(OUTPUT_DIR, output_filename), 'w', encoding='utf-8') as f:
            f.write(HTML_TEMPLATE.format(
                title=f"{TITLE} - Annexe {filename.split('_')[0]}",
                css_path=CSS_FILE,
                print_css_path=PRINT_CSS_FILE,
                js_path=JS_FILE,
                nav_links=nav_links,
                content=html_content,
                date=datetime.now().strftime("%d/%m/%Y %H:%M")
            ))

print(f"HTML generation complete. Files saved to {OUTPUT_DIR}")
