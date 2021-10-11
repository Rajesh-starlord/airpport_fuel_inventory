var express = require('express');
var router = express.Router();
const ReportController = require('../src/controllers/reportController');

const reportController = new ReportController();

router.get('/airportSummaryReport', reportController.getAirportSummaryReport);

router.get('/fuelCosumptionReport', reportController.getFuelCosumptionRep);

module.exports = router;