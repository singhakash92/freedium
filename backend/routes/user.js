const express = require("express")
const app = express()
const router = express.Router()
import { z } from "zod";
const User = require("../db/user")



const userSignup = z.object({
    username : z.string().min(4).max(20),
    email : z.string().email(),
    dp : z.string(),
    password : z.string().min(8).max(20)
})


router.post("/signup", async (req, res)=>{
    const ParsedUserSignup = userSignup.safeParse(req.body)

    if(!ParsedUserSignup.success){
        return res.status(411).send({"message" : "Invalid Input"})     
    }

    const {username, email, dp, password} = req.body()
    console.log(username, email, dp, password)

    const exists = await  User.findOne({username : username})

    if(exists){
        return res.status(411).send({"message" : "This email is already registerd !!"})
    } 

    const newUser = new User({ username : username, email : email, dp : dp, password : password, blogsPublished : [], blogsSaved : []})

    await newUser.save()

    const newUserId = newUser._id

    console.log("hi")
}


)








router.get("/",(req, res) =>{
    res.send({"message" : "Hi there from the user section"})
} )


module.exports = router