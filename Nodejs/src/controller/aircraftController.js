const AircraftService = require('../services/aircraftService');
const HttpResponse = require('../utils/HttpResponse');
const Validator = require('../utils/validator');

const validator = new Validator();
const aircraftService = new AircraftService();

class AircraftController {
    async getAllAircrafts(req, res) {
        try {
            const resp = await aircraftService.getAllAircrafts();
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

    async addNewAircraft(req, res) {
        try {
            const aircraftData = req.body;
            const validResp = validator.validateAircraftModel(aircraftData);
            if (validResp.error === null) {
                const resp = await aircraftService.addNewAircraft(aircraftData);
                if (resp.message === 'success') {
                    res.send(new HttpResponse('success', resp));
                } else {
                    res.send(new HttpResponse('failed', resp));
                }
            }else{
                res.status(400).send(new HttpResponse('failed', { error: validResp.error }));
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(new HttpResponse('failed', error.stack));
        }
    }
}

module.exports = AircraftController;