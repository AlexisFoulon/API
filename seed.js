const mongoose = require ('mongoose');
const connectDB = require ('./Backend/config/db');
const Catway =require ('./Backend/models/catway');
const Reservation = require ('./Backend/models/reservations');

const catwayData =require ('./sources/catways.json');
const reservationData = require ('./sources/reservations.json');

const seedDB = async () => {
    try {
        await connectDB();

        await Catway.deleteMany({});
        await Reservation.deleteMany({});
        console.log('Collections vidées');


        // insertion des donnes en sources 
        await Catway.insertMany(catwayData);
        await Reservation.insertMany(reservationData);

        console.log ('Base de données initialisée avec succès')
        process.exit()
    } catch (error){
        console.error('erreur lors du seed' , error);
        process.exit(1);
    }
}

seedDB();