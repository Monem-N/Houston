#!/usr/bin/env python3
"""
Script simple pour corriger les liens dans l'index thématique
"""

import re

def fix_index_links():
    """Corrige les liens dans l'index thématique en utilisant des expressions régulières"""
    print("Correction des liens dans l'index thématique...")
    
    # Dictionnaire de correspondance entre les ancres et les pages
    page_mapping = {
        '#introduction': '01_Introduction.html',
        '#space-center-kemah': '02_Space_Center_Kemah.html',
        '#shopping-katy-mills': '03_Shopping_Katy_Mills.html',
        '#safety-logistics': '04_Safety_Logistics.html',
        '#gastronomie': '05_Gastronomie.html',
        '#first-championship': '06_FIRST_Championship.html',
        '#museum-district': '07_Museum_District.html',
        '#hermann-park-zoo': '08_Hermann_Park_Zoo.html',
        '#annexe-a:-transport-maps': 'A_Transport_Maps.html',
        '#annexe-b:-emergency-contacts': 'B_Emergency_Contacts.html',
        '#annexe-c:-shopping-comparison': 'C_Shopping_Comparison.html',
        '#annexe-d:-touristanbul': 'D_Touristanbul.html',
        '#annexe-e:-local-dining-shopping': 'E_Local_Dining_Shopping.html'
    }
    
    # Ouvre le fichier
    with open('09_Thematic_Index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Compte les liens modifiés
    modified_count = 0
    
    # Utilise des expressions régulières pour trouver et remplacer les liens
    for old_href, new_href in page_mapping.items():
        pattern = r'<a class="section-link" href="' + re.escape(old_href) + r'"'
        replacement = f'<a class="section-link" href="{new_href}"'
        
        # Compte le nombre de remplacements
        matches = re.findall(pattern, content)
        count = len(matches)
        modified_count += count
        
        # Effectue le remplacement
        content = re.sub(pattern, replacement, content)
    
    # Sauvegarde le fichier mis à jour
    with open('09_Thematic_Index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Correction terminée: {modified_count} liens ont été mis à jour")

if __name__ == "__main__":
    fix_index_links()
