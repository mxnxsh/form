var mongoose = require("mongoose");


var UserSchema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	phoneNumber:{
		type:Number
	},
	password:{
		type:String,
		required:true
	}	
});
var User = module.exports = mongoose.model("user",UserSchema);