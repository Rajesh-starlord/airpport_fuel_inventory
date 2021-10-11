const dbService = require('./dbService');
const {v4: uuidv4 } = require('uuid');

class AirportService{
    async getAllAirports(){
        console.log('AirportService-------getAllAirports')
        let resp = {};
        try {
            const query = {
                text:'select * from AIRPORT_DATA order by airport_name ASC',
                values:[]
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

    async addNewAirport(airportData){
        console.log('AirportService-------addNewAirport')
        let resp = {};
        try {
            var airport_id = `airp_${uuidv4()}`;
            const query = {
                text:"insert into AIRPORT_DATA (airport_id, airport_name, fuel_capacity, fuel_available) values(?,?,?,?)",
                values: [airport_id,airportData.airportName, airportData.fuelCapacity, airportData.fuelAvailable]
            }
            const result = await dbService.executeUpdate(query);
            if (result.affectedRows > 0) {
                resp.message = 'success';
                resp.data = { airport_id, ...airportData };
            } else {
                resp.message = 'failed';
                resp.data = airportData;
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
}

module.exports = AirportService;