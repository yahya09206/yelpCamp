var mongoos = require("mongoose");
//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

//model
var Campground = mongoose.model("Campground", campgroundSchema);