const express = require("express")
const app = express ()
const router = express.Router()
const {verifyToken} =  require("../middleware/user")
const Blogs = require("../db/blogs")
const z = require("zod")

const blogInput = z.object({})



router.post("/createblog", verifyToken, async (req, res) =>{

})

router.get("/allblogs", async (req, res)=>{

    const allBlogs = await Blogs.find({})

    return res.status(201).send({"blogs" : allBlogs})

})



router.get("/specificblog", verifyToken, async (req, res) =>{
    const specBlogId = req.body.blogId;

    const blog = await Blogs.findOne({_id : specBlogId})

    return res.status(200).send({specificBlog : blog})

})


module.exports = router;