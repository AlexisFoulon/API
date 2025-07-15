const mongoose = require('mongoose');
const User = require('./Backend/models/user');
require('dotenv').config();

async function checkPassword() {
  console.log("Début du script");
    await mongoose.connect(process.env.URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  const user = await User.findOne({ email: 'alexis@icloud.com' });
  if (!user) {
    console.log('Utilisateur non trouvé');
  } else {
    console.log('Mot de passe stocké en base:', user.password);
  }
console.log("Fin du script")
  mongoose.connection.close();
}

checkPassword();
