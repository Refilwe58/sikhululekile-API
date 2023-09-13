const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

app.use(cors());
app.use(bodyparser.json());

const db=require('../database/db');

router.post('/',(req,res) => {
   
        let title=req.body.title;
        let description=req.body.description;
          
        let sql = `INSERT INTO updates (title,description)
        VALUES('${title}','${description}')`;
        //run the query


        db.query(sql,(err,results) => {
            if(err){
                return res.status(401)
            }else {
                return res.status(201).send({message:'updates created successfully'});
            }
        })

 });

module.exports = router;