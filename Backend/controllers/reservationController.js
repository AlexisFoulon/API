const Reservation = require('../models/reservations')

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getAllReservationsById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json ({ error: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json ({ error: 'Erreur serveur' });
    }
};

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json ({ error: err.message });
    }
};

exports.updateReservations = async (req, res) => {
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
        res.json({ message : 'Réservation surpprimée'});
    } catch (err) {
        res.status(500).json ({ error: 'Erreur serveur' })
    }
}