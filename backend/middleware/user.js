const jwt = require("jsonwebtoken")
const SECRET_KEY = "4k45h"

function generateToken(userId){

    const token = jwt.sign({userId}, SECRET_KEY, {'expiresIn' : '1h'})

    return token;  
}


module.exports = {generateToken}
