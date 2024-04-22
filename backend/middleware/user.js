const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(userId){

    const token = jwt.sign({userId}, SECRET_KEY, {'expiresIn' : '1h'})

    return token;  
}

function verifyToken(req, res, next){
    const tokenWithBearer = req.headers.authorization;

    if(!tokenWithBearer.startsWith("bearer ")){
        return res.status(411).send({"message" : "Please enter the correct credentials !!"})    
    }

    const token = tokenWithBearer.split(" ")[1]
    
    jwt.verify(token, SECRET_KEY, (err, data) =>{
        if(err){
            return res.status(411).send({"message" : "please enter correct credentials !!"})
        }

        console.log(data.userId)
    })

}


module.exports = {generateToken, verifyToken}
