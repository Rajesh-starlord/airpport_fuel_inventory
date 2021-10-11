const dbService = require('./dbService');

class UserService{
    async authenticateUser(email,password){
        let resp = {};
        try {
            const query = {
                text:'select * from users where email = ? and password = ?',
                values:[email,password]
            }
            resp = await dbService.execute(query);

        } catch (error) {
            console.log(error);
        }
        return resp;
    }
}

module.exports = UserService;