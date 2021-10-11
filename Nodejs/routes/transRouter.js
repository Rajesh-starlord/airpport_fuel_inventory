var express = require('express');
var router = express.Router();
const TransactionController = require('../src/controllers/transactionController');

const transactionController = new TransactionController();

router.get('/', transactionController.getAllTransactions);

router.post('/addTrans', transactionController.addNewTrans);

router.post('/addReverseTransaction', transactionController.addRevTrans);

router.post('/deleteAll', transactionController.deleteAllTrans);

module.exports = router;
    