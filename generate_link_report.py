#!/usr/bin/env python3
import os
import re
import logging
from datetime import datetime

def extract_links(markdown_file):
    """Extract non-image markdown links using regex"""
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
    return re.findall(r'(?<!!)\[.*?\]\((.*?)\)', content)

def resolve_local_link(file_path, link):
    """Resolve local links with fragment handling"""
    base_link = link.split('#')[0].split('?')[0]
    return os.path.normpath(os.path.join(os.path.dirname(file_path), base_link))

def check_local_link(file_path, link):
    """Check if a local link exists"""
    abs_path = resolve_local_link(file_path, link)
    return os.path.exists(abs_path), abs_path

def main():
    directory = 'Houston_Guide'
    report_file = 'link_report.md'
    
    # Initialize report
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(f"# Rapport sur les liens dans les documents Houston Guide\n\n")
        f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("## Résumé\n\n")
        f.write("Ce rapport présente l'état des liens internes dans les documents Markdown du dossier Houston_Guide.\n\n")
        
        # Initialize counters
        total_files = 0
        total_links = 0
        broken_internal_links = 0
        
        # Process each markdown file
        f.write("## Liens internes\n\n")
        f.write("| Fichier source | Lien | Statut |\n")
        f.write("|---------------|------|--------|\n")
        
        for root, _, files in os.walk(directory):
            for file in files:
                if not file.endswith('.md'):
                    continue
                    
                file_path = os.path.join(root, file)
                total_files += 1
                
                links = extract_links(file_path)
                total_links += len(links)
                
                for link in links:
                    # Only process internal markdown links
                    if not link.endswith('.md') and '%20' not in link:
                        continue
                    
                    valid, abs_path = check_local_link(file_path, link)
                    if not valid:
                        broken_internal_links += 1
                        f.write(f"| {file_path} | {link} | ❌ Not found at {abs_path} |\n")
                    else:
                        f.write(f"| {file_path} | {link} | ✅ OK |\n")
        
        # Write summary
        f.write("\n## Statistiques\n\n")
        f.write(f"- Nombre total de fichiers Markdown: {total_files}\n")
        f.write(f"- Nombre total de liens: {total_links}\n")
        f.write(f"- Nombre de liens internes cassés: {broken_internal_links}\n")
        
        # Recommendations
        f.write("\n## Recommandations\n\n")
        if broken_internal_links > 0:
            f.write("1. Corriger les liens internes cassés en utilisant les noms de fichiers avec underscores\n")
            f.write("2. Exécuter le script `fix_internal_links.py` pour automatiser cette tâche\n")
        else:
            f.write("Tous les liens internes sont valides. Aucune action n'est nécessaire.\n")
    
    print(f"Rapport généré dans {report_file}")

if __name__ == '__main__':
    main()
