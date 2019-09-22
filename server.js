const express= require("express")
const mongoose = require("mongoose")
const bodyParser= require("body-parser")

const app=express()

app.use(bodyParser.json())


const db= require('./config/keys').mongoURI

mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>console.log('connected to mongo db'))
    .catch(err=> console.log(err))

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`server running on port ${port}`))
