#!/usr/bin/env python3
"""
Script pour ajouter le script Sentry à toutes les pages HTML
"""

import os
from bs4 import BeautifulSoup

def add_sentry():
    """Ajoute le script Sentry à toutes les pages HTML"""
    print("Ajout du script Sentry à toutes les pages HTML...")
    
    # Script Sentry à ajouter
    sentry_script = """<script
  src="https://js-de.sentry-cdn.com/7481e1968a00c3c547e6042e2a75faa8.min.js"
  crossorigin="anonymous"
></script>"""
    
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
        
        # Vérifie si le fichier contient déjà le script Sentry
        if 'sentry-cdn.com' in content:
            print(f"✓ Le script Sentry est déjà présent dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve la balise head
        head = soup.find('head')
        
        if not head:
            print(f"⚠️ Balise head introuvable dans {file_name}")
            continue
        
        # Crée le script Sentry
        sentry_soup = BeautifulSoup(sentry_script, 'html.parser')
        sentry_tag = sentry_soup.script
        
        # Ajoute le script Sentry à la fin de la balise head
        head.append(sentry_tag)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Script Sentry ajouté à {file_name}")
        modified_count += 1
    
    print(f"\nAjout terminé: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    add_sentry()
