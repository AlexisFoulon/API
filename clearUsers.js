// clearUsers.js
require('dotenv').config();
console.log('MONGO_URI =', process.env.URL_MONGO);

const mongoose = require('mongoose');
const User = require('./Backend/models/user');

mongoose.connect(process.env.URL_MONGO)
  .then(async () => {
    console.log('Connecté à MongoDB');
    await User.deleteMany({});
    console.log('Tous les utilisateurs ont été supprimés');
    process.exit();
  })
  .catch((err) => {
    console.error('Erreur de connexion :', err);
    process.exit(1);
  });
