const dbService = require('./dbService');
const { v4: uuidv4 } = require('uuid');

class AircraftService {
    async getAllAircrafts() {
        console.log('AircraftService-------getAllAircrafts')
        let resp = {};
        try {
            const query = {
                text: 'select * from AIRCRAFT_DATA order by aircraft_no ASC',
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

    async addNewAircraft(aircraftData) {
        console.log('AircraftService-------addNewAircraft')
        let resp = {};
        try {
            var aircraft_id = `airc_${uuidv4()}`;
            const query = {
                text: "insert into AIRCRAFT_DATA (aircraft_id, aircraft_no, airline, source, destination) values(?,?,?,?,?)",
                values: [aircraft_id, aircraftData.aircraftNo, aircraftData.airline, aircraftData.source.toUpperCase(), aircraftData.destination.toUpperCase()]
            }
            const result = await dbService.executeUpdate(query);
            if (result.affectedRows > 0) {
                resp.message = 'success';
                resp.data = { ...aircraftData, aircraft_id };
            } else {
                resp.message = 'failed';
                resp.data = aircraftData;
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

module.exports = AircraftService;