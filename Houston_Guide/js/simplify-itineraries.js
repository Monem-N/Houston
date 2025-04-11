/**
 * Script pour simplifier les itinéraires journaliers
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour simplifier les itinéraires
async function simplifyItineraries() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');

    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');

    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    console.log('Simplification des itinéraires journaliers...');

    // Identifier les sections d'itinéraires journaliers
    const itinerarySections = [];

    // Méthode 1: Rechercher par contenu des sections
    const allSections = document.querySelectorAll('div');

    allSections.forEach(section => {
      const text = section.textContent;
      if ((text.includes('Journée') || text.includes('Jour') || text.includes('avril 2025')) &&
          (text.includes('FIRST Championship') || text.includes('Space Center') ||
           text.includes('Museum District') || text.includes('Shopping') ||
           text.includes('Hermann Park') || text.includes('Zoo') ||
           text.includes('Arrivée') || text.includes('Départ'))) {

        // Trouver le titre de la section
        const heading = section.querySelector('h1, h2, h3');
        const title = heading ? heading.textContent : 'Journée non identifiée';

        itinerarySections.push({
          title: title,
          element: section,
          id: section.id || null
        });
      }
    });

    // Si aucune section n'a été trouvée, créer des sections manuellement
    if (itinerarySections.length === 0) {
      console.log('Aucune section d\'itinéraire trouvée automatiquement. Création manuelle des sections...');

      // Créer manuellement les sections d'itinéraires
      const manualItineraries = [
        {
          title: 'Journées 14-15 avril 2025 - Arrivée',
          date: '14-15 avril 2025',
          dayOfWeek: 'Lundi-Mardi',
          objective: 'Voyage et installation à l\'hôtel',
          keyTimes: [
            '14:30 - Départ de Paris CDG',
            '17:45 - Arrivée à Istanbul',
            '20:15 - Départ d\'Istanbul',
            '00:05 - Arrivée à Houston',
            '01:30 - Arrivée à l\'hôtel'
          ],
          highlights: [
            'Enregistrement à l\'hôtel Crowne Plaza',
            'Repos et adaptation au décalage horaire',
            'Exploration des environs de l\'hôtel',
            'Préparation pour le FIRST Championship'
          ],
          transport: 'Uber/Lyft depuis l\'aéroport',
          distance: '30 min depuis l\'aéroport IAH'
        },
        {
          title: 'Journées 16-19 avril 2025 - FIRST Championship',
          date: '16-19 avril 2025',
          dayOfWeek: 'Mercredi-Samedi',
          objective: 'Participer au FIRST Championship et découvrir les compétitions de robotique',
          keyTimes: [
            '08:30 - Départ pour le convention center',
            '09:00 - Début des compétitions',
            '12:30 - Pause déjeuner',
            '17:00 - Fin des compétitions',
            '19:00 - Dîner et activités du soir'
          ],
          highlights: [
            'Compétitions de robotique FIRST',
            'Stands des équipes et démonstrations',
            'Conférences et ateliers',
            'Innovation Faire',
            'Cérémonie de remise des prix (samedi)'
          ],
          transport: 'METRORail ou Uber/Lyft',
          distance: '10-15 min depuis l\'hôtel'
        },
        {
          title: 'Journée 20 avril 2025 - Space Center & Kemah',
          date: '20 avril 2025',
          dayOfWeek: 'Dimanche',
          objective: 'Explorer l\'histoire de la NASA et profiter d\'une soirée au bord de l\'eau',
          keyTimes: [
            '09:00 - Départ pour le Space Center',
            '10:00 - Visite guidée de la NASA',
            '13:00 - Déjeuner au Space Center',
            '16:00 - Départ pour Kemah Boardwalk',
            '20:00 - Retour à l\'hôtel'
          ],
          highlights: [
            'Space Center: Visite guidée NASA, Saturn V Rocket',
            'Kemah: Grande roue, attractions',
            'Dîner fruits de mer au Aquarium Restaurant',
            'Coucher de soleil sur la baie'
          ],
          transport: 'Uber/Lyft recommandé',
          distance: '30-40 min depuis l\'hôtel'
        },
        {
          title: 'Journée 21 avril 2025 - Shopping',
          date: '21 avril 2025',
          dayOfWeek: 'Lundi',
          objective: 'Profiter d\'une journée shopping dans les meilleurs centres commerciaux de Houston',
          keyTimes: [
            '09:30 - Départ pour Katy Mills',
            '10:30 - Shopping à Katy Mills',
            '14:00 - Déjeuner',
            '15:30 - Départ pour The Galleria',
            '19:00 - Retour à l\'hôtel'
          ],
          highlights: [
            'Katy Mills: Plus de 175 magasins et outlets',
            'The Galleria: Centre commercial de luxe avec patinoire',
            'Boutiques spécialisées et souvenirs',
            'Restaurants thématiques'
          ],
          transport: 'Uber/Lyft recommandé',
          distance: '25-30 min pour Katy Mills, 15-20 min pour Galleria'
        },
        {
          title: 'Journée 22 avril 2025 - Museum District',
          date: '22 avril 2025',
          dayOfWeek: 'Mardi',
          objective: 'Découvrir les musées de Houston et leurs expositions fascinantes',
          keyTimes: [
            '09:00 - Départ pour le Museum District',
            '09:30 - Museum of Natural Science',
            '12:30 - Déjeuner',
            '14:00 - Museum of Fine Arts',
            '16:30 - Health Museum'
          ],
          highlights: [
            'Museum of Natural Science: Expositions sur les dinosaures et les pierres précieuses',
            'Museum of Fine Arts: Collections d\'art internationales',
            'Health Museum: Expositions interactives sur le corps humain',
            'Contemporary Arts Museum: Art contemporain'
          ],
          transport: 'METRORail ou à pied',
          distance: '5-10 min depuis l\'hôtel'
        },
        {
          title: 'Journée 23 avril 2025 - Hermann Park et Zoo',
          date: '23 avril 2025',
          dayOfWeek: 'Mercredi',
          objective: 'Explorer Hermann Park et le Zoo de Houston avant le départ',
          keyTimes: [
            '09:00 - Départ pour Hermann Park',
            '09:30 - Visite du Zoo de Houston',
            '12:30 - Déjeuner',
            '14:00 - Promenade dans Hermann Park',
            '16:00 - Retour à l\'hôtel pour préparer le départ'
          ],
          highlights: [
            'Houston Zoo: Plus de 6 000 animaux de 900 espèces',
            'Hermann Park: Jardins japonais, train miniature, lac',
            'McGovern Centennial Gardens',
            'Miller Outdoor Theatre'
          ],
          transport: 'METRORail ou à pied',
          distance: '5-10 min depuis l\'hôtel'
        },
        {
          title: 'Journée 24 avril 2025 - Départ',
          date: '24 avril 2025',
          dayOfWeek: 'Jeudi',
          objective: 'Préparation au départ et retour',
          keyTimes: [
            '07:00 - Check-out de l\'hôtel',
            '07:30 - Départ pour l\'aéroport',
            '10:45 - Départ de Houston',
            '16:20 - Arrivée à Istanbul',
            '19:05 - Départ d\'Istanbul'
          ],
          highlights: [
            'Check-out de l\'hôtel',
            'Transfert à l\'aéroport',
            'Vol de retour avec escale à Istanbul',
            'Arrivée à Paris le 25 avril à 21:45'
          ],
          transport: 'Uber/Lyft pour l\'aéroport',
          distance: '30 min jusqu\'\u00e0 l\'aéroport IAH'
        }
      ];

      // Ajouter les itinéraires manuels à la liste
      manualItineraries.forEach(itinerary => {
        itinerarySections.push(itinerary);
      });
    }

    console.log(`${itinerarySections.length} sections d'itinéraires identifiées.`);

    // Créer des résumés simplifiés pour chaque journée
    const simplifiedItineraries = [];

    itinerarySections.forEach(section => {
      // Extraire les informations clés
      const title = section.title;
      const content = section.element.textContent;

      // Déterminer la date et le jour de la semaine
      let date = '';
      let dayOfWeek = '';

      const dateMatch = title.match(/(\d+)\s+avril\s+2025/);
      if (dateMatch) {
        date = dateMatch[1] + ' avril 2025';

        // Déterminer le jour de la semaine (approximatif pour 2025)
        const dayNum = parseInt(dateMatch[1]);
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        // Le 1er avril 2025 sera un mardi
        const dayIndex = (dayNum + 0) % 7; // +0 car le 1er est un mardi (index 1)
        dayOfWeek = days[dayIndex];
      }

      // Déterminer l'objectif principal de la journée
      let objective = '';

      if (content.includes('Space Center') || content.includes('NASA')) {
        objective = 'Explorer l\'histoire de la NASA et profiter d\'une soirée au bord de l\'eau';
      } else if (content.includes('Museum District') || content.includes('musée')) {
        objective = 'Découvrir les musées de Houston et leurs expositions fascinantes';
      } else if (content.includes('Shopping') || content.includes('Katy Mills') || content.includes('Galleria')) {
        objective = 'Profiter d\'une journée shopping dans les meilleurs centres commerciaux de Houston';
      } else if (content.includes('Hermann Park') || content.includes('Zoo')) {
        objective = 'Explorer Hermann Park et le Zoo de Houston';
      } else if (content.includes('FIRST Championship') || content.includes('George R. Brown Convention Center')) {
        objective = 'Participer au FIRST Championship et découvrir les compétitions de robotique';
      } else if (content.includes('Arrivée') || content.includes('Départ')) {
        objective = 'Voyage et installation à l\'hôtel / Préparation au départ et retour';
      } else {
        objective = 'Explorer Houston et ses attractions';
      }

      // Extraire les horaires clés
      const timeRegex = /(\d{1,2}[h:]\d{0,2})\s*[-–]\s*([^,;\n]+)/g;
      const timeMatches = [...content.matchAll(timeRegex)];
      const keyTimes = [];

      timeMatches.forEach(match => {
        const time = match[1];
        const activity = match[2].trim();

        // Filtrer les activités importantes
        if (activity.includes('Départ') || activity.includes('Arrivée') ||
            activity.includes('Visite') || activity.includes('Dîner') ||
            activity.includes('Déjeuner') || activity.includes('Retour')) {
          keyTimes.push(`${time} - ${activity}`);
        }
      });

      // Extraire les lieux à ne pas manquer
      const highlights = [];

      if (content.includes('Space Center Houston')) highlights.push('Space Center: Visite guidée NASA, Saturn V Rocket');
      if (content.includes('Kemah Boardwalk')) highlights.push('Kemah: Grande roue, dîner fruits de mer');
      if (content.includes('Museum of Natural Science')) highlights.push('Museum of Natural Science: Expositions sur les dinosaures et les pierres précieuses');
      if (content.includes('Museum of Fine Arts')) highlights.push('Museum of Fine Arts: Collections d\'art internationales');
      if (content.includes('Health Museum')) highlights.push('Health Museum: Expositions interactives sur le corps humain');
      if (content.includes('Katy Mills')) highlights.push('Katy Mills: Plus de 175 magasins et outlets');
      if (content.includes('Galleria')) highlights.push('The Galleria: Centre commercial de luxe avec patinoire');
      if (content.includes('Houston Zoo')) highlights.push('Houston Zoo: Plus de 6 000 animaux de 900 espèces');
      if (content.includes('Hermann Park')) highlights.push('Hermann Park: Jardins japonais, train miniature, lac');
      if (content.includes('FIRST Championship')) highlights.push('FIRST Championship: Compétitions de robotique, stands des équipes');
      if (content.includes('Downtown Houston')) highlights.push('Downtown Houston: Architecture moderne, restaurants');

      // Déterminer le mode de transport recommandé
      let transport = '';

      if (content.includes('Uber') || content.includes('Lyft')) {
        transport = 'Uber/Lyft recommandé';
      } else if (content.includes('METRORail') || content.includes('métro')) {
        transport = 'METRORail (métro léger)';
      } else if (content.includes('bus')) {
        transport = 'Bus METRO';
      } else if (content.includes('à pied') || content.includes('marche')) {
        transport = 'À pied (distances courtes)';
      } else {
        transport = 'Uber/Lyft ou transport en commun';
      }

      // Distance approximative depuis l'hôtel
      let distance = '';

      if (content.includes('Space Center')) {
        distance = '30-40 min depuis l\'hôtel';
      } else if (content.includes('Katy Mills')) {
        distance = '25-30 min depuis l\'hôtel';
      } else if (content.includes('Museum District')) {
        distance = '5-10 min depuis l\'hôtel';
      } else if (content.includes('Hermann Park') || content.includes('Zoo')) {
        distance = '5-10 min depuis l\'hôtel';
      } else if (content.includes('George R. Brown Convention Center')) {
        distance = '10-15 min depuis l\'hôtel';
      } else if (content.includes('Galleria')) {
        distance = '15-20 min depuis l\'hôtel';
      } else {
        distance = 'Variable selon les activités';
      }

      // Créer l'itinéraire simplifié
      simplifiedItineraries.push({
        title: title,
        date: date,
        dayOfWeek: dayOfWeek,
        objective: objective,
        keyTimes: keyTimes.slice(0, 5), // Limiter à 5 horaires clés
        highlights: highlights.slice(0, 5), // Limiter à 5 points forts
        transport: transport,
        distance: distance,
        originalId: section.id
      });
    });

    // Créer un fichier Markdown avec les itinéraires simplifiés
    const outputFilePath = path.join(__dirname, '..', 'itineraires_simplifies.md');
    let outputContent = '# Itinéraires Simplifiés - Houston 2025\n\n';

    simplifiedItineraries.forEach(itinerary => {
      outputContent += `## 📍 ${itinerary.title}\n\n`;

      if (itinerary.date && itinerary.dayOfWeek) {
        outputContent += `**${itinerary.dayOfWeek} ${itinerary.date}**\n\n`;
      }

      outputContent += `### 🎯 OBJECTIF\n${itinerary.objective}\n\n`;

      if (itinerary.keyTimes.length > 0) {
        outputContent += `### ⏰ HORAIRES CLÉS\n`;
        itinerary.keyTimes.forEach(time => {
          outputContent += `- ${time}\n`;
        });
        outputContent += '\n';
      }

      if (itinerary.highlights.length > 0) {
        outputContent += `### 💡 À NE PAS MANQUER\n`;
        itinerary.highlights.forEach(highlight => {
          outputContent += `- ${highlight}\n`;
        });
        outputContent += '\n';
      }

      outputContent += `### 🚗 TRANSPORT\n${itinerary.transport} (${itinerary.distance})\n\n`;

      outputContent += `---\n\n`;
    });

    // Écrire le fichier
    fs.writeFileSync(outputFilePath, outputContent, 'utf8');

    console.log(`Itinéraires simplifiés créés : ${outputFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la simplification des itinéraires :', error);
  }
}

// Exécuter la fonction
simplifyItineraries();
