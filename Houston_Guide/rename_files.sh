#!/bin/bash

# Liste des fichiers à renommer
files=(
  "Annexe - Downtown Houston à Explorer.md"
  "Annexes - Cartes et Liens Utiles.md"
  "Experiencing Houston.md"
  "Guide Activités Enfants - Houston pour les 10 ans.md"
  "Guide Gastronomique et Shopping - Houston Authentique.md"
  "Guide Local Houston _ Manger, Acheter_.md"
  "Guide Pratique Touristanbul.md"
  "Houston Trip Plan - Day 8 Detailed.md"
  "Houston Trip Plan - Detailed Outline.md"
  "Introduction et Sommaire.md"
  "Journée 14 avril 2025 Guide Départ – Arrivée à Houston.md"
  "Journée 20 avril 2025 - Guide Space Center & Kemah Détaillé.md"
  "Journée 21 avr 2025 Aventure Shopping à Houston.md"
  "Journée 21 avril 2025 - Guide Shopping Détaillé Final.md"
  "Journée 22 avril 2025 - Guide Museum District Détaillé.md"
  "Journée 22 avril 2025 scientifique à Houston_.md"
  "Journée 23 avril 2025 - Guide Hermann Park et Zoo Détaillé.md"
  "Journée 23 avril 2025 Itinéraire familial à Houston_.md"
  "Journée_20_avril_2025_Space_Center_Houston.md"
  "Journées 14-15 et 23-24 avril 2025 - Guide Arrivée et Départ.md"
  "Journées 16 avr 2025- 19 avr 2025.md"
  "Journées 16-19 avril 2025 - Guide FIRST Championship Détaillé Final.md"
  "Plan de Voyage Houston - Résumé Exécutif.md"
  "README.md"
  "Touristanbul.md"
  "Transport Local pour le FIRST Championship 2025.md"
)

# Créer un fichier de correspondance pour les mises à jour de liens
echo "# Correspondance des noms de fichiers" > file_mapping.txt
echo "# Format: ancien_nom|nouveau_nom" >> file_mapping.txt

# Renommer les fichiers
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Remplacer les espaces par des underscores
    new_name=$(echo "$file" | sed 's/ /_/g')
    
    # Éviter de renommer si le nom est déjà correct
    if [ "$file" != "$new_name" ]; then
      echo "Renommage: $file -> $new_name"
      mv "$file" "$new_name"
      echo "$file|$new_name" >> file_mapping.txt
    else
      echo "Déjà correct: $file"
    fi
  else
    echo "Fichier non trouvé: $file"
  fi
done

echo "Renommage terminé. Voir file_mapping.txt pour la correspondance des noms."
