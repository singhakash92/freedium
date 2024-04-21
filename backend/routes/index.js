const express = require("express");
const app = express();
const router =  express.Router();
const userRoute = require("./user")
const blogsRoute = require("./blogs")

router.use("/user", userRoute)
router.use("/blogs", blogsRoute)


router.get("/", (req, res)=>{
    res.send({"message" :"Hi there from main router"})
})

module.exports = router
