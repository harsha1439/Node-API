const express = require('express')               //express 
require('dotenv').config();                     //to getch env variables
const bodyparser = require('body-parser')       //body-parser to parse incoming req
const mongoose = require('mongoose')
const route = require('./Routes/routing')
const myLogger = require('./Utilities/requestLogger')

const app = express() //start the app
app.use(bodyparser.json())
app.use(myLogger)
app.use('/',route)

//MongoDb database connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () =>{
    console.log('Database connected')
})

const port = process.env.PORT || 2000 //listen at that port
// server setup
app.listen(port, () => {
    console.log(`Express server is running at ${port}`)
})

