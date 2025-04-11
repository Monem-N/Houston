# Guide de Voyage Houston - FIRST Championship 2025

Ce dépôt contient tous les documents de votre guide de voyage personnalisé pour Houston, ainsi qu'un script pour générer un PDF complet regroupant tous les guides.

## Structure des fichiers

- **Documents principaux**: Résumé exécutif, guides d'arrivée et de départ
- **Guides journaliers**: Un guide détaillé pour chaque journée de votre séjour
- **Guides thématiques**: Gastronomie, shopping, Downtown Houston, etc.
- **Annexes**: Informations sur Touristanbul, cartes et liens utiles

## Génération du PDF

Pour générer un PDF complet contenant tous les guides:

1. Assurez-vous d'avoir Python 3.6+ installé sur votre ordinateur
2. Installez les dépendances requises:
   ```
   pip install -r requirements.txt
   ```
3. Placez votre image de couverture nommée `front_page.png` dans le même dossier
4. Exécutez le script:
   ```
   python generate_travel_guide_pdf.py
   ```
5. Le fichier `Guide_Voyage_Houston_2025.pdf` sera généré dans le même dossier

## Personnalisation

- Vous pouvez modifier l'ordre des documents dans le script `generate_travel_guide_pdf.py`
- Pour changer l'image de couverture, remplacez le fichier `front_page.png`
- Les styles et la mise en page peuvent être ajustés dans la classe `TravelGuidePDF`

## Notes importantes

- Le script convertit les fichiers Markdown en PDF, mais certaines fonctionnalités avancées de Markdown peuvent ne pas être parfaitement rendues
- Les images référencées par URL dans les documents Markdown ne sont pas incluses dans le PDF
- Pour une meilleure expérience, il est recommandé d'utiliser des chemins d'accès absolus pour les images locales

Nous vous souhaitons un excellent voyage à Houston!
