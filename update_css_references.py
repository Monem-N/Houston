#!/usr/bin/env python3
"""
Script pour mettre à jour les références CSS dans toutes les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def update_css_references():
    """Met à jour les références CSS dans toutes les pages HTML"""
    print("Mise à jour des références CSS dans toutes les pages HTML...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Mise à jour de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient une référence à maps.css
        if 'maps.css' not in content:
            print(f"✓ Aucune référence à maps.css trouvée dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve toutes les balises link
        links = soup.find_all('link', rel='stylesheet')
        
        # Parcourt toutes les balises link
        for link in links:
            # Vérifie si la balise link fait référence à maps.css
            if 'maps.css' in link.get('href', ''):
                # Remplace la référence par maps-improved.css
                link['href'] = link['href'].replace('maps.css', 'maps-improved.css')
                print(f"✅ Référence mise à jour dans {file_name}")
                modified_count += 1
                break
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    
    print(f"\nMise à jour terminée: {modified_count} fichiers ont été mis à jour")

if __name__ == "__main__":
    update_css_references()
