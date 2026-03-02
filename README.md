```markdown
# 🏥 SGDS - Plateforme Intelligente de Gestion et d’Analyse des Dossiers Médicaux

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)

> **Projet Encadré - INSEA (Année Universitaire 2024-2025)** > Une plateforme intelligente centralisant la gestion sécurisée et l'analyse automatique des dossiers médicaux, conçue pour répondre aux enjeux de la transformation numérique du secteur de la santé.

## 📋 Table des matières
- [À propos du projet](#-à-propos-du-projet)
- [Fonctionnalités Principales](#-fonctionnalités-principales)
- [Architecture & Technologies](#-architecture--technologies)
- [Prérequis](#-prérequis)
- [Installation & Déploiement](#-installation--déploiement)
- [Configuration](#-configuration)
- [Équipe](#-équipe)

---

## 💡 À propos du projet

Cette plateforme résout les problématiques de dispersion des données médicales en offrant un système centralisé et intelligent. Elle permet non seulement la gestion des Dossiers Médicaux Électroniques (DME), mais intègre également une surveillance en temps réel des constantes vitales pour déclencher des alertes immédiates en cas d'anomalie, facilitant ainsi la prise de décision clinique.

## ✨ Fonctionnalités Principales

- **Dossier Médical Électronique (DME) :** Gestion complète de l'historique patient (consultations, prescriptions, imagerie).
- **Extraction Intelligente :** Traitement automatique des documents médicaux (PDF) via Apache PDFBox.
- **Surveillance Temps Réel :** Monitoring des constantes et alertes critiques propulsées par Apache Kafka et WebSockets.
- **Tableaux de Bord Analytiques :** Interfaces dédiées (Médecin, Patient, Secrétaire, Admin) pour l'aide à la décision.
- **Sécurité Avancée :** Chiffrement des données sensibles (AES-256) et authentification robuste (Spring Security).

## 🛠 Architecture & Technologies

### Backend (API REST)
- **Framework :** Spring Boot, Spring Data JPA, Spring Security
- **Traitement documentaire :** Apache PDFBox

### Frontend (Client Web)
- **Framework :** Next.js (React) avec rendu SSR/SSG

### Données & Streaming
- **Base de données :** MySQL (hébergée sur Azure)
- **Message Broker :** Apache Kafka
- **Temps Réel :** WebSocket

---

## ⚙️ Prérequis

Avant de lancer le projet en local, assurez-vous d'avoir installé les outils suivants :
- **Java 21 (JDK)**
- **Node.js** (v18+) et **npm** (ou yarn)
- **MySQL Server**
- **Apache Kafka** & **Zookeeper** (ou un cluster Kafka cloud)
- **Maven**

---

## 🚀 Installation & Déploiement

### 1. Cloner le dépôt
```bash
git clone [https://github.com/votre-username/sgds-medical-platform.git](https://github.com/votre-username/sgds-medical-platform.git)
cd sgds-medical-platform

```

### 2. Démarrer Apache Kafka

Assurez-vous que Zookeeper et Kafka sont en cours d'exécution sur votre machine locale.

```bash
# Démarrer Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Démarrer Kafka
bin/kafka-server-start.sh config/server.properties

```

### 3. Configuration et Lancement du Backend (Spring Boot)

Naviguez dans le dossier du backend et configurez la base de données.

```bash
cd backend
# Installation des dépendances et compilation
mvn clean install

# Lancement du serveur Spring Boot
mvn spring-boot:run

```

*Le backend sera accessible sur `http://localhost:8080`.*

### 4. Configuration et Lancement du Frontend (Next.js)

Naviguez dans le dossier du frontend.

```bash
cd ../frontend
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

```

*Le frontend sera accessible sur `http://localhost:3000`.*

---

## 🔧 Configuration

### Variables d'environnement Backend (`application.properties` ou `.env`)

Créez un fichier `.env` ou modifiez le fichier `src/main/resources/application.properties` :

```properties
# Base de données MySQL (Azure ou Local)
spring.datasource.url=jdbc:mysql://[votre-serveur-azure.mysql.database.azure.com:3306/sgds_db](https://votre-serveur-azure.mysql.database.azure.com:3306/sgds_db)
spring.datasource.username=votre_utilisateur
spring.datasource.password=votre_mot_de_passe

# Configuration Kafka
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=medical-alerts-group

# Clé secrète JWT
jwt.secret=votre_cle_secrete_super_securisee

```

### Variables d'environnement Frontend (`.env.local`)

Dans le dossier `frontend/`, créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080/ws

```

---

## 👥 Équipe

Ce projet a été réalisé sous l'encadrement de **Mme EL BAJTA MANAL** par :

* **AIT ALI BENAISSA HAMZA**
* **FAHIMI YASSIR**
* **RAJI AHMED**
* **TAHIRI MOHEMMED**

Institut National de Statistique et d'Économie Appliquée (INSEA) - 2024/2025.

```

```
