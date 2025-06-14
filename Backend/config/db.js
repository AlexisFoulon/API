const dotenv = require ('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Échec de connexion MongoDB :', error.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
};

module.exports = connectDB;
