const ReportService = require('../services/reportService');
const HttpResponse = require('../utils/HttpResponse');

const reportService = new ReportService();

class ReportController {
    async getAirportSummaryReport(req, res) {
        try {
            const resp = await reportService.getAllAirports();
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

    async getFuelCosumptionRep(req, res) {
        try {
            const resp = await reportService.getAllAirports();
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
}

module.exports = ReportController;