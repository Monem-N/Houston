#!/usr/bin/env python3
"""
Script pour vérifier si main.js est correctement chargé dans toutes les pages HTML
"""

import os
from bs4 import BeautifulSoup

def check_main_js():
    """Vérifie si main.js est correctement chargé dans toutes les pages HTML"""
    print("Vérification de main.js dans toutes les pages HTML...")
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à vérifier")
    
    # Compte les fichiers avec main.js
    main_js_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Vérification de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient une référence à main.js
        if 'main.js' in content:
            print(f"✅ main.js trouvé dans {file_name}")
            main_js_count += 1
        else:
            print(f"❌ main.js non trouvé dans {file_name}")
    
    print(f"\nVérification terminée: {main_js_count}/{len(html_files)} fichiers contiennent main.js")

if __name__ == "__main__":
    check_main_js()
