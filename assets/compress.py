import subprocess
from PIL import Image
import os

# --- Définition des chemins ---

# Chemin complet vers le script compress.py (pour en déduire le dossier 'assets')
SCRIPT_PATH = r"c:/Users/Fabien/Documents/projet/Projets proffessionnels/kft_portefolio/kft_portefolio/assets/compress.py"
# On extrait le chemin du dossier 'assets' (le répertoire où se trouve le script)
ASSETS_DIR = os.path.dirname(SCRIPT_PATH)

# Le chemin de l'image source
chemin_absolu = os.path.join(ASSETS_DIR, "logo.png")

# Les fichiers temporaires et finaux seront dans le dossier 'assets'
output_file = "image_temp.png"
final_file = "image_compressed_final.png"
pngquant_exec = "pngquant.exe" # Simple nom de fichier, car on va changer de répertoire

# --- Changement du Répertoire de Travail ---

# On sauvegarde le répertoire de travail actuel, puis on le change pour 'assets'
current_working_dir = os.getcwd()
os.chdir(ASSETS_DIR)

# --- Étape A : Optimisation par Pillow ---
print("Début de l'optimisation Pillow...")
try:
    img = Image.open(chemin_absolu)
    if img.mode not in ('P', 'RGBA'):
        img = img.convert('RGBA')
    img = img.convert('P', palette=Image.ADAPTIVE, colors=256) 
    # On sauvegarde le fichier temporaire DANS le dossier 'assets'
    img.save(output_file, optimize=True)
except Exception as e:
    print(f"Erreur lors de l'optimisation Pillow : {e}")
    # On se remet dans le répertoire initial avant de quitter
    os.chdir(current_working_dir)
    exit()


# --- Étape B : Optimisation maximale avec Pngquant ---
print("Début de l'optimisation maximale avec Pngquant...")

try:
    # La commande utilise juste 'pngquant.exe' car on est maintenant DANS le dossier 'assets'
    subprocess.run([
        pngquant_exec,
        '--force',
        '--output', final_file,
        output_file
    ], check=True)
    
    # Nettoyage : Supprimer le fichier temporaire
    os.remove(output_file)
    
    print(f"✔️ Opération terminée ! Fichier compressé : {final_file}")

except FileNotFoundError:
    print("\n💥 ERREUR CRITIQUE : Le programme pngquant.exe n'a PAS été trouvé.")
    print("Vérifiez que le fichier 'pngquant.exe' est bien dans le dossier 'assets'.")
    
except subprocess.CalledProcessError as e:
    print(f"Erreur lors de l'exécution de pngquant : {e}")

finally:
    # TRÈS IMPORTANT : On revient au répertoire de travail initial après l'exécution
    os.chdir(current_working_dir)