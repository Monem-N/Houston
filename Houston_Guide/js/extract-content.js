/**
 * Script pour extraire le contenu du fichier HTML original
 * et l'insérer dans le nouveau fichier HTML
 */

// Fonction pour lire le fichier original
function readOriginalFile() {
    const fs = require('fs');
    const path = require('path');
    
    const originalFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025.html');
    const newFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_new.html');
    
    // Lire le fichier original
    fs.readFile(originalFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier original:', err);
            return;
        }
        
        // Extraire le contenu principal
        const contentRegex = /<div id="Introduction_et_Sommaire" class="content-section">([\s\S]*?)<\/div><div id="floating-nav"/;
        const match = data.match(contentRegex);
        
        if (!match) {
            console.error('Impossible de trouver le contenu principal dans le fichier original');
            return;
        }
        
        const mainContent = match[0].replace('<div id="floating-nav"', '');
        
        // Extraire le menu de navigation
        const navMenuRegex = /<div id="nav-menu">([\s\S]*?)<\/div>/;
        const navMatch = data.match(navMenuRegex);
        
        if (!navMatch) {
            console.error('Impossible de trouver le menu de navigation dans le fichier original');
            return;
        }
        
        const navMenu = navMatch[0];
        
        // Lire le nouveau fichier
        fs.readFile(newFilePath, 'utf8', (err, newData) => {
            if (err) {
                console.error('Erreur lors de la lecture du nouveau fichier:', err);
                return;
            }
            
            // Insérer le contenu principal
            let updatedData = newData.replace('<main role="main">\n        <!-- Le contenu sera copié depuis le fichier original -->\n    </main>', `<main role="main">\n        ${mainContent}\n    </main>`);
            
            // Insérer le menu de navigation
            updatedData = updatedData.replace('<div id="nav-menu" role="navigation" aria-label="Menu de navigation">\n        <!-- Le menu sera copié depuis le fichier original -->\n    </div>', navMenu);
            
            // Écrire le fichier mis à jour
            fs.writeFile(newFilePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture du fichier mis à jour:', err);
                    return;
                }
                
                console.log('Le contenu a été extrait et inséré avec succès dans le nouveau fichier');
            });
        });
    });
}

// Exécuter la fonction
readOriginalFile();
