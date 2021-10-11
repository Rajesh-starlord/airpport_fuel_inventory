const Joi = require('joi');

class Validator {
    validateUserModel(user){
        const userSchema = Joi.object().keys({
            userid:Joi.string().email().required(),
            password:Joi.string().required(),
        });
        let result = userSchema.validate(user);
        return result;
    }

    validateAirportModel(airport){
        const airportSchema = Joi.object().keys({
            airportId:Joi.string(),
            airportName:Joi.string().required(),
            fuelCapacity:Joi.number().required(),
            fuelAvailable:Joi.number()
        });
        let result = airportSchema.validate(airport);
        return result;
    }

    validateAircraftModel(aircraft){
        const aircraftSchema = Joi.object().keys({
            aircraftId:Joi.string().optional(),
            aircraftNo:Joi.string().required(),
            airline:Joi.string().required(),
            source:Joi.string().required(),
            destination:Joi.string().required()
        });
        let result = aircraftSchema.validate(aircraft);
        return result;
    }

    validateTransModel(transaction){
        const transSchema = Joi.object().keys({
            aircraftId:Joi.string().allow(null).allow('').optional(),
            airportId:Joi.string().required(),
            transactionType:Joi.string().required(),
            quantity:Joi.number().required(),
        });
        let result = transSchema.validate(transaction);
        return result;
    }

    validateRevTransModel(transaction){
        const revtransSchema = Joi.object().keys({
            aircraftId:Joi.string().allow(null).allow('').optional(),
            airportId:Joi.string().optional(),
            transactionType:Joi.string().required(),
            transIdParent:Joi.string().required(),
            quantity:Joi.number().required(),
        });
        let result = revtransSchema.validate(transaction);
        return result;
    }
}

module.exports = Validator;