// Charger les variables d'environnement
require('dotenv').config();

// Importer les modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');  // Importer le modèle User

// Utiliser vos variables d'environnement
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Créer votre application Express
const app = express();

// Définir vos routes, middleware, etc.

// Exemple de route pour créer un utilisateur
app.get('/create-user', async (req, res) => {
  try {
    const newUser = new User({
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const savedUser = await newUser.save();
    res.send('Utilisateur créé avec succès : ' + savedUser);
  } catch (error) {
    res.status(500).send('Erreur lors de la création de l\'utilisateur : ' + error.message);
  }
});

// ... le reste de votre code ...
