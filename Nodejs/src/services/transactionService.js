const dbService = require('./dbService');
const { v4: uuidv4 } = require('uuid');

class TransactionService {
    async getAllTransactions() {
        console.log('TransactionService-------getAllTransactions')
        let resp = {};
        try {
            const query = {
                text: 'select * from FUEL_TRANACTION order by transaction_date_time DESC',
                values: []
            }
            const result = await dbService.execute(query);
            resp.message = 'success';
            resp.data = result;
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            resp.data = [];
        }
        return resp;
    }

    async isValidTransId(transactionId) {
        console.log('TransactionService-------isValidTransId')
        let resp = {};
        try {
            const query = {
                text: 'select * from FUEL_TRANSACTION where transaction_id = ?',
                values: [transactionId]
            }
            const result = await dbService.execute(query);
            console.log(result);
            if(result.length){
                resp.message = 'success';
                resp.data = result[0];
            }else{
                resp.message = 'failed';
                resp.data = {};
            }
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            resp.data = [];
        }
        return resp;
    }

    async addNewTrans(data) {
        console.log('TransactionService-------addNewTrans')
        let resp = {};
        try {
            var transaction_id = `trans_${uuidv4()}`;
            const query = {
                text: "call add_fuel_transaction(?,?,?,?,?)",
                values: [transaction_id, data.transactionType, data.airportId, data.aircraftId, data.quantity]
            }
            const result = await dbService.executeUpdate(query);
            if (result.affectedRows > 0) {
                resp.message = 'success';
                resp.data = { ...data, transaction_id };
            } else {
                resp.message = 'failed';
                resp.data = data;
            }
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            if(error.message && error.message.includes('Duplicate entry')){
                resp.message = 'Record already exists!';
            }
            resp.data = {};
        }
        return resp;
    }

    async addRevTrans(data) {
        console.log('TransactionService-------addRevTrans')
        let resp = {};
        try {
            var transaction_id = `trans_${uuidv4()}`;
            const query = {
                text: "call add_reverse_transaction(?,?,?,?,?,?)",
                values: [transaction_id, data.transactionType, data.airportId, data.aircraftId, data.quantity, data.transIdParent]
            }
            const result = await dbService.executeUpdate(query);
            if (result.affectedRows > 0) {
                resp.message = 'success';
                resp.data = { ...data, transaction_id };
            } else {
                resp.message = 'failed';
                resp.data = data;
            }
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            if(error.message && error.message.includes('Duplicate entry')){
                resp.message = 'Record already exists!';
            }
            resp.data = {};
        }
        return resp;
    }

    async deleteAllTrans() {
        console.log('TransactionService-------deleteAllTrans')
        let resp = {};
        try {
            const query = {
                text: "delete from FUEL_TRANSACTION",
                values: []
            }
            const result = await dbService.executeUpdate(query);
            console.log(result);
            resp.message = 'success';
            resp.data = {};
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            resp.data = {};
        }
        return resp;
    }

}

module.exports = TransactionService;
