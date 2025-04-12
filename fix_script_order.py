#!/usr/bin/env python3
"""
Script pour vérifier et corriger l'ordre de chargement des scripts JavaScript
"""

import os
import re
from bs4 import BeautifulSoup

def fix_script_order():
    """Vérifie et corrige l'ordre de chargement des scripts JavaScript"""
    print("Vérification de l'ordre de chargement des scripts JavaScript...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à vérifier")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Traitement de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve tous les scripts
        scripts = soup.find_all('script')
        
        # Vérifie si le fichier contient des scripts
        if not scripts:
            print(f"✓ Aucun script trouvé dans {file_name}")
            continue
        
        # Trouve les scripts qui nous intéressent
        config_script = None
        maps_script = None
        analytics_script = None
        
        for script in scripts:
            if script.get('src'):
                if 'config.js' in script['src']:
                    config_script = script
                elif 'maps-improved.js' in script['src']:
                    maps_script = script
                elif 'analytics.js' in script['src']:
                    analytics_script = script
        
        # Vérifie si les scripts ont été trouvés
        if not config_script:
            print(f"✓ Aucun script config.js trouvé dans {file_name}")
            continue
        
        # Vérifie l'ordre de chargement des scripts
        needs_reordering = False
        
        # Vérifie si maps-improved.js est chargé après config.js
        if maps_script and scripts.index(maps_script) < scripts.index(config_script):
            print(f"⚠️ maps-improved.js est chargé avant config.js dans {file_name}")
            needs_reordering = True
        
        # Vérifie si analytics.js est chargé après config.js
        if analytics_script and scripts.index(analytics_script) < scripts.index(config_script):
            print(f"⚠️ analytics.js est chargé avant config.js dans {file_name}")
            needs_reordering = True
        
        # Réorganise les scripts si nécessaire
        if needs_reordering:
            # Trouve le dernier script avant config.js, maps-improved.js et analytics.js
            other_scripts = []
            for script in scripts:
                if script != config_script and script != maps_script and script != analytics_script:
                    other_scripts.append(script)
            
            # Trouve le dernier script avant config.js, maps-improved.js et analytics.js
            last_script = None
            for script in other_scripts:
                if script.get('src') and not ('config.js' in script['src'] or 'maps-improved.js' in script['src'] or 'analytics.js' in script['src']):
                    last_script = script
            
            # Si aucun script n'a été trouvé, utilise le premier script
            if not last_script and other_scripts:
                last_script = other_scripts[0]
            
            # Si aucun script n'a été trouvé, passe au fichier suivant
            if not last_script:
                print(f"⚠️ Impossible de trouver un script pour réorganiser dans {file_name}")
                continue
            
            # Supprime les scripts config.js, maps-improved.js et analytics.js
            if config_script:
                config_script.extract()
            if maps_script:
                maps_script.extract()
            if analytics_script:
                analytics_script.extract()
            
            # Insère les scripts dans le bon ordre après le dernier script
            if config_script:
                last_script.insert_after(config_script)
                last_script = config_script
            if maps_script:
                last_script.insert_after(maps_script)
                last_script = maps_script
            if analytics_script:
                last_script.insert_after(analytics_script)
            
            # Sauvegarde le fichier modifié
            with open(file_name, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            print(f"✅ Scripts réorganisés dans {file_name}")
            modified_count += 1
        else:
            print(f"✓ L'ordre des scripts est correct dans {file_name}")
    
    print(f"\nVérification terminée: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    fix_script_order()
