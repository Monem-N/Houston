#!/usr/bin/env python3
"""
Script to update all HTML pages with the new design template
"""

import os
import re
from bs4 import BeautifulSoup

# List of pages to update
PAGES_TO_UPDATE = [
    "02_Space_Center_Kemah.html",
    "03_Shopping_Katy_Mills.html",
    "04_Safety_Logistics.html",
    "05_Gastronomie.html",
    "06_FIRST_Championship.html",
    "07_Museum_District.html",
    "08_Hermann_Park_Zoo.html",
    "09_Thematic_Index.html",
    "A_Transport_Maps.html",
    "B_Emergency_Contacts.html",
    "C_Shopping_Comparison.html",
    "D_Touristanbul.html",
    "E_Local_Dining_Shopping.html"
]

# Page titles mapping
PAGE_TITLES = {
    "02_Space_Center_Kemah.html": "Space Center & Kemah Boardwalk",
    "03_Shopping_Katy_Mills.html": "Shopping à Katy Mills",
    "04_Safety_Logistics.html": "Sécurité et Logistique",
    "05_Gastronomie.html": "Guide Gastronomique",
    "06_FIRST_Championship.html": "FIRST Championship",
    "07_Museum_District.html": "Museum District",
    "08_Hermann_Park_Zoo.html": "Hermann Park et Zoo",
    "09_Thematic_Index.html": "Index Thématique",
    "A_Transport_Maps.html": "Cartes et Transport",
    "B_Emergency_Contacts.html": "Contacts d'Urgence",
    "C_Shopping_Comparison.html": "Comparatif Shopping",
    "D_Touristanbul.html": "Guide Touristanbul",
    "E_Local_Dining_Shopping.html": "Guide Local - Manger & Acheter"
}

# Page descriptions mapping
PAGE_DESCRIPTIONS = {
    "02_Space_Center_Kemah.html": "Guide pour visiter le Space Center Houston et Kemah Boardwalk lors de votre séjour à Houston",
    "03_Shopping_Katy_Mills.html": "Guide de shopping à Katy Mills, le plus grand outlet de Houston",
    "04_Safety_Logistics.html": "Informations pratiques sur la sécurité et la logistique pour votre séjour à Houston",
    "05_Gastronomie.html": "Guide gastronomique de Houston avec les meilleurs restaurants et spécialités locales",
    "06_FIRST_Championship.html": "Guide complet pour le FIRST Championship 2025 à Houston",
    "07_Museum_District.html": "Découvrez le quartier des musées de Houston et ses attractions culturelles",
    "08_Hermann_Park_Zoo.html": "Guide pour visiter le Hermann Park et le Zoo de Houston",
    "09_Thematic_Index.html": "Index thématique du guide de voyage Houston 2025",
    "A_Transport_Maps.html": "Cartes et options de transport pour se déplacer à Houston",
    "B_Emergency_Contacts.html": "Liste des contacts d'urgence et services médicaux à Houston",
    "C_Shopping_Comparison.html": "Comparatif des centres commerciaux et outlets de Houston",
    "D_Touristanbul.html": "Guide pour profiter de l'excursion gratuite Touristanbul lors de votre escale à Istanbul",
    "E_Local_Dining_Shopping.html": "Guide des restaurants locaux et boutiques uniques de Houston"
}

# Page keywords mapping
PAGE_KEYWORDS = {
    "02_Space_Center_Kemah.html": "Space Center, NASA, Kemah Boardwalk, attractions",
    "03_Shopping_Katy_Mills.html": "shopping, outlet, Katy Mills, boutiques",
    "04_Safety_Logistics.html": "sécurité, transport, logistique, urgences",
    "05_Gastronomie.html": "restaurants, cuisine, gastronomie, spécialités",
    "06_FIRST_Championship.html": "FIRST Championship, robotique, compétition",
    "07_Museum_District.html": "musées, culture, art, science",
    "08_Hermann_Park_Zoo.html": "zoo, parc, nature, animaux",
    "09_Thematic_Index.html": "index, thèmes, recherche",
    "A_Transport_Maps.html": "transport, cartes, métro, bus",
    "B_Emergency_Contacts.html": "urgences, médical, sécurité, contacts",
    "C_Shopping_Comparison.html": "shopping, comparatif, centres commerciaux",
    "D_Touristanbul.html": "Touristanbul, Istanbul, escale, Turkish Airlines",
    "E_Local_Dining_Shopping.html": "restaurants locaux, boutiques, quartiers"
}

# Load template
with open('page-template.html', 'r', encoding='utf-8') as f:
    TEMPLATE = f.read()

def update_page(filename):
    """Update a single page with the new design"""
    print(f"Updating {filename}...")
    
    # Read the current page
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse the HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Extract the main content
    main_content = soup.find('main')
    if not main_content:
        print(f"Warning: No main content found in {filename}")
        return
    
    # Extract the title
    title = PAGE_TITLES.get(filename, "")
    if not title and soup.title:
        title = soup.title.string
    
    # Create a new page from the template
    new_page = TEMPLATE
    
    # Replace placeholders
    new_page = new_page.replace('[PAGE_TITLE]', title)
    new_page = new_page.replace('[PAGE_HEADING]', title)
    new_page = new_page.replace('[PAGE_DESCRIPTION]', PAGE_DESCRIPTIONS.get(filename, ""))
    new_page = new_page.replace('[PAGE_KEYWORDS]', PAGE_KEYWORDS.get(filename, ""))
    
    # Set the active menu item
    page_id = os.path.basename(filename)
    new_page = new_page.replace(f'<a href="{page_id}">', f'<a href="{page_id}" class="active">')
    
    # Extract sections for quick navigation
    sections = []
    for h2 in main_content.find_all('h2'):
        if h2.get('id'):
            section_id = h2.get('id')
            section_text = h2.get_text().strip()
            # Remove emoji if present
            section_text = re.sub(r'^\S+\s+', '', section_text)
            sections.append((section_id, section_text))
    
    # Create quick navigation
    quick_nav = '<div class="quick-nav">\n    <h4>Dans cette section</h4>\n    <ul>\n'
    for section_id, section_text in sections:
        quick_nav += f'        <li><a href="#{section_id}">{section_text}</a></li>\n'
    quick_nav += '    </ul>\n</div>'
    
    # Replace quick navigation placeholder
    new_page = re.sub(r'<div class="quick-nav">.*?</div>', quick_nav, new_page, flags=re.DOTALL)
    
    # Replace section placeholders with actual content
    main_content_str = str(main_content)
    
    # Extract the content inside the main tag
    main_inner_content = re.search(r'<main.*?>(.*)</main>', main_content_str, re.DOTALL)
    if main_inner_content:
        inner_content = main_inner_content.group(1)
        
        # Replace the section placeholders with the actual content
        new_page = re.sub(r'<section id="section1".*?</section>\s*<section id="section2".*?</section>\s*<section id="section3".*?</section>', 
                          f'<section class="section">{inner_content}</section>', 
                          new_page, 
                          flags=re.DOTALL)
    
    # Write the updated page
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_page)
    
    print(f"Updated {filename} successfully!")

def main():
    """Main function to update all pages"""
    print("Starting page updates...")
    
    for page in PAGES_TO_UPDATE:
        if os.path.exists(page):
            update_page(page)
        else:
            print(f"Warning: {page} not found, skipping...")
    
    print("All pages updated successfully!")

if __name__ == "__main__":
    main()
