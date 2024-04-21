const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(userId){

    const token = jwt.sign({userId}, SECRET_KEY, {'expiresIn' : '1h'})

    return token;  
}

function verifyToken(req, res, next){
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer.split(" ")[1]
    console.log(token)

}


module.exports = {generateToken, verifyToken}
