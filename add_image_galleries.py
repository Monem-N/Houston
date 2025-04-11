#!/usr/bin/env python3
"""
Script pour ajouter des galeries d'images à toutes les pages HTML du site Houston 2025
"""

import os
import re
from bs4 import BeautifulSoup
import json

# Définition des images par page
PAGE_IMAGES = {
    "01_Introduction.html": [
        {"src": "assets/images/general/houston-skyline.jpg", "alt": "Skyline de Houston", "caption": "La magnifique skyline de Houston"},
        {"src": "assets/images/events/first-championship-1.jpg", "alt": "FIRST Championship Houston", "caption": "FIRST Championship - Compétition de robotique"},
        {"src": "assets/images/general/houston-downtown.jpg", "alt": "Centre-ville de Houston", "caption": "Le centre-ville animé de Houston"}
    ],
    "02_Space_Center_Kemah.html": [
        {"src": "assets/images/attractions/space-center-1.jpg", "alt": "Entrée du Space Center Houston", "caption": "Entrée principale du Space Center Houston"},
        {"src": "assets/images/attractions/space-center-2.jpg", "alt": "Fusée Saturn V au Space Center", "caption": "L'impressionnante fusée Saturn V"},
        {"src": "assets/images/attractions/kemah-boardwalk-1.jpg", "alt": "Vue panoramique de Kemah Boardwalk", "caption": "Vue panoramique de Kemah Boardwalk"},
        {"src": "assets/images/attractions/kemah-boardwalk-2.jpg", "alt": "Attractions à Kemah Boardwalk", "caption": "Manèges et attractions à Kemah Boardwalk"}
    ],
    "03_Shopping_Katy_Mills.html": [
        {"src": "assets/images/attractions/katy-mills-1.jpg", "alt": "Entrée de Katy Mills", "caption": "Entrée principale du centre commercial Katy Mills"},
        {"src": "assets/images/attractions/katy-mills-2.jpg", "alt": "Intérieur de Katy Mills", "caption": "Intérieur spacieux du centre commercial"}
    ],
    "04_Safety_Logistics.html": [
        {"src": "assets/images/general/houston-metro.jpg", "alt": "Métro de Houston", "caption": "Le système de métro léger de Houston"},
        {"src": "assets/images/general/houston-map.jpg", "alt": "Carte de Houston", "caption": "Carte des principaux quartiers de Houston"}
    ],
    "05_Gastronomie.html": [
        {"src": "assets/images/restaurants/houston-restaurant-1.jpg", "alt": "Restaurant texan", "caption": "Un authentique restaurant texan"},
        {"src": "assets/images/restaurants/houston-bbq.jpg", "alt": "BBQ texan", "caption": "Le célèbre BBQ texan, une spécialité locale"},
        {"src": "assets/images/restaurants/houston-mexican.jpg", "alt": "Cuisine tex-mex", "caption": "Délicieuse cuisine tex-mex"}
    ],
    "06_FIRST_Championship.html": [
        {"src": "assets/images/events/first-championship-1.jpg", "alt": "FIRST Championship arena", "caption": "L'arène principale du FIRST Championship"},
        {"src": "assets/images/events/first-championship-2.jpg", "alt": "Robots en compétition", "caption": "Robots en pleine compétition"},
        {"src": "assets/images/events/first-championship-3.jpg", "alt": "Équipes au travail", "caption": "Les équipes travaillant sur leurs robots"}
    ],
    "07_Museum_District.html": [
        {"src": "assets/images/attractions/museum-district-1.jpg", "alt": "Musée des sciences naturelles", "caption": "Le musée des sciences naturelles de Houston"},
        {"src": "assets/images/attractions/museum-district-2.jpg", "alt": "Musée des beaux-arts", "caption": "Le musée des beaux-arts de Houston"}
    ],
    "08_Hermann_Park_Zoo.html": [
        {"src": "assets/images/attractions/hermann-park-1.jpg", "alt": "Hermann Park", "caption": "Le magnifique Hermann Park"},
        {"src": "assets/images/attractions/houston-zoo-1.jpg", "alt": "Zoo de Houston", "caption": "Une des attractions du Zoo de Houston"}
    ]
}

# Création des fichiers d'images manquants
def create_missing_images():
    """Crée les fichiers d'images manquants (placeholders)"""
    for page, images in PAGE_IMAGES.items():
        for img in images:
            img_path = img["src"]
            directory = os.path.dirname(img_path)
            
            # Crée le répertoire s'il n'existe pas
            if not os.path.exists(directory):
                os.makedirs(directory, exist_ok=True)
            
            # Crée le fichier d'image s'il n'existe pas
            if not os.path.exists(img_path):
                with open(img_path, 'w', encoding='utf-8') as f:
                    f.write("<!-- This is a placeholder for an actual image file. In a real implementation, you would upload actual JPG files here. -->")
                print(f"Créé le placeholder pour {img_path}")

def add_gallery_to_file(file_path):
    """Ajoute une galerie d'images à un fichier HTML"""
    if file_path not in PAGE_IMAGES:
        print(f"Aucune image définie pour {file_path}, ignoré")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Vérifie si une galerie existe déjà
        existing_gallery = soup.find('div', class_='image-gallery')
        if existing_gallery:
            print(f"Une galerie existe déjà dans {file_path}, ignoré")
            return False
        
        # Trouve la première section
        section = soup.find('section', class_='section')
        if not section:
            section = soup.find('section')
        
        if not section:
            print(f"Aucune section trouvée dans {file_path}, ignoré")
            return False
        
        # Trouve le premier h2 dans la section
        h2 = section.find('h2')
        if not h2:
            print(f"Aucun h2 trouvé dans la section de {file_path}, ignoré")
            return False
        
        # Crée la galerie
        gallery_h2 = soup.new_tag('h2')
        gallery_h2['id'] = 'galerie-photos'
        emoji_span = soup.new_tag('span')
        emoji_span['class'] = 'emoji'
        emoji_span.string = '📸'
        gallery_h2.append(emoji_span)
        gallery_h2.append(' Galerie Photos')
        
        gallery_div = soup.new_tag('div')
        gallery_div['class'] = 'image-gallery'
        
        # Ajoute les images à la galerie
        for img_data in PAGE_IMAGES[file_path]:
            figure = soup.new_tag('figure')
            
            img = soup.new_tag('img')
            img['src'] = img_data['src']
            img['alt'] = img_data['alt']
            img['loading'] = 'lazy'
            
            figcaption = soup.new_tag('figcaption')
            figcaption.string = img_data['caption']
            
            figure.append(img)
            figure.append(figcaption)
            gallery_div.append(figure)
        
        # Insère la galerie après le premier paragraphe qui suit le h2
        p = h2.find_next('p')
        if p:
            p.insert_after(gallery_div)
            gallery_div.insert_before(gallery_h2)
        else:
            h2.insert_after(gallery_div)
            gallery_div.insert_before(gallery_h2)
        
        # Sauvegarde le fichier mis à jour
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Galerie ajoutée à {file_path}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors de l'ajout de la galerie à {file_path}: {e}")
        return False

def add_action_buttons(file_path):
    """Ajoute des boutons d'action pour les liens externes"""
    # Définition des boutons d'action par page
    ACTION_BUTTONS = {
        "02_Space_Center_Kemah.html": [
            {"text": "Site officiel Space Center", "url": "https://spacecenter.org/", "icon": "🌐", "class": "button"},
            {"text": "Billets Space Center", "url": "https://spacecenter.org/tickets/", "icon": "🎟️", "class": "button button-secondary"},
            {"text": "Site officiel Kemah", "url": "https://www.kemahboardwalk.com/", "icon": "🌐", "class": "button"}
        ],
        "03_Shopping_Katy_Mills.html": [
            {"text": "Site officiel Katy Mills", "url": "https://www.simon.com/mall/katy-mills", "icon": "🌐", "class": "button"},
            {"text": "Plan du centre", "url": "https://www.simon.com/mall/katy-mills/map", "icon": "🗺️", "class": "button button-secondary"}
        ],
        "06_FIRST_Championship.html": [
            {"text": "Site officiel FIRST", "url": "https://www.firstinspires.org/", "icon": "🌐", "class": "button"},
            {"text": "Calendrier FIRST Championship", "url": "https://www.firstchampionship.org/houston-schedule", "icon": "📅", "class": "button button-secondary"}
        ],
        "07_Museum_District.html": [
            {"text": "Site du Museum District", "url": "https://houmuse.org/", "icon": "🌐", "class": "button"},
            {"text": "Musée des sciences naturelles", "url": "https://www.hmns.org/", "icon": "🔬", "class": "button button-secondary"}
        ],
        "08_Hermann_Park_Zoo.html": [
            {"text": "Site de Hermann Park", "url": "https://hermannpark.org/", "icon": "🌐", "class": "button"},
            {"text": "Site du Zoo de Houston", "url": "https://www.houstonzoo.org/", "icon": "🦁", "class": "button button-secondary"}
        ]
    }
    
    if file_path not in ACTION_BUTTONS:
        print(f"Aucun bouton d'action défini pour {file_path}, ignoré")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Vérifie si des boutons d'action existent déjà
        existing_buttons = soup.find('div', class_='action-buttons')
        if existing_buttons:
            print(f"Des boutons d'action existent déjà dans {file_path}, ignoré")
            return False
        
        # Trouve la première section
        section = soup.find('section', class_='section')
        if not section:
            section = soup.find('section')
        
        if not section:
            print(f"Aucune section trouvée dans {file_path}, ignoré")
            return False
        
        # Trouve le premier h2 dans la section
        h2 = section.find('h2')
        if not h2:
            print(f"Aucun h2 trouvé dans la section de {file_path}, ignoré")
            return False
        
        # Crée les boutons d'action
        buttons_div = soup.new_tag('div')
        buttons_div['class'] = 'action-buttons'
        
        # Ajoute les boutons
        for button_data in ACTION_BUTTONS[file_path]:
            a = soup.new_tag('a')
            a['href'] = button_data['url']
            a['class'] = button_data['class']
            a['target'] = '_blank'
            a['rel'] = 'noopener'
            
            icon_span = soup.new_tag('span')
            icon_span['class'] = 'icon'
            icon_span.string = button_data['icon']
            
            a.append(icon_span)
            a.append(' ' + button_data['text'])
            
            buttons_div.append(a)
        
        # Insère les boutons après le premier paragraphe qui suit le h2
        p = h2.find_next('p')
        if p:
            p.insert_after(buttons_div)
        else:
            h2.insert_after(buttons_div)
        
        # Sauvegarde le fichier mis à jour
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Boutons d'action ajoutés à {file_path}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors de l'ajout des boutons d'action à {file_path}: {e}")
        return False

def main():
    """Fonction principale"""
    print("Création des fichiers d'images manquants...")
    create_missing_images()
    
    print("\nAjout des galeries d'images aux pages HTML...")
    for file_path in PAGE_IMAGES.keys():
        if os.path.exists(file_path):
            add_gallery_to_file(file_path)
        else:
            print(f"Le fichier {file_path} n'existe pas, ignoré")
    
    print("\nAjout des boutons d'action aux pages HTML...")
    for file_path in PAGE_IMAGES.keys():
        if os.path.exists(file_path):
            add_action_buttons(file_path)
        else:
            print(f"Le fichier {file_path} n'existe pas, ignoré")
    
    print("\nTraitement terminé!")

if __name__ == "__main__":
    main()
