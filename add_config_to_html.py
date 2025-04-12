#!/usr/bin/env python3
"""
Script pour ajouter le fichier de configuration aux fichiers HTML
"""

import os
import re
from bs4 import BeautifulSoup

def add_config_to_html():
    """Ajoute le fichier de configuration aux fichiers HTML"""
    print("Ajout du fichier de configuration aux fichiers HTML...")
    
    # Liste des fichiers HTML qui utilisent les cartes Google Maps
    html_files = [
        "01_Introduction.html",
        "02_Space_Center_Kemah.html",
        "03_Shopping_Katy_Mills.html",
        "06_FIRST_Championship.html",
        "07_Museum_District.html",
        "08_Hermann_Park_Zoo.html",
        "carte_interactive.html",
        "itineraires.html"
    ]
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Traitement de {file_name}...")
        
        # Vérifie si le fichier existe
        if not os.path.exists(file_name):
            print(f"⚠️ Le fichier {file_name} n'existe pas")
            continue
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient déjà une référence au fichier de configuration
        if 'config.js' in content:
            print(f"✓ Le fichier {file_name} contient déjà une référence au fichier de configuration")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve tous les scripts
        scripts = soup.find_all('script')
        
        # Vérifie si le fichier contient des scripts
        if not scripts:
            print(f"⚠️ Le fichier {file_name} ne contient pas de scripts")
            continue
        
        # Trouve le premier script qui fait référence à maps-improved.js ou itineraries.js
        target_script = None
        for script in scripts:
            if script.get('src') and ('maps-improved.js' in script['src'] or 'itineraries.js' in script['src']):
                target_script = script
                break
        
        # Si aucun script cible n'est trouvé, utilise le premier script
        if not target_script and scripts:
            target_script = scripts[0]
        
        # Si aucun script n'est trouvé, passe au fichier suivant
        if not target_script:
            print(f"⚠️ Aucun script cible trouvé dans {file_name}")
            continue
        
        # Crée un nouveau script pour le fichier de configuration
        config_script = soup.new_tag('script')
        config_script['src'] = 'assets/js/config.js'
        
        # Insère le script de configuration avant le script cible
        target_script.insert_before(config_script)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Fichier de configuration ajouté à {file_name}")
        modified_count += 1
    
    print(f"\nAjout terminé: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    add_config_to_html()
