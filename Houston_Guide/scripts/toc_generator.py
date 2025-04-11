#!/usr/bin/env python3
"""
Générateur de table des matières pour le guide de voyage
"""

import os
import sys

# Ajouter le répertoire courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def generate_toc(toc_entries):
    """
    Génère la table des matières HTML à partir des entrées
    """
    toc_html = '<div id="toc">'
    toc_html += '<h2>📑 TABLE DES MATIÈRES</h2>'
    toc_html += '<ul>'

    # Créer une liste imbriquée pour la hiérarchie des titres
    current_level = 1
    for title, level, anchor_id, section_id in toc_entries:
        # Gérer l'indentation en fonction du niveau
        if level > current_level:
            # Ajouter des sous-listes pour les niveaux supérieurs
            for _ in range(level - current_level):
                toc_html += '<ul>'
        elif level < current_level:
            # Fermer les sous-listes pour les niveaux inférieurs
            for _ in range(current_level - level):
                toc_html += '</ul>'

        # Ajouter l'entrée de la table des matières
        toc_html += f'<li><a href="#{anchor_id}">{title}</a></li>'

        # Mettre à jour le niveau actuel
        current_level = level

    # Fermer toutes les listes ouvertes
    for _ in range(current_level):
        toc_html += '</ul>'

    toc_html += '</div>'

    return toc_html

def generate_floating_nav(toc_entries):
    """
    Génère une navigation flottante à partir des entrées de la table des matières
    """
    nav_html = '<div id="floating-nav" onclick="toggleNavMenu()">☰</div>'
    nav_html += '<div id="nav-menu">'
    nav_html += '<ul>'

    # Filtrer pour n'inclure que les titres de niveau 1
    level1_entries = [entry for entry in toc_entries if entry[1] == 1]

    for title, _, anchor_id, _ in level1_entries:
        nav_html += f'<li><a href="#{anchor_id}">{title}</a></li>'

    nav_html += '</ul>'
    nav_html += '</div>'

    # Ajouter le JavaScript pour la navigation
    nav_html += '''
    <script>
    function toggleNavMenu() {
        var menu = document.getElementById('nav-menu');
        menu.classList.toggle('active');
    }

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function(event) {
        var menu = document.getElementById('nav-menu');
        var nav = document.getElementById('floating-nav');
        if (menu.classList.contains('active') &&
            !menu.contains(event.target) &&
            event.target !== nav) {
            menu.classList.remove('active');
        }
    });
    </script>
    '''

    return nav_html
