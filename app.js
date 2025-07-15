 const express = require ('express');
 const cors = require ('cors');
 require ('dotenv').config();
 const connectDB = require('./config/db');

 const userRoutes = require ('./routes/userRoutes')
 const authRoutes = require ('/routes/authRoutes')
 const catwayRoutes = require ('./routes/catwayRoutes')
 const reservationRoutes = require ('./routes/reservationRoutes')

 const app = express();
 const PORT = process.env.PORT || 3000;

 //Connexion à la base de données
 connectDB();

 app.use(cors());
 app.use(express.json({ limit: '1mb'}));
 
 // Route de test 
 
 app.get('/', (req, res) => {
   res.json({
     name: "API",
     version: "1.0",
     status: 200,
     message: "Bienvenue sur l'API"
    });
  });
  
  
  //Routes principales
  app.use('/users', userRoutes);
  app.use ('/auth', authRoutes);
  app.use ('/catways', catwayRoutes);
  app.use ('/reservations', reservationRoutes);
  
  app.use ((req,res) => {
    res.status(404).json({error : "Route non trouvée"})
  });
   
  //Lancezment du serveur
  app.listen(PORT, () => {
     console.log(`Serveur lancé sur l'http://localhost:${PORT}`);
 })

