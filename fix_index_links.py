#!/usr/bin/env python3
"""
Script pour corriger les liens "Retour à l'index" qui pointent vers ../index.md
"""

import os
import re
from bs4 import BeautifulSoup

def get_html_files():
    """Récupère toutes les pages HTML dans le répertoire racine"""
    html_files = []
    for file in os.listdir('.'):
        if file.endswith('.html') and file not in ['page-template.html']:
            html_files.append(file)
    return html_files

def fix_index_links(file_path):
    """Corrige les liens vers ../index.md dans un fichier HTML"""
    print(f"Vérification de {file_path}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient des liens vers ../index.md
        if '../index.md' not in content and 'Retour à l\'index' not in content:
            print(f"✓ Aucun lien incorrect trouvé dans {file_path}")
            return False
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Recherche les liens vers ../index.md
        links_fixed = False
        for a in soup.find_all('a', href=lambda href: href and '../index.md' in href):
            a['href'] = 'index.html'
            links_fixed = True
        
        # Recherche également les paragraphes contenant "Retour à l'index"
        for p in soup.find_all('p'):
            if 'Retour à l\'index' in p.text:
                links = p.find_all('a')
                for a in links:
                    a['href'] = 'index.html'
                    links_fixed = True
        
        # Recherche les liens dans les balises hr suivies de p
        for hr in soup.find_all('hr'):
            next_p = hr.find_next('p')
            if next_p and 'Retour à l\'index' in next_p.text:
                links = next_p.find_all('a')
                for a in links:
                    a['href'] = 'index.html'
                    links_fixed = True
        
        if not links_fixed:
            print(f"✓ Aucun lien incorrect trouvé dans {file_path} (après analyse)")
            return False
        
        # Sauvegarde le fichier mis à jour
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Liens corrigés dans {file_path}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors de la correction des liens dans {file_path}: {e}")
        return False

def main():
    """Fonction principale"""
    print("Début de la correction des liens vers l'index...")
    
    # Récupère la liste des fichiers HTML
    html_files = get_html_files()
    print(f"Trouvé {len(html_files)} fichiers HTML à vérifier")
    
    # Corrige les liens dans chaque fichier
    fixed_count = 0
    for file in html_files:
        if fix_index_links(file):
            fixed_count += 1
    
    print(f"\nCorrection terminée: {fixed_count} fichiers ont été mis à jour")

if __name__ == "__main__":
    main()
