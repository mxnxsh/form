var mongoose = require("mongoose");


var UserSchema = mongoose.Schema({
	fname:{
		type:String,
	},
	lname:{
		type:String,
	},
	email:{
		type:String,
	},
	number:{
		type:Number
	},
	city:{
		type:String,
	}
});
var User = module.exports = mongoose.model("user",UserSchema);