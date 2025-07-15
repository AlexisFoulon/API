const Reservation = require('../models/Reservation')

exports.getAllReservation = async (req, res) => {
    try {
        const reservation = await Reservation.find().populate('catway');
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('catway');
        if (!reservation) return res.status(404).json ({ error: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json ({ error: 'Erreur serveur' });
    }
};


exports.createReservation = async (req, res) => {

  const { catway, startDate, endDate } = req.body;

  if (!catway || !startDate || !endDate) {
    return res.status(400).json({ error: 'Catway, date de début et date de fin sont requis'})
  }
  try {

    const catwayExists = await Catway.findById(catway);
    if (!catwayExists) {
        return res.status(404).json({ error: 'Catway introuvable' });
    }
    
    const overlapping = await Reservation.findOne({
    catway,
    $or: [
        {startDate: {$lte: endDate}, endDate: { $gte: startDate} }
    ]
    })
    if (overlapping) {
    return res.status(409).json ({error: 'Le catway est déja réservé pour ces dates'})
    }

    const newReservation = new Reservation({
      catway,
      clientName,
      boatName,
      startDate,
      endDate
    });

    const saved = await reservation.save();
    res.status(201).json(saved);
    
  } catch (err) {
    console.error("Erreur création réservation", err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateReservation = async (req, res) => {
    try {
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updated) return res.status(404).json ({ error: 'Réservation non trouvée' });
        res.json(updated)
    }catch (err) {
        res.status(400).json ({ error : err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const deleted = await Reservation.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error : 'Réservation non trouvée'});
        res.json({ message : 'Réservation surprimée'});
    } catch (err) {
        res.status(500).json ({ error: 'Erreur serveur' })
    }
};