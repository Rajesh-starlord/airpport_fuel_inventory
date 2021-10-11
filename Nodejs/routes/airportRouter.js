var express = require('express');
var router = express.Router();
const AirportController = require('../src/controllers/airportController');
const airportController = new AirportController();


router.get('/', airportController.getAllAirports);

router.post('/add', airportController.addNewAirport);

module.exports = router;
