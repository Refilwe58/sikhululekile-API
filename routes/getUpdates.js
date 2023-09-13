const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const database=require('../database/db.js');
// const cookieParser = require('cookie-parser');

router.get('/',(req, res)=>{



    var sql = 'select * from updates ';

    database.getConnection((err, connection)=>{
    if(err) throw err
    connection.query(sql,(err, result)=>{
    connection.release();
    if(err)
            return res.status(200).send("Failed to load data!"+err);
            else{
           
            if(result.length===0){

                return res.status(200).send("no new updates");
                
            }else{
                    //code to display on postman
                    return res.status(200).send(result);
            
                
            }

            }
        })
    });


});

module.exports = router;