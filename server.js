const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

// Connexion à la base de données
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taff-api-rest';
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

// Middleware pour le traitement du corps des requêtes JSON
app.use(express.json());

// Route pour la racine ("/")
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil!');
});

// Route GET pour retourner tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs : ' + error.message);
  }
});

// Route POST pour ajouter un nouvel utilisateur à la base de données
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur : ' + error.message);
  }
});

// Route PUT pour modifier un utilisateur par ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Erreur lors de la modification de l\'utilisateur : ' + error.message);
  }
});

// Route DELETE pour supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
