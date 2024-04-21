const express = require("express");
const app = express();
const PORT =  3000;
const cors = require("cors")
const bodyParser = require('body-parser')
const mainRouter = require("./routes/index")
const mongoose = require("mongoose")


app.use(cors());
app.use(bodyParser.json());


app.use("/api/v1", mainRouter)


mongoose.connect("mongodb+srv://akashsingh:akashsingh92409133@cluster0.wv1n2v9.mongodb.net/freedium")

app.listen(PORT, ()=>{
    console.log(`backend is running at port ${PORT}`)
})

