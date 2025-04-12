#!/usr/bin/env python3
"""
Script pour améliorer les tableaux dans toutes les pages HTML
"""

import os
import re
from bs4 import BeautifulSoup

def improve_tables():
    """Améliore les tableaux dans toutes les pages HTML"""
    print("Amélioration des tableaux dans toutes les pages HTML...")
    
    # Liste des fichiers HTML contenant des tableaux
    table_files = ['01_Introduction.html', '03_Shopping_Katy_Mills.html', 
                  '04_Safety_Logistics.html', '05_Gastronomie.html', 
                  'C_Shopping_Comparison.html']
    
    print(f"Traitement de {len(table_files)} fichiers HTML contenant des tableaux")
    
    # Compte les fichiers modifiés
    modified_count = 0
    
    # Parcourt tous les fichiers HTML contenant des tableaux
    for file_name in table_files:
        print(f"Amélioration des tableaux dans {file_name}...")
        
        # Vérifie si le fichier existe
        if not os.path.exists(file_name):
            print(f"⚠️ Le fichier {file_name} n'existe pas")
            continue
        
        # Lit le contenu du fichier
        with open(file_name, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Vérifie si le fichier contient des tableaux
        tables = soup.find_all('table')
        if not tables:
            print(f"⚠️ Aucun tableau trouvé dans {file_name}")
            continue
        
        print(f"Trouvé {len(tables)} tableaux dans {file_name}")
        
        # Ajoute le lien vers le fichier CSS des tableaux s'il n'existe pas déjà
        if 'tables.css' not in content:
            # Trouve le dernier lien CSS
            css_links = soup.find_all('link', rel='stylesheet')
            if css_links:
                last_css = css_links[-1]
                # Crée un nouveau lien CSS
                tables_css = soup.new_tag('link')
                tables_css['rel'] = 'stylesheet'
                tables_css['href'] = 'assets/css/tables.css'
                # Insère après le dernier lien CSS
                last_css.insert_after(tables_css)
        
        # Ajoute le script JavaScript des tableaux s'il n'existe pas déjà
        if 'tables.js' not in content:
            # Trouve le dernier script
            scripts = soup.find_all('script')
            if scripts:
                last_script = None
                for script in scripts:
                    if script.get('src') and ('main.js' in script['src'] or 'gallery.js' in script['src']):
                        last_script = script
                
                if last_script:
                    # Crée un nouveau script
                    tables_js = soup.new_tag('script')
                    tables_js['src'] = 'assets/js/tables.js'
                    # Insère après le dernier script
                    last_script.insert_after(tables_js)
        
        # Améliore chaque tableau
        for table in tables:
            # Détermine le type de tableau en fonction de son contenu
            if 'Jour' in table.text and 'Destination' in table.text:
                table['class'] = table.get('class', []) + ['schedule-table']
            elif 'Prix' in table.text or '$' in table.text:
                table['class'] = table.get('class', []) + ['price-table']
            elif len(table.find_all('th')) > 3:
                table['class'] = table.get('class', []) + ['comparison-table']
            
            # Vérifie si le tableau est déjà dans un conteneur
            parent = table.parent
            if parent.name != 'div' or 'table-container' not in parent.get('class', []):
                # Crée un conteneur
                container = soup.new_tag('div')
                container['class'] = 'table-container'
                # Remplace le tableau par le conteneur
                table.wrap(container)
        
        # Sauvegarde le fichier modifié
        with open(file_name, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ Tableaux améliorés dans {file_name}")
        modified_count += 1
    
    print(f"\nAmélioration terminée: {modified_count}/{len(table_files)} fichiers ont été mis à jour")

if __name__ == "__main__":
    improve_tables()
