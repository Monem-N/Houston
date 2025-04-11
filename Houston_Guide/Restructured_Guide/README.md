# Houston 2025 Travel Guide

Ce dépôt contient le guide de voyage restructuré pour Houston 2025, avec un focus sur le FIRST Championship et les activités familiales.

## Structure du Guide

Le guide est organisé en sections principales et annexes:

### Sections Principales
1. Introduction et Sommaire
2. Space Center & Kemah Boardwalk
3. Shopping à Katy Mills
4. Sécurité et Logistique
5. Guide Gastronomique
6. FIRST Championship
7. Museum District
8. Hermann Park et Zoo

### Annexes
A. Cartes et Transport
B. Contacts d'Urgence
C. Comparatif Shopping
D. Guide Touristanbul
E. Guide Local - Manger & Acheter

## Génération des Fichiers HTML et PDF

### Prérequis

Pour générer les fichiers HTML et PDF, vous aurez besoin des packages Python suivants:
- markdown
- weasyprint

Vous pouvez les installer avec pip:

```bash
pip install markdown weasyprint
```

Note: WeasyPrint a des dépendances système supplémentaires. Consultez la [documentation officielle](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation) pour les instructions d'installation spécifiques à votre système d'exploitation.

### Génération HTML

Pour générer les fichiers HTML:

```bash
python generate_html.py
```

Les fichiers HTML seront créés dans le dossier `output/`.

### Génération PDF

Pour générer les fichiers PDF:

```bash
python generate_pdf.py
```

Les fichiers PDF seront créés dans le dossier `pdf/`. Un fichier PDF complet `Guide_Voyage_Houston_2025.pdf` sera également généré.

## Personnalisation

### Style CSS

Le style du guide peut être personnalisé en modifiant le fichier `assets/style.css`.

### JavaScript

Les fonctionnalités interactives peuvent être modifiées dans le fichier `assets/script.js`.

## Mise à Jour du Contenu

Pour mettre à jour le contenu du guide:

1. Modifiez les fichiers Markdown dans les dossiers `Main_Sections/` et `Annexes/`
2. Régénérez les fichiers HTML et PDF avec les scripts

## Format des Sections

Chaque section suit un format standardisé:

1. **En-Tête de Section**: Titre avec emoji
2. **Checklist Essentielle**: Éléments à vérifier
3. **Informations Clés**: Horaires, budget, transport
4. **Activités Incontournables**: Recommandations principales
5. **Conseils Familiaux**: Activités pour enfants
6. **Ressources Complémentaires**: Liens et références
7. **Alertes Importantes**: Informations de sécurité

## Licence

Ce guide est destiné à un usage personnel uniquement.
