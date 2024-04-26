const mongoose = require("mongoose");
const User = require("./user")

const blogs = mongoose.Schema({
    userId : {
        // type need to be made much specific
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    }, 
    relevant : [{ tag : String}],
    date : {
        type : Date,
        default : Date.now,
    }, 
    comments : [{
        username : {type : String, required : true}, 
        body : String,
        like : {
            type : Number,
            default : 0,
            min : 0
        },
        unlike : {
            type : Number,
            default : 0,
            min : 0
        }
    }],
    meta : {
        upvotes : {
            type : Number,
            default : 0
        }, 
        downvotes : {
            type : Number, 
            default : 0,
            min : 0
        },
        bookmarks : {
            type : Number, 
            default : 0,
            min : 0
        }
    }

})

const Blogs = mongoose.model("Blogs", blogs)

module.exports = Blogs