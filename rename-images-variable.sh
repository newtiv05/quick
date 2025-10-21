#!/bin/bash

echo "🔧 Renommage de la variable 'images' dupliquée"
echo "=============================================="

cd /opt/mk || exit 1
pm2 stop adspro

# Sauvegarder
cp server/routes/admin.js server/routes/admin.js.backup.$(date +%s)

cd server/routes

# Trouver toutes les lignes avec "let images"
echo "Occurrences de 'let images' trouvées:"
grep -n "let images" admin.js

# Utiliser awk pour renommer intelligemment
awk '
BEGIN { 
    images_count = 0
    in_map_function = 0
}
# Détecter si on est dans une fonction map
/\.map\(/ { in_map_function = 1 }
/^[[:space:]]*}\);/ { in_map_function = 0 }

{
    line = $0
    
    # Si on trouve "let images = []"
    if (line ~ /let images = \[\];/) {
        images_count++
        
        # La première occurrence reste "images"
        if (images_count == 1) {
            print line
        }
        # Les suivantes deviennent "productImages"
        else {
            gsub(/let images = \[\];/, "let productImages = [];", line)
            print line
            # Marquer qu on doit remplacer images par productImages dans cette section
            in_renamed_section = 1
        }
    }
    # Dans la section renommée, remplacer les usages de "images"
    else if (in_renamed_section && line ~ /\bimages\b/ && line !~ /product\.images/) {
        gsub(/\bimages\b/, "productImages", line)
        print line
        
        # Arrêter le remplacement à la fin de la fonction
        if (line ~ /return \{/ || line ~ /^[[:space:]]*}\);/) {
            in_renamed_section = 0
        }
    }
    else {
        print line
    }
}
' admin.js > admin.js.fixed

# Vérifier le fichier corrigé
echo ""
echo "Vérification du fichier corrigé..."
cd /opt/mk/server

if node --check routes/admin.js.fixed 2>&1; then
    echo "✅ Fichier corrigé validé!"
    mv routes/admin.js.fixed routes/admin.js
    
    echo "Redémarrage du serveur..."
    cd /opt/mk
    pm2 start server/server.js --name adspro
    sleep 5
    
    echo ""
    echo "=============================================="
    echo "📊 RÉSULTAT:"
    pm2 status
    echo ""
    pm2 logs adspro --lines 20 --nostream
    
else
    echo "❌ Erreur dans le fichier corrigé"
    rm routes/admin.js.fixed
    echo "Fichier original restauré"
    exit 1
fi

