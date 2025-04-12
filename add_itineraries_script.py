#!/usr/bin/env python3
"""
Script pour ajouter le script itineraries.js à toutes les pages
"""

import os
import re
from bs4 import BeautifulSoup

def add_itineraries_script():
    """Ajoute le script itineraries.js à toutes les pages"""
    print("Ajout du script itineraries.js à toutes les pages...")
    
    # Liste des pages à exclure (déjà mises à jour)
    excluded_pages = ['itineraires.html']
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html') and f not in excluded_pages]
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Mise à jour de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le script est déjà inclus
        if 'itineraries.js' in content:
            print(f"✓ Script déjà présent dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Vérifie si le fichier contient des scripts
        scripts = soup.find_all('script')
        if not scripts:
            print(f"⚠️ Aucun script trouvé dans {file_name}")
            continue
        
        # Vérifie si le fichier contient le script maps.js
        maps_script = None
        for script in scripts:
            if script.get('src') and 'maps.js' in script['src']:
                maps_script = script
                break
        
        if not maps_script:
            print(f"⚠️ Script maps.js non trouvé dans {file_name}")
            continue
        
        # Crée un nouveau script pour itineraries.js
        itineraries_script = soup.new_tag('script')
        itineraries_script['src'] = 'assets/js/itineraries.js'
        
        # Ajoute le script après maps.js
        maps_script.insert_after(itineraries_script)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Script ajouté dans {file_name}")
        modified_count += 1
    
    print(f"\nMise à jour terminée: {modified_count}/{len(html_files)} fichiers ont été mis à jour")

if __name__ == "__main__":
    add_itineraries_script()
