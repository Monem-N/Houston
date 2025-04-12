#!/usr/bin/env python3
"""
Script pour mettre à jour les références JavaScript dans toutes les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def update_js_references():
    """Met à jour les références JavaScript dans toutes les pages HTML"""
    print("Mise à jour des références JavaScript dans toutes les pages HTML...")
    
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
        
        # Vérifie si le fichier contient une référence à maps.js
        if 'maps.js' not in content:
            print(f"✓ Aucune référence à maps.js trouvée dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve toutes les balises script
        scripts = soup.find_all('script')
        
        # Parcourt toutes les balises script
        for script in scripts:
            # Vérifie si la balise script fait référence à maps.js
            if script.get('src') and 'maps.js' in script['src']:
                # Remplace la référence par maps-improved.js
                script['src'] = script['src'].replace('maps.js', 'maps-improved.js')
                print(f"✅ Référence mise à jour dans {file_name}")
                modified_count += 1
                break
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    
    print(f"\nMise à jour terminée: {modified_count} fichiers ont été mis à jour")

if __name__ == "__main__":
    update_js_references()
