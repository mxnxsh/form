var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var ejs = require("ejs");
var mongoose = require("mongoose");
var flash = require('connect-flash');


//Connect to db
mongoose.connect("mongodb+srv://admin-manish:kingisback123@cluster0-tm1kx.mongodb.net/merge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//mongoose.connect("mongodb://localhost:27017/merge", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Init app
var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// //Set routes
//flash connection
// app.use(express.cookieParser('keyboard cat'));
// app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

var user = require("./routes/user.js");

app.use("/", user);


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
// app.listen(port);


app.listen(port, function() {
    console.log("Server is running successfully");
});

//  https://glacial-brook-40897.herokuapp.com/