var express  = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var ejs = require("ejs");
var mongoose = require("mongoose");
var md5 = require('md5');


var Post = require("./models/post");

// Connect to db
mongoose.connect("mongodb+srv://admin-manish:kingisback123@cluster0-tm1kx.mongodb.net/merge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Init app
var app = express();

// View engine setup
app.set("views",path.join(__dirname,"views")); 
app.set("view engine","ejs");

// Set public folder
app.use(express.static(path.join(__dirname,"public")));

// Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// //Set routes
var user = require("./routes/user.js");

app.use("/",user);

app.get("/compose",function(req,res)
{
  res.render("compose");
});

app.get("/blog",function(req,res)
{
Post.find({},function(err,posts){
    res.render("blog", {
    posts: posts
    });
  });
});

app.post("/compose",function(req,res)
{
  const post = new Post ({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
    quizLink:req.body.quizLink
  });
  post.save(function(err){
    if (!err){
        res.redirect("/blog");
    }
});
});
  
app.listen(3000,function(){
	console.log("Server is running successfully");
});