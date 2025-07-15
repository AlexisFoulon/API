const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const verifyToken = require('../middleware/verifyToken'); // Middleware d’authentification

// Routes Catway

// GET /catways - Récupérer tous les catways
router.get('/', verifyToken, catwayController.getAllCatways);

// GET /catways/:id - Récupérer un catway par ID
router.get('/:id', verifyToken, catwayController.getCatwayById);

// POST /catways - Créer un nouveau catway
router.post('/', verifyToken, catwayController.createCatway);

// PUT /catways/:id - Modifier un catway
router.put('/:id', verifyToken, catwayController.updateCatway);

// DELETE /catways/:id - Supprimer un catway
router.delete('/:id', verifyToken, catwayController.deleteCatway);

module.exports = router;
