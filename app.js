const express = require ('express');
const cors = require ('cors');
require ('dotenv').config();

const connectDB = require('./Backend/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

//Connexion à la base de données
connectDB();

app.use(cors());
app.use(express.json());

// Route de test 

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API")
})

// Ajout des route ici 

app.listen(PORT, () => {
    console.log(`Serveur lancé sur l'http://localhost:${PORT}`);
})