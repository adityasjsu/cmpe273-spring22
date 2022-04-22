//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var db = require('./config/db.config');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('./src/models/user.model');

//Importing routes
const userRoutes = require('./src/routes/user.route');
const shopRoutes = require('./src/routes/shop.route');
const itemRoutes = require('./src/routes/item.route');
const cartRoutes = require('./src/routes/cart.route');
const orderRoutes = require('./src/routes/order.route');

app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(cors());
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_lab1',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,// Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());


//Allow Access Control
 app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
     res.setHeader('Cache-Control', 'no-cache');
     next();
   });

  

// Getting routes

// User 
app.use("/api/users", userRoutes);

// Shop 
app.use("/api/shops", shopRoutes);

// Item 
app.use("/api/items", itemRoutes);

// Cart 
app.use("/api/cart", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);



// Login function

app.post('/api/login', async (req, res) => {
            console.log("inside login");
         const email = req.body.email;
         const password = req.body.password;
         console.log("email:",email,"password:",password);
    userModel.User.findOne({ email: email }, async (error, user) => {
        if (error) {
            console.log("error in login");
                         res.send({err:err});
        }
        if (user) {
            
            const comparison = await bcrypt.compare(password, user.password)
             if(comparison){
                 res.send(user);
                 console.log("Login Success");
             }
        else{
                     res.send("Wrong Password");
                     console.log("Login Failed, Wrong Password");
                 }
        }
        else {

            console.log("User does not exist");
             res.send("Incorrect email/password combination");
        }
    });    
});




// User logout function
app.get('/api/logout', (req,res) => {
    if(!req.session.user){
        console.log("\nNot logged in");
        res.send("Logged Out");
    }
    else{
        req.session.destroy();
        res.send("Logged Out");
        console.log("\nLogged out successfully!");
    }
});


//start your server on port 3001
if (require.main === module) {
app.listen(3001);
console.log("Server Listening on port 3001");
}
module.exports = app;