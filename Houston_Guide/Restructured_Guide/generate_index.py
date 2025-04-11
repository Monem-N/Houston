#!/usr/bin/env python3
"""
Thematic Index Generator for Houston 2025 Travel Guide
This script analyzes the content of the guide and creates a thematic index.
"""

import os
import re
import json
from collections import defaultdict

# Configuration
INPUT_DIR = "./Main_Sections"
ANNEXES_DIR = "./Annexes"
OUTPUT_FILE = "./Main_Sections/09_Thematic_Index.md"

# Keywords to index by category
KEYWORDS = {
    "Attractions": [
        "Space Center", "NASA", "Kemah", "Museum", "Zoo", "Hermann Park", 
        "Discovery Green", "Boardwalk", "Miller Outdoor Theatre", "Japanese Garden",
        "Centennial Gardens", "Aquarium", "FIRST Championship"
    ],
    "Transport": [
        "METRO", "Bus", "Tramway", "Uber", "Lyft", "Taxi", "Railroad", "Navette",
        "Transport", "Parking", "Station", "Airport", "Terminal"
    ],
    "Dining": [
        "Restaurant", "Café", "Dining", "Food", "Cuisine", "Gastronomique", "Menu",
        "Breakfast", "Lunch", "Dinner", "Brunch", "Tex-Mex", "BBQ", "Seafood",
        "Fruits de mer", "Steakhouse", "Végétarien", "Vegan"
    ],
    "Shopping": [
        "Mall", "Outlet", "Boutique", "Shop", "Store", "Katy Mills", "Galleria",
        "Highland Village", "River Oaks", "Souvenir", "Market", "Marché"
    ],
    "Family": [
        "Enfant", "Children", "Family", "Kid", "Play", "Activity", "Activité",
        "Jeu", "Game", "Attraction", "Carousel", "Manège", "Playground"
    ],
    "Safety": [
        "Emergency", "Urgence", "Safety", "Sécurité", "Hospital", "Hôpital",
        "Police", "Medical", "Médical", "First Aid", "Premiers secours"
    ],
    "Accommodation": [
        "Hotel", "Hôtel", "Crowne Plaza", "Room", "Chambre", "Accommodation",
        "Hébergement", "Check-in", "Check-out", "Reservation", "Réservation"
    ],
    "Events": [
        "FIRST Championship", "Event", "Événement", "Festival", "Concert",
        "Performance", "Show", "Spectacle", "Exhibition", "Exposition"
    ]
}

def extract_keywords_from_file(file_path, section_name):
    """Extract keywords from a file and return their occurrences with context."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove markdown code blocks and HTML tags
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    content = re.sub(r'<.*?>', '', content)
    
    # Split content into lines for context
    lines = content.split('\n')
    
    results = defaultdict(list)
    
    for category, keywords in KEYWORDS.items():
        for keyword in keywords:
            # Look for the keyword in each line
            for i, line in enumerate(lines):
                if re.search(r'\b' + re.escape(keyword) + r'\b', line, re.IGNORECASE):
                    # Get the heading context
                    heading_context = ""
                    for j in range(i, -1, -1):
                        if lines[j].startswith('#'):
                            heading_context = lines[j].strip('# ')
                            break
                    
                    # Add the occurrence with context
                    results[keyword].append({
                        'section': section_name,
                        'context': heading_context,
                        'line_number': i + 1
                    })
    
    return results

def generate_index():
    """Generate a thematic index from all markdown files."""
    all_keywords = defaultdict(list)
    
    # Process main sections
    for filename in sorted(os.listdir(INPUT_DIR)):
        if filename.endswith('.md') and not filename.startswith('09_'):
            file_path = os.path.join(INPUT_DIR, filename)
            section_name = ' '.join(filename.split('_')[1:]).replace('.md', '')
            
            keywords = extract_keywords_from_file(file_path, section_name)
            for keyword, occurrences in keywords.items():
                all_keywords[keyword].extend(occurrences)
    
    # Process annexes
    for filename in sorted(os.listdir(ANNEXES_DIR)):
        if filename.endswith('.md'):
            file_path = os.path.join(ANNEXES_DIR, filename)
            section_name = 'Annexe ' + filename.split('_')[0] + ': ' + ' '.join(filename.split('_')[1:]).replace('.md', '')
            
            keywords = extract_keywords_from_file(file_path, section_name)
            for keyword, occurrences in keywords.items():
                all_keywords[keyword].extend(occurrences)
    
    # Group keywords by category
    categorized_keywords = defaultdict(dict)
    for keyword, occurrences in all_keywords.items():
        for category, keywords_list in KEYWORDS.items():
            if keyword in keywords_list:
                categorized_keywords[category][keyword] = occurrences
                break
    
    # Generate markdown content
    content = "# 🔍 Index Thématique\n\n"
    content += "Cet index vous permet de retrouver rapidement les informations par thème dans l'ensemble du guide.\n\n"
    
    # Create alphabetical index
    content += "## Index Alphabétique\n\n"
    content += "<div class=\"thematic-index\">\n"
    
    # Group all keywords alphabetically
    alpha_keywords = defaultdict(list)
    for keyword, occurrences in all_keywords.items():
        first_letter = keyword[0].upper()
        alpha_keywords[first_letter].append((keyword, occurrences))
    
    # Generate alphabetical index
    for letter in sorted(alpha_keywords.keys()):
        content += f"<div class=\"index-letter\">{letter}</div>\n\n"
        for keyword, occurrences in sorted(alpha_keywords[letter]):
            content += f"<div class=\"index-entry\">{keyword}: "
            sections = set()
            for occurrence in occurrences:
                sections.add(occurrence['section'])
            content += ", ".join([f"<a href=\"#{section.lower().replace(' ', '-')}\" class=\"section-link\">{section}</a>" for section in sorted(sections)])
            content += "</div>\n\n"
    
    content += "</div>\n\n"
    
    # Create categorical index
    content += "## Index par Catégorie\n\n"
    
    for category, keywords in sorted(categorized_keywords.items()):
        content += f"### {category}\n\n"
        for keyword, occurrences in sorted(keywords.items()):
            content += f"- **{keyword}**: "
            sections = set()
            for occurrence in occurrences:
                sections.add(occurrence['section'])
            content += ", ".join([f"[{section}](#{section.lower().replace(' ', '-')})" for section in sorted(sections)])
            content += "\n"
        content += "\n"
    
    # Add a section for personal notes
    content += "## Notes Personnelles\n\n"
    content += "<div class=\"personal-notes\">\n"
    content += "Utilisez cet espace pour ajouter vos propres notes et observations pendant votre séjour à Houston.\n\n"
    content += "- \n- \n- \n"
    content += "</div>\n\n"
    
    content += "---\n\n"
    content += "*[Retour à l'index](../index.html)*"
    
    # Write to file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Thematic index generated and saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_index()
