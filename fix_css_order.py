#!/usr/bin/env python3
"""
Script pour s'assurer que tous les fichiers HTML incluent maps-improved.css après improved-style.css
"""

import os
import re
from bs4 import BeautifulSoup

def fix_css_order():
    """S'assure que tous les fichiers HTML incluent maps-improved.css après improved-style.css"""
    print("Vérification de l'ordre des fichiers CSS dans toutes les pages HTML...")
    
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
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve toutes les balises link
        links = soup.find_all('link', rel='stylesheet')
        
        # Vérifie si le fichier contient une référence à improved-style.css
        improved_style_link = None
        maps_improved_link = None
        
        for link in links:
            href = link.get('href', '')
            if 'improved-style.css' in href:
                improved_style_link = link
            elif 'maps-improved.css' in href:
                maps_improved_link = link
        
        # Si le fichier ne contient pas de référence à improved-style.css, passe au fichier suivant
        if not improved_style_link:
            print(f"⚠️ Aucune référence à improved-style.css trouvée dans {file_name}")
            continue
        
        # Si le fichier ne contient pas de référence à maps-improved.css, l'ajoute après improved-style.css
        if not maps_improved_link:
            # Vérifie si le fichier contient une référence à maps.css
            maps_link = None
            for link in links:
                href = link.get('href', '')
                if 'maps.css' in href and 'maps-improved.css' not in href:
                    maps_link = link
            
            # Si le fichier contient une référence à maps.css, la remplace par maps-improved.css
            if maps_link:
                maps_link['href'] = maps_link['href'].replace('maps.css', 'maps-improved.css')
                print(f"✅ Référence à maps.css remplacée par maps-improved.css dans {file_name}")
                modified_count += 1
            # Sinon, ajoute une référence à maps-improved.css après improved-style.css
            else:
                # Vérifie si le fichier contient des cartes ou des itinéraires
                if 'map-container' in content or 'itinerary-controls' in content:
                    # Crée une nouvelle balise link
                    maps_improved_link = soup.new_tag('link')
                    maps_improved_link['rel'] = 'stylesheet'
                    maps_improved_link['href'] = 'assets/css/maps-improved.css'
                    
                    # Insère après improved-style.css
                    improved_style_link.insert_after(maps_improved_link)
                    
                    print(f"✅ Référence à maps-improved.css ajoutée dans {file_name}")
                    modified_count += 1
                else:
                    print(f"✓ Aucune carte ou itinéraire trouvé dans {file_name}, pas besoin d'ajouter maps-improved.css")
        else:
            # Vérifie si maps-improved.css est chargé après improved-style.css
            if links.index(maps_improved_link) < links.index(improved_style_link):
                # Déplace maps-improved.css après improved-style.css
                maps_improved_link.extract()
                improved_style_link.insert_after(maps_improved_link)
                
                print(f"✅ Ordre des fichiers CSS corrigé dans {file_name}")
                modified_count += 1
            else:
                print(f"✓ Ordre des fichiers CSS correct dans {file_name}")
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
    
    print(f"\nVérification terminée: {modified_count} fichiers ont été modifiés")

if __name__ == "__main__":
    fix_css_order()
