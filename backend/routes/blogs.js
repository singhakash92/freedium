const express = require("express")
const app = express ()
const router = express.Router()
const {verifyToken} =  require("../middleware/user")
const Blogs = require("../db/blogs")

router.get("/allblogs", async (req, res)=>{

    const allBlogs = await Blogs.find({})

    return res.status(201).send({"blogs" : allBlogs})

})

module.exports = router;