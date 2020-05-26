var mongoose = require("mongoose");


var companySchema = mongoose.Schema({
	companyName:{
		type:String,
	},
	email:{
		type:String,
	},
	industry:{
		type:String,
	},
	number:{
		type:Number
	},
});
var Company = module.exports = mongoose.model("Company",companySchema);