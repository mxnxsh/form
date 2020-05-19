var mongoose = require("mongoose");

var postsSchema = mongoose.Schema({
	postTitle:{
		type:String,
		required:true
	},
	postBody:{
		type:String,
		required:true
	},
	quizLink:{
		type:String,
		required:true
	}
});

var Post = module.exports = mongoose.model("Post",postsSchema);