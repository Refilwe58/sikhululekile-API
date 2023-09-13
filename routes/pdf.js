// const express = require('express');
// const multer = require('multer');
// const { google } = require('googleapis');
// const mysql = require('mysql2');
// const router = express.Router()
// const app = express();
// const fs=require('fs');

// const db=require('../database/db');
// const credentials=require('../credentials.json')


// async function uploadFile(){
//     try{
//         const auth=new google.auth.GoogleAuth({
//             keyFile:credentials,
//             scopes: ['https://www.googleapis.com/auth/drive']
//         }) 
//         const driveService=google.drive({
//             version: 'v3',
//             auth: auth
//         })
//         const fileMetadata={
//             'name':'test.pdf',
//             'parent':['1DCJ9_YDrSw8-quc-qkTyEm8ZgzOaPC8T']

//         }
//         const media={
//             MimeType:'application/pdf',
//             body: fs.createReadStream('')
//         }
//     }catch(err){
//         console.log('upload file error',err)
//     }
// }