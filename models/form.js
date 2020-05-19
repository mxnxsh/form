var mongoose = require("mongoose");
var User = require("../models/user");

var formSchema = mongoose.Schema({
	tenthmarks:Number,
	twelvethmarks:Number,
	jobDetails:String,
	internship:String,
	position:String,
	trainingDetail:String,
	projectDetails:String,
	additionalDetail:String,
	gridRadios:String,
	userArrayStore:[]
});

var Form = module.exports = mongoose.model("form",formSchema);