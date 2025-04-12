#!/usr/bin/env python3
"""
Script pour mettre à jour les scripts Google Analytics dans tous les fichiers HTML
"""

import os
import re
from bs4 import BeautifulSoup

def update_analytics():
    """Met à jour les scripts Google Analytics dans tous les fichiers HTML"""
    print("Mise à jour des scripts Google Analytics dans tous les fichiers HTML...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Traitement de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient un script Google Analytics
        if 'googletagmanager.com/gtag/js' not in content:
            print(f"✓ Aucun script Google Analytics trouvé dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve le script Google Analytics
        gtag_script = None
        analytics_script = None
        config_script = None
        
        for script in soup.find_all('script'):
            if script.get('src') and 'googletagmanager.com/gtag/js' in script['src']:
                gtag_script = script
            elif script.get('src') and 'analytics.js' in script['src']:
                analytics_script = script
            elif script.get('src') and 'config.js' in script['src']:
                config_script = script
        
        # Vérifie si le script Google Analytics a été trouvé
        if not gtag_script:
            print(f"⚠️ Script Google Analytics introuvable dans {file_name} malgré la présence de 'googletagmanager.com/gtag/js'")
            continue
        
        # Met à jour l'ID Google Analytics
        gtag_script['src'] = 'https://www.googletagmanager.com/gtag/js?id=G-KHZ18QKRHG'
        
        # Vérifie si le script analytics.js a été trouvé
        if not analytics_script:
            print(f"⚠️ Script analytics.js introuvable dans {file_name}")
            continue
        
        # Vérifie si le script config.js a été trouvé
        if not config_script:
            # Crée un nouveau script pour config.js
            config_script = soup.new_tag('script')
            config_script['src'] = 'assets/js/config.js'
            
            # Insère le script config.js avant le script analytics.js
            analytics_script.insert_before(config_script)
            print(f"✅ Script config.js ajouté avant analytics.js dans {file_name}")
            modified_count += 1
        else:
            # Vérifie si config.js est chargé avant analytics.js
            if soup.find_all('script').index(config_script) > soup.find_all('script').index(analytics_script):
                # Déplace config.js avant analytics.js
                config_script.extract()
                analytics_script.insert_before(config_script)
                print(f"✅ Script config.js déplacé avant analytics.js dans {file_name}")
                modified_count += 1
            else:
                print(f"✓ Script config.js déjà chargé avant analytics.js dans {file_name}")
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Scripts Google Analytics mis à jour dans {file_name}")
        modified_count += 1
    
    print(f"\nMise à jour terminée: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    update_analytics()
