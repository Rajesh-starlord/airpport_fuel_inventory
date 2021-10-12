const AirportService = require('../services/airportService');
const HttpResponse = require('../utils/HttpResponse');
const Validator = require('../utils/validator');

const validator = new Validator();
const airportService = new AirportService();

class AirportController {
    async getAllAirports(req, res) {
        try {
            const resp = await airportService.getAllAirports();
            if (resp.message === 'success') {
                res.send(new HttpResponse('success', resp));
            } else {
                res.send(new HttpResponse('failed', resp));
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(new HttpResponse('failed', error.stack));
        }
    }

    async addNewAirport(req, res) {
        try {
            const airportData = req.body;
            const validResp = validator.validateAirportModel(airportData);
            if (!validResp.error) {
                const resp = await airportService.addNewAirport(airportData);
                if (resp.message === 'success') {
                    res.send(new HttpResponse('success', resp));
                } else {
                    res.send(new HttpResponse('failed', resp));
                }
            }else{
                res.status(400).send(new HttpResponse('failed', { error: validResp.error.details }));
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(new HttpResponse('failed', error.stack));
        }
    }
}

module.exports = AirportController;