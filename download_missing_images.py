#!/usr/bin/env python3
"""
Script pour télécharger les images manquantes pour le guide Houston 2025
"""

import os
import requests
import time
from PIL import Image
from io import BytesIO

# Liste des images manquantes à télécharger
IMAGES = [
    # Images manquantes
    {
        "url": "https://images.unsplash.com/photo-1578593195423-e9f89aee3e4c",
        "path": "assets/images/general/houston-downtown.jpg",
        "alt": "Centre-ville de Houston",
        "caption": "Le centre-ville animé de Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1541185934-01b600ea069c",
        "path": "assets/images/attractions/space-center-1.jpg",
        "alt": "Entrée du Space Center Houston",
        "caption": "Entrée principale du Space Center Houston"
    },
    {
        "url": "https://images.unsplash.com/photo-1569254983547-44dc559f038f",
        "path": "assets/images/attractions/kemah-boardwalk-1.jpg",
        "alt": "Vue panoramique de Kemah Boardwalk",
        "caption": "Vue panoramique de Kemah Boardwalk"
    },
    {
        "url": "https://images.unsplash.com/photo-1551287761-94e35792f8d6",
        "path": "assets/images/attractions/kemah-boardwalk-2.jpg",
        "alt": "Attractions à Kemah Boardwalk",
        "caption": "Manèges et attractions à Kemah Boardwalk"
    },
    {
        "url": "https://images.unsplash.com/photo-1534889156217-d643df14f14a",
        "path": "assets/images/attractions/hermann-park-1.jpg",
        "alt": "Hermann Park",
        "caption": "Le magnifique Hermann Park"
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
    print("Téléchargement des images manquantes pour le guide Houston 2025...")
    
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
