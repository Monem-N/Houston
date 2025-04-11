#!/usr/bin/env python3
"""
Script principal pour générer le guide de voyage HTML
"""

import os
import sys

# Ajouter le répertoire courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import DOCUMENT_ORDER, COVER_IMAGE, OUTPUT_HTML
from html_generator import TravelGuideHTML

def main():
    """
    Fonction principale pour générer le guide HTML
    """
    # Vérifier que tous les fichiers existent
    missing_files = []
    for doc in DOCUMENT_ORDER:
        if not os.path.exists(doc):
            missing_files.append(doc)
    
    if missing_files:
        print("Attention: Les fichiers suivants n'ont pas été trouvés:")
        for file in missing_files:
            print(f"  - {file}")
        print("\nVérifiez les noms de fichiers dans config.py")
    
    # Créer l'instance du générateur HTML
    html_guide = TravelGuideHTML()
    
    # Ajouter la page de couverture
    html_guide.add_cover(COVER_IMAGE)
    
    # Ajouter chaque document dans l'ordre spécifié
    for doc in DOCUMENT_ORDER:
        html_guide.add_markdown_file(doc)
    
    # Générer la table des matières après tout le contenu
    html_guide.add_toc()
    
    # Générer le fichier HTML final
    html_guide.generate_html(OUTPUT_HTML)
    
    print(f"Guide HTML généré avec succès: {OUTPUT_HTML}")

if __name__ == "__main__":
    # Changer le répertoire de travail au dossier Houston_Guide
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    main()
