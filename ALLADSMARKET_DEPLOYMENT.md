# AllAdsMarket.com Deployment Guide

## 🚀 Configuration pour alladsmarket.com

Ce projet est configuré spécifiquement pour le domaine **alladsmarket.com** avec toutes les optimisations nécessaires.

## 📁 Fichiers de Configuration

### 1. Vite Configuration (`config/vite.config.js`)
- ✅ Configuration optimisée pour alladsmarket.com
- ✅ CORS configuré pour le domaine
- ✅ Proxy API configuré
- ✅ Headers de sécurité
- ✅ Variables d'environnement définies

### 2. Configuration AllAdsMarket (`config/alladsmarket.config.js`)
- ✅ Configuration centralisée du domaine
- ✅ Paramètres de sécurité
- ✅ Configuration SEO
- ✅ Configuration API
- ✅ Paramètres de performance

### 3. Serveur Express (`server/alladsmarket-server.js`)
- ✅ Serveur optimisé pour alladsmarket.com
- ✅ Middleware de sécurité
- ✅ Rate limiting
- ✅ Compression
- ✅ Gestion des erreurs

## 🔧 Variables d'Environnement

```bash
# AllAdsMarket.com Environment Variables
VITE_DOMAIN=alladsmarket.com
VITE_API_URL=https://alladsmarket.com
VITE_SITE_URL=https://alladsmarket.com
VITE_APP_NAME=AllAdsMarket
VITE_APP_VERSION=2.0.0
```

## 🚀 Déploiement

### 1. Build de Production
```bash
npm run build
```

### 2. Test de la Configuration
```bash
node test-alladsmarket-config.js
```

### 3. Déploiement Automatique
```bash
chmod +x deploy-alladsmarket.sh
./deploy-alladsmarket.sh
```

## 🌐 Configuration du Serveur

### Nginx Configuration
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name alladsmarket.com www.alladsmarket.com;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy strict-origin-when-cross-origin;
    
    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Static Files
    location / {
        root /var/www/alladsmarket.com/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache Headers
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🔒 Sécurité

### Headers de Sécurité Configurés
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Content Security Policy (CSP)
- ✅ CORS configuré pour alladsmarket.com

### Rate Limiting
- ✅ 100 requêtes par IP toutes les 15 minutes
- ✅ Protection contre les attaques DDoS

## ⚡ Performance

### Optimisations Configurées
- ✅ Compression Gzip
- ✅ Cache agressif pour les assets statiques
- ✅ Tree shaking activé
- ✅ Minification ESBuild
- ✅ Code splitting optimisé

### PWA Support
- ✅ Service Worker configuré
- ✅ Manifest.json optimisé
- ✅ Cache strategy agressive

## 📊 Monitoring

### Analytics
- ✅ Google Analytics configuré
- ✅ Error tracking activé
- ✅ Performance monitoring

### Health Checks
- ✅ `/api/health` - Status du serveur
- ✅ `/api/config` - Configuration du domaine

## 🧪 Tests

### Configuration Test
```bash
node test-alladsmarket-config.js
```

### Build Test
```bash
npm run build
npm run preview
```

## 📝 Notes Importantes

1. **Domaine Principal**: alladsmarket.com
2. **API Base URL**: https://alladsmarket.com/api
3. **Build Directory**: `dist/`
4. **Port de Développement**: 3000
5. **Port de Production**: 3000 (configurable)

## 🔄 Mise à Jour

Pour mettre à jour la configuration :
1. Modifier `config/alladsmarket.config.js`
2. Tester avec `node test-alladsmarket-config.js`
3. Rebuilder avec `npm run build`
4. Redéployer

---

**AllAdsMarket.com** - Configuration optimisée et sécurisée ✅

