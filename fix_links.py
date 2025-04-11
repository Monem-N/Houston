#!/usr/bin/env python3
"""
Script pour corriger les liens dans l'index thématique
"""

def fix_thematic_index_links():
    """Corrige les liens dans l'index thématique"""
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
    
    # Ouvre le fichier de l'index thématique
    with open('09_Thematic_Index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Compte les liens modifiés
    modified_count = 0
    
    # Remplace chaque lien
    for old_href, new_href in page_mapping.items():
        old_str = f'<a class="section-link" href="{old_href}"'
        new_str = f'<a class="section-link" href="{new_href}"'
        
        # Compte le nombre de remplacements
        count = content.count(old_str)
        modified_count += count
        
        # Effectue le remplacement
        content = content.replace(old_str, new_str)
    
    # Sauvegarde le fichier mis à jour
    with open('09_Thematic_Index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Correction terminée: {modified_count} liens ont été mis à jour")

if __name__ == "__main__":
    fix_thematic_index_links()
