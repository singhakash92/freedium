const express = require("express");
const app = express();
const PORT =  3000;
const cors = require("cors")
const bodyParser = require('body-parser')
const mainRouter = require("./routes/index")
const mongoose = require("mongoose")
require('dotenv').config()

const Mongo_db = process.env.MONGO_DB
app.use(cors());
app.use(bodyParser.json());


app.use("/api/v1", mainRouter)


mongoose.connect(Mongo_db)

app.listen(PORT, ()=>{
    console.log(`backend is running at port ${PORT}`)
})

