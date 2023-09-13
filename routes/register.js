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
    database.getConnection((err, connection) => {
            if(err) throw err
        const params = req.body;
        connection.query('INSERT INTO admin SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send({message:'Successfully  Registered'})
            } else {
                console.log(err)
            }
            })
     })
 })


module.exports = router;
