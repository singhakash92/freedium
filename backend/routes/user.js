const express = require("express")
const app = express()
const router = express.Router()
const z = require("zod")
const User = require("../db/user")
const {generateToken, verifyToken} = require("../middleware/user")



const userSignup = z.object({
    username : z.string().min(4).max(20),
    email : z.string().email(),
    dp : z.string(),
    password : z.string().min(8).max(20)
})


router.post("/signup", async (req, res)=>{

    try{
    const ParsedUserSignup = userSignup.safeParse(req.body)

    if(!ParsedUserSignup.success){
        return res.status(411).send({"message" : "Invalid Input"})     
    }

    const {username, email, dp, password} = req.body


    const exists = await  User.findOne({email : email})

    if(exists){
        return res.status(411).send({"message" : "This email is already registered !!"})
    } 

    const newUser = new User({ username : username, email : email, dp : dp, password : password, blogsPublished : [], blogsSaved : []})

    await newUser.save()

    const newUserId = newUser._id

    const token = generateToken(newUserId)

    res.status(200).send({ "message": "User created successfully", "token": token });
    }catch(error){
        res.status(411).send({"message" : "Invalid Input"})
    }
}
)








router.get("/",(req, res) =>{
    res.send({"message" : "Hi there from the user section"})
} )


module.exports = router