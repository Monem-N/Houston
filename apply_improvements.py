#!/usr/bin/env python3
"""
Script pour appliquer les améliorations à toutes les pages HTML du site Houston 2025
"""

import os
import re
from bs4 import BeautifulSoup

# Liste des pages à mettre à jour (exclut les pages déjà mises à jour)
def get_html_files():
    """Récupère toutes les pages HTML dans le répertoire racine"""
    html_files = []
    for file in os.listdir('.'):
        if file.endswith('.html') and file not in ['index.html', 'improved-index.html', 'page-template.html', 'feedback.html']:
            html_files.append(file)
    return html_files

def update_css_links(soup):
    """Met à jour les liens CSS pour inclure gallery.css"""
    head = soup.find('head')
    if not head:
        print("Erreur: Balise head non trouvée")
        return soup
    
    # Vérifie si gallery.css est déjà inclus
    gallery_css_exists = False
    for link in head.find_all('link', rel='stylesheet'):
        if 'gallery.css' in link.get('href', ''):
            gallery_css_exists = True
            break
    
    # Ajoute gallery.css s'il n'existe pas déjà
    if not gallery_css_exists:
        improved_style_link = head.find('link', href=lambda href: href and 'improved-style.css' in href)
        if improved_style_link:
            gallery_css = soup.new_tag('link')
            gallery_css['rel'] = 'stylesheet'
            gallery_css['href'] = 'assets/css/gallery.css'
            improved_style_link.insert_after(gallery_css)
    
    return soup

def update_js_links(soup):
    """Met à jour les liens JavaScript pour inclure gallery.js"""
    # Vérifie si gallery.js est déjà inclus
    gallery_js_exists = False
    for script in soup.find_all('script'):
        if script.get('src') and 'gallery.js' in script['src']:
            gallery_js_exists = True
            break
    
    # Ajoute gallery.js s'il n'existe pas déjà
    if not gallery_js_exists:
        main_js = soup.find('script', src=lambda src: src and 'main.js' in src)
        if main_js:
            gallery_js = soup.new_tag('script')
            gallery_js['src'] = 'assets/js/gallery.js'
            main_js.insert_after(gallery_js)
    
    # Vérifie si analytics.js est déjà inclus
    analytics_js_exists = False
    for script in soup.find_all('script'):
        if script.get('src') and 'analytics.js' in script['src']:
            analytics_js_exists = True
            break
    
    # Ajoute analytics.js et le script Google Analytics s'ils n'existent pas déjà
    if not analytics_js_exists:
        scripts = soup.find_all('script')
        if scripts:
            last_script = scripts[-1]
            
            # Ajoute le script Google Analytics
            gtag_script = soup.new_tag('script')
            gtag_script['async'] = True
            gtag_script['src'] = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
            last_script.insert_after(gtag_script)
            
            # Ajoute analytics.js
            analytics_js = soup.new_tag('script')
            analytics_js['src'] = 'assets/js/analytics.js'
            gtag_script.insert_after(analytics_js)
    
    return soup

def update_footer(soup):
    """Met à jour le pied de page pour inclure le lien de feedback"""
    footer = soup.find('footer', class_='site-footer')
    if not footer:
        print("Erreur: Pied de page non trouvé")
        return soup
    
    # Vérifie si le lien de feedback existe déjà
    feedback_exists = False
    for p in footer.find_all('p'):
        if 'feedback.html' in str(p):
            feedback_exists = True
            break
    
    # Ajoute le lien de feedback s'il n'existe pas déjà
    if not feedback_exists:
        feedback_p = soup.new_tag('p')
        feedback_a = soup.new_tag('a', href='feedback.html')
        feedback_a.string = 'Donnez-nous votre avis'
        feedback_p.append(feedback_a)
        feedback_p.append(' sur le nouveau design du guide')
        footer.append(feedback_p)
    
    return soup

def update_navigation(soup):
    """Met à jour la navigation pour inclure le lien de feedback"""
    nav = soup.find('nav', class_='nav-menu')
    if not nav:
        print("Erreur: Navigation non trouvée")
        return soup
    
    # Vérifie si le lien de feedback existe déjà
    feedback_exists = False
    for a in nav.find_all('a'):
        if 'feedback.html' in a.get('href', ''):
            feedback_exists = True
            break
    
    # Ajoute le lien de feedback s'il n'existe pas déjà
    if not feedback_exists:
        feedback_a = soup.new_tag('a', href='feedback.html')
        feedback_a.string = 'Feedback'
        nav.append(feedback_a)
    
    return soup

def fix_html_entities(soup):
    """Corrige les entités HTML non échappées"""
    # Trouve tous les titres et attributs qui pourraient contenir des &
    for tag in soup.find_all(['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        if '&' in tag.text and not '&amp;' in tag.text:
            tag.string = tag.text.replace('&', '&amp;')
    
    return soup

def update_html_file(file_path):
    """Met à jour un fichier HTML avec toutes les améliorations"""
    print(f"Mise à jour de {file_path}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse le HTML
        soup = BeautifulSoup(content, 'html.parser')
        
        # Applique les améliorations
        soup = update_css_links(soup)
        soup = update_js_links(soup)
        soup = update_footer(soup)
        soup = update_navigation(soup)
        soup = fix_html_entities(soup)
        
        # Sauvegarde le fichier mis à jour
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"✅ {file_path} mis à jour avec succès")
        return True
    except Exception as e:
        print(f"❌ Erreur lors de la mise à jour de {file_path}: {e}")
        return False

def main():
    """Fonction principale"""
    print("Début de la mise à jour des pages HTML...")
    
    # Récupère la liste des fichiers HTML
    html_files = get_html_files()
    print(f"Trouvé {len(html_files)} fichiers HTML à mettre à jour")
    
    # Met à jour chaque fichier
    success_count = 0
    for file in html_files:
        if update_html_file(file):
            success_count += 1
    
    print(f"\nMise à jour terminée: {success_count}/{len(html_files)} fichiers mis à jour avec succès")

if __name__ == "__main__":
    main()
