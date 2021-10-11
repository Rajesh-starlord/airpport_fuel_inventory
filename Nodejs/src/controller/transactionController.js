const TransactionService = require('../services/transactionService');
const HttpResponse = require('../utils/HttpResponse');
const Validator = require('../utils/validator');

const validator = new Validator();
const transactionService = new TransactionService();

class TransactionController {
    async getAllTransactions(req, res) {
        console.log('TransactionController-------getAllTransactions')
        try {
            const resp = await transactionService.getAllTransactions();
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

    async addNewTrans(req, res) {
        console.log('TransactionController-------addNewTrans')
        try {
            const transData = req.body;
            const validResp = validator.validateTransModel(transData);
            if (!validResp.error) {
                if(transData.transactionType === 'OUT' && !transData.aircraftId){
                    validResp.error = { details : 'aircraft required'};
                }
            }
            if (!validResp.error) {
                const resp = await transactionService.addNewTrans(transData);
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

    async addRevTrans(req, res) {
        console.log('TransactionController-------addRevTrans')
        try {
            const transData = req.body;
            const validResp = validator.validateRevTransModel(transData);
            if (!validResp.error) {
                let resp = {message :'',body:{}};
                let isValidTransId = await transactionService.isValidTransId(transData.transIdParent);
                if(isValidTransId.message === 'success'){
                    const data = isValidTransId.data;
                    if(data.transaction_type === 'IN' && !transData.aircraftId){
                        resp.error = 'aircraft required';
                        resp.message = 'Failed';
                    }else{
                        transData.transactionType = data.transaction_type === 'IN' ? 'OUT' : 'IN';
                        transData.airportId = data.airport_id;
                        transData.aircraftId = data.aircraft_id || '';
                        resp = await transactionService.addRevTrans(transData);
                    }
                }else{
                    resp.message = 'Failed';
                    resp.error = 'Invalid Transaction ID'; 
                }
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

    async deleteAllTrans(req, res) {
        console.log('TransactionController-------deleteAllTrans')
        try {
            const resp = await transactionService.deleteAllTrans();
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

module.exports = TransactionController;