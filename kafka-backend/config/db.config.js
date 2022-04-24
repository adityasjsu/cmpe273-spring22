// const mysql = require('mysql');

// // DB Setup
// const db = mysql.createPool({
//     connectionLimit: 10000,
//     user:'admin',
//     host:'databasecmpe273.caijbimyl1p6.us-east-2.rds.amazonaws.com',
//     password:'admin123',
//     database:'etsy_lab1'
// })

// db.getConnection(function(err){
//     if(err){
//         throw err;
//     }
//     console.log("Database Connected");
// })

const mongoDB= 'mongodb+srv://admin:adminlab123@cluster0.2zohe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 500//,
    //bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed from Kafka Backend`);
    } else {
        console.log(`MongoDB Connected from Kafka Backend`);
    }
});

module.exports = mongoose;