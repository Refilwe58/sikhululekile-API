const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router()
const app=express();

app.use(cors());
app.use(bodyparser.json());

const database=require('../database/db.js');


router.post('/',(req, res)=>{

    //instatiating user variables
    let email =req.body.email;
    let password=req.body.password;

//retrieve the student if the student exists
    var sql = 'select * from admin where email ="'+email+'" and password="'+password+'" limit 1';
    database.getConnection((err, connection)=>{
        if(err) throw err
        connection.query(sql,(err, result)=>{
            connection.release();
            if(err){
                return res.status(200).send("Failed to load data! "+err);
            }else{
                    //if the alumni with the following credentials does not exist throw an error
                    if(result.length===0){

                        return res.status(200).send("An admin with those  credentials does not exist");
                        
                    }else{  
                        
                            return res.status(200).json({message:"Log in was successful!"});
                    
                    }
                
                }
        });
    });

});


module.exports = router;