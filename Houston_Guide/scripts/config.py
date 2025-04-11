#!/usr/bin/env python3
"""
Configuration pour le générateur de guide de voyage
"""

# Chemin vers l'image de couverture
COVER_IMAGE = "/Users/monemnaifer/Dev/Houston/front_page.png"

# Chemin de sortie pour le fichier HTML
OUTPUT_HTML = "/Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025.html"

# Chemin de sortie pour le fichier PDF (si utilisé)
OUTPUT_PDF = "/Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025.pdf"

# Ordre des documents dans le guide
DOCUMENT_ORDER = [
    "Introduction_et_Sommaire.md",
    "Journées_14-15_et_23-24_avril_2025_-_Guide_Arrivée_et_Départ.md",
    "Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final.md",
    "Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé.md",
    "Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final.md",
    "Journée_22_avril_2025_-_Guide_Museum_District_Détaillé.md",
    "Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé.md",
    "Transport_Local_pour_le_FIRST_Championship_2025.md",
    "Guide_Gastronomique_et_Shopping_-_Houston_Authentique.md",
    "Guide_Local_Houston___Manger_Acheter.md",
    "Annexe_-_Downtown_Houston_à_Explorer.md",
    "Guide_Pratique_Touristanbul.md",
    "Touristanbul.md",
    "Guide_Activités_Enfants_-_Houston_pour_les_10_ans.md"
]

# Métadonnées du document
METADATA = {
    "title": "Guide de Voyage Houston 2025",
    "description": "Guide complet pour le voyage à Houston pour le FIRST Championship 2025",
    "author": "Monem Naifer",
    "keywords": "Houston, FIRST Championship, voyage, guide, 2025"
}

# Configuration des couleurs et du style
COLORS = {
    "primary": "#1a73e8",
    "secondary": "#f8f9fa",
    "accent": "#fbbc04",
    "text": "#202124",
    "light_text": "#5f6368",
    "background": "#ffffff",
    "section_bg": "#f8f9fa",
    "cover_bg": "#f0f0f0"
}

# Emojis pour les sections
SECTION_EMOJIS = {
    "introduction": "📚",
    "arrivée": "✈️",
    "championship": "🤖",
    "space": "🚀",
    "shopping": "🛍️",
    "museum": "🏛️",
    "zoo": "🦁",
    "transport": "🚌",
    "gastronomie": "🍽️",
    "local": "🏙️",
    "downtown": "🌆",
    "touristanbul": "🇹🇷",
    "enfants": "👶"
}
