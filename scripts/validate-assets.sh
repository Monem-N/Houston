#!/bin/bash

# Script pour valider les références d'images dans le projet
# et vérifier la qualité des images existantes

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages d'erreur
print_error() {
    echo -e "${RED}[ERREUR]${NC} $1" >&2
}

# Fonction pour afficher les messages de succès
print_success() {
    echo -e "${GREEN}[SUCCÈS]${NC} $1"
}

# Fonction pour afficher les avertissements
print_warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1" >&2
}

# Fonction de nettoyage
cleanup() {
    if [ -d "$TMP_DIR" ]; then
        rm -rf "$TMP_DIR"
    fi
}

# Configurer le trap pour le nettoyage
trap cleanup EXIT

# Vérifier si le répertoire src existe
if [ ! -d "src" ]; then
    print_error "Le répertoire src n'existe pas"
    exit 1
fi

# Vérifier si le répertoire public/assets existe
if [ ! -d "public/assets" ]; then
    print_error "Le répertoire public/assets n'existe pas"
    exit 1
fi

# Créer un répertoire temporaire pour les fichiers de rapport
TMP_DIR="$(mktemp -d)"
if [ ! -d "$TMP_DIR" ]; then
    print_error "Impossible de créer le répertoire temporaire"
    exit 1
fi

# Extraire les références d'images du code source avec plus de formats supportés
grep -rh -E "['\"`]([./]*/?assets/[^'\"`]*\.(png|jpg|jpeg|svg|gif|webp))['\"`]" src/ | \
    perl -pe 's/.*?['\"`](.+?)['\"`].*/\1/g' | \
    sed -E 's|^\./||;s|^/||' | \
    grep -E '^assets/' | \
    sort | uniq > "$TMP_DIR/referenced-images.txt"

# Normaliser les chemins dans referenced-images.txt
sed -i '' 's|^/||' "$TMP_DIR/referenced-images.txt"

# Lister toutes les images existantes dans le répertoire assets
find public/assets/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.gif" -o -name "*.webp" \) -print0 | xargs -0 file --mime-type | grep -i "image/" | cut -d: -f1 | sed 's|^public/||' | sort > "$TMP_DIR/existing-images.txt"

# Identifier les images manquantes
comm -23 "$TMP_DIR/referenced-images.txt" "$TMP_DIR/existing-images.txt" > "$TMP_DIR/missing-images.txt"

# Identifier les images non utilisées
comm -13 "$TMP_DIR/referenced-images.txt" "$TMP_DIR/existing-images.txt" > "$TMP_DIR/unused-images.txt"

# Vérifier la taille des images
echo "Vérification de la taille des images..."
while IFS= read -r image; do
    if [ -f "public/$image" ]; then
        size=$(stat -f %z "public/$image")
        if [ $size -gt 1000000 ]; then # 1MB
            echo "$image: $(($size/1024))KB" >> "$TMP_DIR/large-images.txt"
        fi
    fi
done < "$TMP_DIR/existing-images.txt"

# Afficher les résultats
echo ""
echo "=== Rapport de validation des ressources ==="

# Afficher les images manquantes
if [ -s "$TMP_DIR/missing-images.txt" ]; then
    print_error "Images manquantes:"
    cat "$TMP_DIR/missing-images.txt"
else
    print_success "Aucune image manquante détectée"
fi

# Afficher les images non utilisées
if [ -s "$TMP_DIR/unused-images.txt" ]; then
    print_warning "Images non utilisées:"
    cat "$TMP_DIR/unused-images.txt"
fi

# Afficher les images volumineuses
if [ -s "$TMP_DIR/large-images.txt" ]; then
    print_warning "Images volumineuses (>1MB):"
    cat "$TMP_DIR/large-images.txt"
fi

# Afficher le résumé
echo ""
echo "=== Résumé de la validation ==="
total_missing=$(wc -l < "$TMP_DIR/missing-images.txt" || echo 0)
total_unused=$(wc -l < "$TMP_DIR/unused-images.txt" || echo 0)
total_large=$(wc -l < "$TMP_DIR/large-images.txt" || echo 0)

echo "Total des problèmes détectés:"
echo "- Images manquantes: $total_missing"
echo "- Images non utilisées: $total_unused"
echo "- Images volumineuses: $total_large"

echo ""
echo "Validation terminée."

# Le code de sortie dépend de la présence d'images manquantes
if [ "$total_missing" -gt 0 ]; then
    exit 1
fi
