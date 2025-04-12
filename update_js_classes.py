#!/usr/bin/env python3
"""
Script pour mettre à jour les classes CSS dans le fichier JavaScript
"""

import re

def update_js_classes():
    """Met à jour les classes CSS dans le fichier JavaScript"""
    print("Mise à jour des classes CSS dans le fichier JavaScript...")
    
    # Lit le contenu du fichier
    with open('assets/js/maps.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Définit les remplacements à effectuer
    replacements = [
        # Filtres
        (r'class="filter-item"', r'class="map-filters__item"'),
        (r'class="reset-filters"', r'class="map-filters__reset"'),
        
        # Fenêtres d'info
        (r'<div class="info-window">', r'<div class="info-window">'),
        (r'<h3>', r'<h3 class="info-window__title">'),
        (r'<p>', r'<p class="info-window__description">'),
        (r'<a href=', r'<a class="info-window__link" href='),
        
        # Points d'intérêt
        (r'class="poi-list"', r'class="poi-list"'),
        (r'<h3>', r'<h3 class="poi-list__title">'),
        (r'class="poi-item"', r'class="poi-item"'),
        (r'class="poi-icon"', r'class="poi-item__icon"'),
        (r'class="poi-details"', r'class="poi-item__details"'),
        (r'class="poi-name"', r'class="poi-item__name"'),
        (r'class="poi-address"', r'class="poi-item__address"'),
        (r'class="poi-description"', r'class="poi-item__description"'),
        (r'class="poi-links"', r'class="poi-item__links"'),
        (r'class="website"', r'class="poi-item__link website"'),
        (r'class="directions"', r'class="poi-item__link directions"'),
        (r'class="more-info"', r'class="poi-item__link more-info"'),
        
        # Contrôles d'itinéraires
        (r'id="itinerary-controls"', r'id="itinerary-controls" class="itinerary-controls"'),
        (r'class="itinerary-controls"', r'class="itinerary-controls"'),
        (r'class="itinerary-buttons"', r'class="itinerary-controls__buttons"'),
        (r'class="itinerary-button"', r'class="itinerary-controls__button"'),
        (r'class="itinerary-button active"', r'class="itinerary-controls__button itinerary-controls__button--active"'),
        (r'class="hide-all-button"', r'class="itinerary-controls__reset"'),
        (r'class="itinerary-details"', r'class="itinerary-controls__details"'),
        
        # Mise à jour des sélecteurs JavaScript
        (r'document.querySelectorAll\(\'\.itinerary-button\'\)', r'document.querySelectorAll(\'.itinerary-controls__button\')'),
        (r'button.classList.contains\(\'active\'\)', r'button.classList.contains(\'itinerary-controls__button--active\')'),
        (r'button.classList.remove\(\'active\'\)', r'button.classList.remove(\'itinerary-controls__button--active\')'),
        (r'button.classList.add\(\'active\'\)', r'button.classList.add(\'itinerary-controls__button--active\')'),
    ]
    
    # Effectue les remplacements
    for old, new in replacements:
        content = re.sub(old, new, content)
    
    # Sauvegarde le fichier modifié
    with open('assets/js/maps-improved.js', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Classes CSS mises à jour dans le fichier JavaScript")

if __name__ == "__main__":
    update_js_classes()
