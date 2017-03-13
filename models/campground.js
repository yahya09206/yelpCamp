var mongoose = require("mongoose");
//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Type.ObjectId,
			ref: "Comment"
		}

	]
});

//model
module.exports = mongoose.model("Campground", campgroundSchema);