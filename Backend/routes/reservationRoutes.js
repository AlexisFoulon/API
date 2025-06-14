const express = require ('express');
const router = express.Router;
const reservationController =require ('../controllers/reservationController');

router.get ('/', reservationController.getAllReservations)
router.get ('/:id', reservationController.getAllReservationsById)
router.post ('/', reservationController.createReservations)
router.put ('/id:', reservationController.updateReservations)
router.delete ('/id:', reservationController.deleteReservations)

model.exports = router;