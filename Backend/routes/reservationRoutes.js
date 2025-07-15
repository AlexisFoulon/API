const express = require ('express');
const router = express.Router();
const reservationController = require ('../controllers/reservationController');
const verifyToken = require ('../middleware/verifyToken')


// Routes protégées
router.post('/', verifyToken, reservationController.createReservations);
router.put('/:id', verifyToken, reservationController.updateReservations);
router.delete('/:id', verifyToken, reservationController.deleteReservations);

// Routes publiques
router.get('/', reservationController.getAllReservations);
router.get('/:id', reservationController.getAllReservationsById);


module.exports = router;