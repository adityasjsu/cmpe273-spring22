const mysql = require('mysql');

// DB Setup
const db = mysql.createConnection({
    user:'admin',
    host:'databasecmpe273.caijbimyl1p6.us-east-2.rds.amazonaws.com',
    password:'admin123',
    database:'etsy_lab1'
})

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Database Connected");
})

module.exports = db;