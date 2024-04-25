const mongoose = require("mongoose")
const Blogs = require("./blogs")

const user = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 20
    },  
    dp : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        maxLength : 20
    }, 
    blogsPublished : [{type : mongoose.Schema.Types.ObjectId, ref:"Blogs"}],
    blogsSaved : [{type : mongoose.Schema.Types.ObjectId, ref:"Blogs"}]
})

const User = mongoose.model("User", user)

module.exports = User