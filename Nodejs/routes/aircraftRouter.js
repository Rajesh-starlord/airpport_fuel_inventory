var express = require('express');
var router = express.Router();
const AircraftController = require('../src/controllers/aircraftController');
const aircraftController = new AircraftController();


router.get('/', aircraftController.getAllAircrafts);

router.post('/add', aircraftController.addNewAircraft);

module.exports = router;
