#!/usr/bin/env python3
"""
Script pour corriger les problèmes de contenu mixte (HTTP/HTTPS)
"""

import os
import re
from bs4 import BeautifulSoup

def fix_mixed_content():
    """Corrige les problèmes de contenu mixte (HTTP/HTTPS)"""
    print("Correction des problèmes de contenu mixte (HTTP/HTTPS)...")
    
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
        
        # Vérifie si le fichier contient des URL HTTP
        if 'http://' not in content:
            print(f"✓ Aucune URL HTTP trouvée dans {file_name}")
            continue
        
        # Remplace les URL HTTP par HTTPS
        new_content = content.replace('http://', 'https://')
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ URLs HTTP remplacées par HTTPS dans {file_name}")
        modified_count += 1
    
    # Trouve tous les fichiers JavaScript
    js_files = [f for f in os.listdir('assets/js') if f.endswith('.js')]
    print(f"Trouvé {len(js_files)} fichiers JavaScript à vérifier")
    
    # Parcourt tous les fichiers JavaScript
    for file_name in js_files:
        print(f"Traitement de assets/js/{file_name}...")
        
        # Lit le contenu du fichier
        with open(f'assets/js/{file_name}', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient des URL HTTP
        if 'http://' not in content:
            print(f"✓ Aucune URL HTTP trouvée dans assets/js/{file_name}")
            continue
        
        # Remplace les URL HTTP par HTTPS
        new_content = content.replace('http://', 'https://')
        
        # Sauvegarde le fichier modifié
        with open(f'assets/js/{file_name}', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ URLs HTTP remplacées par HTTPS dans assets/js/{file_name}")
        modified_count += 1
    
    print(f"\nCorrection terminée: {modified_count} fichiers ont été modifiés")

if __name__ == "__main__":
    fix_mixed_content()
