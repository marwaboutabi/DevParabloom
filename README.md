# ParaBloom — Plateforme E-commerce de Parapharmacie

 Application web complète de gestion et de commercialisation de produits de parapharmacie, développée dans le cadre du module Développement Web — ENSA El Jadida (filière Ingénierie Informatique et Technologies Emergentes (2ITE-1), 2025/2026).

---

## Réalisé par

Chlyah Sara   | [echlihsara-gif](https://github.com/echlihsara-gif).

Boutabi Marwa | [@marwaboutabi](https://github.com/marwaboutabi). 

**Encadré par :** Pr. ERRATTAHI Rahhal 

---

## Description du projet

**ParaBloom** est une plateforme e-commerce moderne dédiée à la vente en ligne de produits cosmétiques et dermo-cosmétiques. Elle permet aux clients de parcourir un catalogue structuré de **78 produits** issus de marques reconnues (La Roche-Posay, Bioderma, CeraVe, Caudalie, Vichy, etc.), organisés en 4 catégories : **Visage**, **Corps**, **Cheveux** et **Compléments Alimentaires**.

L'application propose :
- Une interface client intuitive avec panier, commandes et paiement sécurisé (Stripe)
- Un tableau de bord administrateur complet pour la gestion du catalogue, des commandes et des clients
- Un système d'authentification multi-rôles (Admin / User)

---

## Technologies utilisées

### Front-end
- **ReactJS 18+** — Interface dynamique et réactive
- **React Router DOM** — Navigation et protection des routes
- **Context API** — Gestion d'état globale (auth, panier, commandes)
- **Axios** — Communication HTTP avec le back-end
- **CSS3** — Design responsive et modulaire

### Back-end
- **Laravel 10+** — API RESTful, architecture MVC
- **Laravel Sanctum** — Authentification par tokens
- **Eloquent ORM** — Manipulation des données
- **Form Requests** — Validation stricte des données

### Base de données
- **MySQL** — Base relationnelle `parabloom_db` (10 tables)

### Outils
- **Git / GitHub** — Versioning et collaboration
- **Postman** — Tests et validation des endpoints API
- **phpMyAdmin** — Administration de la base de données
- **Stripe (mode test)** — Paiement sécurisé par carte bancaire

---

## Fonctionnalités principales

### Espace Client
- Création de compte et connexion sécurisée
- Navigation dans le catalogue avec recherche par nom et filtres (catégorie, sous-catégorie, prix)
- Fiche produit détaillée (image, description, prix, promotions)
- Gestion du panier (ajout, suppression, modification de quantité)
- Processus de commande complet avec saisie des informations de livraison
- Paiement sécurisé via Stripe (mode test)
- Historique des commandes avec suivi des statuts

### Espace Administrateur
- Tableau de bord avec indicateurs clés (chiffre d'affaires, volume de ventes, clients, panier moyen)
- Alertes automatiques pour les stocks critiques (< 5) et les ruptures (= 0)
- Gestion CRUD complète des produits (avec upload d'images)
- Gestion et filtrage des commandes avec mise à jour des statuts
- Consultation de la liste des clients et de leur historique d'achats

---

## Structure de la base de données


La base `parabloom_backend` contient 10 tables :

| Table | Description |
|-------|-------------|
| `users` | Comptes utilisateurs (admin / client) |
| `products` | Catalogue des 78 produits |
| `categories` | 4 catégories principales |
| `orders` | Commandes clients |
| `order_items` | Lignes de commande (table pivot) |
| `carts` | Paniers utilisateurs |
| `cart_items` | Articles du panier |
| `personal_access_tokens` | Tokens Sanctum |
| `password_resets` | Réinitialisation de mot de passe |
| `migrations` | Versioning de la BDD |
---

## Installation et lancement

### Prérequis

- PHP 8.1+
- Composer
- Node.js 18+ & npm
- MySQL
- Git

---

### Back-end (Laravel)

```bash
# 1. Cloner le repository
git clone https://github.com/marwaboutabi/DevParabloom.git
cd DevParabloom/DevParabloom_back

# 2. Installer les dépendances PHP
composer install

# 3. Configurer l'environnement
cp .env.example .env
php artisan key:generate

# 4. Configurer la base de données dans .env
# DB_DATABASE=parabloom_db
# DB_USERNAME=root
# DB_PASSWORD=

# 5. Créer la base de données et exécuter les migrations
php artisan migrate

# 6. (Optionnel) Importer les données de test
# Importer le fichier parabloom_db.sql via phpMyAdmin
# OU
php artisan db:seed

# 7. Démarrer le serveur
php artisan serve
```

Le back-end sera accessible sur : `http://localhost:8000`

---

### Front-end (React)

```bash
# 1. Accéder au dossier front-end
cd ../DevParabloom_front

# 2. Installer les dépendances
npm install

# 3. Configurer l'URL de l'API
# Dans src/services/api.js, vérifier que l'URL pointe vers http://localhost:8000

# 4. Lancer l'application
npm start
```

L'application sera accessible sur : `http://localhost:3000`

---

### Vérification

1. Accéder à `http://localhost:3000`
2. Créer un compte client et naviguer dans le catalogue
3. Ajouter des produits au panier et passer une commande
4. Tester le paiement Stripe avec la carte de test : `4242 4242 4242 4242`
5. Se connecter en tant qu'admin pour tester le tableau de bord

---

## Comptes de test (des exemples)

Rôle 1 : admin | Email : admin@gmail.com| Mot de passe :123456 .

Rôle 2 : user1 | Email : user1@gmail.com| Mot de passe :123456 .

---

## Structure du projet
     
Le projet DevParabloom est organisé en trois éléments à la racine : le dossier DevParabloom_back/ pour le back-end Laravel, le dossier DevParabloom_front/ pour le front-end React, et le fichier parabloom_db.sql contenant la structure et les données de la base de données.

  ````     
      DevParabloom/ 
├── DevParabloom_back/             
│   ├── app/
│   │   ├── Console/
│   │   ├── Exceptions/
│   │   ├── Http/                   # Midlleware, Controllers
│   │   ├── Models/                 # User, Product, Order, Category, Cart...
│   │   └── Providers/
│   ├── bootstrap/
│   ├── config/
│   ├── database/                   # Migrations & Seeders
│   ├── public/
│   ├── resources/
│   ├── routes/                     # api.php, web.php
│   ├── storage/
│   ├── tests/
│   └── vendor/
│
├── DevParabloom_front/             
│   ├── cypress/                    
│   │   ├── fixtures/
│   │   └── support/
│   └── src/
│       ├── admin/                  # Dashboard, Products, Orders, Customers
│       ├── components/             # ProductGrid, PromoSections, CartSideBar, Footer..
│       ├── context/                # AuthContext, CartContext, OrderContext
│       ├── data/
│       ├── hooks/
│       ├── pages/                  # HomePage, ProductPage, CartPage...
│       ├── services/               # api.js — Configuration Axios
│       ├── App.js
│       ├── App.css
│       └── index.css
│
└── parabloom_db.sql                # Structure + données de la BDD
````
---

## Sécurité

- Mots de passe hachés avec **bcrypt**
- Authentification par **tokens Sanctum** avec expiration
- Protection des routes sensibles côté serveur (**middleware Laravel**) et côté client (**PrivateRoute React**)
- Protection contre les injections SQL via **Eloquent ORM**
- Validation stricte de toutes les données entrantes
- Paiement conforme aux normes **PCI-DSS** via Stripe Elements

---

## Licence

Projet académique — ENSA El Jadida, Université Chouaib Doukkali — Année Universitaire 2025/2026.
