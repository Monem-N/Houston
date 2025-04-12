#!/usr/bin/env python3
"""
Script pour corriger le menu "Dans cette section" dans toutes les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def fix_all_quick_navs():
    """Corrige le menu "Dans cette section" dans toutes les pages HTML"""
    print("Correction du menu 'Dans cette section' dans toutes les pages HTML...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à vérifier")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Vérification de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient un menu "Dans cette section"
        if 'class="quick-nav"' not in content and '<div class="quick-nav">' not in content:
            print(f"✓ Aucun menu 'Dans cette section' trouvé dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve le menu "Dans cette section"
        quick_nav = soup.select_one('.quick-nav')
        
        if not quick_nav:
            print(f"⚠️ Menu 'Dans cette section' introuvable dans {file_name} malgré la présence de la classe")
            continue
        
        # Vérifie si le menu a déjà été transformé par le JavaScript
        quick_nav_header = quick_nav.select_one('.quick-nav-header')
        
        if quick_nav_header:
            print(f"✓ Menu 'Dans cette section' déjà transformé dans {file_name}")
            continue
        
        # Vérifie si le menu contient un titre h4
        heading = quick_nav.select_one('h4')
        
        if not heading:
            # Ajoute un titre h4 si nécessaire
            heading = soup.new_tag('h4')
            heading.string = 'Dans cette section'
            quick_nav.insert(0, heading)
            print(f"✅ Titre h4 ajouté au menu 'Dans cette section' dans {file_name}")
            modified_count += 1
        
        # Vérifie si le menu contient une liste ul
        ul = quick_nav.select_one('ul')
        
        if not ul:
            print(f"⚠️ Menu 'Dans cette section' sans liste ul dans {file_name}")
            continue
        
        # Vérifie si le menu contient des liens
        links = ul.select('a')
        
        if not links:
            print(f"⚠️ Menu 'Dans cette section' sans liens dans {file_name}")
            continue
        
        print(f"✓ Menu 'Dans cette section' correctement structuré dans {file_name} ({len(links)} liens)")
        
        # Vérifie si le fichier contient une référence à main.js
        scripts = soup.select('script')
        main_js_found = False
        
        for script in scripts:
            if script.get('src') and 'main.js' in script['src']:
                main_js_found = True
                break
        
        if not main_js_found:
            # Ajoute main.js si nécessaire
            main_js = soup.new_tag('script')
            main_js['src'] = 'assets/js/main.js'
            
            # Trouve le dernier script
            last_script = None
            for script in scripts:
                if script.get('src'):
                    last_script = script
            
            if last_script:
                last_script.insert_after(main_js)
                print(f"✅ Référence à main.js ajoutée dans {file_name}")
                modified_count += 1
            else:
                # Ajoute à la fin du body
                body = soup.select_one('body')
                if body:
                    body.append(main_js)
                    print(f"✅ Référence à main.js ajoutée à la fin du body dans {file_name}")
                    modified_count += 1
                else:
                    print(f"⚠️ Impossible d'ajouter main.js dans {file_name} (pas de body)")
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    
    print(f"\nCorrection terminée: {modified_count} fichiers ont été modifiés")

if __name__ == "__main__":
    fix_all_quick_navs()
