const stream= require('stream');
const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const router = express.Router();
const app=express();
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { format } = require('util');
const { google } = require('googleapis');
const path =require('path');
const credentials=require('../credentials.json')
const upload=Multer();
const database = require('../database/db');
app.use(cors());
app.use(bodyparser.json());
//_dirname
const KEYFILEPATH=path.join(__dirname,"credentials.json");

const SCOPES =['https://www.googleapis.com/auth/drive'];

const auth= new google.auth.GoogleAuth({
    keyFile:KEYFILEPATH,
    scope:SCOPES
});


const uploadFile=async(fileObject)=>{
    const bufferStream=new stream.PassThrough()
    bufferStream.end(fileObject.buffer)
    const {data}= await google.drive({
        version:'v3',
        auth:auth
    }).files.create({
        media:{
            mimeType:fileObject.mimeType,
            body:bufferStream,
        },
        requestBody:{
            name:fileObject.originalname,
            parents:['1DCJ9_YDrSw8-quc-qkTyEm8ZgzOaPC8T'],

        },
        fields:"id,name",
    })
    console.log(`upload to drive successfull${data.name}${data.id}`);
};



router.post('/',upload.any(),async(req, res)=>{
    try{
        const {body,files}=req;
        for(let f=0;f<files.length;f++){
           await  uploadFile(files[f]);

        }
        console.log(body);
        res.status(200).send("Timetable submitted");
    }catch(f){
        res.send(f.message);
    }

})




module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const { google } = require('googleapis');
// const mysql = require('mysql2');
// const router = express.Router()
// const app = express();

// const db=require('../database/db');
// const credentials=require('../credentials.json')


// // Configure MySQL connection


// // Configure Google Drive API
// const auth = new google.auth.GoogleAuth({
//   keyFile: credentials,
//   scopes: ['https://www.googleapis.com/auth/drive']
// });

// const drive = google.drive({
//   version: 'v3',
//   auth: auth
// });

// // Configure Multer for file upload
// const upload = multer({ dest: 'uploads/' });

// // Define a route for file upload
// router.post('/', upload.single('file'), async (req, res) => {
   
    
//   try {
//             const fileMetadata = {
//             name: req.file.originalname
//             };

//             const media = {
//             mimeType: req.file.mimetype,
//             body: require('fs').createReadStream(req.file.path)
//             };

//             const uploadedFile = await drive.files.create({
//             resource: fileMetadata,
//             media: media,
//             fields: 'id, webViewLink'
//             });

//             const fileUrl = uploadedFile.data.webViewLink;
//             db.getConnection((err, connection)=>{
//                 if(err) throw err 
//                 connection.release();
//                 // Store file URL in MySQL database
//                 db.query('INSERT INTO timetable (url) VALUES (?)', [fileUrl], (error, results) => {
                
//                     if (error) {
//                     console.error('Error storing URL in database:', error);
//                     return res.status(500).send('Error storing file URL');
//                 }

//                 res.status(200).send('File uploaded and URL stored');
//                 });
//             })
//     } catch (error) {
//          console.error('Error uploading file:', error);
//         res.status(500).send('Error uploading file');
//     }
    
// });
// module.exports = router;