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

const userSignin = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20)
})


router.post("/signup", async (req, res)=>{

    try{
    const ParsedUserSignup = userSignup.safeParse(req.body)

    if(!ParsedUserSignup.success){
        return res.status(411).send({"message" : "Invalid Input"})     
    }

    const {username, email, dp, password} = req.body
    const exists = await User.findOne({email : email})

    if(exists){
        return res.status(411).send({"message" : "This email is already registered !!"})
    } 

    const newUser = new User({ username : username, email : email, dp : dp, password : password, blogsPublished : [], blogsSaved : []})

    await newUser.save()

    const newUserId = newUser._id

    const token = generateToken(newUserId)

    res.status(200).send({ "message": "User created successfully", "token": token });
    }catch(error){
        res.status(411).send({"message" : error.message})
    }
}
)

router.post("/signin", async (req, res)=>{

    const parsedSignin = userSignin.safeParse(req.body)

    if(!parsedSignin.success){
        return res.status(411).send({"message" : "Please enter valid input !!"})
    }

    const {email, password} = req.body

    const exists = await User.findOne(req.body)
    if(!exists){
        return res.status(411).send({"message" : "Please enter the correct credentials !!"})
    }

    const userId = exists._id

    const token = generateToken(userId)

    return res.status(200).send({"message" : "loggedin successfull", token:token})
})


router.get("/me", verifyToken, async (req, res)=>{
    const userId = req.userId;

    const foundUser = await User.findOne({_id : userId})
   const userData = {...foundUser._doc}
   
    delete userData.password
    console.log(userData)

    res.status(200).send({"message" : "user found", user : foundUser})
})









router.get("/",(req, res) =>{
    res.send({"message" : "Hi there from the user section"})
} )


module.exports = router