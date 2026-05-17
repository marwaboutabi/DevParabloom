# DevParabloom - Application Web de Gestion

## Comment installer et lancer le projet

### Back-end (Laravel)
- cd DevParabloom_back
- composer install
- cp .env.example .env
- php artisan key:generate
- php artisan migrate
- php artisan serve

### Front-end (ReactJS)
- cd DevParabloom_front
- npm install
- npm start

## Technologies utilisées
- Front-end : ReactJS
- Back-end : Laravel (API REST)
- Base de données : MySQL (parabloom_db.sql)
- Authentification : Multi-rôles (Admin / User)

## Fonctionnalités
- Authentification sécurisée avec deux rôles : Admin et User
- CRUD complet sur les produits
- Gestion des commandes et clients
- Protection des routes selon le rôle