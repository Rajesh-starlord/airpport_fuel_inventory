const dbService = require('./dbService');

class ReportService {
    async getAirportSummaryReport() {
        console.log('ReportService-------getAirportSummaryReport')
        let resp = {};
        try {
            const query = {
                text: 'select airport_name, fuel_available from AIRPORT_DATA order by airport_name ASC',
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

    async getFuelCosumptionRep() {
        console.log('ReportService-------getFuelCosumptionRep')
        let resp = {};
        let reportData = [];
        try {
            const query = {
                text: 'select f.*,a.aircraft_no from FUEL_TRANSACTION as f left join AIRCRAFT_DATA as a on a.aircraft_id = f.aircraft_id order by transaction_date_time',
                values: []
            }
            const query1 = {
                text: 'select * from AIRPORT_DATA order by airport_name',
                values: []
            }
            const transResult = await dbService.execute(query);
            const airportResult = await dbService.execute(query1);
            if(airportResult.length){
               for(let i = 0 ; i< airportResult.length ;i++){
                    let r = airportResult[i];
                    let obj = { airport_name : r.airport_name, airport_id: r.airport_id , transactions: []};
                    transResult.forEach( t =>{
                        if(t.airport_id === r.airport_id){
                            obj.transactions.push(t);
                        }
                    });
                    reportData.push(obj);
                }
            }
            console.log(reportData);
            resp.message = 'success';
            resp.data = reportData;
        } catch (error) {
            console.log(error);
            resp.message = 'failed';
            resp.data = [];
        }
        return resp;
    }
}

module.exports = ReportService;