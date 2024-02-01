const mongoose = require('mongoose');

// Définir le schéma du modèle User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Ajoutez d'autres champs selon vos besoins
});

// Créer le modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

// Exporter le modèle pour pouvoir l'utiliser ailleurs dans votre application
module.exports = User;
