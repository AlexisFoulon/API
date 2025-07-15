const Catway = require('../models/Catway');

// GET /catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// GET /catways/:id
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// POST /catways
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    
    // Vérifier si catwayNumber unique
    const existingCatway = await Catway.findOne({ catwayNumber });
    if (existingCatway) {
      return res.status(400).json({ message: 'Ce numéro de catway existe déjà' });
    }

    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT /catways/:id
exports.updateCatway = async (req, res) => {
  try {
    const { catwayState } = req.body;

    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });

    if (catwayState) catway.catwayState = catwayState;

    await catway.save();
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// DELETE /catways/:id
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findByIdAndDelete(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });

    res.json({ message: 'Catway supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
