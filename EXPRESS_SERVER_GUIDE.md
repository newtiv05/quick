# 🚀 Express.js Server - AdsMarket TUU

## ✅ Serveur Express.js Créé avec Succès!

### 📁 Structure du Serveur

```
server/
├── index.js              # Serveur principal Express.js
├── package.json          # Dépendances du serveur
├── config.js            # Configuration du serveur
├── routes/
│   └── api.js           # Routes API
└── middleware/
    └── security.js      # Middleware de sécurité
```

### 🔧 Fonctionnalités du Serveur

**🛡️ Sécurité:**
- ✅ **Helmet** pour les en-têtes de sécurité
- ✅ **CORS** configuré pour les origines autorisées
- ✅ **Rate Limiting** (100 requêtes/15 minutes)
- ✅ **Compression** pour optimiser les performances

**📡 API Endpoints:**
- ✅ `GET /api/health` - Vérification de santé
- ✅ `GET /api/products` - Liste des produits
- ✅ `GET /api/products/:id` - Détails d'un produit
- ✅ `GET /api/categories` - Catégories disponibles
- ✅ `POST /api/track` - Tracking des événements

**📦 Fichiers Statiques:**
- ✅ **React App** servie depuis `/dist`
- ✅ **Cache optimisé** (1 jour)
- ✅ **Fallback** vers React Router

### 🚀 Commandes Disponibles

**Serveur uniquement:**
```bash
npm run server          # Démarrer le serveur
npm run server:dev      # Serveur en mode développement
npm run server:install  # Installer les dépendances
```

**Application complète:**
```bash
npm run start:all       # Build + Serveur
npm run dev:all         # Dev + Serveur (concurrent)
```

### 🌐 URLs d'Accès

**Serveur Express:**
- **URL:** `http://localhost:5000/`
- **API:** `http://localhost:5000/api/`
- **Health:** `http://localhost:5000/api/health`

**Application React:**
- **Dev:** `http://localhost:3000/` (Vite)
- **Prod:** `http://localhost:5000/` (Express)

### 📊 API Endpoints Détail

**1. Health Check:**
```bash
GET /api/health
```
Réponse:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

**2. Produits:**
```bash
GET /api/products
```
Réponse:
```json
{
  "success": true,
  "data": [...],
  "total": 3
}
```

**3. Produit spécifique:**
```bash
GET /api/products/1
```

**4. Catégories:**
```bash
GET /api/categories
```

**5. Tracking:**
```bash
POST /api/track
Content-Type: application/json

{
  "event": "product_view",
  "data": { "productId": "1" }
}
```

### 🔧 Configuration

**Variables d'environnement:**
- `PORT=5000` - Port du serveur
- `NODE_ENV=development` - Environnement
- `CORS_ORIGINS` - Origines CORS autorisées

**Sécurité:**
- **Rate Limiting:** 100 requêtes/15 minutes
- **CSP:** Content Security Policy strict
- **CORS:** Origines configurées
- **Helmet:** En-têtes de sécurité

### 🎯 Utilisation

**1. Développement:**
```bash
# Terminal 1: React Dev Server
npm run dev

# Terminal 2: Express Server
npm run server:dev
```

**2. Production:**
```bash
# Build + Serveur
npm run start:all
```

**3. Développement complet:**
```bash
# Les deux serveurs en parallèle
npm run dev:all
```

### 📱 Test des Endpoints

**Test Health:**
```bash
curl http://localhost:5000/api/health
```

**Test Produits:**
```bash
curl http://localhost:5000/api/products
```

**Test Application:**
```bash
# Ouvrir dans le navigateur
http://localhost:5000/
```

### 🎉 Résultat

**✅ Serveur Express.js fonctionnel!**
- **Port:** 5000
- **API:** Complète avec endpoints
- **Sécurité:** Configurée
- **Performance:** Optimisée
- **React:** Servie correctement

**Votre AdsMarket TUU a maintenant un serveur Express.js complet!** 🚀✨

