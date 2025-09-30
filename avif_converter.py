from PIL import Image
import os

# Répertoire avec les images à convertir
input_folder = "assets"
output_folder = "images_avif"

os.makedirs(output_folder, exist_ok=True)

# Parcours des fichiers du dossier
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".avif")
        
        # Ouverture et conversion
        with Image.open(input_path) as img:
            img.save(output_path, format="AVIF", quality=80)  # quality entre 0 et 100

        print(f"Converti : {filename} → {output_path}")

print("Conversion terminée !")