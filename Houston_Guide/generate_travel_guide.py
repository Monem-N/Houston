#!/usr/bin/env python3
"""
Script de lancement pour générer le guide de voyage
"""

import os
import sys
import subprocess

def main():
    """
    Fonction principale pour lancer la génération du guide
    """
    # Obtenir le chemin du script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Chemin vers le script principal
    main_script = os.path.join(script_dir, "scripts", "main.py")
    
    # Vérifier que le script existe
    if not os.path.exists(main_script):
        print(f"Erreur: Le script {main_script} n'existe pas.")
        sys.exit(1)
    
    # Exécuter le script principal
    try:
        subprocess.run([sys.executable, main_script], check=True)
        print("Génération du guide terminée avec succès!")
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de la génération du guide: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
