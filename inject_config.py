#!/usr/bin/env python3
"""
Script pour injecter les configurations directement dans les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def inject_config():
    """Injecte les configurations directement dans les pages HTML"""
    print("Injection des configurations dans les pages HTML...")
    
    # Configuration à injecter
    config_script = """<script>
// Configuration des API
const CONFIG = {
  // Clé API Google Maps
  GOOGLE_MAPS_API_KEY: "AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0",
  
  // ID de mesure Google Analytics
  GOOGLE_ANALYTICS_ID: "G-KHZ18QKRHG"
};
</script>"""
    
    # Trouve tous les fichiers HTML
    html_files = [f for f in os.listdir() if f.endswith('.html')]
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML
    for file_name in html_files:
        print(f"Traitement de {file_name}...")
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifie si le fichier contient déjà le script de configuration inline
        if 'const CONFIG = {' in content:
            print(f"✓ Le script de configuration est déjà présent dans {file_name}")
            continue
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Trouve la balise head
        head = soup.find('head')
        
        if not head:
            print(f"⚠️ Balise head introuvable dans {file_name}")
            continue
        
        # Crée le script de configuration
        config_soup = BeautifulSoup(config_script, 'html.parser')
        config_tag = config_soup.script
        
        # Ajoute le script de configuration à la fin de la balise head
        head.append(config_tag)
        
        # Supprime la référence au fichier config.js
        for script in soup.find_all('script'):
            if script.get('src') and 'config.js' in script['src']:
                script.extract()
                print(f"✅ Référence au fichier config.js supprimée de {file_name}")
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Script de configuration injecté dans {file_name}")
        modified_count += 1
    
    print(f"\nInjection terminée: {modified_count}/{len(html_files)} fichiers ont été modifiés")

if __name__ == "__main__":
    inject_config()
