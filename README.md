# Express Structure Book - Guide d'Initialisation

Ce projet est une API REST construite avec Express.js et Sequelize pour la gestion d'une bibliothèque de livres.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Initialisation du projet](#initialisation-du-projet)
3. [Configuration de la base de données](#configuration-de-la-base-de-données)
4. [Création du modèle](#création-du-modèle)
5. [Création de la migration](#création-de-la-migration)
6. [Création du contrôleur](#création-du-contrôleur)
7. [Création des routes](#création-des-routes)
8. [Configuration de l'application](#configuration-de-lapplication)
9. [Lancement du projet](#lancement-du-projet)

---


## 🚀 Initialisation du projet

### Étape 1 : Créer le dossier du projet

```bash
mkdir express_structure_book
cd express_structure_book
```

### Étape 2 : Initialiser npm

```bash
npm init -y
```

Cette commande crée un fichier `package.json` avec les valeurs par défaut.

### Étape 3 : Installer les dépendances

```bash
# Dépendances principales
npm install express cors morgan dotenv mysql2 sequelize

# Dépendances de développement
npm install --save-dev nodemon sequelize-cli
```

### Étape 4 : Configurer le package.json

Modifiez le fichier `package.json` pour ajouter les scripts et configurer le type de module :

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "db:create": "sequelize db:create",
    "db:migrate": "sequelize db:migrate",
    "db:migrate:undo": "sequelize db:migrate:undo",
    "db:seed": "sequelize db:seed:all",
    "db:seed:undo": "sequelize db:seed:undo:all"
  }
}
```

### Étape 5 : Créer la structure des dossiers

```bash
mkdir -p src/{config,models,controllers,routes,migrations,seeders}
```

---

## ⚙️ Configuration de l'application

### Étape 1 : Créer app.js

Créez `src/app.js` :

```javascript
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from "./routes/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', router);

export default app;
```

### Étape 2 : Créer server.js

Créez `src/server.js` :

```javascript
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
    console.log('PORT absent veuillez compléter le fichier .env');
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
```

---

## 🚀 Lancement du projet

### Étape 1 : Vérifier la configuration

Assurez-vous que votre fichier `.env` est correctement configuré et que MySQL est démarré.

### Étape 2 : Lancer le serveur en mode développement

```bash
npm run dev
```

Ou en mode production :

```bash
npm start
```

Le serveur devrait démarrer sur le port spécifié dans votre fichier `.env` (par défaut 3000).

---

## 🗄️ Configuration de la base de données

### Étape 1 : Créer le fichier .env

Créez un fichier `.env` à la racine du projet :

```env
# Configuration du serveur
PORT=3000

# Configuration de la base de données
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=express_book_db
DB_HOST=localhost
DB_PORT=3306
```

### Étape 2 : Créer le fichier de configuration Sequelize

Créez `src/config/config.js` :

```javascript
import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    define: { underscored: true }
  }
};
```

### Étape 3 : Créer le fichier .sequelizerc

Créez un fichier `.sequelizerc` à la racine pour configurer les chemins Sequelize :

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  'config': path.resolve(__dirname, 'src', 'config', 'config.js'),
  'models-path': path.resolve(__dirname, 'src', 'models'),
  'seeders-path': path.resolve(__dirname, 'src', 'seeders'),
  'migrations-path': path.resolve(__dirname, 'src', 'migrations')
};
```

### Étape 4 : Créer la base de données

```bash
npm run db:create
```

---

## 📦 Création du modèle

### Étape 1 : Créer le modèle Book

Créez `src/models/Book.js` :

```javascript
"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Associations s'il y en a
    }
  }
  
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  
  return Book;
};
```

---

## 🔄 Création de la migration

### Étape 1 : Générer la migration

```bash
npx sequelize-cli migration:generate --name create-book
```

Cette commande crée un fichier de migration dans `src/migrations/` avec un timestamp.

### Étape 2 : Remplir la migration

Ouvrez le fichier de migration créé (ex: `src/migrations/20251112152643-create-book.cjs`) et ajoutez :

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  },
};
```

### Étape 3 : Exécuter la migration

```bash
npm run db:migrate
```

Cette commande crée la table `books` dans votre base de données MySQL.

---

## 🎮 Création du contrôleur

### Étape 1 : Créer le contrôleur

Créez `src/controllers/books.controller.js` :

```javascript
import db from "../models/index.js";
const { Book } = db;

// Récupérer tous les livres
export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({
      success: true,
      message: "Les livres ont été récupérés avec succès",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Récupérer un livre par son ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }
    res.status(200).json({
      success: true,
      message: "Le livre a été récupéré avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Créer un nouveau livre
export const createBook = async (req, res) => {
  try {
    const { title, author, available } = req.body;
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Le titre et l'auteur sont requis",
      });
    }
    const book = await Book.create({ title, author, available });
    res.status(201).json({
      success: true,
      message: "Le livre a été créé avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mettre à jour un livre
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, available } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }
    await book.update({ title, author, available });
    res.status(200).json({
      success: true,
      message: "Le livre a été mis à jour avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Supprimer un livre
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }
    await book.destroy();
    res.status(200).json({
      success: true,
      message: "Le livre a été supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
```

---

## 🛣️ Création des routes

### Étape 1 : Créer les routes pour les livres

Créez `src/routes/books.routes.js` :

```javascript
import { Router } from 'express';
import { 
  getBooks, 
  createBook, 
  updateBook, 
  getBookById, 
  deleteBook 
} from '../controllers/books.controller.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
```

### Étape 2 : Créer le fichier index.js des routes

Créez `src/routes/index.js` :

```javascript
import { Router } from 'express';
import booksRoutes from './books.routes.js';

const router = Router();

router.use('/books', booksRoutes);

export default router;
```

---

## 📡 Endpoints de l'API



- **GET** `/api/books` - Récupérer tous les livres
- **GET** `/api/books/:id` - Récupérer un livre par son ID
- **POST** `/api/books` - Créer un nouveau livre
- **PUT** `/api/books/:id` - Mettre à jour un livre
- **DELETE** `/api/books/:id` - Supprimer un livre

### Exemple de requête POST

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Le Seigneur des Anneaux",
    "author": "J.R.R. Tolkien",
    "available": true
  }'
```

---

## 📝 Structure du projet

```
express_structure_book/
├── node_modules/
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── books.controller.js
│   ├── migrations/
│   │   └── 20251112152643-create-book.cjs
│   ├── models/
│   │   ├── Book.js
│   │   └── index.js
│   ├── routes/
│   │   ├── books.routes.js
│   │   └── index.js
│   ├── seeders/
│   ├── app.js
│   └── server.js
├── .env
├── .sequelizerc
├── package.json
└── README.md
```

---

## 🔄 Commandes utiles

- `npm start` - Lancer le serveur en mode production
- `npm run dev` - Lancer le serveur en mode développement (avec nodemon)
- `npm run db:create` - Créer la base de données
- `npm run db:migrate` - Exécuter les migrations
- `npm run db:migrate:undo` - Annuler la dernière migration
- `npm run db:seed` - Exécuter les seeders
- `npm run db:seed:undo` - Annuler les seeders

---
