/**
 * Script pour générer la version allégée du Guide de Voyage Houston 2025
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Fonction pour générer la version allégée du guide
async function generateLightGuide() {
  try {
    // Chemins des fichiers
    const outputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_Allege.md');
    const tableMatieresPath = path.join(__dirname, '..', 'table_matieres_simplifiee.md');
    const infoEssPath = path.join(__dirname, '..', 'informations_essentielles.md');
    const itinerairesPath = path.join(__dirname, '..', 'itineraires_simplifies_corriges.md');
    const gastroPath = path.join(__dirname, '..', 'guide_gastronomique_optimise.md');
    const touristanbulPath = path.join(__dirname, '..', 'annexe_touristanbul.md');
    
    console.log('Génération de la version allégée du guide...');
    
    // Lire les fichiers
    const tableMatieres = fs.readFileSync(tableMatieresPath, 'utf8');
    const infoEss = fs.readFileSync(infoEssPath, 'utf8');
    const itineraires = fs.readFileSync(itinerairesPath, 'utf8');
    const gastro = fs.readFileSync(gastroPath, 'utf8');
    const touristanbul = fs.readFileSync(touristanbulPath, 'utf8');
    
    // Créer le contenu du guide allégé
    let guideContent = `# Guide de Voyage Houston 2025 - Version Allégée

*Ce guide est une version allégée du Guide de Voyage Houston 2025, optimisée pour une consultation rapide et efficace.*

## À propos de ce guide

Ce guide a été conçu pour vous accompagner lors de votre voyage à Houston pour le FIRST Championship 2025. Il contient toutes les informations essentielles pour profiter pleinement de votre séjour, organisées de manière claire et concise.

La version allégée que vous consultez actuellement a été optimisée pour :
- Une lecture plus rapide et efficace
- Une impression économique (moins de pages)
- Une navigation simplifiée
- Un accès facile aux informations critiques

Pour accéder à la version complète du guide avec tous les détails, consultez le fichier "Guide_Voyage_Houston_2025.html".

---

`;
    
    // Ajouter la table des matières
    guideContent += tableMatieres + '\n\n---\n\n';
    
    // Ajouter les informations essentielles
    guideContent += infoEss + '\n\n---\n\n';
    
    // Ajouter les itinéraires simplifiés
    guideContent += itineraires + '\n\n---\n\n';
    
    // Ajouter le guide gastronomique
    guideContent += gastro + '\n\n---\n\n';
    
    // Ajouter une section sur les transports
    guideContent += `# Guide des Transports - Houston 2025

## 🚇 METRORail (Métro léger)

### Lignes principales
- **Ligne Rouge** (North Line): Relie le centre-ville au nord de Houston
- **Ligne Verte** (East End Line): Dessert l'est de Houston
- **Ligne Violette** (Southeast Line): Dessert le sud-est de Houston, incluant le Museum District

### Tarifs et billets
- **Tarif standard**: 1,25$ par trajet
- **Carte METRO Q**: Rechargeable, recommandée pour plusieurs trajets
- **Pass journalier**: 3$ pour des trajets illimités pendant 24h

### Conseils pratiques
- Fréquence: Toutes les 6-12 minutes en semaine, 12-18 minutes le week-end
- Horaires: 5h00-23h30 (lun-jeu), 5h00-0h30 (ven), 5h30-0h30 (sam), 5h30-23h30 (dim)
- La ligne rouge dessert le Museum District et le Medical Center
- Validez votre billet avant de monter dans le train

## 🚌 Bus METRO

### Réseau
- Plus de 80 lignes couvrant toute la ville
- Les bus numérotés 1-99 sont des lignes locales
- Les bus numérotés 100+ sont des lignes express

### Tarifs et billets
- **Tarif standard**: 1,25$ par trajet (même tarif que le METRORail)
- **Correspondances gratuites** pendant 3 heures

### Conseils pratiques
- Utilisez l'application METRO Trip pour les horaires en temps réel
- Signalez votre arrêt en tirant sur le cordon
- Préparez l'appoint ou utilisez la carte METRO Q

## 🚗 Uber/Lyft

### Disponibilité
- Excellente couverture dans toute la ville
- Temps d'attente généralement court (5-10 minutes)

### Tarifs estimés
- Aéroport IAH → Hôtel: 35-45$
- Hôtel → Convention Center: 10-15$
- Hôtel → Space Center Houston: 35-45$
- Hôtel → Galleria: 15-20$

### Conseils pratiques
- Vérifiez le modèle et la plaque d'immatriculation avant de monter
- Partagez votre itinéraire avec un proche pour plus de sécurité
- Les heures de pointe (7h-9h et 16h-19h) peuvent augmenter les tarifs

## 🚲 Location de vélos BCycle

### Stations
- Plus de 90 stations dans le centre-ville et les quartiers environnants
- Stations près de l'hôtel et dans le Museum District

### Tarifs
- 3$ pour 30 minutes
- 9$ pour la journée (trajets de 60 minutes max)
- Application BCycle nécessaire pour la location

### Conseils pratiques
- Parfait pour explorer Hermann Park et le Museum District
- Pistes cyclables disponibles sur de nombreux grands axes
- Casques non fournis (apportez le vôtre)

## 🚶‍♀️ À pied

### Zones piétonnes
- Downtown Houston (notamment autour du Convention Center)
- Museum District
- Hermann Park
- Discovery Green

### Conseils pratiques
- Distances parfois importantes entre les quartiers
- Chaleur potentielle en avril (prévoyez eau et chapeau)
- Tunnels climatisés dans le centre-ville (Houston Tunnel System)

## 🗺️ Itinéraires recommandés

### Hôtel → Convention Center
- **Option 1**: METRORail ligne rouge (15 min)
- **Option 2**: Uber/Lyft (10-15 min, 10-15$)

### Hôtel → Museum District
- **Option 1**: À pied (10-15 min)
- **Option 2**: METRORail ligne rouge (5 min)

### Hôtel → Space Center Houston
- **Option 1**: Uber/Lyft (35-45 min, 35-45$)
- **Option 2**: Bus 249 + Bus 246 (1h30)

### Hôtel → The Galleria
- **Option 1**: Uber/Lyft (15-20 min, 15-20$)
- **Option 2**: Bus 82 (30-40 min)

\n\n---\n\n`;
    
    // Ajouter l'annexe Touristanbul
    guideContent += touristanbul + '\n\n---\n\n';
    
    // Ajouter une conclusion
    guideContent += `# Conclusion

Nous espérons que ce guide allégé vous sera utile lors de votre séjour à Houston pour le FIRST Championship 2025. N'hésitez pas à consulter la version complète du guide pour des informations plus détaillées sur chaque aspect de votre voyage.

## Contacts utiles

- **Urgences**: 911
- **Police (non urgent)**: +1 713-884-3131
- **Consulat de France à Houston**: +1 346-272-5363
- **Hôtel Crowne Plaza**: +1 713-797-1110
- **FIRST Championship**: [www.firstchampionship.org](https://www.firstchampionship.org)
- **Visit Houston**: [www.visithoustontexas.com](https://www.visithoustontexas.com)

## Remerciements

Ce guide a été préparé avec soin pour vous offrir la meilleure expérience possible à Houston. Nous vous souhaitons un excellent séjour et une compétition enrichissante au FIRST Championship 2025.

*Guide créé le 12 avril 2025*`;
    
    // Écrire le fichier
    fs.writeFileSync(outputPath, guideContent, 'utf8');
    
    console.log(`Guide allégé créé : ${outputPath}`);
    
    // Créer une version HTML du guide allégé
    const htmlOutputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_Allege.html');
    
    // Convertir le Markdown en HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guide de Voyage Houston 2025 - Version Allégée</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2563eb;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        h1 {
            font-size: 2em;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.3em;
        }
        h2 {
            font-size: 1.5em;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 0.2em;
        }
        a {
            color: #2563eb;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            background-color: #f1f5f9;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: Consolas, Monaco, 'Andale Mono', monospace;
        }
        pre {
            background-color: #f1f5f9;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #e5e7eb;
            margin-left: 0;
            padding-left: 1em;
            color: #6b7280;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #e5e7eb;
            padding: 0.5em;
            text-align: left;
        }
        th {
            background-color: #f1f5f9;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        hr {
            border: 0;
            border-top: 1px solid #e5e7eb;
            margin: 2em 0;
        }
        .emoji {
            font-size: 1.2em;
        }
        @media print {
            body {
                font-size: 12pt;
            }
            a {
                color: #000;
                text-decoration: none;
            }
            h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
                page-break-inside: avoid;
            }
            img {
                page-break-inside: avoid;
                max-width: 100% !important;
            }
            pre, blockquote {
                page-break-inside: avoid;
            }
            @page {
                margin: 2cm;
            }
        }
    </style>
</head>
<body>
    ${marked(guideContent)}
    
    <script>
        // Ajouter des ancres aux titres pour la navigation
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            if (!heading.id) {
                const id = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                heading.id = id;
            }
        });
    </script>
</body>
</html>`;
    
    // Écrire le fichier HTML
    fs.writeFileSync(htmlOutputPath, htmlContent, 'utf8');
    
    console.log(`Version HTML du guide allégé créée : ${htmlOutputPath}`);
  } catch (error) {
    console.error('Erreur lors de la génération du guide allégé :', error);
  }
}

// Exécuter la fonction
generateLightGuide();
