#!/usr/bin/env python3
"""
Script pour vérifier que le menu est correctement structuré dans toutes les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def check_menu_structure():
    """Vérifie que le menu est correctement structuré dans toutes les pages HTML"""
    print("Vérification de la structure du menu dans toutes les pages HTML...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à vérifier")
    
    # Compte les fichiers avec un menu correct
    correct_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Vérification de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Vérifie si le fichier contient un menu
        menu_toggle = soup.select_one('.menu-toggle')
        nav_menu = soup.select_one('.nav-menu')
        
        if menu_toggle and nav_menu:
            # Vérifie si le menu toggle a l'attribut aria-expanded
            if menu_toggle.has_attr('aria-expanded'):
                # Vérifie si le menu contient des liens
                menu_links = nav_menu.find_all('a')
                if menu_links:
                    print(f"✅ Menu correctement structuré dans {file_name} ({len(menu_links)} liens)")
                    correct_count += 1
                else:
                    print(f"❌ Menu sans liens dans {file_name}")
            else:
                print(f"❌ Menu toggle sans attribut aria-expanded dans {file_name}")
        else:
            print(f"⚠️ Aucun menu trouvé dans {file_name}")
    
    print(f"\nVérification terminée: {correct_count}/{len(html_files)} fichiers ont un menu correctement structuré")

if __name__ == "__main__":
    check_menu_structure()
