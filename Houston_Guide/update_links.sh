#!/bin/bash

# Charger la correspondance des noms de fichiers
declare -A file_map
while IFS="|" read -r old_name new_name; do
  # Ignorer les lignes de commentaires
  if [[ ! $old_name =~ ^#.* ]]; then
    file_map["$old_name"]="$new_name"
  fi
done < file_mapping.txt

# Fonction pour encoder les caractères spéciaux dans les URL
urlencode() {
  local string="$1"
  local encoded=""
  local i
  for (( i=0; i<${#string}; i++ )); do
    local c="${string:$i:1}"
    case "$c" in
      [a-zA-Z0-9.~_-]) encoded+="$c" ;;
      " ") encoded+="%" ;;
      *) encoded+=$(printf '%%%02X' "'$c") ;;
    esac
  done
  echo "$encoded"
}

# Parcourir tous les fichiers Markdown
for file in *.md; do
  echo "Traitement des liens dans $file"
  
  # Créer un fichier temporaire
  temp_file=$(mktemp)
  
  # Copier le contenu du fichier dans le fichier temporaire
  cp "$file" "$temp_file"
  
  # Mettre à jour les liens dans le fichier
  for old_name in "${!file_map[@]}"; do
    new_name="${file_map[$old_name]}"
    
    # Encoder les noms pour les URL
    old_name_encoded=$(echo "$old_name" | sed 's/ /%20/g')
    new_name_encoded=$(echo "$new_name" | sed 's/ /%20/g')
    
    # Remplacer les liens dans le fichier
    sed -i '' "s|\\[$old_name\\]|\\[$new_name\\]|g" "$temp_file"
    sed -i '' "s|\\[.*\\](${old_name})|\\[&\\](${new_name})|g" "$temp_file"
    sed -i '' "s|\\[.*\\](${old_name_encoded})|\\[&\\](${new_name_encoded})|g" "$temp_file"
  done
  
  # Remplacer le fichier original par le fichier temporaire
  mv "$temp_file" "$file"
done

echo "Mise à jour des liens terminée."
