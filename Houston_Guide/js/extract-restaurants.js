/**
 * Script pour extraire et consolider les informations sur les restaurants
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour extraire les informations sur les restaurants
async function extractRestaurants() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Extraction des informations sur les restaurants...');
    
    // Rechercher tous les paragraphes contenant des informations sur les restaurants
    const allParagraphs = document.querySelectorAll('p');
    const restaurantParagraphs = [];
    
    allParagraphs.forEach(p => {
      const text = p.textContent.toLowerCase();
      if (text.includes('restaurant') || text.includes('café') || text.includes('dîner') || 
          text.includes('déjeuner') || text.includes('cuisine') || text.includes('menu')) {
        restaurantParagraphs.push({
          text: p.textContent,
          html: p.innerHTML,
          parentSection: p.closest('.content-section')?.querySelector('h1, h2')?.textContent || 'Section inconnue'
        });
      }
    });
    
    console.log(`${restaurantParagraphs.length} paragraphes contenant des informations sur les restaurants trouvés.`);
    
    // Extraire les noms des restaurants
    const restaurantNames = new Set();
    const restaurants = [];
    
    restaurantParagraphs.forEach(paragraph => {
      // Rechercher les noms de restaurants potentiels (mots avec majuscules suivis de mots sans "restaurant")
      const regex = /([A-Z][a-zÀ-ÿ']+(?:\s+[A-Z][a-zÀ-ÿ']+)*(?:\s+[a-zÀ-ÿ']+){0,2})/g;
      const matches = paragraph.text.match(regex);
      
      if (matches) {
        matches.forEach(match => {
          // Filtrer les faux positifs
          if (match.length > 3 && !match.match(/^(Le|La|Les|The|Un|Une|Des|Houston|Texas|Center|Museum|Park|Zoo|Space|Kemah|Downtown|Uptown|Galleria|Convention|Center)$/)) {
            if (!restaurantNames.has(match)) {
              restaurantNames.add(match);
              
              // Extraire des informations supplémentaires si disponibles
              const priceMatch = paragraph.text.match(/(\$+|\d+\s*[\-à]\s*\d+\s*\$|\d+\s*\$)/);
              const addressMatch = paragraph.text.match(/(\d+\s+[A-Za-zÀ-ÿ\s\.,]+(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Drive|Dr|Lane|Ln|Place|Pl|Way|Court|Ct|Circle|Cir|Highway|Hwy))/i);
              const ratingMatch = paragraph.text.match(/([\d,\.]+\s*\/\s*[\d,\.]+|[\d,\.]+\s*étoiles)/i);
              
              restaurants.push({
                name: match,
                section: paragraph.parentSection,
                description: paragraph.text,
                price: priceMatch ? priceMatch[0] : null,
                address: addressMatch ? addressMatch[0] : null,
                rating: ratingMatch ? ratingMatch[0] : null
              });
            }
          }
        });
      }
    });
    
    console.log(`${restaurants.length} restaurants potentiels identifiés.`);
    
    // Regrouper les restaurants par catégorie
    const categories = {
      'Italien': [],
      'Tex-Mex': [],
      'Américain': [],
      'Fruits de mer': [],
      'Asiatique': [],
      'Fast Food': [],
      'Café': [],
      'Autre': []
    };
    
    restaurants.forEach(restaurant => {
      const description = restaurant.description.toLowerCase();
      
      if (description.includes('italien') || description.includes('pasta') || description.includes('pizza')) {
        categories['Italien'].push(restaurant);
      } else if (description.includes('tex-mex') || description.includes('mexicain') || description.includes('tacos')) {
        categories['Tex-Mex'].push(restaurant);
      } else if (description.includes('burger') || description.includes('steak') || description.includes('grill')) {
        categories['Américain'].push(restaurant);
      } else if (description.includes('fruits de mer') || description.includes('seafood') || description.includes('poisson')) {
        categories['Fruits de mer'].push(restaurant);
      } else if (description.includes('asiatique') || description.includes('chinois') || description.includes('japonais') || description.includes('sushi')) {
        categories['Asiatique'].push(restaurant);
      } else if (description.includes('fast food') || description.includes('rapide') || description.includes('à emporter')) {
        categories['Fast Food'].push(restaurant);
      } else if (description.includes('café') || description.includes('coffee') || description.includes('pâtisserie')) {
        categories['Café'].push(restaurant);
      } else {
        categories['Autre'].push(restaurant);
      }
    });
    
    // Créer un rapport sur les restaurants
    const reportFilePath = path.join(__dirname, '..', 'restaurants_extraits.md');
    let reportContent = '# Restaurants extraits du Guide de Voyage Houston 2025\n\n';
    
    Object.entries(categories).forEach(([category, restaurantList]) => {
      if (restaurantList.length > 0) {
        reportContent += `## ${category} (${restaurantList.length})\n\n`;
        
        restaurantList.forEach(restaurant => {
          reportContent += `### ${restaurant.name}\n\n`;
          reportContent += `- **Section d'origine:** ${restaurant.section}\n`;
          if (restaurant.price) reportContent += `- **Prix:** ${restaurant.price}\n`;
          if (restaurant.address) reportContent += `- **Adresse:** ${restaurant.address}\n`;
          if (restaurant.rating) reportContent += `- **Note:** ${restaurant.rating}\n`;
          reportContent += `- **Description:** ${restaurant.description.substring(0, 200)}${restaurant.description.length > 200 ? '...' : ''}\n\n`;
        });
      }
    });
    
    // Écrire le rapport
    fs.writeFileSync(reportFilePath, reportContent, 'utf8');
    
    console.log(`Rapport sur les restaurants créé : ${reportFilePath}`);
    
    // Créer une section consolidée pour les restaurants
    const consolidatedFilePath = path.join(__dirname, '..', 'guide_gastronomique_consolide.md');
    let consolidatedContent = '# Guide Gastronomique - Houston 2025\n\n';
    consolidatedContent += '## Restaurants par catégorie\n\n';
    
    Object.entries(categories).forEach(([category, restaurantList]) => {
      if (restaurantList.length > 0) {
        consolidatedContent += `### 🍽️ ${category}\n\n`;
        
        restaurantList.forEach(restaurant => {
          const price = restaurant.price || '?$';
          const rating = restaurant.rating || '';
          const address = restaurant.address ? `📍 ${restaurant.address.substring(0, 30)}${restaurant.address.length > 30 ? '...' : ''}` : '';
          
          consolidatedContent += `- **${restaurant.name}**: `;
          
          // Extraire une description concise
          let description = '';
          const descLower = restaurant.description.toLowerCase();
          
          if (descLower.includes('cuisine')) {
            const cuisineMatch = restaurant.description.match(/cuisine ([^\.]+)/i);
            if (cuisineMatch) description += cuisineMatch[1] + ', ';
          }
          
          if (descLower.includes('ambiance')) {
            const ambianceMatch = restaurant.description.match(/ambiance ([^\.]+)/i);
            if (ambianceMatch) description += ambianceMatch[1] + ', ';
          }
          
          if (descLower.includes('spécialité')) {
            const specialtyMatch = restaurant.description.match(/spécialité[s]? ([^\.]+)/i);
            if (specialtyMatch) description += specialtyMatch[1] + ', ';
          }
          
          if (description === '') {
            // Si aucune description spécifique n'a été trouvée, prendre les 50 premiers caractères
            description = restaurant.description.substring(0, 50).replace(/^[^a-zA-Z]+/, '') + '...';
          }
          
          consolidatedContent += `${description.trim().replace(/,$/, '')} (${price})\n`;
          consolidatedContent += `  ${address} ${rating ? '| ⭐ ' + rating : ''}\n\n`;
        });
      }
    });
    
    // Ajouter des sections supplémentaires
    consolidatedContent += '## Restaurants près de l\'hôtel\n\n';
    consolidatedContent += '- **Niko Niko\'s**: Cuisine grecque authentique, à distance de marche (15-30$)\n';
    consolidatedContent += '- **Chick-fil-A**: Fast-food américain, poulet frit, à 5 minutes à pied (8-15$)\n';
    consolidatedContent += '- **Chipotle**: Cuisine mexicaine rapide et fraîche (10-20$)\n\n';
    
    consolidatedContent += '## Restaurants près du convention center\n\n';
    consolidatedContent += '- **Pappasito\'s Cantina**: Tex-Mex de qualité, portions généreuses (20-40$)\n';
    consolidatedContent += '- **The Grove**: Cuisine américaine raffinée avec vue sur le parc (30-60$)\n';
    consolidatedContent += '- **Grotto Downtown**: Italien avec spécialités de fruits de mer (25-50$)\n\n';
    
    consolidatedContent += '## Restaurants adaptés aux enfants\n\n';
    consolidatedContent += '- **Rainforest Cafe**: Décor de forêt tropicale, menu enfant, animations (20-40$)\n';
    consolidatedContent += '- **Aquarium Restaurant**: Dîner entouré d\'aquariums géants (25-50$)\n';
    consolidatedContent += '- **Bubba Gump Shrimp Co.**: Thème "Forrest Gump", fruits de mer, ambiance détendue (20-40$)\n';
    
    // Écrire le fichier consolidé
    fs.writeFileSync(consolidatedFilePath, consolidatedContent, 'utf8');
    
    console.log(`Guide gastronomique consolidé créé : ${consolidatedFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'extraction des restaurants :', error);
  }
}

// Exécuter la fonction
extractRestaurants();
