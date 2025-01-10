const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT;
//const dotenv = require("dotenv");
require('dotenv').config()
const helmet = require("helmet");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const app = express()
const fs = require('fs');
const authRoute = require('./routes/auth.js')
const registrationsRoute = require("./routes/registrations");
const mailer = require("./routes/nodemailer");

var cors = require('cors')
app.use(cookieParser())

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
//dotenv.config();
//const {MONGOURI}= require('./keys.js')
//const {MONGOURI} = process.env.MONGOURI
//console.log(MONGOURI);

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser : true , useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to DB');
})
mongoose.connection.on('error',()=>{
    console.log('not connected to DB');
})


// mongoose.connect('mongodb://localhost/lc', { useNewUrlParser : true , useUnifiedTopology: true}, ()=>
// {
//     console.log('connected to DB')
// })
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet())
app.use(cors())

app.use('/api',authRoute)
app.use("/api", registrationsRoute);
app.use("/api", mailer);



app.listen(5000,()=>{
    console.log("server is running on port 5000");
})