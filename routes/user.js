var express = require("express");
var passport = require('passport');
var router = express.Router();

// Get user models
var User = require("../models/user");

router.get("/",(req,res)=>{
	res.render("home",{
		title:"Home"
	});
});
router.get("/register",(req,res)=>{
	res.render("register",{
		title:"Student Registration"
	});
});
router.post("/register",(req,res)=>{
	var user = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		password: req.body.password,
	});
	user.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/userForm");
		}
	})
});
router.get("/login",(req,res)=>{
	res.render("login",{
		title:"Login"
	});
});

router.post('/login', function(req, res, next) {

    // passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //     failureFlash: true
    // })(req, res, next);

});
router.get("/userform",(req,res)=>{
	res.render("userform",{
		title:"Form"
	});
});
module.exports = router;