#!/usr/bin/env python3
"""
Générateur de styles CSS pour le guide de voyage
"""

import os
import sys

# Ajouter le répertoire courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import COLORS

def generate_css():
    """
    Génère le CSS pour le guide de voyage
    """
    css = f"""
    /* Styles de base */
    * {{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }}

    html {{
        scroll-behavior: smooth;
    }}

    body {{
        font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
        line-height: 1.6;
        color: {COLORS['text']};
        background-color: {COLORS['background']};
        max-width: 1200px;
        margin: 0 auto;
        padding: 0;
    }}

    /* Page de couverture */
    #cover {{
        text-align: center;
        padding: 50px;
        background: {COLORS['cover_bg']};
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }}

    #cover img {{
        max-width: 100%;
        height: auto;
        max-height: 80vh;
        object-fit: contain;
    }}

    #cover h1 {{
        font-size: 3em;
        margin-bottom: 20px;
        color: {COLORS['primary']};
    }}

    #cover h2 {{
        font-size: 2.5em;
        margin-bottom: 15px;
    }}

    #cover h3 {{
        font-size: 1.8em;
        color: {COLORS['light_text']};
    }}

    /* Table des matières */
    #toc {{
        margin: 20px;
        background: {COLORS['section_bg']};
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }}

    #toc h2 {{
        color: {COLORS['primary']};
        margin-bottom: 15px;
        border-bottom: 2px solid {COLORS['accent']};
        padding-bottom: 10px;
    }}

    #toc ul {{
        list-style: none;
        padding-left: 0;
    }}

    #toc li {{
        margin: 10px 0;
    }}

    #toc a {{
        text-decoration: none;
        color: {COLORS['text']};
        transition: color 0.3s;
        display: block;
        padding: 5px 10px;
        border-radius: 4px;
    }}

    #toc a:hover {{
        color: {COLORS['primary']};
        background-color: rgba(0, 0, 0, 0.05);
    }}

    /* Navigation flottante */
    #floating-nav {{
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: {COLORS['primary']};
        color: white;
        padding: 10px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
    }}

    #nav-menu {{
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 999;
        max-height: 300px;
        overflow-y: auto;
        display: none;
    }}

    #nav-menu.active {{
        display: block;
    }}

    #nav-menu ul {{
        list-style: none;
        padding: 0;
    }}

    #nav-menu li {{
        margin: 5px 0;
    }}

    #nav-menu a {{
        text-decoration: none;
        color: {COLORS['text']};
        display: block;
        padding: 5px 10px;
        border-radius: 4px;
    }}

    #nav-menu a:hover {{
        background-color: {COLORS['section_bg']};
    }}

    /* Sections de contenu */
    .content-section {{
        margin: 30px 20px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }}

    .content-section h1 {{
        font-size: 2.2em;
        color: {COLORS['primary']};
        margin: 20px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid {COLORS['accent']};
    }}

    .content-section h2 {{
        font-size: 1.8em;
        color: {COLORS['text']};
        margin: 18px 0;
    }}

    .content-section h3 {{
        font-size: 1.5em;
        color: {COLORS['text']};
        margin: 16px 0;
    }}

    .content-section h4 {{
        font-size: 1.3em;
        color: {COLORS['text']};
        margin: 14px 0;
    }}

    .content-section p {{
        margin: 15px 0;
        line-height: 1.7;
    }}

    .content-section a {{
        color: {COLORS['primary']};
        text-decoration: none;
    }}

    .content-section a:hover {{
        text-decoration: underline;
    }}

    .content-section ul, .content-section ol {{
        margin: 15px 0;
        padding-left: 25px;
    }}

    .content-section li {{
        margin: 5px 0;
    }}

    .content-section img {{
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        margin: 15px 0;
    }}

    .content-section table {{
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }}

    .content-section th, .content-section td {{
        padding: 10px;
        border: 1px solid #ddd;
    }}

    .content-section th {{
        background-color: {COLORS['section_bg']};
    }}

    .content-section tr:nth-child(even) {{
        background-color: {COLORS['section_bg']};
    }}

    /* Pied de page */
    footer {{
        text-align: center;
        padding: 20px;
        margin-top: 30px;
        color: {COLORS['light_text']};
        font-size: 0.9em;
        border-top: 1px solid #ddd;
    }}

    /* Styles pour l'impression */
    @media print {{
        body {{
            font-size: 12pt;
            max-width: 100%;
        }}

        #floating-nav, #nav-menu {{
            display: none !important;
        }}

        .content-section {{
            break-inside: avoid;
            box-shadow: none;
            margin: 0;
            padding: 10px 0;
        }}

        #cover {{
            height: auto;
            padding: 20px;
        }}

        a {{
            color: black !important;
            text-decoration: none !important;
        }}

        a::after {{
            content: " (" attr(href) ")";
            font-size: 0.8em;
            color: #666;
        }}

        a[href^="#"]::after {{
            display: none;
        }}
    }}

    /* Responsive design */
    @media (max-width: 768px) {{
        body {{
            padding: 0 10px;
        }}

        #cover {{
            padding: 30px 10px;
        }}

        .content-section {{
            margin: 20px 10px;
            padding: 15px;
        }}

        .content-section h1 {{
            font-size: 1.8em;
        }}

        .content-section h2 {{
            font-size: 1.5em;
        }}

        .content-section h3 {{
            font-size: 1.3em;
        }}
    }}
    """
    return css
