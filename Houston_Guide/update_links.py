#!/usr/bin/env python3
import os
import re
import urllib.parse

# Charger la correspondance des noms de fichiers
file_map = {}
with open('file_mapping.txt', 'r') as f:
    for line in f:
        if line.startswith('#'):
            continue
        parts = line.strip().split('|')
        if len(parts) == 2:
            old_name, new_name = parts
            file_map[old_name] = new_name
            # Ajouter aussi les versions encodées pour les URL
            file_map[urllib.parse.quote(old_name)] = urllib.parse.quote(new_name)

# Fonction pour mettre à jour les liens dans un fichier
def update_links_in_file(file_path):
    print(f"Traitement des liens dans {file_path}")
    
    # Lire le contenu du fichier
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Mettre à jour les liens
    for old_name, new_name in file_map.items():
        # Éviter les problèmes avec les caractères spéciaux dans les regex
        old_name_escaped = re.escape(old_name)
        new_name_escaped = new_name
        
        # Mettre à jour les liens de la forme [texte](fichier.md)
        pattern = r'\[([^\]]+)\]\(' + old_name_escaped + r'\)'
        replacement = r'[\1](' + new_name_escaped + r')'
        content = re.sub(pattern, replacement, content)
    
    # Écrire le contenu mis à jour dans le fichier
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Parcourir tous les fichiers Markdown
for file in os.listdir('.'):
    if file.endswith('.md'):
        update_links_in_file(file)

print("Mise à jour des liens terminée.")
