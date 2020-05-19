var express = require("express");
var passport = require('passport');
var router = express.Router();
var bcrypt = require('bcrypt');
var saltRounds = 10;

// var userArray = []


// Get user models
var User = require("../models/user");
// var Form = require("../models/form");
router.get("/",(req,res)=>{
	res.render("home",{
		title:"Home"
	});
});

router.get("/greeting",(req,res)=>{
  res.render("greeting");
});
router.get("/register",(req,res)=>{
	res.render("register",{
		title:"Student Registration"
	});
});
router.post("/register",(req,res)=>{
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		var user = new User({
		name: req.body.name,
		number: req.body.number,
		email: req.body.email,
		password: hash,
	});
		user.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/greeting");
		}
	});
});

	// userArray.push(user);
	

});
// router.get("/login",(req,res)=>{
// 	res.render("login");
// });

// router.post('/login', function(req, res) {
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	User.findOne({email:email},function(err,foundUser){
// 		if(err){
// 			console.log(err);
// 			res.render("/register");
// 		}else{
// 			if(foundUser){
// 				bcrypt.compare(password, foundUser.password, function(err, result) {
//     				if(result == true){
//     					res.redirect("/");
//     					console.log("success")
//     				}
// 				});
// 			}else{
// 				console.log("user not found");
// 				res.redirect("/register");
// 			}
// 		}
// 	});
// });
// router.get("/userform",(req,res)=>{
// 	res.render("userform",{
// 		title:"Form",
// 		userArrayStore:userArray
// 	});
// });
// router.post("/userform",(req,res)=>{
// 	console.log("Form entry")
// 		console.log(userArray);
// 	var form = new Form({
// 		tenthmarks:req.body.tenthmarks,
// 		twelvethmarks:req.body.twelvethmarks,
// 		jobDetails:req.body.jobDetails,
// 		gridRadios:req.body.gridRadios,
// 		userArrayStore:req.body.userArray,
// 		internship:req.body.internship,
// 		position:req.body.position,
// 		trainingDetail:req.body.trainingDetail,
// 		projectDetails:req.body.projectDetails,
// 		additionalDetail:req.body.additionalDetail,

// 	});
// 	form.save(function(err){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			res.redirect("/home");
// 		}
// 	})
// 	console.log("Form exit")
// 		console.log(userArray);

// });
module.exports = router;