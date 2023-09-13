const express = require('express')
const boddParser = require('body-parser')
const cors = require('cors');

const admin=require('./routes/admin');
const register=require('./routes/register');
 const updates=require('./routes/updates');
const timetable=require('./routes/timetable');
const getUpdates=require('./routes/getUpdates');
const  port = process.env.PORT || 3100;

const app = express()
//instantiating 
app.use(boddParser.urlencoded({extended:true}))
app.use(boddParser.json())
app.use(cors({"Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"})
    );

///routes
app.use(express.json());


app.use('/admin',admin);//ADMIN LOGIN
app.use('/timetable',timetable); //UPLOAD TIME TABLE
app.use('/updates',updates); //POST ANNOUNCEMEMTS
app.use('/getUpdates',getUpdates); ///GET ANNOUNCEMENTS
app.use('/register',register); //REGISTER


app.listen(port,()=>{
    console.log('the server is running ' +port);
})