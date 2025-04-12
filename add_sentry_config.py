#!/usr/bin/env python3
"""
Script pour ajouter le script Sentry-config à toutes les pages HTML
"""

import os
from bs4 import BeautifulSoup

def add_sentry_config():
    """Ajoute le script Sentry-config à toutes les pages HTML"""
    print("Ajout du script Sentry-config à toutes les pages HTML...")
    
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
        
        # Vérifie si le fichier contient déjà le script Sentry-config
        if 'sentry-config.js' in content:
            print(f"✓ Le script Sentry-config est déjà présent dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve tous les scripts
        scripts = soup.find_all('script')
        
        # Vérifie si le fichier contient des scripts
        if not scripts:
            print(f"⚠️ Aucun script trouvé dans {file_name}")
            continue
        
        # Trouve le dernier script
        last_script = scripts[-1]
        
        # Crée le script Sentry-config
        sentry_config_script = soup.new_tag('script')
        sentry_config_script['src'] = 'assets/js/sentry-config.js'
        
        # Ajoute le script Sentry-config après le dernier script
        last_script.insert_after(sentry_config_script)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Script Sentry-config ajouté à {file_name}")
        modified_count += 1
    
    print(f"\nAjout terminé: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    add_sentry_config()
