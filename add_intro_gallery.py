#!/usr/bin/env python3
"""
Script pour ajouter une galerie d'images à la page d'introduction
"""

from bs4 import BeautifulSoup

def add_intro_gallery():
    """Ajoute une galerie d'images à la page d'introduction"""
    print("Ajout d'une galerie d'images à la page d'introduction...")
    
    # Ouvre le fichier
    with open('01_Introduction.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse le HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Vérifie si une galerie existe déjà
    existing_gallery = soup.find('div', class_='image-gallery')
    if existing_gallery:
        print("Une galerie existe déjà dans la page d'introduction")
        return
    
    # Trouve la section après les informations essentielles
    h2_infos = soup.find('h2', id='informations-essentielles')
    if not h2_infos:
        print("Section 'Informations Essentielles' non trouvée")
        return
    
    # Trouve la section suivante
    next_h2 = h2_infos.find_next('h2')
    if not next_h2:
        print("Section suivante non trouvée")
        return
    
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
    
    # Ajoute les images
    images = [
        {
            'src': 'assets/images/general/houston-skyline.jpg',
            'alt': 'Skyline de Houston',
            'caption': 'La magnifique skyline de Houston'
        },
        {
            'src': 'assets/images/events/first-championship-1.jpg',
            'alt': 'FIRST Championship Houston',
            'caption': 'FIRST Championship - Compétition de robotique'
        },
        {
            'src': 'assets/images/general/houston-downtown.jpg',
            'alt': 'Centre-ville de Houston',
            'caption': 'Le centre-ville animé de Houston'
        }
    ]
    
    for img_data in images:
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
    
    # Insère la galerie avant la section suivante
    next_h2.insert_before(gallery_h2)
    gallery_h2.insert_after(gallery_div)
    
    # Sauvegarde le fichier mis à jour
    with open('01_Introduction.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print("Galerie d'images ajoutée avec succès à la page d'introduction")

if __name__ == "__main__":
    add_intro_gallery()
