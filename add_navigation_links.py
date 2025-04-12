#!/usr/bin/env python3
"""
Script pour ajouter les liens vers la carte interactive et les itinéraires dans toutes les pages
"""

import os
import re
from bs4 import BeautifulSoup

def add_navigation_links():
    """Ajoute les liens vers la carte interactive et les itinéraires dans toutes les pages"""
    print("Ajout des liens de navigation dans toutes les pages...")
    
    # Liste des pages à exclure (déjà mises à jour)
    excluded_pages = ['index.html', 'carte_interactive.html', 'itineraires.html']
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html') and f not in excluded_pages]
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Mise à jour de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve la navigation
        nav = soup.find('nav', class_='nav-menu')
        if not nav:
            print(f"⚠️ Navigation non trouvée dans {file_name}")
            continue
        
        # Vérifie si les liens existent déjà
        links = nav.find_all('a')
        has_carte_link = any('carte_interactive.html' in link.get('href', '') for link in links)
        has_itineraires_link = any('itineraires.html' in link.get('href', '') for link in links)
        
        if has_carte_link and has_itineraires_link:
            print(f"✓ Liens déjà présents dans {file_name}")
            continue
        
        # Trouve le lien vers l'index
        index_link = None
        for link in links:
            if '09_Thematic_Index.html' in link.get('href', ''):
                index_link = link
                break
        
        if not index_link:
            print(f"⚠️ Lien vers l'index non trouvé dans {file_name}")
            continue
        
        # Ajoute les liens après le lien vers l'index
        if not has_carte_link:
            carte_link = soup.new_tag('a')
            carte_link['href'] = 'carte_interactive.html'
            carte_link.string = 'Carte'
            index_link.insert_after(carte_link)
        
        # Trouve le nouveau lien vers la carte ou l'ancien lien vers l'index
        after_link = carte_link if not has_carte_link else index_link
        
        if not has_itineraires_link:
            itineraires_link = soup.new_tag('a')
            itineraires_link['href'] = 'itineraires.html'
            itineraires_link.string = 'Itinéraires'
            after_link.insert_after(itineraires_link)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Liens ajoutés dans {file_name}")
        modified_count += 1
    
    print(f"\nMise à jour terminée: {modified_count}/{len(html_files)} fichiers ont été mis à jour")

if __name__ == "__main__":
    add_navigation_links()
