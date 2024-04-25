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

const updateDetails = z.object({
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

    res.status(200).send({"message" : "user found", user : userData})
})


router.post("/update", verifyToken, async (req, res) => {

    const parsedUpdateDetails = updateDetails.safeParse(req.body)

    if(!parsedUpdateDetails.success){
        return res.status(411).send({"message" : "Please enter valid input !!"})
    }


    const {username , email, dp, password} = req.body

    const userId = req.userId;

    const user = await User.findOne({_id : userId})
    // {username : username, email : email, dp : dp, password : password}
    if(user.email == email){
        await User.findByIdAndUpdate({_id : userId}, {username : username, dp : dp, password : password})
        return res.status(200).send({"message" : "user data updated successfully !!"})
    }

    const search = await User.findOne({email : email})

    if(!search){
        await User.findByIdAndUpdate({_id : userId}, {username : username, email : email, dp : dp, password : password})
        return res.status(200).send({"message" : "user data updated successfully !!"})        
    }

    return res.status(411).send({"message" : "This mail id is already registered !!"})

})


router.get("/author", verifyToken, async (req, res) => {
    const authorId = req.body.authorId;

    const author = await User.findOne({_id : authorId})

    const authorData = {...author._doc}

    delete authorData.password
    delete authorData.blogsSaved

    return res.status(200).send({"author" : authorData})
})

module.exports = router