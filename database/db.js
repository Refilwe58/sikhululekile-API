const mysql=require('mysql2');

var db = mysql.createPool({

    host:'localhost',
    user: 'root',
    password: '',
    database: 'sikhululekile',
});


module.exports=db;