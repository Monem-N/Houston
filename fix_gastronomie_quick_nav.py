#!/usr/bin/env python3
"""
Script pour corriger le menu "Dans cette section" dans la page Gastronomie
"""

from bs4 import BeautifulSoup

def fix_gastronomie_quick_nav():
    """Corrige le menu "Dans cette section" dans la page Gastronomie"""
    print("Correction du menu 'Dans cette section' dans la page Gastronomie...")
    
    # Lit le contenu du fichier
    with open('05_Gastronomie.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse le HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Trouve le menu "Dans cette section"
    quick_nav = soup.select_one('.quick-nav')
    
    if not quick_nav:
        print("❌ Menu 'Dans cette section' introuvable dans la page Gastronomie")
        return
    
    # Sauvegarde le contenu original du menu
    original_content = str(quick_nav)
    
    # Reconstruit le menu avec la structure correcte
    new_quick_nav = soup.new_tag('div')
    new_quick_nav['class'] = 'quick-nav'
    
    # Ajoute le titre
    heading = soup.new_tag('h4')
    heading.string = 'Dans cette section'
    new_quick_nav.append(heading)
    
    # Ajoute la liste des liens
    ul = soup.new_tag('ul')
    
    # Ajoute les liens
    sections = [
        ('checklist-essentielle', 'Checklist Essentielle'),
        ('points-importants', 'Points Importants'),
        ('restaurants-par-categorie', 'Restaurants par Catégorie'),
        ('restaurants-adaptes-aux-enfants', 'Restaurants Adaptés aux Enfants'),
        ('restaurants-pres-de-lhotel', 'Restaurants Près de l\'Hôtel'),
        ('restaurants-pres-du-convention-center', 'Restaurants Près du Convention Center'),
        ('marches-et-epiceries', 'Marchés et Épiceries'),
        ('ressources-complementaires', 'Ressources Complémentaires'),
        ('conseils-pratiques', 'Conseils Pratiques'),
        ('specialites-locales-a-essayer', 'Spécialités Locales à Essayer')
    ]
    
    for section_id, section_title in sections:
        li = soup.new_tag('li')
        a = soup.new_tag('a', href=f'#{section_id}')
        a.string = section_title
        li.append(a)
        ul.append(li)
    
    new_quick_nav.append(ul)
    
    # Remplace l'ancien menu par le nouveau
    quick_nav.replace_with(new_quick_nav)
    
    # Vérifie si le fichier contient une référence à main.js
    scripts = soup.select('script')
    main_js_found = False
    
    for script in scripts:
        if script.get('src') and 'main.js' in script['src']:
            main_js_found = True
            break
    
    if not main_js_found:
        # Ajoute main.js
        main_js = soup.new_tag('script')
        main_js['src'] = 'assets/js/main.js'
        
        # Trouve le dernier script
        last_script = None
        for script in scripts:
            if script.get('src'):
                last_script = script
        
        if last_script:
            last_script.insert_after(main_js)
            print("✅ Référence à main.js ajoutée")
        else:
            # Ajoute à la fin du body
            body = soup.select_one('body')
            if body:
                body.append(main_js)
                print("✅ Référence à main.js ajoutée à la fin du body")
            else:
                print("⚠️ Impossible d'ajouter main.js (pas de body)")
    
    # Sauvegarde le fichier modifié
    with open('05_Gastronomie.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    print("✅ Menu 'Dans cette section' corrigé dans la page Gastronomie")
    print(f"Ancien contenu:\n{original_content}\n")
    print(f"Nouveau contenu:\n{new_quick_nav}")

if __name__ == "__main__":
    fix_gastronomie_quick_nav()
