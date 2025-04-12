#!/usr/bin/env python3
"""
Script pour ajouter des cartes Google Maps à toutes les pages d'attractions
"""

import re
from bs4 import BeautifulSoup

# Définition des pages et de leurs catégories
PAGE_CATEGORIES = {
    "01_Introduction.html": "hotels",
    "02_Space_Center_Kemah.html": "attractions",
    "03_Shopping_Katy_Mills.html": "shopping",
    "06_FIRST_Championship.html": "events",
    "07_Museum_District.html": "museums",
    "08_Hermann_Park_Zoo.html": "attractions"
}

def add_map_to_page(file_path, category):
    """Ajoute une carte Google Maps à une page"""
    print(f"Ajout d'une carte à {file_path}...")
    
    try:
        # Vérifie si le fichier existe
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si la page contient déjà une carte
        if 'id="page-map"' in content:
            print(f"✓ Une carte existe déjà dans {file_path}")
            return False
        
        # Vérifie si les fichiers CSS et JS sont déjà inclus
        css_included = 'maps.css' in content
        js_included = 'maps.js' in content
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Ajoute le lien CSS si nécessaire
        if not css_included:
            head = soup.find('head')
            if head:
                # Trouve le dernier lien CSS
                last_css = head.find_all('link', rel='stylesheet')[-1]
                # Crée un nouveau lien CSS
                maps_css = soup.new_tag('link')
                maps_css['rel'] = 'stylesheet'
                maps_css['href'] = 'assets/css/maps.css'
                # Insère après le dernier lien CSS
                last_css.insert_after(maps_css)
        
        # Ajoute le script JS si nécessaire
        if not js_included:
            # Trouve le dernier script
            scripts = soup.find_all('script')
            if scripts:
                last_script = None
                for script in scripts:
                    if script.get('src') and ('main.js' in script['src'] or 'gallery.js' in script['src']):
                        last_script = script
                
                if last_script:
                    # Crée un nouveau script
                    maps_js = soup.new_tag('script')
                    maps_js['src'] = 'assets/js/maps.js'
                    # Insère après le dernier script
                    last_script.insert_after(maps_js)
        
        # Ajoute le lien vers la page de carte interactive dans la navigation
        nav = soup.find('nav', class_='nav-menu')
        if nav:
            # Vérifie si le lien existe déjà
            carte_link_exists = False
            for a in nav.find_all('a'):
                if 'carte_interactive.html' in a.get('href', ''):
                    carte_link_exists = True
                    break
            
            # Ajoute le lien s'il n'existe pas déjà
            if not carte_link_exists:
                # Trouve le dernier lien
                links = nav.find_all('a')
                if links:
                    last_link = links[-1]
                    # Crée un nouveau lien
                    carte_link = soup.new_tag('a')
                    carte_link['href'] = 'carte_interactive.html'
                    carte_link.string = 'Carte'
                    # Insère avant le dernier lien si c'est "Feedback"
                    if 'feedback.html' in last_link.get('href', ''):
                        last_link.insert_before(carte_link)
                    else:
                        # Sinon, insère après le dernier lien
                        last_link.insert_after(carte_link)
        
        # Trouve un bon endroit pour insérer la carte
        # Cherche d'abord une galerie d'images
        gallery = soup.find('div', class_='image-gallery')
        if gallery:
            # Crée la section de carte
            map_h2 = soup.new_tag('h2')
            map_h2['id'] = 'carte-interactive'
            emoji_span = soup.new_tag('span')
            emoji_span['class'] = 'emoji'
            emoji_span.string = '📍'
            map_h2.append(emoji_span)
            map_h2.append(' Carte Interactive')
            
            map_p = soup.new_tag('p')
            map_p.string = f'Localisez facilement les points d\'intérêt sur cette carte interactive.'
            
            map_div = soup.new_tag('div')
            map_div['id'] = 'page-map'
            map_div['class'] = 'map-container'
            map_div['data-category'] = category
            
            # Insère avant la galerie
            gallery_h2 = gallery.find_previous('h2')
            if gallery_h2:
                gallery_h2.insert_before(map_h2)
                map_h2.insert_after(map_p)
                map_p.insert_after(map_div)
            else:
                # Si pas de h2, insère avant la galerie directement
                gallery.insert_before(map_h2)
                map_h2.insert_after(map_p)
                map_p.insert_after(map_div)
        else:
            # Cherche une section avec un h2
            sections = soup.find_all('h2')
            if sections:
                # Insère après le premier h2
                first_section = sections[0]
                # Crée la section de carte
                map_h2 = soup.new_tag('h2')
                map_h2['id'] = 'carte-interactive'
                emoji_span = soup.new_tag('span')
                emoji_span['class'] = 'emoji'
                emoji_span.string = '📍'
                map_h2.append(emoji_span)
                map_h2.append(' Carte Interactive')
                
                map_p = soup.new_tag('p')
                map_p.string = f'Localisez facilement les points d\'intérêt sur cette carte interactive.'
                
                map_div = soup.new_tag('div')
                map_div['id'] = 'page-map'
                map_div['class'] = 'map-container'
                map_div['data-category'] = category
                
                # Insère après le premier h2 et son contenu
                next_h2 = first_section.find_next('h2')
                if next_h2:
                    next_h2.insert_before(map_h2)
                    map_h2.insert_after(map_p)
                    map_p.insert_after(map_div)
                else:
                    # Si pas de h2 suivant, insère à la fin du main
                    main = soup.find('main')
                    if main:
                        main.append(map_h2)
                        main.append(map_p)
                        main.append(map_div)
            else:
                print(f"⚠️ Aucun endroit approprié trouvé pour insérer la carte dans {file_path}")
                return False
        
        # Sauvegarde le fichier mis à jour
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Carte ajoutée à {file_path}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors de l'ajout de la carte à {file_path}: {e}")
        return False

def main():
    """Fonction principale"""
    print("Ajout de cartes Google Maps aux pages d'attractions...")
    
    # Ajoute des cartes à toutes les pages définies
    success_count = 0
    for file_path, category in PAGE_CATEGORIES.items():
        if add_map_to_page(file_path, category):
            success_count += 1
    
    print(f"\nAjout terminé: {success_count}/{len(PAGE_CATEGORIES)} pages ont été mises à jour")

if __name__ == "__main__":
    main()
