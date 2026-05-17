-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 17 mai 2026 à 21:46
-- Version du serveur : 9.1.0
-- Version de PHP : 8.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `parabloom_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `session_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_items_cart_id_foreign` (`cart_id`),
  KEY `cart_items_product_id_foreign` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Visage', 'visage', '2026-05-02 13:01:27', '2026-05-02 13:01:27'),
(2, 'Cheveux', 'cheveux', '2026-05-02 13:01:27', '2026-05-02 13:01:27'),
(3, 'Corps', 'corps', '2026-05-02 13:01:27', '2026-05-02 13:01:27'),
(4, 'Compléments Alimentaires', 'complements', '2026-05-02 13:01:27', '2026-05-02 13:01:27');

-- --------------------------------------------------------

--
-- Structure de la table `cookie_consents`
--

DROP TABLE IF EXISTS `cookie_consents`;
CREATE TABLE IF NOT EXISTS `cookie_consents` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `essential` tinyint(1) NOT NULL DEFAULT '1',
  `functional` tinyint(1) NOT NULL DEFAULT '0',
  `analytics` tinyint(1) NOT NULL DEFAULT '0',
  `marketing` tinyint(1) NOT NULL DEFAULT '0',
  `consented_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cookie_consents_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2026_05_01_234248_create_categories_table', 1),
(6, '2026_05_01_234307_create_products_table', 1),
(7, '2026_05_01_234325_create_carts_table', 1),
(8, '2026_05_01_234343_create_cart_items_table', 1),
(9, '2026_05_01_234400_create_orders_table', 1),
(10, '2026_05_01_234418_create_order_items_table', 1),
(11, '2026_05_01_234443_add_role_to_users_table', 1),
(12, '2026_05_14_111229_create_cookie_consents_table', 2),
(13, '2026_05_14_140907_update_orders_table_add_client_fields', 3),
(14, '2026_05_16_123020_add_sub_category_to_products_table', 3);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','shipped') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `stripe_payment_intent_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_info` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `stripe_payment_intent_id`, `client_info`, `created_at`, `updated_at`) VALUES
(5, 2, 305.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwabtb0@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"casa\\\"}\"', '2026-05-02 15:50:24', '2026-05-02 15:50:24'),
(7, 4, 234.00, 'pending', NULL, '\"{\\\"name\\\":\\\"sarachlyah\\\",\\\"email\\\":\\\"adminm@gmail.com\\\",\\\"phone\\\":\\\"0754654332\\\",\\\"address\\\":\\\"Maarif\\\",\\\"city\\\":\\\"Casablanca\\\"}\"', '2026-05-02 17:48:31', '2026-05-02 17:48:31'),
(8, 4, 262.00, 'pending', NULL, '\"{\\\"name\\\":\\\"sarachlyah\\\",\\\"email\\\":\\\"adminm@gmail.com\\\",\\\"phone\\\":\\\"0754654332\\\",\\\"address\\\":\\\"Maarif\\\",\\\"city\\\":\\\"Casablanca\\\"}\"', '2026-05-02 17:53:06', '2026-05-02 17:53:06'),
(9, 2, 266.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"0754654332\\\",\\\"address\\\":\\\"Maarif\\\",\\\"city\\\":\\\"Casablanca\\\"}\"', '2026-05-02 18:53:01', '2026-05-02 18:53:01'),
(10, 5, 556.25, 'pending', NULL, '\"{\\\"name\\\":\\\"user1\\\",\\\"email\\\":\\\"user1@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Mohammedia\\\"}\"', '2026-05-03 10:02:13', '2026-05-03 10:02:13'),
(11, 2, 393.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwabtb0@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-09 22:32:28', '2026-05-09 22:32:28'),
(12, 6, 168.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Hiba El Mansouri\\\",\\\"email\\\":\\\"hibam@gmail.com\\\",\\\"phone\\\":\\\"+212612345678\\\",\\\"address\\\":\\\"123,Rue Hassan 2,Casablanca\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-13 07:32:38', '2026-05-13 07:32:38'),
(13, 2, 1090.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwabtb0@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(14, 2, 250.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:00:26', '2026-05-14 18:00:26'),
(15, 2, 145.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:01:00', '2026-05-14 18:01:00'),
(16, 2, 315.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:06:20', '2026-05-14 18:06:20'),
(17, 2, 315.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:06:34', '2026-05-14 18:06:34'),
(18, 2, 315.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:08:54', '2026-05-14 18:08:54'),
(19, 2, 515.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-14 18:21:27', '2026-05-14 18:21:27'),
(20, 2, 132.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Mohammedia\\\"}\"', '2026-05-16 10:22:58', '2026-05-16 10:22:58'),
(21, 9, 420.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Mohammedia\\\"}\"', '2026-05-16 11:56:50', '2026-05-16 11:56:50'),
(22, 2, 151.45, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Mohammedia\\\"}\"', '2026-05-16 12:38:14', '2026-05-16 12:38:14'),
(23, 2, 300.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwabtb0@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-16 12:40:49', '2026-05-16 12:40:49'),
(24, 2, 320.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwabtb0@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-16 12:57:55', '2026-05-16 12:57:55'),
(25, 2, 492.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212643256785\\\",\\\"address\\\":\\\"AMAL 1\\\",\\\"city\\\":\\\"Rabat\\\"}\"', '2026-05-16 14:00:50', '2026-05-16 14:00:50'),
(26, 2, 960.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212643256785\\\",\\\"address\\\":\\\"AMAL 1\\\",\\\"city\\\":\\\"Rabat\\\"}\"', '2026-05-16 17:55:24', '2026-05-16 17:55:24'),
(27, 2, 798.00, 'pending', NULL, '\"{\\\"name\\\":\\\"Marwa BOUTABI\\\",\\\"email\\\":\\\"marwaboutabi@gmail.com\\\",\\\"phone\\\":\\\"+212706525756\\\",\\\"address\\\":\\\"INARA 1 MOHAMMEDIA\\\",\\\"city\\\":\\\"Casa\\\"}\"', '2026-05-16 18:27:52', '2026-05-16 18:27:52');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 4, 11, 2, 85.00, '2026-05-02 15:48:08', '2026-05-02 15:48:08'),
(2, 5, 2, 1, 145.00, '2026-05-02 15:50:24', '2026-05-02 15:50:24'),
(3, 5, 12, 1, 75.00, '2026-05-02 15:50:24', '2026-05-02 15:50:24'),
(4, 5, 11, 1, 85.00, '2026-05-02 15:50:24', '2026-05-02 15:50:24'),
(5, 6, 58, 1, 270.00, '2026-05-02 15:53:54', '2026-05-02 15:53:54'),
(6, 6, 44, 1, 180.00, '2026-05-02 15:53:54', '2026-05-02 15:53:54'),
(7, 6, 53, 1, 145.00, '2026-05-02 15:53:54', '2026-05-02 15:53:54'),
(8, 6, 6, 1, 169.00, '2026-05-02 15:53:54', '2026-05-02 15:53:54'),
(9, 6, 35, 1, 100.00, '2026-05-02 15:53:54', '2026-05-02 15:53:54'),
(10, 7, 9, 1, 109.00, '2026-05-02 17:48:31', '2026-05-02 17:48:31'),
(11, 7, 39, 1, 35.00, '2026-05-02 17:48:31', '2026-05-02 17:48:31'),
(12, 7, 31, 1, 90.00, '2026-05-02 17:48:31', '2026-05-02 17:48:31'),
(13, 8, 14, 1, 42.00, '2026-05-02 17:53:06', '2026-05-02 17:53:06'),
(14, 8, 12, 1, 75.00, '2026-05-02 17:53:06', '2026-05-02 17:53:06'),
(15, 8, 2, 1, 145.00, '2026-05-02 17:53:06', '2026-05-02 17:53:06'),
(16, 9, 3, 2, 133.00, '2026-05-02 18:53:01', '2026-05-02 18:53:01'),
(17, 10, 36, 1, 148.00, '2026-05-03 10:02:13', '2026-05-03 10:02:13'),
(18, 10, 70, 1, 108.25, '2026-05-03 10:02:13', '2026-05-03 10:02:13'),
(19, 10, 64, 1, 300.00, '2026-05-03 10:02:13', '2026-05-03 10:02:13'),
(20, 11, 3, 1, 133.00, '2026-05-09 22:32:28', '2026-05-09 22:32:28'),
(21, 11, 21, 1, 260.00, '2026-05-09 22:32:28', '2026-05-09 22:32:28'),
(22, 12, 5, 1, 168.00, '2026-05-13 07:32:38', '2026-05-13 07:32:38'),
(23, 13, 36, 1, 148.00, '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(24, 13, 29, 2, 270.00, '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(25, 13, 22, 1, 224.00, '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(26, 13, 13, 1, 85.00, '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(27, 13, 19, 1, 93.00, '2026-05-14 12:13:16', '2026-05-14 12:13:16'),
(28, 14, 59, 1, 250.00, '2026-05-14 18:00:26', '2026-05-14 18:00:26'),
(29, 15, 2, 1, 145.00, '2026-05-14 18:01:00', '2026-05-14 18:01:00'),
(30, 16, 2, 1, 145.00, '2026-05-14 18:06:20', '2026-05-14 18:06:20'),
(31, 16, 1, 1, 170.00, '2026-05-14 18:06:20', '2026-05-14 18:06:20'),
(32, 17, 2, 1, 145.00, '2026-05-14 18:06:34', '2026-05-14 18:06:34'),
(33, 17, 1, 1, 170.00, '2026-05-14 18:06:34', '2026-05-14 18:06:34'),
(34, 18, 2, 1, 145.00, '2026-05-14 18:08:54', '2026-05-14 18:08:54'),
(35, 18, 1, 1, 170.00, '2026-05-14 18:08:54', '2026-05-14 18:08:54'),
(36, 19, 1055, 1, 300.00, '2026-05-14 18:21:27', '2026-05-14 18:21:27'),
(37, 19, 23, 1, 215.00, '2026-05-14 18:21:27', '2026-05-14 18:21:27'),
(38, 20, 66, 1, 132.00, '2026-05-16 10:22:58', '2026-05-16 10:22:58'),
(39, 21, 68, 2, 210.00, '2026-05-16 11:56:50', '2026-05-16 11:56:50'),
(40, 22, 72, 1, 151.45, '2026-05-16 12:38:14', '2026-05-16 12:38:14'),
(41, 23, 12, 4, 75.00, '2026-05-16 12:40:49', '2026-05-16 12:40:49'),
(42, 24, 31, 1, 90.00, '2026-05-16 12:57:55', '2026-05-16 12:57:55'),
(43, 24, 2, 1, 145.00, '2026-05-16 12:57:55', '2026-05-16 12:57:55'),
(44, 24, 11, 1, 85.00, '2026-05-16 12:57:55', '2026-05-16 12:57:55'),
(45, 25, 2, 2, 145.00, '2026-05-16 14:00:50', '2026-05-16 14:00:50'),
(46, 25, 9, 1, 109.00, '2026-05-16 14:00:50', '2026-05-16 14:00:50'),
(47, 25, 19, 1, 93.00, '2026-05-16 14:00:50', '2026-05-16 14:00:50'),
(48, 26, 25, 2, 480.00, '2026-05-16 17:55:24', '2026-05-16 17:55:24'),
(49, 27, 26, 2, 159.00, '2026-05-16 18:27:52', '2026-05-16 18:27:52'),
(50, 27, 25, 1, 480.00, '2026-05-16 18:27:52', '2026-05-16 18:27:52');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'c24dfd73e9dc50575fb311d906ad859e7064f10de6c07c4e027327d29a997b01', '[\"*\"]', NULL, '2026-05-02 12:51:04', '2026-05-02 12:51:04'),
(2, 'App\\Models\\User', 1, 'auth_token', '4d20b93aa8882a8821861a18ff02fb1a3be82885c6c8d096edb21a699a3c32be', '[\"*\"]', NULL, '2026-05-02 12:51:21', '2026-05-02 12:51:21'),
(3, 'App\\Models\\User', 1, 'auth_token', '138a1839ed0577a7c97ab3d8c23f023dee8d14007528c9badc18a54aff49f524', '[\"*\"]', '2026-05-02 12:56:27', '2026-05-02 12:56:17', '2026-05-02 12:56:27'),
(4, 'App\\Models\\User', 1, 'auth_token', '8cca42cb1923043441e004f31baadb9c464480164f142ac8dfd5be1568c62e4f', '[\"*\"]', '2026-05-02 13:57:05', '2026-05-02 13:02:20', '2026-05-02 13:57:05'),
(5, 'App\\Models\\User', 1, 'auth_token', '1cadf91d7295826f4340a1bcb5a5a21e91f23ed28fc7684bd138630f9be80ea1', '[\"*\"]', '2026-05-02 13:57:37', '2026-05-02 13:57:26', '2026-05-02 13:57:37'),
(6, 'App\\Models\\User', 2, 'auth_token', '315473fa0d39c6a847083ae1b5bbbe5c82fe0fb8aa9c1078fca81997facc3be1', '[\"*\"]', '2026-05-02 15:48:08', '2026-05-02 14:01:09', '2026-05-02 15:48:08'),
(7, 'App\\Models\\User', 1, 'auth_token', '61121c6b0a9159c8cddcabde571eb625c8f87ab685fc2b72f0a69e076826fba4', '[\"*\"]', '2026-05-02 15:49:04', '2026-05-02 15:48:50', '2026-05-02 15:49:04'),
(8, 'App\\Models\\User', 2, 'auth_token', '6367f1530a94ce19b6883549cbec5895ce72e605cc6b608b91a4970a8f9b1f24', '[\"*\"]', '2026-05-02 15:50:24', '2026-05-02 15:49:56', '2026-05-02 15:50:24'),
(9, 'App\\Models\\User', 1, 'auth_token', '62ec229522783717c4c33acbd7e7de7e5c2d2ebdb9a1dfdbe02e3c9494029a98', '[\"*\"]', '2026-05-02 15:51:15', '2026-05-02 15:50:55', '2026-05-02 15:51:15'),
(10, 'App\\Models\\User', 3, 'auth_token', 'a6d860043d5f070f47751e5da618bcacdaeb235acb2cd9f487eeaaf4958838ff', '[\"*\"]', NULL, '2026-05-02 15:51:56', '2026-05-02 15:51:56'),
(11, 'App\\Models\\User', 3, 'auth_token', 'd36ce75237f849c14fa8c802f9fb7006f795a4f0e65b4252078f2611a4a5fb38', '[\"*\"]', '2026-05-02 15:53:54', '2026-05-02 15:52:04', '2026-05-02 15:53:54'),
(12, 'App\\Models\\User', 1, 'auth_token', '9cf11c29e87d41755ce1162bb463e750c68f203939b874cd450cebc1aca2ec60', '[\"*\"]', '2026-05-02 16:17:41', '2026-05-02 15:54:34', '2026-05-02 16:17:41'),
(13, 'App\\Models\\User', 1, 'auth_token', '7a30ecbae15d692a07366e37928b69cd385c5260e3648927d7839fb1a30a4626', '[\"*\"]', '2026-05-02 16:22:14', '2026-05-02 16:18:01', '2026-05-02 16:22:14'),
(14, 'App\\Models\\User', 1, 'auth_token', '971d751214b873ad7c479a2ddb28dc183fbe77633e8e0d2116c3aed0bf599815', '[\"*\"]', '2026-05-02 16:58:48', '2026-05-02 16:58:47', '2026-05-02 16:58:48'),
(15, 'App\\Models\\User', 1, 'auth_token', '782dab73cae97d5699a825a3f688f23f25c944f8e13c7939eb9e63cea88f9b86', '[\"*\"]', '2026-05-02 16:59:00', '2026-05-02 16:58:58', '2026-05-02 16:59:00'),
(16, 'App\\Models\\User', 1, 'auth_token', 'deaa44191b13ba5c63d4782cbce8a9222c9a5516d2b549e3682f8db69384cdb6', '[\"*\"]', '2026-05-02 16:59:17', '2026-05-02 16:59:15', '2026-05-02 16:59:17'),
(17, 'App\\Models\\User', 1, 'auth_token', 'ea5982578cfb4f44bab4312ab2a5a2f227448a9a48f47836ca6ba4988abd6f51', '[\"*\"]', '2026-05-02 16:59:44', '2026-05-02 16:59:43', '2026-05-02 16:59:44'),
(18, 'App\\Models\\User', 1, 'auth_token', '6b2ed877effa13a2f9f16af4cd4fd5f3e2ae439ba017fe4e0609c8326aff8ffb', '[\"*\"]', '2026-05-02 17:00:03', '2026-05-02 17:00:01', '2026-05-02 17:00:03'),
(37, 'App\\Models\\User', 1, 'auth_token', '62c3fa4c535d866daaa34178eaba3016c866194a2b3f4158912cc1b5a227a8c1', '[\"*\"]', '2026-05-02 21:10:35', '2026-05-02 20:27:56', '2026-05-02 21:10:35'),
(44, 'App\\Models\\User', 1, 'auth_token', '247b699ec28b12a91ecb0aa7715cd5305a22118ff21fa3377bd29af7f70c5562', '[\"*\"]', '2026-05-03 10:58:13', '2026-05-03 10:05:44', '2026-05-03 10:58:13'),
(45, 'App\\Models\\User', 1, 'auth_token', 'bc700ce41da46e5cf3a06d05083049df30695e4afe665c34d4900cb551d782e1', '[\"*\"]', '2026-05-03 20:11:59', '2026-05-03 19:58:58', '2026-05-03 20:11:59'),
(46, 'App\\Models\\User', 2, 'auth_token', '83b68db6b55764e1c0d161696e31cd535b81ad9621855cebbc230616ed14ea4f', '[\"*\"]', NULL, '2026-05-06 18:51:10', '2026-05-06 18:51:10'),
(54, 'App\\Models\\User', 5, 'auth_token', '34a1d32eeace6f6f04b32ec68a0173ff615f0de9d68812f3aca21d88edd31c23', '[\"*\"]', '2026-05-14 10:42:18', '2026-05-14 08:34:13', '2026-05-14 10:42:18'),
(61, 'App\\Models\\User', 7, 'auth_token', '41c702f0a50f0fe9e20424be74583a5e1a17ced950c31a3144aa07be36d7c014', '[\"*\"]', '2026-05-14 15:25:35', '2026-05-14 13:23:30', '2026-05-14 15:25:35'),
(67, 'App\\Models\\User', 2, 'auth_token', '2cc41881fe878a1d158c886d315816b4e0b534368b6d75b07eb9830404ad0c31', '[\"*\"]', '2026-05-14 18:21:35', '2026-05-14 18:19:57', '2026-05-14 18:21:35'),
(93, 'App\\Models\\User', 1, 'auth_token', '109a88cb9ff2b0fd197cd90aadf1cbdc1ecd2f62521ebbd569f9261a4050dcbd', '[\"*\"]', '2026-05-16 19:00:31', '2026-05-16 18:41:17', '2026-05-16 19:00:31');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint UNSIGNED NOT NULL,
  `sub_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `promo_price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_id_foreign` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1056 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `category_id`, `sub_category`, `name`, `slug`, `description`, `price`, `promo_price`, `image_url`, `stock`, `created_at`, `updated_at`) VALUES
(1011, 1, 'creme-hydratante', 'Caudalie Resveratrol-Lift Crème Cachemire', 'caudalie-resveratrol-lift-creme-cachemire', 'Crème redensifiante et fermante à la texture cashmere luxueuse. Enrichie en Résveratrol de vigne et acide hyaluronique, elle raffermit la peau, comble les rides et redonne éclat et jeunesse au visage.', 250.00, NULL, '/images/caudalie/caudalie1.png', 12, '2026-05-02 13:01:27', '2026-05-14 12:15:58'),
(1022, 1, 'creme-hydratante', 'Caudalie Resveratrol-Lift Gel Yeux', 'caudalie-resveratrol-lift-gel-yeux', 'Gel contour des yeux liftant et anti-rides. Réduit visiblement les poches et les cernes, raffermit le regard et atténue les signes de fatigue.', 195.00, NULL, '/images/caudalie/caudalie2.png', 13, '2026-05-02 13:01:27', '2026-05-02 18:37:04'),
(1033, 1, 'serum', 'Caudalie Resveratrol-Lift Sérum', 'caudalie-resveratrol-lift-serum', 'Sérum anti-âge liftant fermeté et lissant. Rides visiblement réduites, peau raffermie et éclat retrouvé. Enrichi en Résveratrol de vigne, Huile d\'olive biologique et Peptides de raisin.', 320.00, NULL, '/images/caudalie/caudalie3.png', 14, '2026-05-02 13:01:27', '2026-05-02 18:37:14'),
(1044, 1, 'creme-hydratante', 'Caudalie Resveratrol-Lift Crème Nuit', 'caudalie-resveratrol-lift-creme-nuit', 'Crème de nuit fermeté et éclat. La peau est retendue, lissée et visiblement plus jeune dès le réveil.', 295.00, NULL, '/images/caudalie/caudalie4.png', 20, '2026-05-02 13:01:27', '2026-05-02 18:37:19'),
(1055, 1, 'serum', 'CAUDALIE Vinoperfect - Sérum Éclat Anti-Taches', 'caudalie-vinoperfect-serum-eclat-anti-taches', 'Sérum éclaircissant qui réduit visiblement les taches brunes et unifie le teint. Formulé avec la viniférine, un actif breveté issu de la sève de vigne.', 300.00, NULL, '/images/caudalie/caudalie6.png', 19, '2026-05-02 13:01:27', '2026-05-14 18:21:27'),
(1, 1, 'gel-nettoyant', 'La Roche-Posay Effaclar Gel Moussant Purifiant - 200 ml', 'la-roche-posay-effaclar-gel-moussant-200ml', 'Gel nettoyant pour peaux grasses à tendance acnéique. Purifie, élimine l\'excès de sébum et les impuretés. Contient de l\'Eau thermale apaisante et du Zinc PCA matifiant.', 170.00, NULL, '/images/visage/gel/gel8.png', 13, '2026-05-02 13:01:27', '2026-05-14 18:08:54'),
(2, 1, 'gel-nettoyant', 'Bioderma Sensibio Gel Moussant - 200 ml', 'bioderma-sensibio-gel-moussant-200ml', 'Gel nettoyant moussant pour peaux sensibles. Nettoie et démaquille en douceur, hydrate, calme les irritations.', 145.00, NULL, '/images/visage/gel/gel7.png', 0, '2026-05-02 13:01:27', '2026-05-16 17:51:14'),
(3, 1, 'gel-nettoyant', 'CeraVe SA Smoothing Cleanser', 'cerave-sa-gel-nettoyant-anti-rugosite-236ml', 'Gel nettoyant exfoliant pour peaux sèches et rugueuses. Enrichi en 3 céramides, acide hyaluronique et niacinamide.', 130.00, NULL, '/images/visage/gel/gel2.png', 33, '2026-05-02 13:01:27', '2026-05-14 12:19:25'),
(4, 1, 'gel-nettoyant', 'URIAGE HYSEAC Gel nettoyant anti-imperfections', 'uriage-hyseac-gel-nettoyant-anti-imperfections', 'Gel nettoyant purifiant pour peaux à imperfections. Élimine l\'excès de sébum, matifie et nettoie en douceur.', 180.00, NULL, '/images/visage/gel/gel5.png', 26, '2026-05-02 13:01:27', '2026-05-02 18:39:59'),
(5, 1, 'gel-nettoyant', 'CeraVe Gel Moussant Hydratant - 473 ml', 'cerave-gel-moussant-hydratant-473ml', 'CeraVe Gel Moussant Hydratant pour Visage et Corps 473ml.', 168.00, NULL, '/images/visage/gel/gel4.png', 49, '2026-05-02 13:01:27', '2026-05-13 07:32:38'),
(6, 1, 'gel-nettoyant', 'Bioderma Sensibio DS+ Gel Moussant - 200 ml', 'bioderma-sensibio-ds-gel-moussant-200ml', 'Gel nettoyant apaisant pour peaux sensibles sujettes aux rougeurs et aux squames. Sans savon, sans parfum.', 169.00, NULL, '/images/visage/gel/gel6.png', 31, '2026-05-02 13:01:27', '2026-05-02 18:37:43'),
(7, 1, 'gel-nettoyant', 'CeraVe Gel Moussant Purifiant - 473 ml', 'cerave-gel-moussant-purifiant-473ml', 'Gel nettoyant moussant pour peaux normales à grasses. Enrichi en 3 céramides, acide hyaluronique et niacinamide.', 149.00, NULL, '/images/visage/gel/gel1.png', 12, '2026-05-02 13:01:27', '2026-05-14 12:14:35'),
(8, 1, 'gel-nettoyant', 'CeraVe Gel Moussant Anti-imperfections - 236 ml', 'cerave-gel-moussant-anti-imperfections-236ml', 'Gel nettoyant purifiant pour peaux à imperfections. Formulé avec 2% d\'acide salicylique, argile blanche et niacinamide.', 134.00, NULL, '/images/visage/gel/gel3.png', 26, '2026-05-02 13:01:27', '2026-05-02 18:38:02'),
(67, 1, 'gel-nettoyant', 'Uriage Xémose Huile Lavante Apaisante 500ml', 'uriage-xemose-huile-lavante-apaisante-500ml', 'Soin nettoyant doux sans savon qui protège contre le dessèchement cutané et apaise les démangeaisons des peaux très sèches à tendance atopique.', 119.00, NULL, '/images/promo/promoo4.png', 23, '2026-05-02 13:01:27', '2026-05-16 12:58:54'),
(70, 1, 'gel-nettoyant', 'Derm-phy Gel Surgras Dermatologique Uriage 500ml', 'uriage-derm-phy-gel-surgras-500ml', 'Nettoyant moussant sans savon qui élimine les impuretés tout en préservant le film hydrolipidique des peaux sensibles et sèches.', 108.25, NULL, '/images/uriage/uriage1.png', 19, '2026-05-02 13:01:27', '2026-05-03 10:02:13'),
(71, 1, 'gel-nettoyant', 'Uriage Hyséac Gel Nettoyant 150ml', 'uriage-hyseac-gel-nettoyant-150ml', 'Soin lavant doux sans savon pour peaux grasses à tendance acnéique. Nettoie en profondeur sans dessécher.', 192.25, NULL, '/images/uriage/uriage2.png', 19, '2026-05-02 13:01:27', '2026-05-02 18:39:33'),
(30, 1, 'creme-hydratante', 'Avène Cold Cream Nourrit & Protège 40 ml', 'avene-cold-cream-40ml', 'Crème nutritive et protectrice à base de Cold Cream et d\'Eau thermale Avène, pour peaux sensibles sèches à très sèches.', 93.10, NULL, '/images/visage/creme/creme1.png', 19, '2026-05-02 13:01:27', '2026-05-02 18:38:15'),
(31, 1, 'creme-hydratante', 'La Roche-Posay Cicaplast Baume B5+ 40 ml', 'la-roche-posay-cicaplast-baume-b5-40ml', 'Soin réparateur et apaisant pour les peaux fragiles, irritées ou sèches. Répare, nourrit et apaise les rougeurs.', 90.00, NULL, '/images/visage/creme/creme2.png', 20, '2026-05-02 13:01:27', '2026-05-16 12:57:55'),
(32, 1, 'creme-hydratante', 'VICHY Minéral 89 Sérum fortifiant 50 ml', 'vichy-mineral-89-serum-50ml', 'Sérum fortifiant et hydratant contenant 89% d\'eau volcanique de Vichy et de l\'acide hyaluronique d\'origine naturelle.', 250.20, NULL, '/images/visage/creme/creme3.png', 22, '2026-05-02 13:01:27', '2026-05-02 18:38:36'),
(33, 1, 'creme-hydratante', 'BIODERMA Hydrabio Gel-crème 40 ml', 'bioderma-hydrabio-gel-creme-40ml', 'Gel-crème hydratant à texture légère pour peaux sensibles normales à mixtes.', 288.00, NULL, '/images/visage/creme/creme4.png', 34, '2026-05-02 13:01:27', '2026-05-02 18:39:28'),
(34, 1, 'creme-hydratante', 'BYOMA Gel-Crème Hydratant 50 ml', 'byoma-gel-creme-hydratant-50ml', 'Gel-crème hydratant enrichi en complexe unique de tri-céramides. Sans huile, non comédogène, sans alcool ni parfum.', 68.00, NULL, '/images/visage/creme/creme5.png', 28, '2026-05-02 13:01:27', '2026-05-02 18:38:44'),
(35, 1, 'creme-hydratante', 'Neutrogena Hydro Boost Aqua-Gel 50 ml', 'neutrogena-hydro-boost-aqua-gel-50ml', 'Grâce à l\'acide hyaluronique et au Tréhalose Botanique, aide à renforcer la barrière cutanée tout en fixant l\'eau dans les cellules.', 100.00, NULL, '/images/visage/creme/creme6.png', 8, '2026-05-02 13:01:27', '2026-05-02 18:39:00'),
(36, 1, 'creme-hydratante', 'CETAPHIL Crème Hydratante 100g', 'cetaphil-creme-hydratante-100g', 'Hydratant riche et non gras pour soulagement immédiat et durable, même pour peau extrêmement sèche. Hydratation intense 24h.', 113.00, NULL, '/images/visage/creme/creme7.png', 33, '2026-05-02 13:01:27', '2026-05-14 12:14:58'),
(37, 1, 'creme-hydratante', 'URIAGE Crème d\'Eau Riche Hydratante 40 ml', 'uriage-creme-eau-riche-40ml', 'Crème à texture riche et onctueuse qui nourrit les peaux assoiffées en profondeur pour un confort instantané.', 164.39, NULL, '/images/visage/creme/creme8.png', 27, '2026-05-02 13:01:27', '2026-05-02 18:38:49'),
(38, 1, 'creme-hydratante', 'BIODERMA SEBIUM HYDRA 40ml', 'bioderma-sebium-hydra-40ml', 'Soin réhydratant et apaisant pour peaux sèches fragilisées par les traitements anti-acné.', 130.00, NULL, '/images/visage/creme/creme9.png', 11, '2026-05-02 13:01:27', '2026-05-02 18:39:04'),
(72, 1, 'creme-hydratante', 'TOLÉDERM CONTROL Soin Calmant Intensif Uriage', 'uriage-tolederm-control-soin-calmant', 'Soin apaisant haute tolérance qui calme immédiatement les peaux sensibles, réactives ou intolérantes.', 151.45, NULL, '/images/uriage/uriage3.png', 27, '2026-05-02 13:01:27', '2026-05-16 12:38:14'),
(25, 1, 'serum', 'La Roche-Posay Pure Vitamine C12 Sérum 30 ml', 'la-roche-posay-vitamine-c12-serum-30ml', 'Sérum anti-âge à 12% de vitamine C pure. Illumine le teint, réduit rides et taches, affine le grain de peau.', 480.00, NULL, '/images/visage/serum/serum1.png', 1, '2026-05-02 13:01:27', '2026-05-16 18:27:52'),
(26, 1, 'serum', 'The Ordinary Niacinamide 10% + Zinc 1% 30 ml', 'the-ordinary-niacinamide-10-zinc-1-30ml', 'Sérum universel pour peaux sujettes aux imperfections. Réduit les brillances, affine le grain de peau.', 159.00, NULL, '/images/visage/serum/serum2.png', 0, '2026-05-02 13:01:27', '2026-05-16 18:27:52'),
(27, 1, 'serum', 'SKIN1004 Madagascar Centella Asiatica Ampoule 100 ml', 'skin1004-centella-asiatica-ampoule-100ml', 'Sérum apaisant concentré formulé avec 100% d\'extrait pur de centella asiatica de Madagascar.', 250.00, NULL, '/images/visage/serum/serum3.png', 23, '2026-05-02 13:01:27', '2026-05-03 20:11:13'),
(28, 1, 'serum', 'La Roche-Posay Effaclar Sérum Ultra Concentré 30 ml', 'la-roche-posay-effaclar-serum-ultra-30ml', 'Sérum anti-imperfections effet peeling quotidien pour peaux grasses à tendance acnéique adulte.', 348.00, NULL, '/images/visage/serum/serum4.png', 14, '2026-05-02 13:01:27', '2026-05-03 20:11:08'),
(29, 1, 'serum', 'Uriage Hyséac New Skin Serum 40 ml', 'uriage-hyseac-new-skin-serum-40ml', 'Sérum concentré pour peaux grasses à tendance acnéique. Exfolie, lisse le grain de peau, réduit imperfections.', 270.00, NULL, '/images/visage/serum/serum5.png', 8, '2026-05-02 13:01:27', '2026-05-14 12:13:16'),
(68, 1, 'serum', 'VICHY MINERAL 89 SERUM FORTIFIANT 50 ML', 'vichy-mineral-89-serum-fortifiant-50ml', 'Sérum Booster quotidien fortifiant et repulpant. Hydratation intense sur dix couches pour repulper, lisser et protéger.', 210.00, NULL, '/images/visage/serum/serum6.png', 21, '2026-05-02 13:01:27', '2026-05-16 11:56:50'),
(21, 1, 'ecran-solaire', 'La Roche-Posay Anthelios Ultra-Fluide FPS 50+ 50 ml', 'la-roche-posay-anthelios-ultra-fluide-50ml', 'Écran solaire visage ultra-léger, sans huile, fini invisible. Protection large spectre UVA/UVB.', 260.00, NULL, '/images/visage/solaire/solaire1.png', 23, '2026-05-02 13:01:27', '2026-05-09 22:32:28'),
(22, 1, 'ecran-solaire', 'Avène Ultra Fluid Invisible SPF50+ 50 ml', 'avene-ultra-fluid-invisible-spf50-50ml', 'Fluide solaire très haute protection pour peaux sensibles. Protège des UVB, UVA et de la lumière bleue.', 224.00, NULL, '/images/visage/solaire/solaire2.png', 24, '2026-05-02 13:01:27', '2026-05-14 12:13:16'),
(23, 1, 'ecran-solaire', 'SVR SUN SECURE Crème SPF50+ 50 ml', 'svr-sun-secure-creme-spf50-50ml', 'Crème solaire très haute protection pour toute la famille. Formule biodégradable respectueuse de l\'environnement.', 215.00, NULL, '/images/visage/solaire/solaire3.png', 28, '2026-05-02 13:01:27', '2026-05-14 18:21:27'),
(24, 1, 'ecran-solaire', 'Bioderma Photoderm Aquafluide SPF50+ 40 ml', 'bioderma-photoderm-aquafluide-spf50-40ml', 'Fluide solaire très haute protection à la texture ultra-légère. Hydrate 8h, résiste à l\'eau et à la chaleur.', 130.00, NULL, '/images/visage/solaire/solaire4.png', 32, '2026-05-02 13:01:27', '2026-05-03 20:10:46'),
(63, 1, 'ecran-solaire', 'Vichy Capital Soleil UV-Clear SPF50+ 40 ml', 'vichy-capital-soleil-uv-clear-spf50-40ml', 'Fluide solaire anti-imperfections pour peaux grasses à acnéique. Effet matifiant 12h, fini invisible.', 210.00, NULL, '/images/visage/solaire/solaire5.png', 23, '2026-05-02 13:01:27', '2026-05-03 20:10:39'),
(64, 1, 'ecran-solaire', 'ISDIN Fusion Water MAGIC SPF 50 50 ml', 'isdin-fusion-water-magic-spf50-50ml', 'Fluide solaire ultra-léger à absorption immédiate. Protège contre UVB/UVA, lumière bleue, infrarouge et pollution.', 300.00, NULL, '/images/visage/solaire/solaire6.png', 23, '2026-05-02 13:01:27', '2026-05-03 20:07:53'),
(65, 1, 'ecran-solaire', 'Eucerin Sun Sensitive Protect Crème SPF 50+ 50 ml', 'eucerin-sun-sensitive-protect-spf50-50ml', 'Crème solaire très haute protection pour peaux sensibles. Technologie Advanced Spectral.', 170.00, NULL, '/images/visage/solaire/solaire7.png', 30, '2026-05-02 13:01:27', '2026-05-03 20:08:02'),
(9, 3, 'lait-hydratant', 'Crème Mixa Nourrissante Protectrice Céramides 400 ml', 'mixa-creme-nourrissante-ceramides-400ml', 'Crème corporelle nourrissante et protectrice, enrichie en céramides, pour peaux sèches ou sensibles.', 109.00, NULL, '/images/corps/creme/img1.png', 24, '2026-05-02 13:01:27', '2026-05-16 14:00:50'),
(10, 3, 'lait-hydratant', 'Mixa Crème Niacinamide Correction Éclat 400 ml', 'mixa-creme-niacinamide-correction-eclat-400ml', 'Crème corporelle à la niacinamide pour corriger les imperfections et unifier le teint.', 120.00, NULL, '/images/corps/creme/img2.png', 31, '2026-05-02 13:01:27', '2026-05-03 20:04:47'),
(11, 3, 'lait-hydratant', 'Mixa Lait Hydratant Corps 400 ml', 'mixa-lait-hydratant-corps-400ml', 'Lait hydratant pour le corps. Nourrit et adoucit la peau.', 85.00, NULL, '/images/corps/creme/img3.png', 21, '2026-05-02 13:01:27', '2026-05-16 12:57:55'),
(12, 3, 'lait-hydratant', 'Body Lotion Nivea Nourishing Cocoa 400ml', 'nivea-nourishing-cocoa-body-lotion-400ml', 'Lotion pour le corps hydratante au beurre de cacao.', 75.00, NULL, '/images/corps/creme/img4.png', 11, '2026-05-02 13:01:27', '2026-05-16 17:41:38'),
(13, 3, 'lait-hydratant', 'Body Lotion Nivea Firming 400 ml', 'nivea-firming-body-lotion-400ml', 'Lotion corporelle raffermissante Nivea, format 400 ml.', 85.00, NULL, '/images/corps/creme/img5.png', 32, '2026-05-02 13:01:27', '2026-05-14 12:13:16'),
(73, 3, 'lait-hydratant', 'Uriage Xémose Lait Émollient 400ml', 'uriage-xemose-lait-emollient-400ml', 'Lait émollient hydratant intensif pour peaux sèches à tendance atopique. Hydrate en profondeur et apaise les irritations.', 170.25, NULL, '/images/uriage/uriage4.png', 19, '2026-05-02 13:01:27', '2026-05-03 20:04:57'),
(54, 3, 'gommage', 'Tree Hut Coco Colada Gommage 510g', 'tree-hut-coco-colada-gommage-510g', 'Gommage corporel exfoliant à base de sucre et de beurre de karité. Élimine les cellules mortes, hydrate et laisse la peau douce.', 276.00, NULL, '/images/corps/gommage/g1.png', 5, '2026-05-02 13:01:27', '2026-05-03 20:05:04'),
(55, 3, 'gommage', 'MATCHA Green Tea Scrub 283g', 'matcha-green-tea-scrub-283g', 'Exfoliant au thé vert matcha et sel marin. Élimine les cellules mortes, purifie et améliore la microcirculation.', 290.00, NULL, '/images/corps/gommage/g2.png', 9, '2026-05-02 13:01:27', '2026-05-03 20:05:01'),
(56, 3, 'gommage', 'Tree Hut Sunlit Glow Shea Sugar Scrub 510g', 'tree-hut-sunlit-glow-shea-sugar-scrub-510g', 'Gommage corporel au sucre et beurre de karité. Exfolie en douceur et laisse la peau douce et hydratée.', 245.00, NULL, '/images/corps/gommage/g3.png', 23, '2026-05-02 13:01:27', '2026-05-03 20:05:09'),
(57, 3, 'gommage', 'Tree Hut Pineapple Gommage 510g', 'tree-hut-pineapple-gommage-510g', 'Gommage corporel au sucre et beurre de karité, parfum ananas. Laisse la peau douce, lisse et hydratée.', 280.00, NULL, '/images/corps/gommage/g4.png', 13, '2026-05-02 13:01:27', '2026-05-03 20:05:32'),
(58, 3, 'gommage', 'Watermelon Shea Sugar Scrub 510g', 'watermelon-shea-sugar-scrub-510g', 'Gommage corporel au sucre et beurre de karité, parfum pastèque. Exfolie et laisse la peau douce et hydratée.', 270.00, NULL, '/images/corps/gommage/g5.png', 13, '2026-05-02 13:01:27', '2026-05-03 20:05:24'),
(14, 2, 'shampooing', 'Elseve Shampoing Huile Extraordinaire Jojoba 250 ml', 'elseve-shampoing-huile-jojoba-250ml', 'Shampooing nourrissant pour cheveux très secs et épais. Enrichi en huile de jojoba.', 42.00, NULL, '/images/cheveux/shampooing/cham1.png', 29, '2026-05-02 13:01:27', '2026-05-03 20:05:19'),
(15, 2, 'shampooing', 'Kérastase Reflection Bain Chromatique Riche 250 ml', 'kerastase-reflection-bain-chromatique-250ml', 'Shampooing protecteur de couleur pour cheveux colorés ou méchés très sensibilisés.', 230.77, NULL, '/images/cheveux/shampooing/cham2.png', 19, '2026-05-02 13:01:27', '2026-05-03 20:05:37'),
(39, 2, 'shampooing', 'Garnier Ultra Doux Shampooing Huiles d\'Argan et Camélia 300ml', 'garnier-ultra-doux-shampooing-argan-camelia-300ml', 'Shampooing nourrissant sans silicone, 94% d\'origine naturelle, pour cheveux secs et ternes.', 35.00, NULL, '/images/cheveux/shampooing/cham3.png', 20, '2026-05-02 13:01:27', '2026-05-03 20:05:42'),
(40, 2, 'shampooing', 'Herbal Essences Argan Oil of Morocco 400ml', 'herbal-essences-argan-oil-morocco-400ml', 'Shampooing réparateur à l\'huile d\'argan du Maroc et à l\'aloe vera, sans parabènes ni colorants.', 65.00, NULL, '/images/cheveux/shampooing/cham4.png', 25, '2026-05-02 13:01:27', '2026-05-03 20:07:16'),
(41, 2, 'shampooing', 'Pantene Pro-V Intensive Repair 400ml', 'pantene-pro-v-intensive-repair-400ml', 'Shampooing réparateur intensif à la formule enrichie en antioxydants.', 40.00, NULL, '/images/cheveux/shampooing/cham5.png', 11, '2026-05-02 13:01:27', '2026-05-03 20:05:50'),
(42, 2, 'shampooing', 'Shampooing Ultra Doux Huile d\'Argan et Cranberry 300ml', 'shampooing-ultra-doux-argan-cranberry-300ml', 'Shampooing nourrissant pour cheveux colorés ou méchés à l\'huile d\'Argan et Cranberry.', 45.00, NULL, '/images/cheveux/shampooing/cham6.png', 26, '2026-05-02 13:01:27', '2026-05-03 20:06:04'),
(43, 2, 'shampooing', 'Olaplex No. 4 Bond Maintenance Shampoo 250ml', 'olaplex-no4-bond-maintenance-shampoo-250ml', 'Shampooing réparateur à la technologie brevetée Olaplex qui reconstruit les liaisons capillaires.', 399.00, NULL, '/images/cheveux/shampooing/cham7.png', 5, '2026-05-02 13:01:27', '2026-05-16 12:18:30'),
(66, 2, 'shampooing', 'Vichy Dercos Shampooing Anti-pelliculaire 200ml', 'vichy-dercos-shampooing-anti-pelliculaire-200ml', 'Shampooing Dercos pour un cuir chevelu sain et des cheveux forts.', 132.00, NULL, '/images/promo/promoo3.png', 27, '2026-05-02 13:01:27', '2026-05-16 10:22:58'),
(16, 2, 'huile-nourrissante', 'Gisou Honey Infused Hair Oil 50ml', 'gisou-honey-infused-hair-oil-50ml', 'Huile capillaire infusée au miel, enrichie à l\'huile d\'argan et à l\'huile de coco.', 500.00, NULL, '/images/cheveux/huile/oil1.png', 15, '2026-05-02 13:01:27', '2026-05-03 20:06:12'),
(17, 2, 'huile-nourrissante', 'Kérastase Elixir Ultime L\'Huile Rose 100ml', 'kerastase-elixir-ultime-huile-rose-100ml', 'Huile de soin ultra-légère sans rinçage, enrichie en extrait de thé impérial.', 520.00, NULL, '/images/cheveux/huile/oil2.png', 17, '2026-05-02 13:01:27', '2026-05-03 20:06:26'),
(44, 2, 'huile-nourrissante', 'Mielle Rosemary Mint Scalp & Hair Strengthening Oil 59ml', 'mielle-rosemary-mint-hair-oil-59ml', 'Huile capillaire fortifiante infusée à la biotine et plus de 30 huiles essentielles.', 180.00, NULL, '/images/cheveux/huile/oil3.png', 19, '2026-05-02 13:01:27', '2026-05-03 20:06:32'),
(45, 2, 'huile-nourrissante', 'Kérastase Elixir Ultime L\'Huile Originale 100ml', 'kerastase-elixir-ultime-huile-originale-100ml', 'Huile de soin sublimatrice multi-usages à base d\'huiles précieuses (Argan, Camélia, Marula).', 600.00, NULL, '/images/cheveux/huile/oil4.png', 16, '2026-05-02 13:01:27', '2026-05-03 20:06:45'),
(46, 2, 'huile-nourrissante', 'Olaplex No. 7 Bonding Oil 30ml', 'olaplex-no7-bonding-oil-30ml', 'Huile coiffante ultra-concentrée qui booste la brillance de 125% et réduit la casse de 77%.', 350.00, NULL, '/images/cheveux/huile/oil5.png', 7, '2026-05-02 13:01:27', '2026-05-03 20:06:51'),
(47, 2, 'huile-nourrissante', 'OGX Coconut Oil Weightless Hydrating Oil 120ml', 'ogx-coconut-oil-hydrating-oil-120ml', 'Huile hydratante ultra-légère à l\'huile de coco et extrait de bambou.', 156.00, NULL, '/images/cheveux/huile/oil6.png', 18, '2026-05-02 13:01:27', '2026-05-03 20:07:05'),
(48, 2, 'huile-nourrissante', 'OGX Renewing+ Argan Oil Extra Penetrating Oil 98ml', 'ogx-argan-oil-extra-penetrating-98ml', 'Huile capillaire à pénétration extra forte infusée à l\'huile d\'argan du Maroc.', 160.00, NULL, '/images/cheveux/huile/oil7.png', 11, '2026-05-02 13:01:27', '2026-05-03 20:06:54'),
(18, 2, 'masque', 'Garnier Fructis Hair Food Ananas 390ml', 'garnier-fructis-hair-food-ananas-390ml', 'Soin capillaire à l\'ananas, 96% d\'ingrédients d\'origine naturelle, pour cheveux longs et ternes.', 95.00, NULL, '/images/cheveux/masque/mask1.png', 7, '2026-05-02 13:01:27', '2026-05-03 20:04:21'),
(19, 2, 'masque', 'Garnier Ultimate Blends Hair Food Banana 390ml', 'garnier-hair-food-banana-390ml', 'Masque 3-en-1 à la banane pour nourrir et réparer les cheveux secs et abîmés.', 93.00, NULL, '/images/cheveux/masque/mask2.png', 13, '2026-05-02 13:01:27', '2026-05-16 14:00:50'),
(49, 2, 'masque', 'Garnier Ultra Doux Masque Rêve Nourrissant 300ml', 'garnier-ultra-doux-masque-nourrissant-300ml', 'Masque express nourrissant 1 minute pour cheveux secs et ternes. 97% d\'ingrédients d\'origine naturelle.', 60.00, NULL, '/images/cheveux/masque/mask3.png', 24, '2026-05-02 13:01:27', '2026-05-03 20:04:09'),
(50, 2, 'masque', 'L\'Oréal Professionnel Absolut Repair Masque 250ml', 'loreal-absolut-repair-masque-250ml', 'Masque professionnel restructurant à la protéine de blé et au quinoa doré.', 216.00, NULL, '/images/cheveux/masque/mask4.png', 16, '2026-05-02 13:01:27', '2026-05-03 20:03:58'),
(51, 2, 'masque', 'Olaplex No. 8 Rich Hydration Mask 200ml', 'olaplex-no8-rich-hydration-mask-200ml', 'Masque hydratant riche à la technologie brevetée Olaplex. Hydrate profondément et repulpe la fibre capillaire.', 400.00, NULL, '/images/cheveux/masque/mask5.png', 20, '2026-05-02 13:01:27', '2026-05-03 20:03:50'),
(52, 2, 'masque', 'Gisou Honey Gloss Ceramide Therapy Hair Mask 230ml', 'gisou-honey-gloss-ceramide-hair-mask-230ml', 'Masque capillaire enrichi au miel Mirsalehi, aux céramides et à l\'acide hyaluronique.', 550.00, NULL, '/images/cheveux/masque/mask6.png', 19, '2026-05-02 13:01:27', '2026-05-03 20:00:25'),
(53, 2, 'masque', 'L\'Oréal Paris Hyaluron Plump Moisture Wrapping Mask 310ml', 'loreal-hyaluron-plump-moisture-mask-310ml', 'Masque à l\'acide hyaluronique pour une hydratation intense pendant 72h.', 145.00, NULL, '/images/cheveux/masque/mask7.png', 26, '2026-05-02 13:01:27', '2026-05-03 20:00:16'),
(69, 2, 'masque', 'Kérastase Gloss Absolu Fondant Insta Glaze 250ml', 'kerastase-gloss-absolu-fondant-insta-glaze-250ml', 'Soin démêlant sans rinçage qui offre une brillance miroir instantanée enrichi en acide hyaluronique.', 175.00, NULL, '/images/promo/promoo2.png', 23, '2026-05-02 13:01:27', '2026-05-03 20:00:08'),
(20, 4, 'vitamines', 'Nature\'s Way Alive! Hair, Skin & Nails Gummies', 'natures-way-alive-hair-skin-nails-gummies', 'Complément multivitaminé en gummies pour cheveux, peau et ongles avec 100mg de collagène et 2500mcg de biotine.', 340.00, NULL, '/images/complement alimentaire/1.png', 20, '2026-05-02 13:01:27', '2026-05-03 20:00:04'),
(59, 4, 'vitamines', 'Biocyte Collagen Express Gummies', 'biocyte-collagen-express-gummies', 'Complément anti-âge en gummies sans sucre avec 2,5g de collagène et 80mg de vitamine C par dose.', 250.00, NULL, '/images/complement alimentaire/2.png', 9, '2026-05-02 13:01:27', '2026-05-14 18:00:26'),
(60, 4, 'vitamines', 'Nature\'s Bounty Optimal Solutions Hair, Skin & Nails Gummies', 'natures-bounty-hair-skin-nails-gummies', 'Complément en gummies pour cheveux, peau et ongles avec 2500mcg de biotine par portion.', 300.00, NULL, '/images/complement alimentaire/3.png', 22, '2026-05-02 13:01:27', '2026-05-03 19:59:44'),
(61, 4, 'vitamines', 'Centrum MultiGummies Women', 'centrum-multigummies-women', 'Complément en gommes spécialement conçu pour les femmes. Contient vitamines A, C, D, E, B6, B12 et biotine.', 175.00, NULL, '/images/complement alimentaire/4.png', 13, '2026-05-02 13:01:27', '2026-05-03 19:59:49'),
(62, 4, 'vitamines', 'Nature Made High Absorption Magnesium Glycinate', 'nature-made-magnesium-glycinate', 'Magnésium hautement absorbable sous forme de glycinate chélaté pour réduire la fatigue et le stress.', 230.00, NULL, '/images/complement alimentaire/5.png', 26, '2026-05-02 13:01:27', '2026-05-03 19:59:55');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$10$2DBn31EsznmbepdXJ8vuE.iRw6auF4r.3OrXfI8PTFygmzWImqCxO', NULL, '2026-05-02 12:51:04', '2026-05-02 12:55:02', 'admin'),
(2, 'marwa boutabi', 'marwaboutabi@gmail.com', NULL, '$2y$10$ke/Xiik0/HgYNU03TIdC5.9m1mpofGMB7Kz8p.spKbXkG7zOq991q', NULL, '2026-05-02 14:01:09', '2026-05-02 14:01:09', 'user'),
(4, 'sarachlyah', 'sarachlyah@gmail.com', NULL, '$2y$10$hKvJRF8Hb79PmlP6gxB5LuOGBUD8QDgl0VIHdFPLDx2TKoqKLjaH6', NULL, '2026-05-02 17:46:51', '2026-05-02 17:46:51', 'user'),
(5, 'user1', 'user1@gmail.com', NULL, '$2y$10$WNISvopIFhcQwOXBRbdxRuWop9NryhKdChyLtb12SwiVuFPW6nCuG', NULL, '2026-05-03 10:01:01', '2026-05-03 10:01:01', 'user'),
(6, 'Hiba el mansouri', 'hibamns@gmail.com', NULL, '$2y$10$xqzehpXkBtocNrMfsDq/w.DYzAXTEoS3Yk49ZrAk/pby8Sdmq86ua', NULL, '2026-05-13 07:30:55', '2026-05-13 07:30:55', 'user'),
(7, 'admin', 'USER3@gmail.com', NULL, '$2y$10$pWdR2Fin/uFRuzO5WVVo0u0fz13Gs4LHxdckRQIVcRaNR4IP13loe', NULL, '2026-05-14 13:23:30', '2026-05-14 13:23:30', 'user'),
(8, 'safaa barouk', 'saffabarouk@gmail.com', NULL, '$2y$10$Kz65thCbwpJkjOR660Bzi.Jga5XIWpfSiXgcqxq7KSAYSPdjT7Cbi', NULL, '2026-05-14 17:34:26', '2026-05-14 17:34:26', 'user'),
(9, 'SAT', 'azerty@gmail.com', NULL, '$2y$10$i5bWJIrbT1cgCsUuWHWfRumM0Kdzx.Z0zKVl80BwA1ZO75gRtHNA6', NULL, '2026-05-16 11:53:26', '2026-05-16 11:53:26', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
