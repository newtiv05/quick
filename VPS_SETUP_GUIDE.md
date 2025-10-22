# 🚀 Guide de Configuration VPS pour AllAdsMarket

## 📋 Prérequis VPS

### Système d'Exploitation
- Ubuntu 20.04+ ou CentOS 8+
- 2GB RAM minimum (4GB recommandé)
- 20GB espace disque minimum
- Accès root ou sudo

### Ports à Ouvrir
- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)
- 5000 (Application - interne)

## 🔧 Installation des Dépendances

### 1. Mise à jour du système
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Installation de Node.js 18+
```bash
# Via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification
node --version
npm --version
```

### 3. Installation de PM2
```bash
sudo npm install -g pm2
pm2 startup
```

### 4. Installation de Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5. Installation de Certbot (SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

## 🌐 Configuration du Domaine

### 1. Configuration DNS
```
A    alladsmarket.com    -> VOTRE_IP_VPS
A    www.alladsmarket.com -> VOTRE_IP_VPS
```

### 2. Vérification DNS
```bash
nslookup alladsmarket.com
```

## 🔒 Configuration SSL/TLS

### 1. Génération du certificat SSL
```bash
sudo certbot --nginx -d alladsmarket.com -d www.alladsmarket.com
```

### 2. Renouvellement automatique
```bash
sudo crontab -e
# Ajouter cette ligne:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📁 Structure de Déploiement

```
/var/www/alladsmarket/
├── dist/                    # Build React
├── server/                  # Serveur Express
├── node_modules/           # Dépendances
├── logs/                   # Logs PM2
├── package.json            # Configuration
├── ecosystem.config.js     # PM2
└── nginx.conf              # Nginx
```

## 🚀 Déploiement Automatique

### 1. Configuration SSH
```bash
# Générer une clé SSH (sur votre machine locale)
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copier la clé publique sur le VPS
ssh-copy-id root@VOTRE_IP_VPS
```

### 2. Modification du script de déploiement
Éditez `deploy-vps.sh` et modifiez :
```bash
VPS_USER="root"                    # Votre utilisateur VPS
VPS_HOST="VOTRE_IP_VPS"           # IP de votre VPS
VPS_PATH="/var/www/alladsmarket"   # Chemin de déploiement
DOMAIN="alladsmarket.com"          # Votre domaine
```

### 3. Exécution du déploiement
```bash
# Sur Windows (PowerShell)
./deploy-vps.sh

# Sur Linux/Mac
chmod +x deploy-vps.sh
./deploy-vps.sh
```

## 🔧 Configuration Post-Déploiement

### 1. Vérification du statut
```bash
# Statut PM2
pm2 status

# Logs de l'application
pm2 logs alladsmarket

# Redémarrage si nécessaire
pm2 restart alladsmarket
```

### 2. Configuration Nginx
```bash
# Test de configuration
sudo nginx -t

# Rechargement
sudo systemctl reload nginx

# Statut
sudo systemctl status nginx
```

### 3. Monitoring
```bash
# Monitoring PM2
pm2 monit

# Logs système
sudo journalctl -u nginx -f
```

## 🛡️ Sécurité

### 1. Firewall UFW
```bash
sudo ufw enable
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw status
```

### 2. Fail2Ban
```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Mise à jour automatique
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

## 📊 Monitoring et Maintenance

### 1. Logs importants
```bash
# Logs PM2
pm2 logs alladsmarket

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs système
sudo journalctl -f
```

### 2. Sauvegarde
```bash
# Script de sauvegarde quotidienne
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backup/alladsmarket-$DATE.tar.gz /var/www/alladsmarket/
```

### 3. Mise à jour de l'application
```bash
cd /var/www/alladsmarket
git pull origin main
npm run build
pm2 restart alladsmarket
```

## 🆘 Dépannage

### Problèmes courants

1. **Application ne démarre pas**
   ```bash
   pm2 logs alladsmarket
   pm2 restart alladsmarket
   ```

2. **Nginx ne fonctionne pas**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

3. **SSL ne fonctionne pas**
   ```bash
   sudo certbot renew --dry-run
   ```

4. **Port 5000 non accessible**
   ```bash
   sudo netstat -tlnp | grep :5000
   ```

## ✅ Checklist de Déploiement

- [ ] VPS configuré avec Node.js 18+
- [ ] PM2 installé et configuré
- [ ] Nginx installé et configuré
- [ ] SSL/TLS configuré
- [ ] DNS pointant vers le VPS
- [ ] Firewall configuré
- [ ] Application déployée et fonctionnelle
- [ ] Monitoring configuré
- [ ] Sauvegarde configurée

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `pm2 logs alladsmarket`
2. Vérifiez le statut : `pm2 status`
3. Redémarrez : `pm2 restart alladsmarket`
4. Vérifiez Nginx : `sudo nginx -t`
