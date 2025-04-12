#!/usr/bin/env python3
"""
Script pour télécharger des images pour le guide Houston 2025
"""

import os
import requests
import time
from PIL import Image
from io import BytesIO

# Liste des images à télécharger
IMAGES = [
    # Skyline et général
    {
        "url": "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7",
        "path": "assets/images/general/houston-skyline.jpg",
        "alt": "Skyline de Houston",
        "caption": "La magnifique skyline de Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1612896008572-0f48bfe53566",
        "path": "assets/images/general/houston-downtown.jpg",
        "alt": "Centre-ville de Houston",
        "caption": "Le centre-ville animé de Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1517309230475-6736d926b979",
        "path": "assets/images/general/houston-metro.jpg",
        "alt": "Métro de Houston",
        "caption": "Le système de métro léger de Houston"
    },
    
    # Space Center
    {
        "url": "https://images.unsplash.com/photo-1518232601346-2f6c4bf46ed8",
        "path": "assets/images/attractions/space-center-1.jpg",
        "alt": "Entrée du Space Center Houston",
        "caption": "Entrée principale du Space Center Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1454789415558-bdda08f4eabb",
        "path": "assets/images/attractions/space-center-2.jpg",
        "alt": "Fusée Saturn V au Space Center",
        "caption": "L'impressionnante fusée Saturn V"
    },
    
    # Kemah Boardwalk
    {
        "url": "https://images.unsplash.com/photo-1581552310296-9f2b7233d1c6",
        "path": "assets/images/attractions/kemah-boardwalk-1.jpg",
        "alt": "Vue panoramique de Kemah Boardwalk",
        "caption": "Vue panoramique de Kemah Boardwalk"
    },
    {
        "url": "https://images.unsplash.com/photo-1560991712-5c7f1bbd3e56",
        "path": "assets/images/attractions/kemah-boardwalk-2.jpg",
        "alt": "Attractions à Kemah Boardwalk",
        "caption": "Manèges et attractions à Kemah Boardwalk"
    },
    
    # Museum District
    {
        "url": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3",
        "path": "assets/images/attractions/museum-district-1.jpg",
        "alt": "Musée des sciences naturelles de Houston",
        "caption": "Le musée des sciences naturelles de Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        "path": "assets/images/attractions/museum-district-2.jpg",
        "alt": "Musée des beaux-arts de Houston",
        "caption": "Le musée des beaux-arts de Houston"
    },
    
    # Hermann Park & Zoo
    {
        "url": "https://images.unsplash.com/photo-1565008576549-57cf2b6e8a68",
        "path": "assets/images/attractions/hermann-park-1.jpg",
        "alt": "Hermann Park",
        "caption": "Le magnifique Hermann Park"
    },
    {
        "url": "https://images.unsplash.com/photo-1503919005314-30d93d07d823",
        "path": "assets/images/attractions/houston-zoo-1.jpg",
        "alt": "Zoo de Houston",
        "caption": "Une des attractions du Zoo de Houston"
    },
    
    # FIRST Championship
    {
        "url": "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f",
        "path": "assets/images/events/first-championship-1.jpg",
        "alt": "FIRST Championship arena",
        "caption": "L'arène principale du FIRST Championship"
    },
    {
        "url": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
        "path": "assets/images/events/first-championship-2.jpg",
        "alt": "Robots en compétition",
        "caption": "Robots en pleine compétition"
    },
    {
        "url": "https://images.unsplash.com/photo-1531482615713-2afd69097998",
        "path": "assets/images/events/first-championship-3.jpg",
        "alt": "Équipes au travail",
        "caption": "Les équipes travaillant sur leurs robots"
    },
    
    # Shopping
    {
        "url": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
        "path": "assets/images/attractions/katy-mills-1.jpg",
        "alt": "Entrée de Katy Mills",
        "caption": "Entrée principale du centre commercial Katy Mills"
    },
    {
        "url": "https://images.unsplash.com/photo-1567958451986-2de427a4a0be",
        "path": "assets/images/attractions/katy-mills-2.jpg",
        "alt": "Intérieur de Katy Mills",
        "caption": "Intérieur spacieux du centre commercial"
    },
    
    # Restaurants
    {
        "url": "https://images.unsplash.com/photo-1555992336-fb0d29498b13",
        "path": "assets/images/restaurants/houston-restaurant-1.jpg",
        "alt": "Restaurant texan",
        "caption": "Un authentique restaurant texan"
    },
    {
        "url": "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
        "path": "assets/images/restaurants/houston-bbq.jpg",
        "alt": "BBQ texan",
        "caption": "Le célèbre BBQ texan, une spécialité locale"
    },
    {
        "url": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
        "path": "assets/images/restaurants/houston-mexican.jpg",
        "alt": "Cuisine tex-mex",
        "caption": "Délicieuse cuisine tex-mex"
    }
]

def download_and_optimize_image(url, path, width=1200):
    """Télécharge et optimise une image"""
    try:
        # Crée le répertoire si nécessaire
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        # Ajoute des paramètres pour Unsplash
        if "unsplash.com" in url:
            url = f"{url}?auto=format&fit=crop&w={width}&q=80"
        
        # Télécharge l'image
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        # Ouvre l'image avec PIL
        img = Image.open(BytesIO(response.content))
        
        # Redimensionne l'image si nécessaire
        if img.width > width:
            # Calcule la nouvelle hauteur en conservant le ratio
            height = int(img.height * (width / img.width))
            img = img.resize((width, height), Image.LANCZOS)
        
        # Sauvegarde l'image optimisée
        img.save(path, optimize=True, quality=85)
        
        print(f"✅ Image téléchargée et optimisée: {path}")
        return True
    except Exception as e:
        print(f"❌ Erreur lors du téléchargement de {url}: {e}")
        return False

def main():
    """Fonction principale"""
    print("Téléchargement des images pour le guide Houston 2025...")
    
    # Télécharge toutes les images
    success_count = 0
    for i, image in enumerate(IMAGES):
        print(f"[{i+1}/{len(IMAGES)}] Téléchargement de {image['path']}...")
        if download_and_optimize_image(image['url'], image['path']):
            success_count += 1
        
        # Pause pour éviter de surcharger les serveurs
        time.sleep(1)
    
    print(f"\nTéléchargement terminé: {success_count}/{len(IMAGES)} images téléchargées avec succès")

if __name__ == "__main__":
    main()
