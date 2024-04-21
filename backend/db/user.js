const mongoose = require("mongoose")
const Blogs = require("./blogs")

const user = mongoose.Schema({
    username : {
    type : String,
    required : true,
    maxLength :20,
    minLength : 4,
    unique : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true
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
    blogsPublished : [{type : mongoose.Schema.Types.objectId, ref:"Blogs"}],
    blogsSaved : [{type : mongoose.Schema.Types.objectId, ref:"Blogs"}]
})

const User = mongoose.model("User", user)

module.exports = User