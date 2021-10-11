const UserService = require('../services/userService');
const HttpResponse = require('../utils/HttpResponse');
const Validator = require('../utils/validator');
const { getToken } =require('../midlewares/authMiddleware');

const validator = new Validator();
const userService = new UserService();

class UserController {
    async authenticateUser(req, res) {
        try {
            const userDetails = req.body;
            const validResp = validator.validateUserModel(userDetails);
            if (validResp.error === null) {
                const resp = await userService.authenticateUser(userDetails.userid, userDetails.password);
                if (resp && resp.length && typeof resp != 'string') {
                    let user = resp[0];
                    user = {...user,token:getToken()};
                    res.send(new HttpResponse('success', user));
                } else {
                    res.send(new HttpResponse('failed', resp));
                }
            } else {
                res.send(new HttpResponse('failed', { error: validResp.error }));
            }
        } catch (error) {
            console.log(error);
            res.send(new HttpResponse('failed', resp));
        }
    }
}

module.exports = UserController;